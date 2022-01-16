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
	body: "var(--color-body-light)",
	text: "var(--color-text-light)",
	bodyBorder: "var(--color-body-border-light)",
	sourceHighlight: "var(--color-source-highlight-light)",
	keyHighlight: "var(--color-key-highlight-light)",
	resultHighlight: "var(--color-result-highlight-light)",
	indicatorBar: "var(--color-indicator-bar-light)",
	inputBorder: "var(--color-input-border-light)",
	...generalStyles,
};

export const darkTheme = {
	body: "var(--color-body-dark)",
	text: "var(--color-text-dark)",
	bodyBorder: "var(--color-body-border-dark)",
	sourceHighlight: "var(--color-source-highlight-dark)",
	keyHighlight: "var(--color-key-highlight-dark)",
	resultHighlight: "var(--color-result-highlight-dark)",
	indicatorBar: "var(--color-indicator-bar-dark)",
	inputBorder: "var(--color-input-border-dark)",
	...generalStyles,
};
