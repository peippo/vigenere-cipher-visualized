import { useState, useEffect } from "react";
import styled from "styled-components";
import { tabulaRecta, initializeKeyword, encrypt } from "./utils";
import { GlobalStyles, lightTheme, darkTheme } from "./theme";
import Input from "./components/Input";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
	const [plainText, setPlainText] = useState("SUPERSECRETMESSAGE");
	const [keyword, setKeyword] = useState("PASSCODE");
	const [result, setResult] = useState("");
	const [step, setStep] = useState(0);
	const [theme, setTheme] = useState("light");
	const isDarkTheme = theme === "dark";

	useEffect(() => {
		let initializedKeyword;

		if (keyword.length > 0) {
			initializedKeyword = initializeKeyword(plainText, keyword);
			setResult(encrypt(plainText, initializedKeyword));
		}
	}, [plainText, keyword]);

	const handleChange = (event, setter) => {
		setter(event.target.value.toUpperCase());
		setStep(0);
	};

	const visibleResult = result.split("").slice(0, step);

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<GlobalStyles />
			<ThemeSwitcher isDarkTheme={isDarkTheme} setTheme={setTheme} />

			<Header>
				<h1>Visual Vigenère Cipher</h1>
				<Label>
					Text
					<Input
						value={plainText}
						onChange={(event) => handleChange(event, setPlainText)}
						setStep={setStep}
					/>
				</Label>
				<Label>
					Keyword
					<Input
						value={keyword}
						onChange={(event) => handleChange(event, setKeyword)}
						setStep={setStep}
					/>
				</Label>
				<Label>
					<input
						type="range"
						min="0"
						max={plainText.length}
						value={step}
						onChange={(event) => setStep(event.target.value)}
						step="1"
					/>
				</Label>
			</Header>

			<table>
				<tbody>
					{tabulaRecta.map((rowArr, index) => {
						return (
							<tr key={index}>
								{rowArr.map((letter) => {
									return <td key={letter}>{letter}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			<p>
				Encrypted: <strong>{visibleResult}</strong>
			</p>
		</ThemeProvider>
	);
};

const Header = styled.header`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	font-size: 0.875rem;
	text-transform: uppercase;
`;

export default App;
