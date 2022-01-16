import styled, { css } from "styled-components";
import { tabulaRecta, alphabet } from "../utils";

const Tabula = ({ indices, step }) => {
	const stepIndices = indices[step];

	return (
		<Table
			currentStep={Number(step)}
			indicatorRow={stepIndices.row}
			indicatorColumn={stepIndices.column}
		>
			<thead>
				<tr>
					<Cell></Cell>
					{alphabet.map((letter, index) => {
						return (
							<ColumnHeaderCell
								isCurrent={stepIndices.row === index}
								key={letter}
								scope="col"
								indicatorHeight={stepIndices.column}
							>
								{letter}
							</ColumnHeaderCell>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{tabulaRecta.map((rowArr, index) => {
					return (
						<Row key={index}>
							<RowHeaderCell
								isCurrent={stepIndices.column === index}
								scope="row"
								indicatorWidth={stepIndices.row}
							>
								{alphabet[index]}
							</RowHeaderCell>
							{rowArr.map((letter) => {
								return <Cell key={letter}>{letter}</Cell>;
							})}
						</Row>
					);
				})}
			</tbody>
		</Table>
	);
};

const Table = styled.table`
	position: relative;
	border-spacing: 0;
	text-align: center;
	font-size: 16px;
	border-collapse: collapse;

	&:after {
		content: "";
		position: absolute;
		left: ${(props) =>
			`calc(${props.indicatorRow + 1} * ${props.theme.cellSize})`};
		top: ${(props) =>
			`calc(${props.indicatorColumn + 1} * ${props.theme.cellSize})`};
		width: ${(props) => props.theme.cellSize};
		height: ${(props) => props.theme.cellSize};
		border: 2px solid red;
		transform: scale(1.5);
		border-radius: 1000px;
		transition: left 0.15s, top 0.15s;
	}

	${(props) =>
		props.currentStep === 0 &&
		css`
			&:after {
				display: none !important;
			}

			th,
			th:after {
				background-color: transparent !important;
			}
		`};
`;

const Cell = styled.td`
	width: ${(props) => props.theme.cellSize};
	height: ${(props) => props.theme.cellSize};
	padding: 0;
	margin: 0;
`;

const Row = styled.tr`
	height: ${(props) => props.theme.cellSize};
`;

const HeaderCell = styled.th`
	position: relative;
	width: ${(props) => props.theme.cellSize};
	height: ${(props) => props.theme.cellSize};

	&:after {
		content: "";
		background-color: ${(props) => props.theme.indicatorBar};
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
`;

const ColumnHeaderCell = styled(HeaderCell)`
	background-color: ${(props) =>
		props.isCurrent ? props.theme.sourceHighlight : "transparent"};

	${(props) =>
		props.isCurrent &&
		css`
			&:after {
				width: ${(props) => props.theme.cellSize};
				height: ${(props) =>
					`calc(${props.indicatorHeight + 1} * ${props.theme.cellSize})`};
			}
		`}
`;

const RowHeaderCell = styled(HeaderCell)`
	background-color: ${(props) =>
		props.isCurrent ? props.theme.keyHighlight : "transparent"};

	${(props) =>
		props.isCurrent &&
		css`
			&:after {
				height: ${(props) => props.theme.cellSize};
				width: ${(props) =>
					`calc(${props.indicatorWidth + 1} * ${props.theme.cellSize})`};
			}
		`}
`;

export default Tabula;
