import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingContainer } from 'src/components/ui/styles/LoadingContainer';
import { SocketStoreContext } from 'src/stores/SocketStore';
import { User } from 'src/typings/types';

import accountIcon from '../assets/icons/account_circle.svg';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import LobbyButton from '../components/ui/styles/LobbyButton';
import Panel from '../components/ui/styles/Panel';
import Paragraph from '../components/ui/styles/Paragraph';

interface LobbyProps extends RouteComponentProps {}

export const Lobby: React.FC<LobbyProps> = observer(({ history }) => {
	document.title = 'Lobby | Gungi.io';
	const socketStore = useContext(SocketStoreContext);
	const [onlinePlayers, setOnlinePlayers] = useState<User[] | undefined>(
		undefined
	);

	useEffect(() => {
		if (!socketStore.userIsSignedIn) {
			history.push('/login');
		}

		socketStore.socket.on('connect', () => {
			let newUsers = onlinePlayers ? [...onlinePlayers] : [];

			newUsers.forEach((user) => {
				if (user.self) {
					user.connected = true;
				}
			});
			setOnlinePlayers(newUsers);
		});

		socketStore.socket.on('disconnect', () => {
			let newUsers = onlinePlayers ? [...onlinePlayers] : [];

			newUsers.forEach((user) => {
				if (user.self) {
					user.connected = false;
				}
			});
			setOnlinePlayers(newUsers);
		});

		socketStore.socket.on('users', (users: User[]) => {
			let newUsers: User[] = onlinePlayers ? [...onlinePlayers] : [];
			console.log('users', users);

			users.forEach((user) => {
				for (let i = 0; i < newUsers.length; i++) {
					const existingUser = newUsers[i];
					if (existingUser.userID === user.userID) {
						existingUser.connected = user.connected;
						return;
					}
				}

				// @ts-ignore
				user.self = user.userID === socketStore.socket.userID;
				newUsers.push(user);
			});

			console.log('new Users', newUsers);

			// put the current user first, and then sort by username
			newUsers.sort((a: User, b: User) => {
				if (a.self) return -1;
				if (b.self) return 1;
				if (a.username < b.username) return -1;
				return a.username > b.username ? 1 : 0;
			});

			setOnlinePlayers(newUsers);
			console.log('online Players', onlinePlayers);
		});

		return () => {
			socketStore.socket.off('connect');
			socketStore.socket.off('disconnect');
			socketStore.socket.off('users');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		socketStore.socket.on('user connected', (user: User) => {
			console.log('new user', user);
			if (onlinePlayers?.length) {
				if (onlinePlayers.every((x) => x.self !== user.self)) {
					setOnlinePlayers([...onlinePlayers, user]);
				}
			} else {
				setOnlinePlayers([user]);
			}
			console.log(onlinePlayers);
		});

		socketStore.socket.on('user disconnected', (id: string) => {
			setOnlinePlayers(onlinePlayers?.filter((x) => x.userID !== id));
		});

		return () => {
			socketStore.socket.off('user connected');
			socketStore.socket.off('user disconnected');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onlinePlayers, socketStore.socket]);

	return (
		<>
			<GlobalStyle />
			<Header home={false} />

			{!onlinePlayers || !onlinePlayers.length ? (
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
								{onlinePlayers[0].username}
							</Paragraph>

							<img src={accountIcon} alt="account" style={{ width: '3em' }} />
						</div>
					</div>

					{/* <Panel
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
					</Panel> */}

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
							{onlinePlayers?.slice(1).map((player: User) => (
								<LobbyButton
									key={player.userID}
									onClick={() => {
										history.push('/game');
									}}
								>
									{player.username}{' '}
								</LobbyButton>
							))}
						</div>
					</Panel>
				</div>
			)}
			<Footer />
		</>
	);
});
