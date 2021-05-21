import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import styled from 'styled-components';

import Panel from './styles/Panel';

function importAll(r: any) {
	let images = {};
	r.keys().forEach((item: string, index: any) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));
const ContentStyle = styled.section`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px 20px 5px 20px;
`;

const PieceInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 50px;
`;

interface TowerDetailsProps {
	orientation: string;
}

export const TowerDetails: React.FC<TowerDetailsProps> = observer(
	({ orientation }) => {
		const gungiStore = useContext(GungiStoreContext);

		let tower: any[] = [];
		autorun(() => {
			if (gungiStore.squareSelected !== undefined) {
				const board =
					gungiStore.gameState === undefined
						? null
						: gungiStore.gameState?.board;
				const square = gungiStore.squareSelected;
				if (board !== null) {
					for (let i = 0; i < 3; i++) {
						let piece = board[square.rank - 1][9 - square.file][i];
						if (orientation === 'white') {
							piece = board[9 - square.rank][square.file - 1][i];
						}
						if (piece) {
							tower.push(
								<PieceInfo key={i}>
									<img
										src={
											pieces[`${piece.color}${i + 1}${piece.type}.svg`].default
										}
										alt={`tier ${i + 1}`}
										draggable={false}
										style={{ width: '52px' }}
									/>
									<div
										style={{
											fontSize: '.8rem',
											fontWeight: 'bold',
											paddingTop: '5px',
										}}
									>
										tier {i + 1}
									</div>
								</PieceInfo>
							);
						}
					}
				}
			}
		});

		return (
			<Panel
				color="secondary"
				style={{
					padding: '1em',
					minHeight: '7em',
					width: '75%',
					margin: 'auto',
				}}
			>
				<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
					Tower details
				</div>
				{gungiStore.squareSelected === undefined ? (
					<></>
				) : (
					<ContentStyle>{tower}</ContentStyle>
				)}
			</Panel>
		);
	}
);
