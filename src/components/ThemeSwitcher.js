import styled from "styled-components";

const ThemeSwitcher = ({ isDarkTheme, setTheme }) => {
	const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

	const label = isDarkTheme ? "☀️ Light mode" : "🌙 Dark mode";

	return (
		<Switch>
			<Input
				id="theme-switch"
				type="checkbox"
				checked={isDarkTheme}
				onChange={toggleTheme}
			/>
			<Label htmlFor="theme-switch">
				<span className="screen-reader-text">Change theme to</span> {label}
			</Label>
		</Switch>
	);
};

const Label = styled.label`
	&:hover {
		cursor: pointer;
	}
`;

const Switch = styled.div`
	position: absolute;
	min-width: 150px;
	text-align: center;
	top: 20px;
	right: 30px;
	padding: 5px 10px;
	border-radius: 0 0 5px 5px;
	background-color: ${(props) => props.theme.bodyBorder};
	transition: background 0.2s ease-in;

	&:hover,
	&:focus {
		${Label} {
			color: var(--theme-color-primary);
		}
	}
`;

const Input = styled.input`
	clip: rect(0 0 0 0);
	clip-path: inset(100%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;

	&:focus {
		& ~ ${Label} {
			color: var(--theme-color-primary);
		}
	}

	&:focus:not(:focus-visible) {
		& ~ ${Label} {
			color: ${(props) => props.theme.text};
		}
	}
`;

export default ThemeSwitcher;
