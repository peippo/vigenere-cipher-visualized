import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background 0.2s ease-in, color 0.2s ease-in;
    }
`;

const generalStyles = {
	cellSize: "20px",
};

export const lightTheme = {
	body: "rgb(238, 232, 239)",
	text: "rgb(68, 34, 62)",
	sourceHighlight: "salmon",
	keyHighlight: "palegreen",
	resultHighlight: "lightcyan",
	indicatorBar: "lightcyan",
	...generalStyles,
};

export const darkTheme = {
	body: "rgb(26, 6, 30)",
	text: "rgb(214, 194, 219)",
	sourceHighlight: "darkred",
	keyHighlight: "seagreen",
	resultHighlight: "darkcyan",
	indicatorBar: "darkcyan",
	...generalStyles,
};
