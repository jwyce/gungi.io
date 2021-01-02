import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import { Icon, makeStyles } from '@material-ui/core';

export const Flower: React.FC = () => {
	interface Flower {
		name: string;
		color: string;
	}

	const [value, setValue] = useState<Flower | null>(null);

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

	useEffect(() => {
		fetch('/flower')
			.then((response) => response.json())
			.then((data) => {
				setValue(data);
			});
		document.title = 'Gungi.io | Flower';
	}, []);

	const classes = useStyles();

	return (
		<div>
			{value !== null ? (
				<>
					<h1>{value.name}</h1>
					<p>{value.color}</p>
				</>
			) : (
				<p>loading...</p>
			)}

			<div>
				<Badge
					badgeContent={5}
					classes={{ badge: classes.customBadge }}
					className={classes.margin}
				>
					<Icon style={{ fontSize: '48px' }}>
						<img
							src="/images/pieces/w1忍.svg"
							alt="spy"
							style={{ width: '48px' }}
						/>
					</Icon>
				</Badge>
				<Badge
					badgeContent={5}
					classes={{ badge: classes.customBadge }}
					className={classes.margin}
				>
					<Icon style={{ fontSize: '48px' }}>
						<img
							src="/images/pieces/w2忍.svg"
							alt="spy"
							style={{ width: '48px' }}
						/>
					</Icon>
				</Badge>
			</div>
			<div>
				<img
					src="/images/mobility/spy3.svg"
					alt="spy"
					style={{ width: '205px' }}
				/>
			</div>
		</div>
	);
};
