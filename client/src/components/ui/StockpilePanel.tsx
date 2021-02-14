import React from 'react';
import { Badge, Icon, makeStyles } from '@material-ui/core';
import Panel from './styles/Panel';
import { StockPiece } from 'src/typings/types';
import { Piece } from '../gameboard/Piece';

interface StockpilePanelProps {
	player: string;
	playerName: string;
	playerStockPile: StockPiece[];
}

export const StockpilePanel: React.FC<StockpilePanelProps> = (props) => {
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
		customBadge: {
			backgroundColor: '#9045d6',
			color: 'white',
			fontFamily: 'Montserrat',
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
			<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
				{props.playerName}'s stockpile
			</div>
			<br />
			{props.playerStockPile.map((stock_piece) => (
				<Badge
					key={`${props.player}${stock_piece.piece.type}`}
					badgeContent={stock_piece.amount}
					classes={{ badge: classes.customBadge }}
					className={classes.margin}
				>
					<Icon style={{ fontSize: '48px' }}>
						<Piece
							icon={`${props.player}1${stock_piece.piece.type}.svg`}
							variant="small"
						/>
						<Piece
							icon={`${props.player}1${stock_piece.piece.type}.svg`}
							variant="small"
						/>
					</Icon>
				</Badge>
			))}
		</Panel>
	);
};
