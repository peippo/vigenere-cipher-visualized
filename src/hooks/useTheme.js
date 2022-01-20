import { useEffect, useState } from "react";

const useTheme = () => {
	const [theme, setTheme] = useState("light");
	const [isLoadingTheme, setIsLoadingTheme] = useState(true);
	const setMode = (mode) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};

	const toggleTheme = () => {
		if (theme === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme");
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches &&
		!localTheme
			? setMode("dark")
			: localTheme
			? setTheme(localTheme)
			: setMode("light");
		setIsLoadingTheme(false);
	}, []);

	return [theme, toggleTheme, isLoadingTheme];
};

export default useTheme;
