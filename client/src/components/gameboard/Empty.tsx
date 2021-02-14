import React from 'react';
import spy from '../../assets/pieces/w1忍.svg';

export const Empty: React.FC<{}> = () => {
	return (
		<>
			<img
				src={spy}
				alt="piece"
				draggable={false}
				style={{
					zIndex: 4,
					opacity: 0,
					position: 'relative',
					width: '80%',
					display: 'block',
					margin: '10.02% auto',
				}}
			/>
		</>
	);
};
