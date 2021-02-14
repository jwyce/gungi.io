import React from 'react';
import styled from 'styled-components';

const Coords = styled.svg`
	left: 0;
	position: absolute;
	top: 0;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	fill: #97652b;
`;

interface CoordinatesProps {
	orientation: string;
}

export const Coordinates: React.FC<CoordinatesProps> = ({ orientation }) => {
	return (
		<Coords viewBox="0 0 100 100">
			<text x="0.75" y="2.5" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 9 : 1}
			</text>
			<text x="0.75" y="13.55" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 8 : 2}
			</text>
			<text x="0.75" y="24.6" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 7 : 3}
			</text>
			<text x="0.75" y="35.65" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 6 : 4}
			</text>
			<text x="0.75" y="46.7" fontSize="2.5" fontWeight="600">
				5
			</text>
			<text x="0.75" y="57.9" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 4 : 6}
			</text>
			<text x="0.75" y="69.1" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 3 : 7}
			</text>
			<text x="0.75" y="80.15" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 2 : 8}
			</text>
			<text x="0.75" y="91.2" fontSize="2.5" fontWeight="600">
				{orientation === 'white' ? 1 : 9}
			</text>

			{orientation === 'white' ? (
				<text x="9.4" y="99" fontSize="2.5" fontWeight="600">
					a
				</text>
			) : (
				<text x="10" y="99" fontSize="2.5" fontWeight="600">
					i
				</text>
			)}
			{orientation === 'white' ? (
				<text x="20.2" y="99" fontSize="2.5" fontWeight="600">
					b
				</text>
			) : (
				<text x="20.2" y="99" fontSize="2.5" fontWeight="600">
					h
				</text>
			)}
			{orientation === 'white' ? (
				<text x="31.5" y="99" fontSize="2.5" fontWeight="600">
					c
				</text>
			) : (
				<text x="31.3" y="99" fontSize="2.5" fontWeight="600">
					g
				</text>
			)}
			{orientation === 'white' ? (
				<text x="42.4" y="99" fontSize="2.5" fontWeight="600">
					d
				</text>
			) : (
				<text x="42.9" y="99" fontSize="2.5" fontWeight="600">
					f
				</text>
			)}
			{orientation === 'white' ? (
				<text x="53.6" y="99" fontSize="2.5" fontWeight="600">
					e
				</text>
			) : (
				<text x="53.6" y="99" fontSize="2.5" fontWeight="600">
					e
				</text>
			)}
			{orientation === 'white' ? (
				<text x="65" y="99" fontSize="2.5" fontWeight="600">
					f
				</text>
			) : (
				<text x="64.5" y="99" fontSize="2.5" fontWeight="600">
					d
				</text>
			)}
			{orientation === 'white' ? (
				<text x="75.6" y="99" fontSize="2.5" fontWeight="600">
					g
				</text>
			) : (
				<text x="75.6" y="99" fontSize="2.5" fontWeight="600">
					c
				</text>
			)}
			{orientation === 'white' ? (
				<text x="86.7" y="99" fontSize="2.5" fontWeight="600">
					h
				</text>
			) : (
				<text x="86.7" y="99" fontSize="2.5" fontWeight="600">
					b
				</text>
			)}
			{orientation === 'white' ? (
				<text x="98.6" y="99" fontSize="2.5" fontWeight="600">
					i
				</text>
			) : (
				<text x="98" y="99" fontSize="2.5" fontWeight="600">
					a
				</text>
			)}
		</Coords>
	);
};
