/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import CardsContainer from '../CardsContainer/CardsContainer';
import Filters from '../Filters/Filters';
import style from './Home.module.css';
import {
	getCountries,
	getActivityNames,
	getCountriesByName,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function Home() {
	const dispatch = useDispatch();
	const location = useLocation();

	const filteredCountries = useSelector((state) => state.filteredCountries);
	const searchQueryStore = useSelector((state) => state.searchQueryStore);

	useEffect(() => {
		if (location.search === `?name:${searchQueryStore}`) {
			dispatch(getCountriesByName(searchQueryStore));
		}
		if (location.search.length === 0) {
			dispatch(getCountries());
		}
		dispatch(getActivityNames());
	}, [searchQueryStore]);

	console.log('filteredCountries count at Home: ', filteredCountries.length);

	return (
		<div className={style.container}>
			<Filters />
			<div className={style.results}>
				<CardsContainer />
			</div>
		</div>
	);
}
