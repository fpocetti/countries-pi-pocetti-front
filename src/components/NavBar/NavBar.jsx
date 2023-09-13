import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import logo from '../../assets/rotating-earth.gif';

export default function NavBar() {
	return (
		<div className={style.navContainer}>
			<div className={style.logoContainer}>
				<Link to="/">
					<img
						src={logo}
						alt="spinning earth animation"
						className={style.logo}
					/>
				</Link>
			</div>

			<Link to="/activity/create" className={style.link}>
				✨ Create activity
			</Link>
			<Link to="/countries" className={style.link}>
				🔍 Explore all countries
			</Link>
			<div className={style.searchBar}>
				<SearchBar />
			</div>
		</div>
	);
}
