import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../components/Button';
import { Footer } from '../components/Footer';
import GlobalStyle from '../components/GlobalStyle';
import { Header } from '../components/Header';
import { HeroParticles } from '../components/HeroParticles';
import Wrapper from '../components/Wrapper';
import Input from '../components/Input';
import accountIcon from '../images/icons/account_circle.svg';

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
					<Input type="text" placeholder="Enter Username" auto-complete="off" />
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
