import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { HeroParticles } from '../components/ui/styles/HeroParticles';
import Button from '../components/ui/styles/Button';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import { Footer } from '../components/ui/Footer';
import Wrapper from '../components/ui/styles/Wrapper';
import { Header } from '../components/ui/Header';
import Title from '../components/ui/styles/Title';
import Subtitle from '../components/ui/styles/Subtitle';

interface HomeProps extends RouteComponentProps {}

export const Home: React.FC<HomeProps> = ({ history }) => {
	document.title = 'Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home />
			<Wrapper>
				<HeroParticles />
				<Title size="large">Gungi.io</Title>
				<Subtitle style={{ margin: '0' }}>v1.0.8.2</Subtitle>
				<Subtitle>
					"You should enjoy the little detours to the fullest. Because that's
					where you'll find things more important than what you want." - Ging
					Freecss
				</Subtitle>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '21em',
					}}
				>
					<Button
						onClick={() => {
							history.push('/game');
						}}
						color="primary"
					>
						Play game
					</Button>
					<Button
						onClick={() => {
							history.push('/about');
						}}
						color="primary"
					>
						Learn more
					</Button>
				</div>
			</Wrapper>
			<Footer />
		</>
	);
};
