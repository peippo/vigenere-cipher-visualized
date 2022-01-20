import styled, { css } from "styled-components";
import { ReactComponent as OpenLockIcon } from "../icons/icon-lock-open.svg";
import { ReactComponent as ClosedLockIcon } from "../icons/icon-lock-closed.svg";
import { ReactComponent as KeyIcon } from "../icons/icon-key.svg";

const Icon = ({ type, isColored = false }) => {
	switch (type) {
		case "lock-open":
			return <StyledOpenLockIcon $isColored={isColored} />;
		case "key":
			return <StyledKeyIcon $isColored={isColored} />;
		case "lock-closed":
			return <StyledClosedLockIcon $isColored={isColored} />;
		default:
			break;
	}
};

const IconStyles = css`
	position: absolute;
	left: -22px;
	top: 22px;
	width: var(--icon-size);
	color: ${(props) =>
		props.$isColored
			? "var(--theme-color-primary)"
			: props.theme.inputBorder};

	@media (min-width: 600px) {
		left: -30px;
		top: 25px;
	}
`;

const StyledKeyIcon = styled(KeyIcon)`
	${IconStyles}
	width: 18px;
	width: calc(var(--icon-size) * 0.9);
`;

const StyledOpenLockIcon = styled(OpenLockIcon)`
	${IconStyles}
`;

const StyledClosedLockIcon = styled(ClosedLockIcon)`
	${IconStyles}
	width: 16px;
	width: calc(var(--icon-size) * 0.78);
`;

export default Icon;
