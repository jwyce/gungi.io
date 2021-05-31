import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';
import { StockPiece } from 'src/typings/types';

import { Badge, Icon, makeStyles } from '@material-ui/core';

import { Piece } from '../gameboard/Piece';
import Panel from './styles/Panel';
import WrapperSpaceBetween from './styles/WrapperSpaceBetween';

interface StockpilePanelProps {
	player: string;
	playerName: string;
	playerStockPile: StockPiece[];
	armySize: number;
}

export const StockpilePanel: React.FC<StockpilePanelProps> = observer(
	(props) => {
		const gungiStore = useContext(GungiStoreContext);

		const useStyles = makeStyles((theme) => ({
			margin: {
				margin: theme.spacing(1),
			},
			customBadge: {
				backgroundColor: '#9045d6',
				color: 'white',
				fontFamily:
					'Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
				transform: 'scale(1) translate(35%, -35%)',
				zIndex: 5,
			},
		}));

		const classes = useStyles();

		return (
			<Panel
				color="secondary"
				style={{
					padding: '1em',
					width: '75%',
					margin: 'auto',
				}}
			>
				<WrapperSpaceBetween style={{ padding: 0, width: '100%' }}>
					<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
						{props.playerName}'s stockpile
					</div>
					<div
						style={{
							fontSize: '1rem',
							fontWeight: 'bolder',
							color: props.armySize === 26 ? '#fd4d4d' : 'white',
						}}
					>
						army size: {props.armySize}{' '}
						{props.armySize === 26 && <span>MAX</span>}
					</div>
				</WrapperSpaceBetween>
				<br />
				{props.playerStockPile.map((stock_piece) => {
					return (
						stock_piece.amount > 0 && (
							<Badge
								key={`${props.player}${stock_piece.piece.type}`}
								badgeContent={
									gungiStore.isDragging &&
									gungiStore.currentSelected ===
										`${props.player}${stock_piece.piece.type}`
										? stock_piece.amount - 1
										: stock_piece.amount
								}
								classes={{ badge: classes.customBadge }}
								className={classes.margin}
							>
								<Icon style={{ fontSize: '2.5rem' }}>
									<Piece
										stockId={`${props.player}${stock_piece.piece.type}`}
										icon={`${props.player}1${stock_piece.piece.type}.svg`}
										variant="small"
									/>
									<Piece
										icon={`${props.player}1${stock_piece.piece.type}.svg`}
										variant="small"
									/>
								</Icon>
							</Badge>
						)
					);
				})}
			</Panel>
		);
	}
);
