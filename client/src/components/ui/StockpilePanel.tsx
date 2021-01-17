import React from 'react';
import { Badge, Icon, makeStyles } from '@material-ui/core';
import Panel from './Panel';
import styled from 'styled-components';

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));

const PieceIcon = styled.img`
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
	width: 48px;
`;
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
						<PieceIcon
							src={
								pieces[`${props.player}1${stock_piece.piece.type}.svg`].default
							}
							draggable={false}
							alt={`${props.player}1${stock_piece.piece.type}`}
						/>
					</Icon>
				</Badge>
			))}
		</Panel>
	);
};
