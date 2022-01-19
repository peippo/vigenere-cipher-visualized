import styled, { css } from "styled-components";
import { ReactComponent as OpenLockIcon } from "../icons/icon-lock-open.svg";
import { ReactComponent as ClosedLockIcon } from "../icons/icon-lock-closed.svg";
import { ReactComponent as KeyIcon } from "../icons/icon-key.svg";

const Icon = ({ type }) => {
	switch (type) {
		case "lock-open":
			return <StyledOpenLockIcon />;
		case "key":
			return <StyledKeyIcon />;
		case "lock-closed":
			return <StyledClosedLockIcon />;
		default:
			break;
	}
};

const IconStyles = css`
	position: absolute;
	left: -30px;
	top: 25px;
	width: 20px;
	color: ${(props) => props.theme.inputBorder};
`;

const StyledKeyIcon = styled(KeyIcon)`
	${IconStyles}
	width: 18px;
`;

const StyledOpenLockIcon = styled(OpenLockIcon)`
	${IconStyles}
`;

const StyledClosedLockIcon = styled(ClosedLockIcon)`
	${IconStyles}
	width: 16px;
`;

export default Icon;
