import React from 'react';

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));

interface PieceProps {}

export const Piece: React.FC<PieceProps> = () => {
	return (
		<img
			src={pieces['w1帥.svg'].default}
			alt="piece"
			style={{ width: '81px' }}
		/>
	);
};
