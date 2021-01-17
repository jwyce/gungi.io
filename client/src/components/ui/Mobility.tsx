import styled from 'styled-components';

const ContentStyle = styled.section`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 15px 20px 5px 20px;
`;

const TitleStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

function importAll(r) {
	let images = {};
	r.keys().forEach((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const pieces = importAll(require.context('../../assets/pieces', false, /.svg/));

const mobility = importAll(
	require.context('../../assets/mobility', false, /.svg/)
);

interface MobilityProps {
	name: string;
	pieceIcon: string;
	image1: string;
	image2?: string;
	image3?: string;
	note?: string;
}

export const Mobility: React.FC<MobilityProps> = (props) => {
	return (
		<>
			<TitleStyle>
				<div
					style={{
						fontSize: '1rem',
						fontWeight: 'bolder',
					}}
				>
					{props.name}
				</div>
				<img
					src={pieces[props.pieceIcon].default}
					alt={props.name}
					style={{ width: '32px', paddingLeft: '10px' }}
				/>
				{props.note !== undefined && (
					<div
						style={{
							fontSize: '.7rem',
							marginLeft: 'auto',
						}}
					>
						<strong>Note: </strong>
						{props.note}
					</div>
				)}
			</TitleStyle>
			<ContentStyle>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img
						src={mobility[props.image1].default}
						alt={props.name}
						style={{ width: '205px' }}
					/>
					<div
						style={{
							fontSize: '.8rem',
							fontWeight: 'bold',
							paddingTop: '5px',
						}}
					>
						tier 1
					</div>
				</div>

				{props.image2 !== undefined && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img
							src={mobility[props.image2].default}
							alt={props.name}
							style={{ width: '205px' }}
						/>
						<div
							style={{
								fontSize: '.8rem',
								fontWeight: 'bold',
								paddingTop: '5px',
							}}
						>
							tier 2
						</div>
					</div>
				)}

				{props.image3 !== undefined && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img
							src={mobility[props.image3].default}
							alt={props.name}
							style={{ width: '205px' }}
						/>
						<div
							style={{
								fontSize: '.8rem',
								fontWeight: 'bold',
								paddingTop: '5px',
							}}
						>
							tier 3
						</div>
					</div>
				)}
			</ContentStyle>
		</>
	);
};
