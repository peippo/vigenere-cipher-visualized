import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background 0.2s ease-in, color 0.2s ease-in, border 0.2s ease-in;
        border: 20px solid ${({ theme }) => theme.bodyBorder};
        padding: 1rem;
    }
`;

const generalStyles = {
	cellSize: "20px",
	containerWidth: "540px", // Alphabet count * cellSize
	inputCellSize: "36px",
	rangeThumbSize: "18px",
};

export const lightTheme = {
	body: "rgb(238, 232, 239)",
	text: "rgb(68, 34, 62)",
	bodyBorder: "rgb(255, 255, 255)",
	sourceHighlight: "salmon",
	keyHighlight: "palegreen",
	resultHighlight: "lightcyan",
	indicatorBar: "lightcyan",
	...generalStyles,
};

export const darkTheme = {
	body: "rgb(23, 27, 30)",
	text: "rgb(214, 194, 219)",
	bodyBorder: "rgb(33, 37, 40)",
	sourceHighlight: "darkred",
	keyHighlight: "seagreen",
	resultHighlight: "darkcyan",
	indicatorBar: "darkcyan",
	...generalStyles,
};
