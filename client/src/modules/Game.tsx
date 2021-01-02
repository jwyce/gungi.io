import React from 'react';
import { Footer } from '../components/Footer';
import GlobalStyle from '../components/GlobalStyle';
import { Header } from '../components/Header';
import GameButton from '../components/GameButton';
import WrapperSpaceBetween from '../components/WrapperSpaceBetween';
import boardIcon from '../images/gungiboard.svg';

// TODO: uninstall and remove dependency, the below is for ui testing purposes only
import * as Gungi from 'gungi.js';
import Panel from '../components/Panel';
import styled from 'styled-components';
import { Badge, Icon, makeStyles } from '@material-ui/core';
const gungi: any = new Gungi();

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../images/pieces', false, /.svg/));

const TitleStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

interface GameProps {}

export const Game: React.FC<GameProps> = () => {
	document.title = 'Game | Gungi.io';
	console.log(gungi.ascii());

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
		<>
			<GlobalStyle />
			<Header home={false} />

			<div style={{ height: '100vh' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: '100%',
						marginLeft: '8em',
					}}
				>
					<div style={{ width: '100%' }}>
						<img src={boardIcon} alt="board" style={{ maxWidth: '100%' }} />
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '0 3em',
							width: '80%',
							flexWrap: 'wrap',
						}}
					>
						<WrapperSpaceBetween>
							<GameButton
								backgroundColor="#29DA37"
								backgroundColorHover="#0CB51A"
							>
								PLACE
							</GameButton>

							<GameButton
								backgroundColor="#3C85F5"
								backgroundColorHover="#2169D8"
							>
								MOVE
							</GameButton>

							<GameButton
								backgroundColor="#F53C5E"
								backgroundColorHover="#E1294A"
							>
								ATTACK
							</GameButton>

							<GameButton
								backgroundColor="#F5AB3C"
								backgroundColorHover="#DF921F"
							>
								STACK
							</GameButton>
						</WrapperSpaceBetween>

						<WrapperSpaceBetween>
							<div
								style={{
									fontSize: '2rem',
									fontWeight: 'bolder',
								}}
							>
								Draft Phase
							</div>

							<div>
								<GameButton
									backgroundColor="#9044D6"
									backgroundColorHover="#7E42DF"
								>
									LOBBY
								</GameButton>

								<GameButton
									backgroundColor="#CD16BB"
									backgroundColorHover="#B0039F"
								>
									FORFEIT
								</GameButton>

								{/* <GameButton
									backgroundColor="#16CD8B"
									backgroundColorHover="#00B172"
								>
									READY
								</GameButton> */}
							</div>
						</WrapperSpaceBetween>

						<WrapperSpaceBetween>
							<TitleStyle>
								<div
									style={{
										fontSize: '1rem',
										fontWeight: 'bolder',
										opacity: '100%',
										color: '#D468FA',
									}}
								>
									player 1
								</div>

								<img
									src={pieces['b1帥.svg'].default}
									alt="piece"
									style={{ width: '32px', paddingLeft: '20px' }}
								/>
							</TitleStyle>

							<TitleStyle>
								<div
									style={{
										fontSize: '1rem',
										fontWeight: 'bolder',
										opacity: '75%',
									}}
								>
									player 2
								</div>
								<img
									src={pieces['w1帥.svg'].default}
									alt="piece"
									style={{ width: '32px', paddingLeft: '20px' }}
								/>
							</TitleStyle>
						</WrapperSpaceBetween>

						<Panel
							color="secondary"
							style={{
								padding: '1em 1em 6em 1em',
								width: '95%',
								margin: 'auto',
							}}
						>
							<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
								Tower Details
							</div>
						</Panel>

						<br />
						<Panel
							color="secondary"
							style={{
								padding: '1em',
								width: '95%',
								margin: 'auto',
							}}
						>
							<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
								player 1's stockpile
							</div>
							<br />
							{gungi.stockpile(gungi.BLACK).map((stock_piece) => (
								<Badge
									key={`b${stock_piece.piece.type}`}
									badgeContent={stock_piece.amount}
									classes={{ badge: classes.customBadge }}
									className={classes.margin}
								>
									<Icon style={{ fontSize: '48px' }}>
										<img
											src={pieces[`b1${stock_piece.piece.type}.svg`].default}
											alt={`b1${stock_piece.piece.type}`}
											style={{ width: '48px' }}
										/>
									</Icon>
								</Badge>
							))}
						</Panel>

						<br />
						<Panel
							color="secondary"
							style={{
								padding: '1em',
								width: '95%',
								margin: 'auto',
							}}
						>
							<div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
								player 2's stockpile
							</div>

							<br />
							{gungi.stockpile(gungi.WHITE).map((stock_piece) => (
								<Badge
									key={`w${stock_piece.piece.type}`}
									badgeContent={stock_piece.amount}
									classes={{ badge: classes.customBadge }}
									className={classes.margin}
								>
									<Icon style={{ fontSize: '48px' }}>
										<img
											src={pieces[`w1${stock_piece.piece.type}.svg`].default}
											alt={`w1${stock_piece.piece.type}`}
											style={{ width: '48px' }}
										/>
									</Icon>
								</Badge>
							))}
						</Panel>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};
