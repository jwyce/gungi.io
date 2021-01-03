import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	&:hover {
		cursor: grab;
	}
	&:active {
		cursor: grabbing;
	}
`;

interface SquareProps {
	children: React.ReactNode;
}

export const Square: React.FC<SquareProps> = (props) => {
	return <Wrapper>{props.children}</Wrapper>;
};
