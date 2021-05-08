import styled from 'styled-components';

export default styled.h4`
	font-size: 2rem;
	max-width: 38em;
	font-weight: 500;
	padding: 0 15px;
	text-align: center;

	@media (max-width: 700px) {
		font-size: 1rem;
	}

	@media (max-width: 400px) {
		font-size: 0.8rem;
	}
`;
