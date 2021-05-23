// import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { GungiStoreContext } from 'src/stores/GungiStore';
import { GameState, Move, User } from 'src/typings/types';
import styled from 'styled-components';

import boardIcon from '../../assets/gungiboard.svg';
import watchingIcon from '../../assets/icons/user.svg';
import { Board } from '../gameboard/Board';
import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';
import { StockpilePanel } from '../ui/StockpilePanel';
import GameButton from '../ui/styles/GameButton';
import GlobalStyle from '../ui/styles/GlobalStyle';
import { LoadingContainer } from '../ui/styles/LoadingContainer';
import LobbyButton from '../ui/styles/LobbyButton';
import WrapperSpaceBetween from '../ui/styles/WrapperSpaceBetween';
import { TowerDetails } from '../ui/TowerDetails';
import { TurnIndictor } from '../ui/TurnIndictor';

const GameWrapper = styled.div`
	min-height: 100%;
	margin: 1.1rem 0;
`;

const GameFlex = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	margin-left: 8em;
	user-select: none;

	@media (max-width: 1400px) {
		flex-direction: column;
		margin: 5em 0 0 0;
	}
`;

const BoardWrapper = styled.div`
	display: block;
	width: 91%;
	height: 0;
	background-image: url(${boardIcon});
	background-repeat: no-repeat;
	background-size: 100%;
	padding-bottom: 96.2vh;
	user-select: none;
	position: relative;

	@media (max-width: 1400px) {
		width: 60%;
	}
	@media (max-width: 750px) {
		width: 95%;
	}
`;

const ActionPanelWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	margin: 0 3em;
	width: 80%;
	flex-wrap: wrap;

	@media (max-width: 1200px) {
		margin: -15% 0 0 0;
	}

	@media (max-width: 1000px) {
		margin: -25% 0 0 0;
	}

	@media (max-width: 600px) {
		margin: -55% 0 0 0;
	}

	@media (max-width: 400px) {
		margin: -110% 0 0 0;
		width: 100%;
	}
`;

const SpectatorsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding-top: 15px;
`;

interface GameProps {
	gameState: GameState | undefined;
	players: User[] | undefined;
	socketId: string;
	playersReadied: string[];
	makeMoveCallback: (move: Move) => void;
}

export const GungiGame: React.FC<GameProps> = observer(
	({ gameState, players, socketId, playersReadied, makeMoveCallback }) => {
		const [buttonState, setButtonState] =
			useState<'place' | 'attack' | 'move' | 'stack'>('place');
		const [readied, setReadied] = useState(false);
		const [marshallPlaced, setMarshallPlaced] = useState(false);

		const whitePlayer = players?.find((x) => x.userType === 'creator');
		const blackPlayer = players?.find((x) => x.userType === 'opponent');
		const spectatorCount = players?.filter(
			(x) => x.userType === 'spectator'
		).length;
		const socketPlayer = players?.find((x) => x.userId === socketId);
		const orientation = blackPlayer?.self ? 'black' : 'white';
		const whiteReady = playersReadied.find((x) => x === whitePlayer?.userId)
			? true
			: false;
		const blackReady = playersReadied.find((x) => x === blackPlayer?.userId)
			? true
			: false;

		const gungiStore = useContext(GungiStoreContext);
		useEffect(() => {
			gungiStore.gameState = gameState;
			setMarshallPlaced(
				orientation === 'black'
					? gameState?.stockpile_black.find((x) => x.piece.type === '帥')
							?.amount === 0
					: gameState?.stockpile_white.find((x) => x.piece.type === '帥')
							?.amount === 0
			);
			console.log('stuff', gameState?.stockpile_black);
			console.log(
				'stuff2',
				gameState?.stockpile_black.some((x) => x.piece.type === '帥')
			);
			console.log('marshall', marshallPlaced);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [gameState]);

		return (
			<>
				<GlobalStyle />
				<Header home={false} />

				{gameState !== undefined ? (
					<GameWrapper>
						<GameFlex>
							<BoardWrapper onContextMenu={(e) => e.preventDefault()}>
								<Board
									board={gameState.board}
									orientation={orientation}
									socketPlayer={socketPlayer}
									makeMoveCallback={makeMoveCallback}
								/>
							</BoardWrapper>

							<ActionPanelWrapper>
								<WrapperSpaceBetween style={{ margin: '0' }}>
									<div
										style={{
											fontSize: '2rem',
											fontWeight: 'bolder',
										}}
									>
										{gameState?.phase === 'game' ? 'Game Phase' : 'Draft Phase'}
									</div>
								</WrapperSpaceBetween>

								{socketPlayer?.userType !== 'spectator' && (
									<WrapperSpaceBetween style={{ margin: '5px 0' }}>
										<GameButton
											size="small"
											backgroundColor="#29DA37"
											backgroundColorHover="#0CB51A"
											selected={buttonState === 'place'}
											onClick={() => {
												gungiStore.moveTypeSelected = 'place';
												setButtonState('place');
											}}
										>
											PLACE
										</GameButton>

										{gameState?.phase === 'game' && (
											<>
												<GameButton
													size="small"
													backgroundColor="#3C85F5"
													backgroundColorHover="#2169D8"
													selected={buttonState === 'move'}
													onClick={() => {
														gungiStore.moveTypeSelected = 'move';
														setButtonState('move');
													}}
												>
													MOVE
												</GameButton>

												<GameButton
													size="small"
													backgroundColor="#F53C5E"
													backgroundColorHover="#E1294A"
													selected={buttonState === 'attack'}
													onClick={() => {
														gungiStore.moveTypeSelected = 'attack';
														setButtonState('attack');
													}}
												>
													ATTACK
												</GameButton>

												<GameButton
													size="small"
													backgroundColor="#F5AB3C"
													backgroundColorHover="#DF921F"
													selected={buttonState === 'stack'}
													onClick={() => {
														gungiStore.moveTypeSelected = 'stack';
														setButtonState('stack');
													}}
												>
													STACK
												</GameButton>
											</>
										)}
									</WrapperSpaceBetween>
								)}

								<WrapperSpaceBetween>
									<TurnIndictor
										player="b"
										isTurn={'b' === gameState?.turn}
										playerName={`${blackPlayer?.username}`}
										ready={blackReady && gungiStore.gameState?.phase !== 'game'}
									/>
									{!readied && marshallPlaced ? (
										<GameButton
											size="small"
											backgroundColor="#16CD8B"
											backgroundColorHover="#00B172"
											onClick={() => {
												// if it's your turn
												let socketPlayerColor: string = '';
												if (socketPlayer?.userType === 'creator') {
													socketPlayerColor = 'w';
												} else if (socketPlayer?.userType === 'opponent') {
													socketPlayerColor = 'b';
												}

												if (gungiStore.gameState?.turn === socketPlayerColor) {
													const answer = window.confirm(
														'are you satisfied with the current draft configuration?'
													);
													if (answer) {
														setReadied(true);
														makeMoveCallback({
															src: null,
															dst: null,
															type: 'ready',
														});
													}
												}
											}}
										>
											READY
										</GameButton>
									) : (
										<>
											{socketPlayer?.userType !== 'spectator' && (
												<div>
													<LobbyButton
														size="small"
														onClick={() => {
															const answer = window.confirm(
																'are you sure you want to forfeit?'
															);
															if (answer) {
																// callback to close socket, destroy game from server, then after respose from server kick everyone to home page
															}
														}}
													>
														FORFEIT
													</LobbyButton>
												</div>
											)}
										</>
									)}
									<TurnIndictor
										player="w"
										isTurn={'w' === gameState?.turn}
										playerName={`${whitePlayer?.username}`}
										ready={whiteReady && gungiStore.gameState?.phase !== 'game'}
									/>
								</WrapperSpaceBetween>

								<TowerDetails orientation={orientation} />
								<br />
								<StockpilePanel
									player="b"
									playerName={`${blackPlayer?.username}`}
									playerStockPile={gameState?.stockpile_black}
								/>

								<br />
								<StockpilePanel
									player="w"
									playerName={`${whitePlayer?.username}`}
									playerStockPile={gameState?.stockpile_white}
								/>

								<SpectatorsWrapper>
									<img
										src={watchingIcon}
										alt="icon"
										style={{ height: '1em', paddingRight: '5px' }}
									/>
									<span
										style={{
											textAlign: 'center',
											color: '#ff8280',
											fontWeight: 400,
										}}
									>
										{spectatorCount} spectating
									</span>
								</SpectatorsWrapper>
							</ActionPanelWrapper>
						</GameFlex>
					</GameWrapper>
				) : (
					<div style={{ height: 'calc(100vh - 6rem)' }}>
						<LoadingContainer>
							<OrbitSpinner color="#D468FA" />
						</LoadingContainer>
					</div>
				)}

				<Footer />
			</>
		);
	}
);
