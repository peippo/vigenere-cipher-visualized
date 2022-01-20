import styled from "styled-components";

const ThemeSwitcher = ({ theme, toggleTheme }) => {
	const label = theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";

	return (
		<Button onClick={toggleTheme}>
			<span className="screen-reader-text">Change theme to</span> {label}
		</Button>
	);
};

const Button = styled.button`
	position: absolute;
	min-width: 160px;
	text-align: center;
	top: var(--body-border-width);
	right: 30px;
	padding: 0.5rem 1rem;
	border-radius: 0 0 5px 5px;
	background-color: ${(props) => props.theme.bodyBorder};
	border: 0;
	font-family: var(--heading-font-family);
	color: ${(props) => props.theme.text};
	font-size: 1rem;
	margin: 0;

	&:hover {
		cursor: pointer;
	}

	&:hover,
	&:focus {
		color: var(--theme-color-primary);
		outline: none;
	}

	&:focus:not(:focus-visible) {
		color: ${(props) => props.theme.text};
	}
`;

export default ThemeSwitcher;
