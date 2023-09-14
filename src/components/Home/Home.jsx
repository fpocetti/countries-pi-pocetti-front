/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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
import Loader from '../Loader/Loader';

export default function Home() {
	const dispatch = useDispatch();
	const location = useLocation();

	const [loading, setLoading] = useState(true);

	const searchQueryStore = useSelector((state) => state.searchQueryStore);

	useEffect(() => {
		setLoading(true);
		if (location.search === `?name:${searchQueryStore}`) {
			dispatch(getCountriesByName(searchQueryStore)).then(() =>
				setLoading(false)
			);
		} else if (location.search.length === 0) {
			dispatch(getCountries()).then(() => setLoading(false));
		}
		dispatch(getActivityNames()).then(() => setLoading(false));
	}, [searchQueryStore, location.search]);

	if (loading) {
		return <Loader />;
	}
	return (
		<div className={style.container}>
			<Filters />
			<div className={style.results}>
				<CardsContainer />
			</div>
		</div>
	);
}
