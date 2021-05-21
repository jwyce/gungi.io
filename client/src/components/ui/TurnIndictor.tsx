import React from 'react';
import styled from 'styled-components';
import blackMarshall from '../../assets/pieces/b1帥.svg';
import whiteMarshall from '../../assets/pieces/w1帥.svg';

interface TurnIndictorProps {
	player: string;
	isTurn: boolean;
	playerName: string;
	ready: boolean;
}

const Title = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

const Name = styled.div<{ isTurn: boolean }>`
	font-size: '1rem';
	font-weight: bolder;
	color: ${(props) => (props.isTurn ? '#D468FA' : '#fff')};
	opacity: ${(props) => (props.isTurn ? '100%' : '75%')};
`;

const ReadyIndicator = styled.div`
	background-color: #23d367;
	border-radius: 50%;
	height: 1rem;
	width: 1rem;
	margin-right: 5px;
`;

export const TurnIndictor: React.FC<TurnIndictorProps> = (props) => {
	return (
		<Title>
			{props.ready && <ReadyIndicator />}
			<Name isTurn={props.isTurn}>{props.playerName}</Name>
			<img
				src={props.player === 'b' ? blackMarshall : whiteMarshall}
				alt="piece"
				style={{ width: '32px', paddingLeft: '20px' }}
			/>
		</Title>
	);
};
