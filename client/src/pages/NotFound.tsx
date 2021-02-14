import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import { Footer } from '../components/ui/Footer';
import GlobalStyle from '../components/ui/GlobalStyle';
import { Header } from '../components/ui/Header';
import Wrapper from '../components/ui/Wrapper';
import spy from '../assets/pieces/w1忍.svg';

const TextStyle = styled.div`
	font-size: 1em;
	opacity: 75%;
	font-family: OpenSans, sans-serif;
	width: 15em;
	text-align: center;
	line-height: 1.6;
`;

interface NotFoundProps extends RouteComponentProps {}

export const NotFound: React.FC<NotFoundProps> = ({ history }) => {
	document.title = '404 | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />
			<Wrapper style={{ height: '89.8vh' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<span style={{ fontSize: '8em', fontWeight: 'bold' }}>4</span>
					<Link to="/">
						<img src={spy} alt="0" style={{ width: '7em' }} />
					</Link>
					<span style={{ fontSize: '8em', fontWeight: 'bold' }}>4</span>
				</div>
				<TextStyle>
					Sorry the requested page unfortunately couldn't be found.
				</TextStyle>
				<br />
				<Button
					onClick={() => {
						history.push('/');
					}}
					color="secondary"
				>
					Home
				</Button>
			</Wrapper>
			<Footer />
		</>
	);
};
