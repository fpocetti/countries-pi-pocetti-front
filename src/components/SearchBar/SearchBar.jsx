/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getCountries,
	getCountriesByName,
	setSearchQueryStore,
} from '../../redux/action';

export default function SearchBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//to handle client's input
	const [searchQuery, setSearchQuery] = useState('');
	const searchQueryStore = useSelector((store) => {
		store.searchQueryStore;
	});

	const handleChange = (event) => {
		setSearchQuery(event.target.value);
	};

	//to submit search
	const handleSearch = () => {
		if (searchQuery.trim().length > 0) {
			dispatch(getCountriesByName(searchQuery));
			dispatch(setSearchQueryStore(searchQuery));
			navigate(`/countries?name=${searchQuery}`);
		} else {
			dispatch(getCountries());
			navigate('/countries');
		}
		setSearchQuery('');
	};

	return (
		<div className={style.searchBar}>
			<input
				type="search"
				value={searchQuery}
				onChange={handleChange}
				placeholder="Search countries by name..."
				className={style.input}
			/>
			<button
				className={style.button}
				onClick={() => handleSearch(searchQuery)}
			>
				Search
			</button>
		</div>
	);
}
