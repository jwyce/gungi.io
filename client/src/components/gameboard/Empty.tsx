import React from 'react';
import spy from '../../assets/pieces/w1忍.svg';

interface EmptyProps {
	squareId: string;
}

export const Empty: React.FC<EmptyProps> = ({ squareId }) => {
	return (
		<>
			<img
				src={spy}
				alt="piece"
				draggable={false}
				onClick={() => {}}
				style={{
					zIndex: 4,
					opacity: 0,
					position: 'relative',
					width: '80%',
					display: 'block',
					margin: '10.02% auto',
					pointerEvents: 'none',
				}}
			/>
		</>
	);
};
