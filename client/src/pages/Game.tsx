// import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { RouteComponentProps } from 'react-router-dom';
import { GungiStoreContext } from 'src/stores/GungiStore';

import boardIcon from '../assets/gungiboard.svg';
import { Board } from '../components/gameboard/Board';
import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import { StockpilePanel } from '../components/ui/StockpilePanel';
import GameButton from '../components/ui/styles/GameButton';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import { LoadingContainer } from '../components/ui/styles/LoadingContainer';
import LobbyButton from '../components/ui/styles/LobbyButton';
import WrapperSpaceBetween from '../components/ui/styles/WrapperSpaceBetween';
import { TowerDetails } from '../components/ui/TowerDetails';
import { TurnIndictor } from '../components/ui/TurnIndictor';

interface GameProps extends RouteComponentProps {}

export const Game: React.FC<GameProps> = observer(({ history }) => {
	document.title = 'Game | Gungi.io';

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
				<div style={{ minHeight: '100%', margin: '1.1rem 0' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							height: '100%',
							marginLeft: '8em',
							userSelect: 'none',
						}}
					>
						<div
							onContextMenu={(e) => e.preventDefault()}
							style={{
								width: '92.5%',
								height: '0',
								backgroundImage: `url(${boardIcon})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: '100%',
								display: 'block',
								paddingBottom: '96.2vh',
								userSelect: 'none',
								position: 'relative',
							}}
						>
							<Board board={gungiStore.gameState.board} />
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: '',
								margin: '0 3em',
								width: '80%',
								flexWrap: 'wrap',
							}}
						>
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
											history.push('/lobby');
										}}
									>
										LOBBY
									</LobbyButton>

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
						</div>
					</div>
				</div>
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
