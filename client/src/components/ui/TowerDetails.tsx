import React from 'react';
import Panel from './Panel';

interface TowerDetailsProps {}

export const TowerDetails: React.FC<TowerDetailsProps> = () => {
	return (
		<Panel
			color="secondary"
			style={{
				padding: '1em 1em 6em 1em',
				width: '95%',
				margin: 'auto',
			}}
		>
			<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
				Tower Details
			</div>
		</Panel>
	);
};
