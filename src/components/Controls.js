import { useState, useEffect } from "react";
import styled from "styled-components";
import { initializeKeyword, cipher } from "../utils";
import Icon from "./Icon";
import Input from "./Input";
import ModeToggle from "./ModeToggle";

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

	const changeMode = (newMode) => {
		setMode(newMode);
		setSourceText(result["string"]);
	};

	return (
		<>
			<InputsContainer>
				<ModeToggle mode={mode} changeMode={changeMode} />
				<InputRow>
					<Label htmlFor="input-source">
						{mode === "encrypt"
							? "Plain source text"
							: "Encrypted source text"}
					</Label>
					<Input
						id="input-source"
						value={sourceText}
						onChange={(event) => handleChange(event, setSourceText)}
						contentType="source"
						step={step}
					/>
					<Icon
						type={mode === "encrypt" ? "lock-open" : "lock-closed"}
						isColored={true}
					/>
				</InputRow>
				<InputRow>
					<Label htmlFor="input-key">Encryption key</Label>
					<Input
						id="input-key"
						value={keyword}
						onChange={(event) => handleChange(event, setKeyword)}
						contentType="key"
						step={step}
					/>
					<Icon type="key" isColored={true} />
				</InputRow>
				<InputRow>
					<Label htmlFor="input-result">
						{mode === "encrypt" ? "Encrypted text" : "Decrypted text"}
					</Label>
					<Input
						id="input-result"
						value={visibleResult ? visibleResult : ""}
						contentType="result"
						disabled
					/>
					<Icon type={mode === "encrypt" ? "lock-closed" : "lock-open"} />
				</InputRow>
			</InputsContainer>
			<Label htmlFor="input-range">
				<span className="screen-reader-text">
					Slide through the cipher process
				</span>
			</Label>
			<Range
				id="input-range"
				type="range"
				min="0"
				max={sourceText.length}
				value={step}
				onChange={(event) => setStep(Number(event.target.value))}
				step="1"
				style={{
					"--lengthCount": sourceText.length + 1,
				}}
				disabled={!keyword || !sourceText}
			/>
		</>
	);
};

const InputRow = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`;

const Label = styled.label`
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

	/* Webkit */
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
		transition: all 0.15s;
		background: none;
		box-shadow: none;

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

	/* Firefox */
	&::-moz-range-thumb {
		width: 5px;
		height: 0;
		border-bottom: 20px solid var(--theme-color-primary);
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 0;
		cursor: pointer;
		position: relative;
		background: none;
		border-radius: 10px;

		&:hover {
			cursor: ew-resize;
		}
	}

	&::-moz-range-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background-color: ${(props) => props.theme.sliderTrack};
		border-radius: 20px;
		border: 0;
	}

	&:disabled {
		&::-webkit-slider-thumb {
			border-bottom: ${(props) =>
				`${props.theme.rangeThumbSize} solid ${props.theme.text}`};

			&:hover {
				cursor: not-allowed;
			}
		}

		&::-webkit-slider-runnable-track {
			opacity: 0.5;

			&:hover {
				cursor: not-allowed;
			}
		}

		&::-moz-range-thumb {
			border-bottom: ${(props) =>
				`${props.theme.rangeThumbSize} solid ${props.theme.text}`};

			&:hover {
				cursor: not-allowed;
			}
		}

		&::-moz-range-track {
			&:hover {
				cursor: not-allowed;
			}
		}
	}
`;

export default Controls;
