import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css';
import rotatingEarth from '../../assets/rotating-earth.gif';

export default function Landing() {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate('/countries');
	};

	return (
		<div className={style.container}>
			<h1>{`< Hello, world >`}</h1>
			<button
				title="Navigate to all countries"
				onClick={navigateToHome}
				className={style.landingButton}
			>
				Explore all countries
			</button>
			<img
				src={rotatingEarth}
				alt="spinning Earth animation"
				className={style.gif}
			/>
			<h3 className={style.subtitle}>Try Argentina, Mexico, Colombia...</h3>
			<SearchBar className={style.landingSearchBar} />
		</div>
	);
}
