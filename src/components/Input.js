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

	// TODO: :D
	let indicatorSteps = step - 1;

	if (step > value.length) {
		indicatorSteps = step - value.length - 1;
	}

	if (step > value.length * 2) {
		indicatorSteps = step - value.length * 2 - 1;
	}

	if (step > value.length * 3) {
		indicatorSteps = step - value.length * 3 - 1;
	}

	if (step > value.length * 4) {
		indicatorSteps = step - value.length * 4 - 1;
	}

	if (step > value.length * 5) {
		indicatorSteps = step - value.length * 5 - 1;
	}

	if (step > value.length * 6) {
		indicatorSteps = step - value.length * 6 - 1;
	}

	if (step > value.length * 7) {
		indicatorSteps = step - value.length * 7 - 1;
	}

	if (step > value.length * 8) {
		indicatorSteps = step - value.length * 8 - 1;
	}

	if (step > value.length * 9) {
		indicatorSteps = step - value.length * 9 - 1;
	}

	if (step > value.length * 10) {
		indicatorSteps = step - value.length * 10 - 1;
	}

	if (step > value.length * 11) {
		indicatorSteps = step - value.length * 11 - 1;
	}

	if (step > value.length * 12) {
		indicatorSteps = step - value.length * 12 - 1;
	}

	if (step > value.length * 13) {
		indicatorSteps = step - value.length * 13 - 1;
	}

	return (
		<Wrapper
			contentType={contentType}
			style={{
				"--left": `${indicatorSteps * 36}px`,
			}}
		>
			<StyledInput
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyPress}
				maxLength="14"
				{...props}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;

	&:after {
		content: "";
		width: ${(props) => props.theme.inputCellSize};
		height: ${(props) => props.theme.inputCellSize};
		position: absolute;
		top: 0;
		left: var(--left);
		background-color: ${(props) =>
			props.contentType === "source"
				? props.theme.sourceHighlight
				: props.theme.keyHighlight};
		z-index: -1;
		transition: left 0.15s;
	}
`;

const StyledInput = styled.input`
	width: 100%;
	color: ${(props) => props.theme.text};
	border: 1px solid ${(props) => props.theme.inputBorder};
	background: ${(props) =>
		`linear-gradient(to left, ${props.theme.inputBorder} 1px, transparent 0)`};
	background-size: ${(props) => props.theme.inputCellSize} 1px;
	font-size: 16px;
	font-family: var(--heading-font-family);
	letter-spacing: ${(props) => `calc(${props.theme.inputCellSize} / 1.36)`};
	text-indent: 11px;
	text-transform: uppercase;
	height: ${(props) => props.theme.inputCellSize};
`;

export default Input;
