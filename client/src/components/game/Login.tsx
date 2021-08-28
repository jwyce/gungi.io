import React from 'react';
import styled from 'styled-components';

import accountIcon from '../../assets/icons/user_alt.svg';
import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';
import Button from '../ui/styles/Button';
import GlobalStyle from '../ui/styles/GlobalStyle';
import { HeroParticles } from '../ui/styles/HeroParticles';
import Input from '../ui/styles/Input';
import Title from '../ui/styles/Title';
import Wrapper from '../ui/styles/Wrapper';
import { MobileWarning } from '../ui/MobileWarning';
import Subtitle from '../ui/styles/Subtitle';

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20em;
`;

interface LoginProps {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	callback: () => void;
}

export const Login: React.FC<LoginProps> = ({
	username,
	setUsername,
	callback,
}) => {
	return (
		<>
			<GlobalStyle />
			<Header home />
			<MobileWarning />
			<Wrapper>
				<HeroParticles />

				<Title size="large">Gungi.io</Title>
				<Subtitle style={{ margin: '0' }}>v1.8.2</Subtitle>
				<img
					src={accountIcon}
					alt="account"
					style={{ width: '10rem', fill: 'white', marginTop: '15px' }}
				/>

				<LoginForm
					onSubmit={(e) => {
						e.preventDefault();
						callback();
					}}
				>
					<Input
						type="text"
						placeholder="Enter your name"
						auto-complete="off"
						maxLength={15}
						minLength={2}
						required
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<Button
						type="submit"
						color="primary"
						style={{ width: '100%', marginTop: '5px' }}
					>
						Play!
					</Button>
				</LoginForm>
			</Wrapper>
			<Footer />
		</>
	);
};
