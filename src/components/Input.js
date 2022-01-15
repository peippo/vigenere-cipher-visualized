import styled from "styled-components";

const Input = ({ value, onChange }) => {
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
		/>
	);
};

const StyledInput = styled.input`
	border: 1px solid #ccc;
	background: linear-gradient(to left, #ccc 1px, transparent 0);
	background-size: 18px 1px;
	width: 321px;
	font: 12px monaco, monospace;
	letter-spacing: 10.5px;
	text-indent: 5px;
	text-transform: uppercase;
`;

export default Input;
