import React from 'react';
import { Footer } from '../components/ui/Footer';
import GlobalStyle from '../components/ui/GlobalStyle';
import { Header } from '../components/ui/Header';
import Panel from '../components/ui/Panel';
import Paragraph from '../components/ui/Paragraph';
import LobbyButton from '../components/ui/LobbyButton';
import { RouteComponentProps } from 'react-router-dom';
import accountIcon from '../assets/icons/account_circle.svg';

interface LobbyProps extends RouteComponentProps {}

export const Lobby: React.FC<LobbyProps> = ({ history }) => {
	document.title = 'Lobby | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />

			<div style={{ minHeight: '100%', marginBottom: '5.9rem' }}>
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
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
						<LobbyButton>player 2</LobbyButton>
					</div>
				</Panel>
			</div>
			<Footer />
		</>
	);
};
