import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./theme";
import Controls from "./components/Controls";
import Tabula from "./components/Tabula";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useTheme from "./hooks/useTheme";

const App = () => {
	const [result, setResult] = useState();
	const [step, setStep] = useState(0);
	const [mode, setMode] = useState("encrypt");
	const [theme, toggleTheme, isLoadingTheme] = useTheme();

	if (isLoadingTheme) return <></>;

	return (
		<ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
			<GlobalStyles />
			<ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />

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
	margin-bottom: 2rem;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
`;

const Heading = styled.h1`
	color: ${(props) => props.theme.text};
	font-weight: var(--heading-font-weight);
	text-align: center;
	margin-top: 3rem;
	margin-bottom: 0;
	position: relative;
	z-index: 5;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (min-width: 600px) {
		flex-direction: row;
	}
`;

const Subtag = styled.span`
	color: ${(props) => props.theme.text};
	font-weight: 300;
	font-style: italic;
	padding: 0.1em 0.25em;
	position: relative;

	@media (min-width: 600px) {
		margin-left: 1rem;
	}

	&:after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: ${(props) => props.theme.logoBackground};
		z-index: -1;
		border-radius: 5px;
		transform: skew(-9deg);
	}
`;

export default App;
