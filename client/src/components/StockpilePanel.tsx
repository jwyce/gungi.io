import React from 'react';
import { Badge, Icon, makeStyles } from '@material-ui/core';
import Panel from '../components/Panel';

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../assets/pieces', false, /.svg/));

interface Piece {
	type: string;
	color: string;
}

interface StockPiece {
	piece: Piece;
	amount: number;
}

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
		},
	}));

	const classes = useStyles();

	return (
		<Panel
			color="secondary"
			style={{
				padding: '1em',
				width: '95%',
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
						<img
							src={
								pieces[`${props.player}1${stock_piece.piece.type}.svg`].default
							}
							alt={`${props.player}1${stock_piece.piece.type}`}
							style={{ width: '48px' }}
						/>
					</Icon>
				</Badge>
			))}
		</Panel>
	);
};
