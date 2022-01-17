import { useState, useEffect } from "react";
import styled from "styled-components";
import { initializeKeyword, encrypt } from "../utils";
import Input from "./Input";

const Controls = ({ result, setResult, step, setStep }) => {
	const [plainText, setPlainText] = useState("SECRETMESSAGE");
	const [keyword, setKeyword] = useState("PASSCODE");
	let visibleResult;

	useEffect(() => {
		let initializedKeyword;

		if (keyword.length > 0) {
			initializedKeyword = initializeKeyword(plainText, keyword);
			setResult(encrypt(plainText, initializedKeyword));
		}
	}, [setResult, plainText, keyword]);

	if (result) {
		visibleResult = result["string"].split("").slice(0, step);
		visibleResult = visibleResult.join("");
	}

	const handleChange = (event, setter) => {
		setter(event.target.value.toUpperCase());
		setStep(0);
	};

	return (
		<Container>
			<InputsContainer>
				<Label>
					Plain text
					<Input
						value={plainText}
						onChange={(event) => handleChange(event, setPlainText)}
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
					Encrypted text
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
					max={plainText.length}
					value={step}
					onChange={(event) => setStep(event.target.value)}
					step="1"
					style={{
						"--lengthCount": plainText.length + 1,
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
	width: 100%;
	width: ${(props) =>
		`calc(var(--lengthCount) * ${props.theme.inputCellSize})`};

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
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0px 0px 1px rgba(13, 13, 13, 0);
		background: white;
		border-radius: 20px;
		border: 0;
	}
`;

export default Controls;
