import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./theme";
import Controls from "./components/Controls";
import Tabula from "./components/Tabula";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
	const [result, setResult] = useState();
	const [step, setStep] = useState(0);
	const [theme, setTheme] = useState("light");
	const [mode, setMode] = useState("encrypt");
	const isDarkTheme = theme === "dark";

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<GlobalStyles />
			<ThemeSwitcher isDarkTheme={isDarkTheme} setTheme={setTheme} />

			<Header>
				<Heading>
					Vigenère Cipher <Subtag>visualized</Subtag>
				</Heading>
			</Header>

			<Container>
				<Controls
					result={result}
					setResult={setResult}
					step={step}
					setStep={setStep}
					mode={mode}
					setMode={setMode}
				/>

				{result && (
					<Tabula indices={result.indices} step={step} mode={mode} />
				)}
			</Container>
		</ThemeProvider>
	);
};

const Container = styled.article`
	background-color: ${(props) => props.theme.body};
	border: 1px solid ${(props) => props.theme.bodyStripe};
	padding: 1rem;
	border-radius: 20px;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
`;

const Heading = styled.h1`
	color: var(--theme-color-primary);
	text-align: center;
	margin-top: 3rem;
`;

const Subtag = styled.span`
	color: black;
	font-weight: 200;
	font-style: italic;
	padding: 0.1em 0.25em;
	position: relative;

	&:after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: var(--theme-color-primary);
		z-index: -1;
		border-radius: 5px;
		transform: skew(-9deg);
	}
`;

export default App;
