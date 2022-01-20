import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
		background: ${({ theme }) =>
			`repeating-linear-gradient( -45deg, ${theme.bodyStripe}, ${theme.bodyStripe} 5px, ${theme.body} 5px, ${theme.body} 25px )`};
        color: ${({ theme }) => theme.text};
        border: var(--body-border-width) solid ${({ theme }) =>
				theme.bodyBorder};
        padding: 1rem;
    }
`;

const generalStyles = {
	cellSize: "var(--cell-size)",
	inputCellSize: "var(--input-cell-size)",
	rangeThumbSize: "var(--range-thumb-size)",
	themeColor: "var(--theme-color-primary)",
};

export const lightTheme = {
	currentTheme: "light",
	body: "var(--color-body-light)",
	bodyStripe: "var(--color-body-stripe-light)",
	text: "var(--color-text-light)",
	bodyBorder: "var(--color-body-border-light)",
	sourceHighlight: "var(--color-source-highlight-light)",
	keyHighlight: "var(--color-key-highlight-light)",
	resultHighlight: "var(--color-result-highlight-light)",
	indicatorBar: "var(--color-indicator-bar-light)",
	inputBorder: "var(--color-input-border-light)",
	inputBorderHover: "var(--color-input-border-hover-light)",
	inputBackground: "var(--color-input-background-light)",
	sliderTrack: "var(--color-slider-track-light)",
	logoBackground: "var(--color-logo-background-light)",
	modeSwitchBackground: "var(--color-mode-switch-background-light)",
	...generalStyles,
};

export const darkTheme = {
	currentTheme: "dark",
	body: "var(--color-body-dark)",
	bodyStripe: "var(--color-body-stripe-dark)",
	text: "var(--color-text-dark)",
	bodyBorder: "var(--color-body-border-dark)",
	sourceHighlight: "var(--color-source-highlight-dark)",
	keyHighlight: "var(--color-key-highlight-dark)",
	resultHighlight: "var(--color-result-highlight-dark)",
	indicatorBar: "var(--color-indicator-bar-dark)",
	inputBorder: "var(--color-input-border-dark)",
	inputBorderHover: "var(--color-input-border-hover-dark)",
	inputBackground: "var(--color-input-background-dark)",
	sliderTrack: "var(--color-slider-track-dark)",
	logoBackground: "var(--color-logo-background-dark)",
	modeSwitchBackground: "var(--color-mode-switch-background-dark)",
	...generalStyles,
};
