import React from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { LoadingContainer } from 'src/components/ui/styles/LoadingContainer';
import { User } from 'src/typings/types';
import styled from 'styled-components';

import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';
import GameButton from '../ui/styles/GameButton';
import GlobalStyle from '../ui/styles/GlobalStyle';
import Input from '../ui/styles/Input';
import LobbyButton from '../ui/styles/LobbyButton';
import Panel from '../ui/styles/Panel';
import Paragraph from '../ui/styles/Paragraph';
import Title from '../ui/styles/Title';

const Heading = styled.div`
	font-size: 3rem;
	font-weight: bolder;

	@media (max-width: 450px) {
		font-size: 2rem;
	}
`;

const Heading1 = styled.div`
	margin: 8em 11% 0 8em;

	@media (max-width: 650px) {
		margin: 8em 1em 0 1em;
	}
`;

interface LobbyProps {
	roomId: string;
	players: User[] | undefined;
	startGameCallback: (opponentId: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({
	roomId,
	players,
	startGameCallback,
}) => {
	return (
		<>
			<GlobalStyle />
			<Header home={false} />

			{!players ? (
				<div style={{ height: 'calc(100vh - 6rem)' }}>
					<LoadingContainer>
						<OrbitSpinner color="#D468FA" />
					</LoadingContainer>
				</div>
			) : (
				<div style={{ minHeight: 'calc(100vh - 14rem)' }}>
					<Heading1>
						<Title size="medium">Lobby</Title>
						<Paragraph style={{ padding: 0 }}>
							Click on a player's name to start a game
						</Paragraph>
					</Heading1>

					<Panel
						color="primary"
						style={{
							width: '70%',
							margin: '2em auto 2em auto',
						}}
					>
						<Heading>Players</Heading>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginTop: '10px',
							}}
						>
							<LobbyButton style={{ color: '#ffa600' }}>
								{players[0].username}
								{players[0].self && <span> (you)</span>}
							</LobbyButton>
							{players.slice(1).map((player: User) => (
								<React.Fragment key={player.userId}>
									<LobbyButton
										onClick={() => {
											const creatorId = players?.find(
												(x) => x.userType === 'creator'
											)?.userId;
											const selfId = players?.find((x) => x.self)?.userId;
											if (creatorId === selfId) {
												startGameCallback(player.userId);
											}
										}}
									>
										{player.username}
										{player.self && <span> (you)</span>}
									</LobbyButton>
								</React.Fragment>
							))}
						</div>
					</Panel>

					<Heading style={{ textAlign: 'center' }}>
						Invite your friends!
					</Heading>
					<div
						style={{
							width: '80%',
							display: 'block',
							margin: '0 auto',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Input readOnly value={`http://localhost:3000/game/${roomId}`} />
							<GameButton
								backgroundColor="#ffae00"
								backgroundColorHover="#ff9100"
								onClick={() => {
									navigator.clipboard.writeText(
										`http://localhost:3000/game/${roomId}`
									);
								}}
							>
								Copy
							</GameButton>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
};
