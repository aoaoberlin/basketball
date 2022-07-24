import { useState, useEffect } from "react";

const usePagination = (data, page, rowsPerPage) => {
	// console.log("inside usePagination");
	const [tableRange, setTableRange] = useState([]);
	const [slice, setSlice] = useState([]);

	useEffect(() => {
		// console.log("inside usePagination -> useEffect");
		const range = calculateRange(data, rowsPerPage);
		setTableRange([...range]);

		const slice = sliceData(data, page, rowsPerPage);
		setSlice([...slice]);
	}, [data, setTableRange, page, setSlice, rowsPerPage]);

	return { slice, range: tableRange };
};

const calculateRange = (data, rowsPerPage) => {
	// console.log("inside usePagination -> calculateRange");
	const range = [];
	const num = Math.ceil(data.length / rowsPerPage);

	for (let i = 1; i <= num; i++) {
		range.push(i);
	}
	// console.log("new range:", range);
	return range;
};

const sliceData = (data, page, rowsPerPage) => {
	// console.log("inside usePagination -> sliceData");
	return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export default usePagination;
