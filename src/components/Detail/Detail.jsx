import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_COUNTRIES } from '../../utils/serverEndpoints';
import axios from 'axios';
import style from './Detail.module.css';
import { useSelector } from 'react-redux';
import EmptyCard from '../EmptyCard/EmptyCard';

export default function Detail() {
	const { id } = useParams();
	const [country, setCountry] = useState({});
	const [error, setError] = useState(null);
	const upperCaseId = country?.id?.toUpperCase();
	const upperCaseName = country?.name?.toUpperCase();
	const allActivities = useSelector((state) => state.allActivities);

	useEffect(() => {
		axios
			.get(`${URL_COUNTRIES}/${id}`)
			.then((response) => response.data)
			.then((data) => {
				if (data.name) {
					setCountry(data);
					setError(null);
				}
			})
			.catch((error) => {
				setError(error);
			});
	}, [id]);

	console.log('Detail allActivities: ', allActivities);
	console.log(country);
	console.log(error);

	if (error) {
		return (
			<div>
				<EmptyCard idError={error.response.data} />
			</div>
		);
	}
	return (
		<div className={style.detail}>
			<div className={style.detailDescription}>
				<h1 className={style.name}>{upperCaseName}</h1>
				<h3 className={style.otherInfo}>Country ID: {upperCaseId}</h3>
				<h3 className={style.otherInfo}>
					{country?.capital?.length === 1
						? `Capital: ${country.capital}`
						: `Capitals: ${country?.capital}`}
				</h3>
				<h3 className={style.otherInfo}>Continent: {country?.continent}</h3>
				<h3 className={style.otherInfo}>
					{country?.subregion !== null && `Subregion: ${country?.subregion}`}
				</h3>
				<div>
					<h3 className={style.otherInfo}>
						{country?.area !== null && `Area: ${country?.area} m²`}
					</h3>
					<h3 className={style.otherInfo}>Population: {country?.population}</h3>
					<h4 className={style.otherInfo}>Touristic Activities:</h4>
					{country?.Activities?.length === 0 ? (
						<h5 className={style.noActivity}>
							There are no entries for {country?.name}. To add an activity,
							please fill in this
							<a href="http://localhost:5173/activity/create"> form</a>.
						</h5>
					) : (
						country?.Activities?.map((activity) => (
							<h4 className={style.activity} key={activity.name}>
								{activity.name}
							</h4>
						))
					)}
				</div>
			</div>
			<div className={style.image}>
				<img
					src={country?.flag}
					alt={`${country.name} flag`}
					className={style.countryImage}
				/>
			</div>
		</div>
	);
}
