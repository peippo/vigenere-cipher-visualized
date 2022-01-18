import { useState, useEffect } from "react";
import styled from "styled-components";
import { initializeKeyword, cipher } from "../utils";
import Input from "./Input";

const Controls = ({ result, setResult, step, setStep, mode, setMode }) => {
	const [sourceText, setSourceText] = useState("SECRETMESSAGE");
	const [keyword, setKeyword] = useState("PASSCODE");
	let visibleResult;

	useEffect(() => {
		let initializedKeyword;

		if (keyword.length > 0) {
			initializedKeyword = initializeKeyword(sourceText, keyword);
			setResult(cipher[mode](sourceText, initializedKeyword));
		}
	}, [setResult, sourceText, keyword, mode]);

	if (result) {
		visibleResult = result["string"].split("").slice(0, step);
		visibleResult = visibleResult.join("");
	}

	const handleChange = (event, setter) => {
		setter(event.target.value.toUpperCase());
		setStep(0);
	};

	const changeMode = () => {
		setSourceText(mode === "encrypt" ? result["string"] : "SECRETMESSAGE");
		setMode(mode === "encrypt" ? "decrypt" : "encrypt");
	};

	return (
		<Container>
			<InputsContainer>
				<button onClick={changeMode}>{mode}</button>
				<Label>
					{mode === "encrypt"
						? "Plain source text"
						: "Encrypted source text"}
					<Input
						value={sourceText}
						onChange={(event) => handleChange(event, setSourceText)}
						contentType="source"
						step={step}
					/>
				</Label>
				<Label>
					Encryption key
					<Input
						value={keyword}
						onChange={(event) => handleChange(event, setKeyword)}
						contentType="key"
						step={step}
					/>
				</Label>
				<Label>
					{mode === "encrypt" ? "Encrypted text" : "Decrypted text"}
					<Input
						value={visibleResult ? visibleResult : ""}
						contentType="result"
						disabled
					/>
				</Label>
			</InputsContainer>
			<Label>
				<Range
					type="range"
					min="0"
					max={sourceText.length}
					value={step}
					onChange={(event) => setStep(event.target.value)}
					step="1"
					style={{
						"--lengthCount": sourceText.length + 1,
					}}
				/>
			</Label>
		</Container>
	);
};

const Container = styled.div`
	width: ${(props) => props.theme.containerWidth};
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	font-size: 0.875rem;
	text-transform: uppercase;
`;

const InputsContainer = styled.div`
	padding: 0 0 0 ${(props) => props.theme.inputCellSize};
`;

const Range = styled.input`
	-webkit-appearance: none;
	width: ${(props) =>
		`calc(var(--lengthCount) * ${props.theme.inputCellSize})`};
	border-radius: 5px;
	margin: 0.5rem 0 1rem;
	background: none;

	&:focus {
		outline: none;
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: ${(props) => props.theme.rangeThumbSize};
		border-bottom: ${(props) => props.theme.rangeThumbSize} solid
			var(--theme-color-primary);
		border-left: ${(props) => props.theme.rangeThumbSize} solid transparent;
		border-right: ${(props) => props.theme.rangeThumbSize} solid transparent;
		cursor: pointer;
		margin-top: -6px;
		position: relative;
		border-radius: 5px;

		&:hover {
			cursor: ew-resize;
		}
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background-color: ${(props) => props.theme.sliderTrack};
		border-radius: 20px;
		border: 0;
	}
`;

export default Controls;
