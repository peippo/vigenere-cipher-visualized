import styled, { css } from "styled-components";

const Input = ({ value, onChange, contentType, step = 0, ...props }) => {
	const maxLength = 14;

	const handleKeyPress = (event) => {
		// Backspace, Tab, Enter, Shift, Arrow left, Arrow right
		const permittedSpecialKeys = [8, 9, 13, 16, 37, 39];

		if (permittedSpecialKeys.includes(event.keyCode)) return;

		// Only A-Z
		if (event.keyCode < 65 || event.keyCode > 90) {
			event.preventDefault();
		}
	};

	// Loop key step indicator
	let indicatorSteps = (step % value.length) - 1;
	if (step && step % value.length === 0) {
		indicatorSteps = value.length - 1;
	}

	return (
		<Wrapper
			contentType={contentType}
			style={{
				"--left": `calc(${indicatorSteps} * var(--input-cell-size))`,
			}}
		>
			<StyledInput
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyPress}
				maxLength={maxLength}
				{...props}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;

	${(props) =>
		props.contentType !== "result" &&
		css`
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
				z-index: 0;
				transition: left 0.15s;
			}
		`}
`;

const StyledInput = styled.input`
	width: 100%;
	max-width: ${(props) => `calc(var(--input-cell-size) * ${props.maxLength})`};
	color: ${(props) => props.theme.text};
	border: 1px solid ${(props) => props.theme.inputBorder};
	background: ${(props) =>
		`linear-gradient(to left, ${props.theme.inputBorder} 1px, transparent 0)`};
	background-size: ${(props) => props.theme.inputCellSize} 1px;
	font-size: var(--input-font-size);
	font-family: var(--heading-font-family);
	letter-spacing: var(--input-letter-spacing);
	text-indent: var(--input-text-indent);
	text-transform: uppercase;
	height: ${(props) => props.theme.inputCellSize};
	position: relative;
	z-index: 1;
	padding: 0;
	mix-blend-mode: ${(props) =>
		props.theme.currentTheme === "dark" ? "exclusion" : "unset"};

	&:hover:not(:disabled):not(:focus) {
		border: 1px solid ${(props) => props.theme.inputBorderHover};
		background: ${(props) =>
			`linear-gradient(to left, ${props.theme.inputBorderHover} 1px, transparent 0)`};
		background-size: ${(props) => props.theme.inputCellSize} 1px;
	}

	&:focus {
		outline: none;
		border: 1px solid ${(props) => props.theme.themeColor};
		background: ${(props) =>
			`linear-gradient(to left, ${props.theme.themeColor} 1px, transparent 0)`};
		background-size: ${(props) => props.theme.inputCellSize} 1px;
	}

	&::selection {
		color: var(--theme-color-primary);
	}

	&:disabled {
		&:hover {
			cursor: not-allowed;
		}
	}
`;

export default Input;
