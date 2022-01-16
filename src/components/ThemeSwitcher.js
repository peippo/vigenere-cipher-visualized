import React from "react";

const ThemeSwitcher = ({ isDarkTheme, setTheme }) => {
	const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

	return (
		<>
			<label>
				<input
					type="checkbox"
					checked={isDarkTheme}
					onChange={toggleTheme}
				/>
				<span className="screen-reader-text">Toggle</span> Dark mode
			</label>
		</>
	);
};

export default ThemeSwitcher;
