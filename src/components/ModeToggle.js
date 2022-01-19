import styled from "styled-components";

const ModeToggle = ({ mode, changeMode }) => {
	const onChange = (event) => {
		changeMode(event.target.value);
	};

	return (
		<Container aria-label="Select cipher mode">
			<Title>MODE:</Title>
			<InputEncrypt
				id="encrypt"
				className="screen-reader-text"
				name="toggle-mode"
				type="radio"
				checked={mode === "encrypt"}
				value="encrypt"
				onChange={onChange}
			/>
			<Label htmlFor="encrypt" className="btn">
				<span>Encryption</span>
			</Label>
			<InputDecrypt
				id="decrypt"
				className="screen-reader-text"
				name="toggle-mode"
				type="radio"
				checked={mode === "decrypt"}
				value="decrypt"
				onChange={onChange}
			/>
			<Label htmlFor="decrypt" className="btn">
				<span>Decryption</span>
			</Label>
		</Container>
	);
};

const Container = styled.nav`
	margin: 0.25rem 0 1.5rem;
	padding: 0.5rem;
	background-color: ${(props) => props.theme.modeSwitchBackground};
	text-align: center;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.p`
	display: none;

	@media (min-width: 600px) {
		color: #f0f0f0;
		margin-right: 1rem;
		display: inline-flex;
	}
`;

const Label = styled.label`
	position: relative;
	display: inline-block;
	padding: 0.5rem 1rem;
	transition: background 0.5s ease-out;

	span {
		position: relative;
		z-index: 1;
	}
`;

const Input = styled.input`
	& + ${Label} {
		cursor: pointer;
		color: #f0f0f0;

		&:hover {
			background: none;
			color: var(--theme-color-primary);
		}

		&:after {
			content: "";
			background-color: var(--theme-color-primary);
			height: 100%;
			position: absolute;
			top: 0;
			transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
			width: 100%;
			border-radius: 4px;
			transform: skew(-9deg) translateZ(0);
		}
	}

	&:focus + ${Label} {
		&:after {
			outline: var(--theme-color-primary) solid 2px;
			outline-offset: 2px;
		}
	}

	&:focus:not(:focus-visible) + ${Label} {
		&:after {
			outline: none;
		}
	}

	&:checked + ${Label} {
		cursor: default;
		color: #303030;
		transition: color 200ms;

		&:after {
			left: 0;
		}
	}
`;

const InputEncrypt = styled(Input)`
	& + ${Label} {
		&:after {
			left: 100%;
		}
	}
`;

const InputDecrypt = styled(Input)`
	& + ${Label} {
		&:after {
			left: -100%;
		}
	}
`;

export default ModeToggle;
