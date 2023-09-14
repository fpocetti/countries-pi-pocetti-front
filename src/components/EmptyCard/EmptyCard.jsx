/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import style from './EmptyCard.module.css';

export default function EmptyCard({ idError }) {
	const requestError = useSelector((state) => state.requestError);

	if (idError) {
		return (
			<div className={style.container}>
				<h3 className={style.title}>{idError}</h3>
			</div>
		);
	}

	return (
		<div className={style.container}>
			{requestError ? (
				<h3 className={style.title}>{requestError}</h3>
			) : (
				<h3 className={style.title}>
					There are no countries matching your filters
				</h3>
			)}
			<h4>Please reset or search countries by Name</h4>
		</div>
	);
}
