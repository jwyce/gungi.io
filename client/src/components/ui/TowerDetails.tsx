import React from 'react';
import Panel from './styles/Panel';

interface TowerDetailsProps {}

export const TowerDetails: React.FC<TowerDetailsProps> = () => {
	return (
		<Panel
			color="secondary"
			style={{
				padding: '1em 1em 6em 1em',
				width: '75%',
				margin: 'auto',
			}}
		>
			<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
				Tower Details
			</div>
		</Panel>
	);
};
