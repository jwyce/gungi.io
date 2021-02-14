import React from 'react';
import Button from '../components/ui/styles/Button';
import { Footer } from '../components/ui/Footer';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import { Header } from '../components/ui/Header';
import Panel from '../components/ui/styles/Panel';
import Paragraph from '../components/ui/styles/Paragraph';
import coffeeIcon from '../assets/icons/buymeacoffee.svg';
import gitIcon from '../assets/icons/github.svg';
import feedbackIcon from '../assets/icons/feedback.svg';

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
	document.title = 'Contact | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />
			<div style={{ height: 'calc(100vh - 16rem)' }}>
				<Panel
					color="primary"
					style={{
						width: '70%',
						margin: '10rem auto',
					}}
				>
					<div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Contact</div>
					<Paragraph>
						Thanks for playing Gungi! If you enjoyed it, please consider
						supporting my work!
					</Paragraph>
					<Button
						color="secondary"
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
						<span style={{ paddingLeft: '10px' }}>Buy me a coffee</span>
					</Button>

					<br />
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
						<span style={{ paddingLeft: '10px' }}>GitHub Repo</span>
					</Button>

					<br />
					<Paragraph>
						This project is a community effort. If you have ideas on how it can
						improve, please send them my way!
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
						<img src={feedbackIcon} alt="icon" style={{ height: '1.5rem' }} />
						<span style={{ paddingLeft: '10px' }}>Send Feedback</span>
					</Button>
				</Panel>
			</div>
			<Footer />
		</>
	);
};
