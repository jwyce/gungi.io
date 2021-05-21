import styled from 'styled-components';
import spy from '../../assets/pieces/w1忍.svg';

const FooterStyle = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #642bc0;
	height: 6rem;
	position: relative;
`;

export const Footer: React.FC = () => {
	return (
		<FooterStyle>
			<img src={spy} alt="spy" style={{ width: '32px' }} />
			<p style={{ fontSize: '9px' }}>
				@ {new Date().getFullYear()} Jared Wyce. All Rights Reserved.
			</p>
		</FooterStyle>
	);
};
