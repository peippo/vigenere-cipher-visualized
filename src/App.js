import { useState } from "react";
import { tabulaRecta, initializeKeyword, encrypt, decrypt } from "./utils";

const App = () => {
	const [plainText, setPlainText] = useState("SUPERSECRETMESSAGE");
	const [keyword, setKeyword] = useState("PASSCODE");
	const [result, setResult] = useState("");
	let initializedKeyword;

	const handleKeyPress = (event) => {
		// Backspace, Tab, Enter, Shift, Arrow left, Arrow right
		const permittedSpecialKeys = [8, 9, 13, 16, 37, 39];

		if (permittedSpecialKeys.includes(event.keyCode)) return;

		// Only A-Z
		if (event.keyCode < 65 || event.keyCode > 90) {
			event.preventDefault();
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (keyword.length > 0) {
			initializedKeyword = initializeKeyword(plainText, keyword);
			setResult(encrypt(plainText, initializedKeyword));
		}
	};

	return (
		<>
			<h1>Visual Vigenère Cipher</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Text
					<input
						value={plainText}
						onChange={(event) =>
							setPlainText(event.target.value.toUpperCase())
						}
						onKeyDown={handleKeyPress}
					/>
				</label>
				<label>
					Keyword
					<input
						value={keyword}
						onChange={(event) =>
							setKeyword(event.target.value.toUpperCase())
						}
						onKeyDown={handleKeyPress}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>

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
				Encrypted: <strong>{result}</strong>
			</p>
		</>
	);
};

export default App;
