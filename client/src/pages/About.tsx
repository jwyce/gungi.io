import React from 'react';
import styled from 'styled-components';

import { Footer } from '../components/ui/Footer';
import { Header } from '../components/ui/Header';
import { Mobility } from '../components/ui/Mobility';
import GlobalStyle from '../components/ui/styles/GlobalStyle';
import Panel from '../components/ui/styles/Panel';
import Paragraph from '../components/ui/styles/Paragraph';
const LinkStyle = styled.a`
	color: #9d84ff;
	&:active {
		color: #8262ff;
	}
`;

const Heading = styled.div`
	font-size: 3rem;
	font-weight: bolder;

	@media (max-width: 450px) {
		font-size: 2rem;
	}
`;

interface AboutProps {}

export const About: React.FC<AboutProps> = () => {
	document.title = 'What is Gungi? | Gungi.io';
	return (
		<>
			<GlobalStyle />
			<Header home={false} />
			<Panel
				color="primary"
				style={{
					width: '70%',
					margin: '5rem auto',
				}}
			>
				<Heading>What is Gungi?</Heading>

				<Paragraph>
					Gungi is a two-player strategy board game created by Yoshihiro Togashi
					and is featured in the in the popular manga{' '}
					<LinkStyle href="https://hunterxhunter.fandom.com/wiki/Hunter_%C3%97_Hunter">
						Hunter × Hunter
					</LinkStyle>
					.
					<br />
					<br />
					It is played on a non-checkered gameboard with 81 squares arranged in
					a 9x9 grid. At the beginning of the game, players can choose how their
					pieces will be arranged on their side of the board. <br />
					<br />
					Additionally, unlike its spiritual brethren, chess, shogi, and go, in
					Gungi pieces can be stacked on top of each other, adding a third
					dimension to the game leading to billions and billions of
					possibilities. As in chess and shogi, the goal is to trap the king.
				</Paragraph>

				<Heading>Pieces and Mobility</Heading>

				<Paragraph>
					There are 13 unique pieces with different ranges of mobility at
					different tiers. <br />
					<span style={{ fontSize: 'small' }}>
						<strong>Note:</strong> Blue means the piece can move into that
						square. Green symbolizes the ability of that piece to move in a
						continuous line along the path of that square.
					</span>
				</Paragraph>

				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Major General x4"
						pieceIcon="b1小.svg"
						image1="majorgeneral1.svg"
						image2="majorgeneral2.svg"
						image3="majorgeneral3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Lieutenant General x4"
						pieceIcon="w1中.svg"
						image1="lieutenantgeneral1.svg"
						image2="lieutenantgeneral2.svg"
						image3="lieutenantgeneral3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="General x6"
						pieceIcon="b1大.svg"
						image1="general1.svg"
						image2="general2.svg"
						image3="general3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Archer x2"
						pieceIcon="w1弓.svg"
						image1="archer1.svg"
						image2="archer2.svg"
						image3="archer3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Knight x2"
						pieceIcon="b1馬.svg"
						image1="knight1.svg"
						image2="knight2.svg"
						image3="knight3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Musketeer x1"
						pieceIcon="w1筒.svg"
						image1="musketeer1.svg"
						image2="musketeer2.svg"
						image3="musketeer3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Captain x1"
						pieceIcon="b1謀.svg"
						image1="captain1.svg"
						note="The captain takes on the movement ability of the piece (friendly or opponent) that is directly below it."
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Samurai x2"
						pieceIcon="w1侍.svg"
						image1="samurai1.svg"
						image2="samurai2.svg"
						image3="samurai3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Fortress x2"
						pieceIcon="b1砦.svg"
						image1="fortress.svg"
						note="Fortresses can't stack on other pieces; they can only be stacked upon."
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Cannon x2"
						pieceIcon="b1砲.svg"
						image1="cannon1.svg"
						image2="cannon2.svg"
						image3="cannon3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Spy x2"
						pieceIcon="w1忍.svg"
						image1="spy1.svg"
						image2="spy2.svg"
						image3="spy3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Pawn x9"
						pieceIcon="w1兵.svg"
						image1="pawn1.svg"
						image2="pawn2.svg"
						image3="pawn3.svg"
					/>
				</Panel>

				<br />
				<Panel color="secondary" style={{ width: '90%', margin: 'auto' }}>
					<Mobility
						name="Marshal (King) x1"
						pieceIcon="b1帥.svg"
						image1="marshall.svg"
						note="The Marshal moves the same for all tiers. Pieces cannot be stacked on the Marshal."
					/>
				</Panel>

				<Heading>Rules of Gameplay</Heading>

				<Paragraph>
					Visit the link to the{' '}
					<LinkStyle href="https://www.reddit.com/r/HunterXHunter/comments/6803yz/revised_rules_of_gungi_in_hunterxhunter_pdf/">
						original reddit post
					</LinkStyle>{' '}
					which details the ruleset for Gungi and was the main inspiration for
					this website.
					<ol>
						<li style={{ margin: '0 0 10px 0' }}>
							Each player is provided a total of 38 pieces as enumerated above.
						</li>
						<li style={{ margin: '0 0 10px 0' }}>
							In the draft phase, pieces are put on the board in the first three
							rows, trading off one-by-one. Black places first. The Marshal must
							always be put first.
						</li>
						<li style={{ margin: '0 0 10px 0' }}>
							The minimum pieces that must be placed in the beginning is one.
							This piece must be the Marshal. The maximum number of pieces you
							can have on the board at any time is 26.
						</li>
						<li style={{ margin: '0 0 10px 0' }}>
							White takes the first turn after all pieces have been set up and
							the game phase begins.
						</li>
						<li style={{ margin: '0 0 10px 0' }}>
							A turn can be used for one of four things:
							<ol style={{ listStyleType: 'lower-alpha' }}>
								<li style={{ margin: '0 0 10px 0' }}>
									Move – choose one piece to move (see section above on how
									pieces move); remember that towers themselves do not move,
									they only increase range of mobility of the top piece
								</li>
								<li style={{ margin: '0 0 10px 0' }}>
									Attack – if an enemy piece occupies a square within your range
									of movement, you can attack; if there is only one piece, your
									piece must then move into and occupy that square but if you’re
									attacking a tower, the result is that the tower loses the top
									and your piece now controls it
								</li>
								<li style={{ margin: '0 0 10px 0' }}>
									Stack – if either a friendly piece or an enemy piece is within
									your range of movement, you can stack on top of that piece to
									form a tower (the top piece of the tower controls the tower
									regardless of pieces of a different team below it)
								</li>
								<li style={{ margin: '0 0 10px 0' }}>
									Place – if you have less than the maximum pieces on the board,
									you may take a piece from your remaining pieces (captured
									pieces cannot be used) and place it anywhere on the board with
									following exceptions:
									<ol>
										<li style={{ margin: '0 0 10px 0' }}>
											Multiple pawns cannot be placed in the same file
										</li>
										<li style={{ margin: '0 0 10px 0' }}>
											Pawns cannot place the opposing Marshal into check mate
											(although check is allowed)
										</li>
										<li style={{ margin: '0 0 10px 0' }}>
											Pieces cannot be placed within the first three ranks of
											the opposing team’s side of the board
										</li>
									</ol>
								</li>
							</ol>
						</li>
						<li style={{ margin: '0 0 10px 0' }}>
							The game concludes when the Marshal is mated. The player who
							checkmates their opponent wins. If a player at any given point has
							no legal moves to make and is not currently in check then a
							stalemate occurs and the game is a tie. Alternatively, the game
							may end if one side forfeits during the game.
						</li>
					</ol>
				</Paragraph>
			</Panel>
			<Footer />
		</>
	);
};
