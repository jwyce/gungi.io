import React from 'react';

import Panel from './styles/Panel';
import { IsPiece, MoveHistory } from 'src/typings/types';
import Paragraph from './styles/Paragraph';
import { fileToLetterMap } from '../../utils/fileToLetterMap';

interface MoveHistoryPanelProps {
	history: MoveHistory[];
}

export const MoveHistoryPanel: React.FC<MoveHistoryPanelProps> = (props) => {
	const movehistory: any[] = [];

	props.history.map((move) => {
		let src = '';
		let dst = '';
		if (!move.src) {
			return movehistory.push(
				<Paragraph style={{ padding: '5px 0' }}>
					{move.turn} turn {move.moveNumber}:&nbsp;&nbsp;&nbsp;{move.type}
				</Paragraph>
			);
		} else if (IsPiece(move.src)) {
			src = `stockpile ${move.src.type}`;
		} else {
			const rank = parseInt(move.src.split('-')[0]);
			const file = parseInt(move.src.split('-')[1]);
			const fileLetter = fileToLetterMap(file);
			src = `${rank}-${fileLetter}-${move.srcTier ? move.srcTier + 1 : 1} ${
				move.srcPiece?.type
			}`;
		}

		if (move.dst) {
			const rank = parseInt(move.dst.split('-')[0]);
			const file = parseInt(move.dst.split('-')[1]);
			const fileLetter = fileToLetterMap(file);
			dst = `${rank}-${fileLetter}-${move.dstTier}
      ${
				move.type === 'attack' || move.type === 'stack'
					? ` (${move.dstPiece?.color}${move.dstPiece?.type})`
					: ''
			}`;
		}

		return movehistory.push(
			<Paragraph style={{ padding: '5px 0' }}>
				{move.turn} turn {move.moveNumber}:&nbsp;&nbsp;&nbsp;{src}
				&nbsp;&nbsp;→&nbsp;&nbsp;{dst}
				&nbsp;&nbsp;({move.type})
			</Paragraph>
		);
	});

	return (
		<Panel
			color="primary"
			style={{
				padding: '1em',
				width: '75%',
				margin: 'auto',
			}}
		>
			<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>History</div>
			<br />
			<Panel
				color="secondary"
				style={{
					padding: '1em',
					width: '95%',
					margin: 'auto',
				}}
			>
				<div
					style={{
						maxHeight: '150px',
						overflowY: 'scroll',
					}}
				>
					{movehistory}
				</div>
			</Panel>
		</Panel>
	);
};
