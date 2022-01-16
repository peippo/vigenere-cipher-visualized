import styled from "styled-components";

const Input = ({ value, onChange, contentType, step, ...props }) => {
	const handleKeyPress = (event) => {
		// Backspace, Tab, Enter, Shift, Arrow left, Arrow right
		const permittedSpecialKeys = [8, 9, 13, 16, 37, 39];

		if (permittedSpecialKeys.includes(event.keyCode)) return;

		// Only A-Z
		if (event.keyCode < 65 || event.keyCode > 90) {
			event.preventDefault();
		}
	};

	return (
		<StyledInput
			type="text"
			value={value}
			onChange={onChange}
			onKeyDown={handleKeyPress}
			contentType={contentType}
			{...props}
		/>
	);
};

const StyledInput = styled.input`
	color: ${(props) => props.theme.text};
	border: 1px solid #ccc;
	background: linear-gradient(to left, #ccc 1px, transparent 0);
	background-size: ${(props) => props.theme.inputCellSize} 1px;
	font: 18px monospace;
	letter-spacing: ${(props) => `calc(${props.theme.inputCellSize} / 1.43)`};
	text-indent: 11px;
	text-transform: uppercase;
	height: ${(props) => props.theme.inputCellSize};
`;

export default Input;
