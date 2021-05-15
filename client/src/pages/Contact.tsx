import React from 'react';
import styled from 'styled-components';

import coffeeIcon from '../assets/icons/buymeacoffee.svg';
import feedbackIcon from '../assets/icons/feedback.svg';
// import gitIcon from '../assets/icons/github.svg';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import Button from '../components/ui/styles/Button';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import Panel from '../components/ui/styles/Panel';
import Paragraph from '../components/ui/styles/Paragraph';

const Heading = styled.div`
	font-size: 3rem;
	font-weight: bolder;

	@media (max-width: 450px) {
		font-size: 2rem;
	}
`;

const ButtonLabel = styled.span`
	font-size: 1rem;
	padding-left: 10px;

	@media (max-width: 450px) {
		font-size: 0.9rem;
	}
`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
	document.title = 'Contact | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />
			<div
				style={{
					height: 'calc(100vh - 6rem)',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Panel
					color="primary"
					style={{
						maxWidth: '80%',
					}}
				>
					<Heading>Contact</Heading>
					<Paragraph>
						Thanks for playing Gungi! If you enjoyed it, please consider
						supporting my work!
					</Paragraph>
					<Button
						color="secondary"
						onClick={() => {
							window.open('https://www.buymeacoffee.com/jwyce', '_blank');
						}}
						style={{
							margin: '0 30px',
							padding: '0 25px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img src={coffeeIcon} alt="icon" style={{ height: '1.5rem' }} />
						<ButtonLabel>Buy me a coffee</ButtonLabel>
					</Button>

					{/* <br />
					<Paragraph>
						This project was build with React and Node and is completely open
						source!
					</Paragraph>
					<Button
						color="secondary"
						style={{
							margin: '0 30px',
							padding: '0 25px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'start',
							alignItems: 'center',
						}}
					>
						<img src={gitIcon} alt="icon" style={{ height: '1.5rem' }} />
						<ButtonLabel>GitHub Repo</ButtonLabel>
					</Button> */}

					<br />
					<Paragraph>
						If you have ideas on how it can improve, please send them my way!
					</Paragraph>
					<Button
						color="secondary"
						onClick={() => {
							window.open(
								'https://docs.google.com/forms/d/e/1FAIpQLScGiGdn6VkLor647mQPN3eiC6Kl962Vxs6YKUAjK6vrTs362w/viewform?usp=sf_link',
								'_blank'
							);
						}}
						style={{
							margin: '0 30px',
							padding: '0 25px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'start',
							alignItems: 'center',
						}}
					>
						<img src={feedbackIcon} alt="icon" style={{ height: '1.5rem' }} />
						<ButtonLabel>Send Feedback</ButtonLabel>
					</Button>
				</Panel>
			</div>
			<Footer />
		</>
	);
};
