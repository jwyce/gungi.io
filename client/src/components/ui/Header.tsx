import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import spy from '../../assets/pieces/w1忍.svg';

interface HeaderProps {
	home: boolean;
}

const HeaderWrapper = styled.header`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-start;
	background-color: transparent;
	height: 3.5rem;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
`;

const NavigationWrapper = styled.nav<{ home: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-left: auto;
	height: 100%;
	padding: 0 2.2rem;
	width: 14rem;

	border-bottom-left-radius: ${(props) => (props.home ? '0' : '1.4rem')};
	background-color: ${(props) => (props.home ? 'transparent' : '#9045d6')};
	box-shadow: ${(props) =>
		props.home ? 'none' : '0 0 3rem rgba(10, 7, 19, 0.1)'};
`;

const NavItem = styled(Link)`
	opacity: 0.75;
	color: #fff;
	transition: opacity 0.2s;
	text-decoration: none;
	font-weight: 700;
	&:hover {
		opacity: 1;
	}
`;

export const Header: React.FC<HeaderProps> = (props) => {
	return (
		<HeaderWrapper>
			<Link to="/">
				<img
					src={spy}
					draggable={false}
					alt="spy"
					style={{ width: '36px', marginLeft: '3em' }}
				/>
			</Link>
			<NavigationWrapper home={props.home}>
				<NavItem to="/login">Play</NavItem>
				<NavItem to="/about">About</NavItem>
				<NavItem to="/contact">Contact</NavItem>
			</NavigationWrapper>
		</HeaderWrapper>
	);
};
