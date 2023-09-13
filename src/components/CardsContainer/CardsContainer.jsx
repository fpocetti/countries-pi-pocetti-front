/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Card from '../Card/Card';
import EmptyCard from '../EmptyCard/EmptyCard';
import Pagination from '../Pagination/Pagination';

// eslint-disable-next-line no-unused-vars
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

export default function CardsContainer() {
	const filteredCountries = useSelector((state) => state.filteredCountries);
	const axiosError = useSelector((state) => state.axiosError);

	const { page, totalPageCount, pageSize } = useSelector(
		(state) => state.pagination
	);

	useEffect(() => {
		console.log('cards actualizado con ', filteredCountries);
	}, [filteredCountries]);

	if (axiosError || filteredCountries.length === 0) {
		return (
			<div>
				<EmptyCard className={style.emptyCard} />
			</div>
		);
	}

	return (
		<div className={style.container}>
			<div className={style.page}>
				<div className={style.cardsContainer}>
					{filteredCountries
						?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
						.map((country, index) => {
							return (
								<Card
									key={index}
									id={country.id}
									flag={country.flag}
									continent={country.continent}
									name={country.name}
									className={style.card}
								/>
							);
						})}
				</div>
				{totalPageCount > 1 && (
					<div className={style.pagination}>
						<Pagination />
					</div>
				)}
			</div>
		</div>
	);
}
