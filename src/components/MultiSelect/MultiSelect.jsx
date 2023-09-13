/* eslint-disable react/prop-types */
import style from './MultiSelect.module.css';

const MultiSelect = ({ countriesByContinent, activity, handleChange }) => {
	return (
		<div className={style.continentContainer}>
			{Object.keys(countriesByContinent)
				.sort((a, b) => a.localeCompare(b))
				.map((continent) => (
					<div key={continent} className={style.continent}>
						<h3 className={style.continentLabel}>{continent}</h3>
						<div className={style.countries}>
							{countriesByContinent[continent]
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((country) => (
									<div key={country.id}>
										<input
											className={style.country}
											type="checkbox"
											checked={activity.countries.includes(country.id)}
											key={country.id}
											id={country.id}
											name="countries"
											value={country.id}
											onChange={handleChange}
										/>
										<label htmlFor={country.name}>{country.name}</label>
									</div>
								))}
						</div>
					</div>
				))}
		</div>
	);
};

export default MultiSelect;
