import { observer } from 'mobx-react-lite';
import React, {
	DetailedHTMLProps,
	ImgHTMLAttributes,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { GungiStoreContext } from 'src/stores/GungiStore';

function importAll(r: any) {
	let images = {};
	r.keys().forEach((item: string, index: any) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));
const position = { x: 0, y: 0 };

interface PieceProps {
	icon: string;
	variant?: 'normal' | 'small';
	belowIcon?: string;
}

export const Piece: React.FC<PieceProps> = observer(
	({ icon, variant = 'normal', belowIcon }) => {
		const [state, setState] = useState({
			isDragging: false,
			origin: position,
			translation: position,
		});
		const gungiStore = useContext(GungiStoreContext);

		const pieceEl = useRef<HTMLImageElement>(null);

		const handleMouseDown = useCallback(
			({ button, clientX, clientY }) => {
				if (button === 2) {
					return;
				}

				const rect = pieceEl.current!.getBoundingClientRect();
				const offset = variant === 'normal' ? 10 : 0;
				const translation = {
					x: clientX - rect.x + offset - rect.width / 2,
					y: clientY - rect.y - rect.height / 2,
				};

				setState((state) => ({
					...state,
					isDragging: true,
					origin: {
						x: rect.x - offset + rect.width / 2,
						y: rect.y + rect.height / 2,
					},
					translation,
				}));

				gungiStore.isDragging = true;
			},
			[gungiStore, variant]
		);

		const handleMouseMove = useCallback(
			({ clientX, clientY }) => {
				const translation = {
					x: clientX - state.origin.x,
					y: clientY - state.origin.y,
				};

				setState((state) => ({
					...state,
					translation,
				}));
			},
			[state.origin]
		);

		const handleMouseUp = useCallback(() => {
			setState((state) => ({
				...state,
				isDragging: false,
			}));

			gungiStore.isDragging = false;
		}, [gungiStore]);

		useEffect(() => {
			if (state.isDragging) {
				window.addEventListener('mousemove', handleMouseMove);
				window.addEventListener('mouseup', handleMouseUp);
			} else {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);

				setState((state) => ({ ...state, translation: { x: 0, y: 0 } }));
			}
		}, [state.isDragging, handleMouseMove, handleMouseUp]);

		const styles: DetailedHTMLProps<
			ImgHTMLAttributes<HTMLImageElement>,
			HTMLImageElement
		> = useMemo(
			() => ({
				cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
				transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
				zIndex: state.isDragging ? 900 : 4,
				position: state.isDragging ? 'absolute' : 'relative',
				pointerEvents: state.isDragging ? 'none' : '',
				width: variant === 'normal' ? '80%' : '48px',
				display: 'block',
				margin: variant === 'normal' ? '10.02% auto' : '0',
			}),
			[state.isDragging, state.translation, variant]
		);

		return (
			<>
				<img
					src={pieces[icon].default}
					alt="piece"
					draggable={false}
					ref={pieceEl}
					onMouseDown={handleMouseDown}
					style={styles}
				/>
				{belowIcon && (
					<img
						src={pieces[belowIcon].default}
						alt="piece_below"
						draggable={false}
						style={{
							width: '80%',
							display:
								variant === 'normal' && state.isDragging ? 'block' : 'none',
							margin: variant === 'normal' ? '10.02% auto' : '0',
						}}
					/>
				)}
			</>
		);
	}
);
