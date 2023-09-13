/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Form.module.css';
import {
	getActivityNames,
	getCountries,
	postActivity,
} from '../../redux/action';
import createActivityValidations from '../../utils/createActivityValidations';
import MultiSelect from '../MultiSelect/MultiSelect';

export default function Form() {
	const allCountries = useSelector((state) => state.allCountries);
	const postMessage = useSelector((state) => state.postMessage);
	const axiosError = useSelector((state) => state.axiosError);

	//connect to Activity names to validate if name is in use
	const allActivities = useSelector((state) => state.allActivities);
	const activityNames = allActivities.map((activity) => activity.name);
	//connect to post response

	const dispatch = useDispatch();

	//Reorganize countries by continent to improve form's UX
	let countriesByContinent = {};
	allCountries.forEach((country) => {
		if (!countriesByContinent[country.continent]) {
			countriesByContinent[country.continent] = [];
		}
		countriesByContinent[country.continent].push(country);
	});

	const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
	const difficultyLevels = [1, 2, 3, 4, 5];

	const [activity, setActivity] = useState({
		name: '',
		difficulty: '',
		duration: '',
		seasons: [],
		countries: [],
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		let activityUpdates = {};

		if (event.target.name === 'countries') {
			activityUpdates = {
				...activity,
				countries: event.target.checked
					? [...activity.countries, event.target.value]
					: activity.countries.filter(
							(country) => country != event.target.value
					  ),
			};
		} else if (event.target.name === 'difficulty') {
			activityUpdates = {
				...activity,
				difficulty: parseInt(event.target.value),
			};
		} else if (event.target.name === 'duration') {
			activityUpdates = {
				...activity,
				duration: parseFloat(event.target.value),
			};
		} else if (event.target.name === 'name') {
			activityUpdates = {
				...activity,
				name: event.target.value.toUpperCase(),
			};
		} else if (event.target.name === 'seasons') {
			activityUpdates = {
				...activityUpdates,
				seasons: event.target.checked
					? [...activity.seasons, event.target.value]
					: activity.seasons.filter((season) => season != event.target.value),
			};
		}

		setActivity({
			...activity,
			...activityUpdates,
		});

		const updatedErrors = createActivityValidations(
			{
				...activity,
				[event.target.name]: event.target.value,
			},
			activityNames
		);

		setErrors(updatedErrors);

		if (
			event.target.name === 'seasons' &&
			activityUpdates.seasons.length === 0
		) {
			setErrors((errors) => ({
				...errors,
				seasons: 'Please include at least one season',
			}));
		}

		if (
			event.target.name === 'countries' &&
			activityUpdates.countries.length === 0
		) {
			setErrors((errors) => ({
				...errors,
				countries: 'Please include at least one country',
			}));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(postActivity(activity));
		setActivity({
			name: '',
			difficulty: '',
			duration: '',
			seasons: '',
			countries: '',
		});

		if (axiosError) {
			alert(axiosError);
		} else {
			alert(postMessage);
		}
	};

	//server requests when mounting component
	useEffect(() => {
		dispatch(getCountries());
		dispatch(getActivityNames());
	}, []);

	//handle asynchrony in name validation
	useEffect(() => {
		if (activityNames.includes(activity.name.trim())) {
			setErrors({
				...errors,
				name: 'This name has already been used. Please create a different activity',
			});
		}
	}, [activity.name]);

	return (
		<div className={style.centerForm}>
			<div className={style.formContainer}>
				<h2 className={style.title}>
					🏄🏻‍♀️ Fill in this form to create a new activity ⛺
				</h2>

				<form onSubmit={handleSubmit} className={style.form}>
					<div className={style.activity}>
						<h3 className={style.sectionTitle}>1. Describe your activity</h3>
						<div className={style.formSection}>
							<div className={style.labelInput}>
								<label htmlFor="name" className={style.customLabel}>
									Activity name
								</label>
								<input
									type="text"
									name="name"
									value={activity.name}
									onChange={handleChange}
									className={style.input}
									placeholder="Activity name"
								/>
							</div>
							{errors.name && (
								<p className={style.errorMessage}>{errors.name}</p>
							)}
						</div>

						<div className={style.formSection}>
							<div className={style.labelInput}>
								<label htmlFor="duration" className={style.customLabel}>
									Duration (hs)
								</label>
								<input
									type="number"
									name="duration"
									value={activity.duration}
									onChange={handleChange}
									className={style.input}
								/>
							</div>
							{errors.duration && (
								<p className={style.errorMessage}>{errors.duration}</p>
							)}
						</div>

						<div className={style.formSection}>
							<div className={style.labelInput}>
								<label htmlFor="difficulty" className={style.customLabel}>
									Difficulty
								</label>
								<div className={style.difficultyContainer}>
									{difficultyLevels.map((difficulty, index) => (
										<div key={index}>
											<input
												className={style.option}
												type="radio"
												name="difficulty"
												value={difficulty}
												checked={activity.difficulty === difficulty}
												onChange={handleChange}
											></input>
											<label key={index} htmlFor="difficulty">
												{difficulty}
											</label>
										</div>
									))}
								</div>
							</div>
							{errors.difficulty && (
								<p className={style.errorMessage}>{errors.difficulty}</p>
							)}
						</div>

						<div className={style.formSection}>
							<div className={style.labelInput}>
								<label htmlFor="seasons" className={style.customLabel}>
									Season
								</label>
								<div className={style.seasonContainer}>
									{seasons.sort().map((season, index) => (
										<div key={index}>
											<input
												className={style.option}
												type="checkbox"
												name="seasons"
												value={season}
												checked={activity.seasons.includes(season)}
												key={index}
												onChange={handleChange}
											/>
											<label htmlFor={season}>{season}</label>
										</div>
									))}
								</div>
							</div>
							{errors.seasons && (
								<p className={style.errorMessage}>{errors.seasons}</p>
							)}
						</div>
					</div>

					<div className={style.countryRelation}>
						<div className={style.selectCountriesContainer}>
							<h3 className={style.sectionTitle}>
								2. Select at least one country
							</h3>
							<div>
								{errors.countries && (
									<p className={style.errorMessage}>{errors.countries}</p>
								)}
							</div>
						</div>

						<MultiSelect
							countriesByContinent={countriesByContinent}
							activity={activity}
							handleChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className={style.formButton}
						disabled={
							activity.countries.length === 0 ||
							activity.difficulty.length === 0 ||
							activity.seasons.length === 0 ||
							errors.name ||
							errors.duration ||
							errors.seasons ||
							errors.difficulty ||
							errors.countries
						}
					>
						💫 Create activity 💫
					</button>
				</form>
			</div>
		</div>
	);
}
