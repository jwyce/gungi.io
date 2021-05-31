import { Tooltip } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { symbolToName } from '../../utils/symbolToNameMap';

function importAll(r: any) {
	let images = {};
	r.keys().forEach((item: string, index: any) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));

interface PieceIconProps {
	icon: string;
}

export const PieceIcon: React.FC<PieceIconProps> = observer(({ icon }) => {
	return (
		<Tooltip
			title={`${symbolToName(icon.charAt(2))}`}
			enterDelay={800}
			placement="right-start"
		>
			<img
				src={pieces[icon].default}
				alt="piece"
				draggable={false}
				style={{ zIndex: 4, margin: 0, width: '2.5rem', display: 'block' }}
			/>
		</Tooltip>
	);
});
