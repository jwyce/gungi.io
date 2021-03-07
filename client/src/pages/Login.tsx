import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SocketStoreContext } from 'src/stores/SocketStore';

import accountIcon from '../assets/icons/account_circle.svg';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import Button from '../components/ui/styles/Button';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import { HeroParticles } from '../components/ui/styles/HeroParticles';
import Input from '../components/ui/styles/Input';
import Wrapper from '../components/ui/styles/Wrapper';

interface LoginProps extends RouteComponentProps {}

export const Login: React.FC<LoginProps> = observer(({ history }) => {
	document.title = 'Login | Gungi.io';
	const [username, setUsername] = useState('');
	const socketStore = useContext(SocketStoreContext);

	useEffect(() => {
		const sessionID = localStorage.getItem('sessionID');

		console.log('session id: ', sessionID);
		if (sessionID) {
			socketStore.userIsSignedIn = true;
			// @ts-ignore
			socketStore.socket.auth = { sessionID };

			socketStore.socket.connect();
			history.push('/lobby');
		}

		socketStore.socket.on(
			'session',
			({ sessionID, userID }: { sessionID: string; userID: number }) => {
				// attach the session ID to the next reconnection attempts
				// @ts-ignore
				socketStore.socket.auth = { sessionID };
				// store it in the localStorage
				localStorage.setItem('sessionID', sessionID);
				// save the ID of the user
				// @ts-ignore
				socketStore.socket.userID = userID;
				history.push('/lobby');
			}
		);

		socketStore.socket.on('connect_error', (err: any) => {
			if (err.message === 'invalid username') {
				console.log('invalid username');
				socketStore.userIsSignedIn = false;
			}
		});

		return () => {
			socketStore.socket.off('connect_error');
		};

		//TODO: if has an active game redirect to that game (get info from server)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header home />
			<Wrapper>
				<HeroParticles />

				<span
					style={{
						fontSize: '6rem',
						fontStyle: 'italic',
						fontWeight: 'bolder',
					}}
				>
					Gungi.io
				</span>
				<img
					src={accountIcon}
					alt="account"
					style={{ width: '15rem', fill: 'white' }}
				/>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						socketStore.userIsSignedIn = true;
						// @ts-ignore
						socketStore.socket.auth = { username };
						socketStore.socket.connect();
					}}
				>
					<Input
						type="text"
						placeholder="Enter Username"
						auto-complete="off"
						maxLength={23}
						minLength={2}
						required
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<Button type="submit" color="primary">
						Sign in
					</Button>
				</form>
			</Wrapper>
			<Footer />
		</>
	);
});
