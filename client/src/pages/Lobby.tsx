import React, { useEffect, useState } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { RouteComponentProps } from 'react-router-dom';
import io from 'socket.io-client';
import { LoadingContainer } from 'src/components/ui/styles/LoadingContainer';
import { User } from 'src/typings/types';

import accountIcon from '../assets/icons/account_circle.svg';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import LobbyButton from '../components/ui/styles/LobbyButton';
import Panel from '../components/ui/styles/Panel';
import Paragraph from '../components/ui/styles/Paragraph';

const socket = io('http://localhost:4001');

interface LobbyProps extends RouteComponentProps {}

export const Lobby: React.FC<LobbyProps> = ({ history }) => {
	document.title = 'Lobby | Gungi.io';
	const [onlinePlayers, setOnlinePlayers] = useState<User[] | undefined>(
		undefined
	);
	useEffect(() => {
		socket.emit('joinLobby');
		socket.on('onlineUsers', (data: User[]) => {
			setOnlinePlayers(data);
		});
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header home={false} />

			{!onlinePlayers ? (
				<div style={{ height: 'calc(100vh - 6rem)' }}>
					<LoadingContainer>
						<OrbitSpinner color="#D468FA" />
					</LoadingContainer>
				</div>
			) : (
				<div style={{ minHeight: 'calc(100vh - 16rem)' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							margin: '10em 11% 0 8em',
						}}
					>
						<span
							style={{
								fontSize: '5rem',
								fontStyle: 'italic',
								fontWeight: 'bolder',
							}}
						>
							Gungi.io
						</span>

						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<Paragraph
								style={{
									fontFamily: 'Montserrat, sans-serif',
									fontWeight: 'bold',
								}}
							>
								player 4
							</Paragraph>

							<img src={accountIcon} alt="account" style={{ width: '3em' }} />
						</div>
					</div>

					<Panel
						color="primary"
						style={{
							width: '70%',
							margin: '2em auto 2em auto',
						}}
					>
						<div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
							Active Games
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginTop: '10px',
							}}
						>
							<LobbyButton>#48</LobbyButton>
							<LobbyButton>#48</LobbyButton>
							<LobbyButton>#48</LobbyButton>
							<LobbyButton>#48</LobbyButton>
						</div>
					</Panel>

					<Panel
						color="primary"
						style={{
							width: '70%',
							margin: '2em auto 2em auto',
						}}
					>
						<div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
							Online Players
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								flexWrap: 'wrap',
								marginTop: '10px',
							}}
						>
							<LobbyButton
								onClick={() => {
									history.push('/game');
								}}
							>
								player 2
							</LobbyButton>
							{onlinePlayers?.map((player: User) => (
								<LobbyButton key={player.id}>{player.id}</LobbyButton>
							))}
						</div>
					</Panel>
				</div>
			)}
			<Footer />
		</>
	);
};
