import styled from 'styled-components';

export const Container = styled.div`
	margin: 2rem auto;
	width: 30%;
	background: #dee2e5;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	@media only screen and (max-width: 1080px) {
		width: 50%;
	}
	@media only screen and (max-width: 768px) {
		width: 65%;
	}
	@media only screen and (max-width: 600px) {
		width: 95%;
	}
`;

export const Form = styled.form`
	padding: 2rem 2rem;
	input {
		width: 100%;
		margin-bottom: 1rem;
		height: 1.5rem;
		border: none;
		background: none;
		border-bottom: 2px solid #3c4046;
		transition: all ease 0.4s
		&:focus {
			outline: none;
			border-bottom: 2px solid #058cec;
			transition: all ease 0.4s;
	}
`;

export const Button = styled.button`
	margin-top: 1.5rem;
	border: none;
	background: #195d8e;
	border-radius: 5px;
	padding: 0.5rem;
	color: #fff;
	cursor: pointer;
	font-weight: 700;
	width: 100%;
	box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
	transition: all ease 0.4s
	&:hover {
		transform: translateY(-2px);
		transition: all ease 0.4s;
	}
`;
