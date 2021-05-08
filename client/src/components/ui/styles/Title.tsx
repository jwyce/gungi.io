import styled from 'styled-components';

export default styled.span<{ size: 'medium' | 'large' }>`
	font-size: ${(props) => (props.size === 'large' ? '8rem' : '5rem')};
	font-style: italic;
	font-weight: bolder;

	@media (max-width: 700px) {
		font-size: ${(props) => (props.size === 'large' ? '5rem' : '4rem')};
	}

	@media (max-width: 400px) {
		font-size: ${(props) => (props.size === 'large' ? '4rem' : '3rem')};
	}
`;
