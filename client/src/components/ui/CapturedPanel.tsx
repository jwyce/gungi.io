import React from 'react';
import { StockPiece } from '../../typings/types';

import { Badge, Icon, makeStyles } from '@material-ui/core';

import { PieceIcon } from '../ui/PieceIcon';
import Panel from './styles/Panel';

interface CapturedPanelProps {
	captured: StockPiece[];
}

export const CapturedPanel: React.FC<CapturedPanelProps> = (props) => {
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
			color="primary"
			style={{
				padding: '1em',
				width: '75%',
				margin: 'auto',
			}}
		>
			<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>Captured</div>
			<br />
			{props.captured.map((stock_piece) => {
				return (
					stock_piece.amount > 0 && (
						<Badge
							key={`${stock_piece.piece.color}${stock_piece.piece.type}`}
							badgeContent={stock_piece.amount}
							classes={{ badge: classes.customBadge }}
							className={classes.margin}
						>
							<Icon style={{ fontSize: '2.5rem' }}>
								<PieceIcon
									icon={`${stock_piece.piece.color}1${stock_piece.piece.type}.svg`}
								/>
							</Icon>
						</Badge>
					)
				);
			})}
		</Panel>
	);
};
