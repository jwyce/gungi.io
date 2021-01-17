import React from 'react';
import styled from 'styled-components';

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));
const Wrapper = styled.img`
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
`;

interface PieceProps {}

export const Piece: React.FC<PieceProps> = () => {
	return (
		<Wrapper
			src={pieces['w1帥.svg'].default}
			alt="piece"
			draggable={false}
			style={{
				width: '80%',
				display: 'block',
				margin: '10.02% auto',
				zIndex: 999,
			}}
		/>
	);
};
