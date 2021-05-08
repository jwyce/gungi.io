import styled from 'styled-components';

export default styled.div<{ color: String }>`
	padding: ${(props) => (props.color === 'primary' ? '2em 5em' : '10px 20px')};
	background: ${(props) => (props.color === 'primary' ? '#120C24' : '#252036')};
	border-radius: 2em;

	@media (max-width: 400px) {
		padding: ${(props) => (props.color === 'primary' ? '1em' : '10px 20px')};
	}
`;
