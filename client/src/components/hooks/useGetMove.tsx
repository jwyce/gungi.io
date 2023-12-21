import { useContext } from "react";
import { GungiStoreContext } from 'src/stores/GungiStore';
import { Piece } from "src/typings/types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useGetMove = () => {
    const swal = withReactContent(Swal);
    const gungiStore = useContext(GungiStoreContext);
    return {
        getMove: (socketPlayerColor: string, gameSquare: string, id: string, isDragging: boolean) => {
            let src: string | Piece | null = gungiStore.currentSelected ?? null;
            let selectedPieceColor = '';
            if (src?.split('-').length !== 2) {
                src = {
                    type: src ? src.substr(1) : '',
                    color: src ? src.substr(0, 1) : '',
                };
            } else if (src.split('-').length === 2) {
                const currCords = gungiStore.currentSelected?.split('-');
                const srcRank = parseInt(currCords ? currCords[0] : '-1');
                const srcFile = parseInt(currCords ? currCords[1] : '-1');
                for (let i = 0; i < 3; i++) {
                    let piece =
                        socketPlayerColor === 'w'
                            ? gungiStore.gameState?.board[9 - srcRank][srcFile - 1][i]
                            : gungiStore.gameState?.board[srcRank - 1][9 - srcFile][i];
                    if (piece) {
                        selectedPieceColor = piece.color;
                    }
                }

                if (socketPlayerColor === 'b') {
                    src = `${10 - srcRank}-${10 - srcFile}`;
                }
            }

            if (
                (gungiStore.currentSelected?.substr(0, 1) ===
                    gungiStore.gameState?.turn ||
                    selectedPieceColor === gungiStore.gameState?.turn) &&
                socketPlayerColor === gungiStore.gameState?.turn
            ) {
                // check if in legal moves
                const rank = parseInt(id.split('-')[0]);
                const file = parseInt(id.split('-')[1]);
                const dst =
                    socketPlayerColor === 'b' ? `${10 - rank}-${10 - file}` : id;

                let moveType = '';
                if (!gungiStore.squareSelected) {
                    moveType = 'place';
                } else if (gungiStore.squareSelected) {
                    // if mouse up on empty square => movement
                    let boardCoords = gameSquare;
                    const realRank = parseInt(boardCoords.split('-')[0]);
                    const realFile = parseInt(boardCoords.split('-')[1]);

                    const tower =
                        gungiStore.gameState.board[9 - realRank][realFile - 1];
                    if (tower) {
                        let top: Piece | null = null;
                        for (let i = 2; i >= 0; i--) {
                            if (tower[i] !== null) {
                                top = tower[i];
                                break;
                            }
                        }

                        if (top === null) {
                            moveType = 'move';
                        } else if (gungiStore.currentSelected !== id) {
                            if (top.color === socketPlayerColor) {
                                moveType = 'stack';
                            } else if (!isDragging) {
                                swal
                                    .fire({
                                        title: <span>Attack or Stack?</ span >,
                                        showConfirmButton: true,
                                        showDenyButton: true,
                                        confirmButtonText: 'Attack',
                                        confirmButtonColor: '#F53C5E',
                                        denyButtonText: 'Stack',
                                        denyButtonColor: '#F5AB3C',
                                    })
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            moveType = 'attack';
                                        } else if (response.isDenied) {
                                            moveType = 'stack';
                                        }
                                    });
                            }
                        }
                    }
                }

                const move = {
                    src,
                    dst,
                    type: moveType,
                };
                return move
            }

            return undefined
        }
    }
}
