// import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import styled from 'styled-components';

import boardIcon from '../../assets/gungiboard.svg';
import watchingIcon from '../../assets/icons/user.svg';
import { GungiStoreContext } from '../../stores/GungiStore';
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
	width: 92.5%;
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

interface GameProps {}

export const GungiGame: React.FC<GameProps> = observer(() => {
	const [moveTypeSelected, setMoveTypeSelected] = useState(() => {
		return 'PLACE';
	});

	const gungiStore = useContext(GungiStoreContext);

	useEffect(() => {
		gungiStore.fetchGame();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // empty array needed here

	// autorun(() => {
	// 	console.log('hi', toJS(gungiStore.gameState));
	// });
	// autorun(() => {
	// 	console.log('finsihed', gungiStore.state);
	// });

	return (
		<>
			<GlobalStyle />
			<Header home={false} />

			{gungiStore.state === 'done' && gungiStore.gameState !== undefined ? (
				<GameWrapper>
					<GameFlex>
						<BoardWrapper onContextMenu={(e) => e.preventDefault()}>
							<Board board={gungiStore.gameState.board} />
						</BoardWrapper>

						<ActionPanelWrapper>
							<WrapperSpaceBetween>
								<GameButton
									backgroundColor="#29DA37"
									backgroundColorHover="#0CB51A"
									selected={moveTypeSelected === 'PLACE'}
									onClick={() => {
										setMoveTypeSelected('PLACE');
									}}
								>
									PLACE
								</GameButton>

								{gungiStore.gameState?.phase === 'game' ? (
									<>
										<GameButton
											backgroundColor="#3C85F5"
											backgroundColorHover="#2169D8"
											selected={moveTypeSelected === 'MOVE'}
											onClick={() => {
												setMoveTypeSelected('MOVE');
											}}
										>
											MOVE
										</GameButton>

										<GameButton
											backgroundColor="#F53C5E"
											backgroundColorHover="#E1294A"
											selected={moveTypeSelected === 'ATTACK'}
											onClick={() => {
												setMoveTypeSelected('ATTACK');
											}}
										>
											ATTACK
										</GameButton>

										<GameButton
											backgroundColor="#F5AB3C"
											backgroundColorHover="#DF921F"
											selected={moveTypeSelected === 'STACK'}
											onClick={() => {
												setMoveTypeSelected('STACK');
											}}
										>
											STACK
										</GameButton>
									</>
								) : (
									<GameButton
										backgroundColor="#16CD8B"
										backgroundColorHover="#00B172"
									>
										READY
									</GameButton>
								)}
							</WrapperSpaceBetween>

							<WrapperSpaceBetween>
								<div
									style={{
										fontSize: '2rem',
										fontWeight: 'bolder',
									}}
								>
									{gungiStore.gameState?.phase === 'game'
										? 'Game Phase'
										: 'Draft Phase'}
								</div>

								<div>
									<LobbyButton
										onClick={() => {
											window.confirm('test?');
										}}
									>
										FORFEIT
									</LobbyButton>
								</div>
							</WrapperSpaceBetween>

							<WrapperSpaceBetween>
								<TurnIndictor
									player="b"
									isTurn={'b' === gungiStore.gameState?.turn}
									playerName="player 1"
								/>
								<TurnIndictor
									player="w"
									isTurn={'w' === gungiStore.gameState?.turn}
									playerName="player 2"
								/>
							</WrapperSpaceBetween>

							<TowerDetails />
							<br />
							<StockpilePanel
								player="b"
								playerName="player 1"
								playerStockPile={gungiStore.gameState?.stockpile_black}
							/>

							<br />
							<StockpilePanel
								player="w"
								playerName="player 2"
								playerStockPile={gungiStore.gameState?.stockpile_white}
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
									5 spectating
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
});
