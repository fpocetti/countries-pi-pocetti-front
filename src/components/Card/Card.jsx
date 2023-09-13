/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ flag, continent, name, id }) {
	const nameToUpperCase = name.toUpperCase();
	return (
		<div className={style.card}>
			<Link to={`/countries/${id}`} title={nameToUpperCase}>
				<div className={style.titleContainer}>
					<h2 className={style.cardTitle}>{nameToUpperCase}</h2>
				</div>
				<div className={style.imgContainer}>
					<img src={flag} alt={name} className={style.cardImage} />
				</div>
				<h3 className={style.cardText}>{continent}</h3>
			</Link>
		</div>
	);
}
