import React from 'react';
import Button from '../components/Button';
import { Footer } from '../components/Footer';
import GlobalStyle from '../components/GlobalStyle';
import { Header } from '../components/Header';
import Panel from '../components/Panel';
import Paragraph from '../components/Paragraph';
import coffeeIcon from '../images/icons/buymeacoffee.svg';
import feedbackIcon from '../images/icons/sendmail.svg';

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
	document.title = 'Contact | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />
			<Panel
				color="primary"
				style={{ width: '70%', margin: '10em auto 22.57em auto' }}
			>
				<div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Contact</div>
				<Paragraph>
					Thanks for playing Gungi! If you enjoyed it, please consider
					supporting my work!
				</Paragraph>
				<Button
					color="secondary"
					style={{
						margin: '0 40px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img src={coffeeIcon} alt="icon" style={{ height: '1.5rem' }} />
					<span style={{ paddingLeft: '5px' }}>Buy me a coffee</span>
				</Button>

				<br />
				<Paragraph>
					This project is a community effort. If you have ideas on how it can
					improve, please send them my way!
				</Paragraph>
				<Button
					color="secondary"
					style={{
						margin: '0 40px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img src={feedbackIcon} alt="icon" style={{ height: '1.5rem' }} />
					<span style={{ paddingLeft: '5px' }}>Send feedback</span>
				</Button>
			</Panel>
			<Footer />
		</>
	);
};
