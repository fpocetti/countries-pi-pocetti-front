/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react';
import style from './Filters.module.css';
import {
	filterByActivity,
	filterByContinent,
	orderByName,
	orderByPopulation,
	resetCountries,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Filters() {
	const allCountries = useSelector((state) => state.allCountries);
	const allActivities = useSelector((state) => state.allActivities);

	const [nameOrder, setNameOrder] = useState('');
	const [populationOrder, setPopulationOrder] = useState('');

	const [continentFilter, setContinentFilter] = useState('');
	const [activityFilter, setActivityFilter] = useState('');

	const navigate = useNavigate();

	let continents = [];
	allCountries.map((country) => {
		if (!continents.includes(country.continent)) {
			continents.push(country.continent);
		}
		return continents;
	});

	const activityNames = allActivities.map((activity) => activity.name);
	const activityNamesFormated = activityNames.map((activity) => {
		const firstLetter = activity.charAt(0).toUpperCase();
		const restOfString = activity.slice(1).toLowerCase();
		return firstLetter + restOfString;
	});

	const dispatch = useDispatch();

	const handleFilterByContinent = (event) => {
		setContinentFilter(event.target.value);
		dispatch(filterByContinent(event.target.value));
	};

	const handleFilterByActivity = (event) => {
		setActivityFilter(event.target.value);
		dispatch(filterByActivity(event.target.value));
	};

	const handleOrderByPopulation = (event) => {
		setPopulationOrder(event.target.value);
		setNameOrder('');
		dispatch(orderByPopulation(event.target.value));
	};

	const handleOrderByName = (event) => {
		setPopulationOrder('');
		setNameOrder(event.target.value);
		dispatch(orderByName(event.target.value));
	};

	const handleReset = (event) => {
		setPopulationOrder('');
		setNameOrder('');
		setContinentFilter('reset');
		setActivityFilter('reset');

		dispatch(resetCountries(event.target.value));
		navigate('/countries');
	};

	return (
		<div className={style.filterSection}>
			<div>
				<div className={style.filter}>
					∇ Filter countries by
					<select
						className={style.select}
						onChange={handleFilterByContinent}
						value={continentFilter}
					>
						<option value="reset">Continent</option>
						{continents.sort().map((continent, index) => (
							<option value={continent} key={index}>
								{continent}
							</option>
						))}
					</select>
					<select
						className={style.select}
						onChange={handleFilterByActivity}
						value={activityFilter}
					>
						<option value="reset">Activity</option>
						{activityNamesFormated.sort().map((activity, index) => (
							<option value={activity} key={index}>
								{activity}
							</option>
						))}
					</select>
				</div>
				<div className={style.order}>
					↑↓ Order countries by
					<select
						className={style.select}
						onChange={handleOrderByPopulation}
						value={populationOrder}
					>
						<option value="">Population</option>

						<option value="Population Ascending">Ascending Population</option>
						<option value="Population Descending">Descending Population</option>
					</select>
					<select
						className={style.select}
						onChange={handleOrderByName}
						value={nameOrder}
					>
						<option value="">Name</option>
						<option value="Name Ascending">Ascending Name</option>
						<option value="Name Descending">Descending Name</option>
					</select>
				</div>
				<div className={style.buttonContainer}>
					<button className={style.button} onClick={handleReset}>
						↺ Reset filters
					</button>
				</div>
			</div>
		</div>
	);
}
