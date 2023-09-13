import { useEffect, useState } from 'react';
import style from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage } from '../../redux/action';

export default function Pagination() {
	const [disableNextButton, setDisableNextButton] = useState(false);
	const [disablePrevButton, setDisablePrevButton] = useState(true);
	const { page, totalPageCount } = useSelector((state) => state.pagination);

	const dispatch = useDispatch();

	//watches  changes in page number or total page count to call checkButtons when the state changes. This solves redux's asinchrony.
	useEffect(() => {
		checkButtons(page);
	}, [page, totalPageCount]);

	const checkButtons = (newPage) => {
		if (newPage !== 1) setDisablePrevButton(false);
		if (newPage === 1) setDisablePrevButton(true);
		if (newPage === totalPageCount) setDisableNextButton(true);
		if (newPage < totalPageCount) setDisableNextButton(false);
	};

	async function handleNext() {
		if (page < totalPageCount) {
			const nextPageNum = checkButtons(await dispatch(nextPage(page)));
			return nextPageNum;
		}
	}

	const handlePrevious = () => {
		if (page !== 1) {
			const prevPageNum = checkButtons(dispatch(previousPage(page)));
			return prevPageNum;
		}
	};

	return (
		<div className={style.pagination}>
			<button
				onClick={handlePrevious}
				className={style.button}
				disabled={disablePrevButton}
				id="prev"
			>
				{'< Previous'}
			</button>
			<p className={style.text}>
				Page {page} of {totalPageCount}
			</p>
			<button
				onClick={handleNext}
				className={style.button}
				disabled={disableNextButton}
				id="next"
			>
				{'Next >'}
			</button>
		</div>
	);
}
