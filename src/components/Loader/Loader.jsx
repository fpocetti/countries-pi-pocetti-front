import spinningWorld from '../../assets/loading-globe.gif';
import style from './Loader.module.css';

const Loader = () => {
	return (
		<div className={style.loader}>
			<img
				src={spinningWorld}
				alt="spining world with countries"
				className={style.loaderImg}
			/>
			<h3 className={style.loaderSubtitle}>Loading countries...</h3>
		</div>
	);
};

export default Loader;
