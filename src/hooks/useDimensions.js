import { useState, useCallback, useLayoutEffect } from "react";

function getDimensionObject(node) {
	const rect = node.getBoundingClientRect();

	return {
		width: rect.width,
		height: rect.height,
	};
}

const useDimensions = () => {
	const [dimensions, setDimensions] = useState({});
	const [node, setNode] = useState(null);

	const ref = useCallback((node) => {
		setNode(node);
	}, []);

	useLayoutEffect(() => {
		if (node) {
			const measure = () =>
				window.requestAnimationFrame(() =>
					setDimensions(getDimensionObject(node))
				);
			measure();

			window.addEventListener("resize", measure);
			window.addEventListener("scroll", measure);

			return () => {
				window.removeEventListener("resize", measure);
				window.removeEventListener("scroll", measure);
			};
		}
	}, [node]);

	return [ref, dimensions, node];
};

export default useDimensions;
