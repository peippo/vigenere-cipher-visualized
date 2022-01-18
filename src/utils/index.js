export const alphabet = [
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

export const tabulaRecta = createTabulaRecta();

// Initialize keyword to match encrypt/decrypt string length
export const initializeKeyword = (plain, keyword) =>
	keyword.repeat(Math.floor(plain.length / keyword.length)) +
	keyword.substring(0, plain.length % keyword.length);

export const cipher = {
	encrypt: (plain, initializedKeyword) => {
		const plainStringArray = plain.split("");

		const encryptedText = [];
		const indices = [{ column: 0, row: 0 }];

		plainStringArray.forEach((letter, i) => {
			const plainIndex = alphabet.indexOf(letter);
			const keyIndex = alphabet.indexOf(initializedKeyword[i]);
			indices.push({ column: plainIndex, row: keyIndex });
			encryptedText.push(tabulaRecta[plainIndex][keyIndex]);
		});

		return { string: encryptedText.join(""), indices: indices };
	},
	decrypt: (encrypted, initializedKeyword) => {
		const encryptedStringArray = encrypted.split("");

		const decryptedText = [];
		const indices = [{ column: 0, row: 0 }];

		encryptedStringArray.forEach((letter, i) => {
			const keyRowIndex = alphabet.indexOf(initializedKeyword[i]);
			const plainLetterIndex = tabulaRecta[keyRowIndex].indexOf(letter);
			indices.push({ column: keyRowIndex, row: plainLetterIndex });
			decryptedText.push(alphabet[plainLetterIndex]);
		});

		return { string: decryptedText.join(""), indices: indices };
	},
};
