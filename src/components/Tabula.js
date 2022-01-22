import styled, { css } from "styled-components";
import useDimensions from "../hooks/useDimensions";
import { tabulaRecta, alphabet } from "../utils";

const Tabula = ({ indices, step, mode }) => {
	const stepIndices = indices[step];
	const [ref, { width, height }] = useDimensions();

	return (
		<Table
			mode={mode}
			currentStep={Number(step)}
			style={{
				"--currentStep": Number(step),
				"--indicatorRow": stepIndices.row + 1,
				"--indicatorColumn": stepIndices.column + 1,
				"--indicatorHeight": stepIndices.column,
				"--indicatorWidth": stepIndices.row,
				"--actualCellWidth": `${width}px`,
				"--actualCellHeight": `${height}px`,
			}}
		>
			<thead>
				<tr>
					<Cell></Cell>
					{alphabet.map((letter, index) => {
						return (
							<ColumnHeaderCell
								isCurrent={stepIndices.row === index}
								mode={mode}
								key={letter}
								scope="col"
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
								mode={mode}
								scope="row"
							>
								{alphabet[index]}
							</RowHeaderCell>
							{rowArr.map((letter, cellIndex) => {
								return (
									<Cell
										// Measure actual cell size from the first cell
										ref={index === 0 && cellIndex === 0 ? ref : null}
										key={letter}
									>
										{letter}
									</Cell>
								);
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
	font-size: var(--table-font-size);
	border-collapse: collapse;
	line-height: 0;

	& * {
		position: relative;
		z-index: ${(props) => (props.theme.currentTheme === "dark" ? "0" : "1")};
	}

	${(props) =>
		props.mode === "encrypt" &&
		css`
			&:before {
				content: "";
				position: absolute;
				left: calc(var(--indicatorRow) * var(--actualCellWidth));
				top: calc(var(--indicatorColumn) * var(--actualCellHeight));
				width: var(--actualCellWidth);
				height: var(--actualCellHeight);
				border: 2px solid ${(props) => props.theme.resultHighlight};
				transform: scale(1.5);
				border-radius: 1000px;
				transition: left 0.15s, top 0.15s;
				z-index: 5;
			}
		`};

	${(props) =>
		props.mode === "decrypt" &&
		css`
			&:before,
			&:after {
				content: "";
				position: absolute;
				left: calc(var(--indicatorRow) * var(--actualCellWidth));
				width: var(--actualCellWidth);
				height: var(--actualCellHeight);
			}

			&:after {
				top: calc(var(--indicatorColumn) * var(--actualCellHeight));
				background-color: ${(props) => props.theme.sourceHighlight};
				mix-blend-mode: ${(props) =>
					props.theme.currentTheme === "dark" ? "exclusion" : "unset"};
			}

			&:before {
				top: 0;
				border: 2px solid ${(props) => props.theme.resultHighlight};
				transform: scale(1.5);
				border-radius: 1000px;
				transition: left 0.15s, top 0.15s;
				z-index: 5;
			}
		`};

	${(props) =>
		props.currentStep === 0 &&
		css`
			&:after,
			&:before,
			th:before {
				display: none !important;
			}

			th,
			th:after {
				background-color: transparent !important;
				color: inherit;
			}
		`};
`;

const Cell = styled.td`
	width: var(--cell-size);
	height: var(--cell-size);
	padding: 0;
	margin: 0;
`;

const Row = styled.tr`
	height: var(--cell-size);
`;

const HeaderCell = styled.th`
	position: relative;
	width: var(--cell-size);
	height: var(--cell-size);

	&:after {
		content: "";
		background-color: ${(props) => props.theme.indicatorBar};
		position: absolute;
	}
`;

const ColumnHeaderCell = styled(HeaderCell)`
	border-bottom: 1px solid ${(props) => props.theme.inputBorder};

	${(props) =>
		props.mode === "encrypt" &&
		css`
			background-color: ${(props) =>
				props.isCurrent && props.theme.keyHighlight};
		`};

	${(props) =>
		props.mode === "encrypt" &&
		props.isCurrent &&
		css`
			color: var(--color-text-light);
		`};

	${(props) =>
		props.isCurrent &&
		css`
			&:after {
				top: 100%;
				left: 0;
				width: var(--cell-size);
				height: ${(props) =>
					`calc(var(--indicatorHeight) * var(--actualCellHeight))`};
			}
		`}
`;

const RowHeaderCell = styled(HeaderCell)`
	border-right: 1px solid ${(props) => props.theme.inputBorder};

	${(props) =>
		props.mode === "encrypt" &&
		css`
			background-color: ${(props) =>
				props.isCurrent && props.theme.sourceHighlight};
		`};

	${(props) =>
		props.mode === "decrypt" &&
		css`
			background-color: ${(props) =>
				props.isCurrent && props.theme.keyHighlight};
		`};

	${(props) =>
		props.isCurrent &&
		css`
			color: var(--color-text-light);

			&:after {
				top: 0;
				left: 100%;
				height: var(--cell-size);
				width: ${(props) =>
					`calc(var(--indicatorWidth) * var(--actualCellWidth))`};
			}
		`}
`;

export default Tabula;
