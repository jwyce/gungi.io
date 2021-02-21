import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../components/ui/styles/Button';
import { Footer } from '../components/ui/Footer';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import { Header } from '../components/ui/Header';
import { HeroParticles } from '../components/ui/styles/HeroParticles';
import Wrapper from '../components/ui/styles/Wrapper';
import Input from '../components/ui/styles/Input';
import accountIcon from '../assets/icons/account_circle.svg';

interface LoginProps extends RouteComponentProps {}

export const Login: React.FC<LoginProps> = ({ history }) => {
	document.title = 'Login | Gungi.io';
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

				<div>
					<Input
						type="text"
						placeholder="Enter Username"
						auto-complete="off"
						maxLength={23}
					/>
					<Button
						onClick={() => {
							history.push('/lobby');
						}}
						color="primary"
					>
						Sign in
					</Button>
				</div>
			</Wrapper>
			<Footer />
		</>
	);
};