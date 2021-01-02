import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { HeroParticles } from '../components/HeroParticles';
import Button from '../components/Button';
import GlobalStyle from '../components/GlobalStyle';
import { Footer } from '../components/Footer';
import Wrapper from '../components/Wrapper';
import { Header } from '../components/Header';

interface HomeProps extends RouteComponentProps {}

export const Home: React.FC<HomeProps> = ({ history }) => {
	document.title = 'Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home />
			<Wrapper>
				<HeroParticles />
				<span
					style={{
						fontSize: '8rem',
						fontStyle: 'italic',
						fontWeight: 'bolder',
					}}
				>
					Gungi.io
				</span>
				<h4
					style={{
						fontSize: '2rem',
						fontWeight: 500,
						width: '38em',
						fontStyle: 'italic',
					}}
				>
					"You should enjoy the little detours to the fullest. Because that's
					where you'll find things more important than what you want." - Ging
					Freecss
				</h4>
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
							history.push('/login');
						}}
						color="primary"
					>
						Find game
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
