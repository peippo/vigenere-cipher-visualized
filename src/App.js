const App = () => {
	const plain = "SUPERSECRETMESSAGE";
	const keyword = "PASSCODE";

	const alphabet = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const arrayShift = (array) => {
		array.push(array.shift());
		return array;
	};

	// Create Tabula Recta array
	const createTabulaRecta = () => {
		const tabulaRecta = new Array(alphabet.length);
		tabulaRecta[0] = alphabet;

		alphabet.forEach((letter, index) => {
			if (index === 0) return;

			// Get previous row and shift forward by one letter
			const previousRow = [...tabulaRecta[index - 1]];
			const shiftedRow = arrayShift(previousRow);
			tabulaRecta[index] = shiftedRow;
		});

		return tabulaRecta;
	};

	const tabulaRecta = createTabulaRecta();

	// Initialize keyword to match encrypt/decrypt string length
	const initializeKeyword = (plain, keyword) =>
		keyword.repeat(Math.floor(plain.length / keyword.length)) +
		keyword.substring(0, plain.length % keyword.length);

	const initializedKeyword = initializeKeyword(plain, keyword);

	// Encrypt
	const encrypt = (plain, initializedKeyword) => {
		const plainStringArray = plain.split("");

		const encryptedText = plainStringArray.map((letter, i) => {
			const plainIndex = alphabet.indexOf(letter);
			const keyIndex = alphabet.indexOf(initializedKeyword[i]);
			return tabulaRecta[plainIndex][keyIndex];
		});

		return encryptedText.join("");
	};

	const encryptedString = encrypt(plain, initializedKeyword);

	// Decrypt
	const decrypt = (encrypted, initializedKeyword) => {
		const encryptedStringArray = encrypted.split("");

		const decryptedText = encryptedStringArray.map((letter, i) => {
			const keyRowIndex = alphabet.indexOf(initializedKeyword[i]);
			const plainLetterIndex = tabulaRecta[keyRowIndex].indexOf(letter);
			return alphabet[plainLetterIndex];
		});

		return decryptedText.join("");
	};

	const decryptedString = decrypt(encryptedString, initializedKeyword);

	return (
		<>
			<h1>Visual Vigenère Cipher</h1>
			<p>
				Plain text: <strong>{plain}</strong>
			</p>
			<p>
				Keyword: <strong>{keyword}</strong>
			</p>
			<p>
				Initialized keyword: <strong>{initializedKeyword}</strong>
			</p>
			<p>
				Encrypted: <strong>{encryptedString}</strong>
			</p>
			<p>
				Decrypted: <strong>{decryptedString}</strong>
			</p>

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
		</>
	);
};

export default App;
