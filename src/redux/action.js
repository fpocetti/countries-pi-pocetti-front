import axios from 'axios';
import { URL_COUNTRIES, URL_ACTIVITIES } from '../utils/serverEndpoints';

import {
	GET_COUNTRIES,
	GET_ALL_ACTIVITY_NAMES,
	ORDER_BY_NAME,
	ORDER_BY_POPULATION,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	RESET,
	NEXT_PAGE,
	PREV_PAGE,
	GET_COUNTRY_BY_NAME,
	POST_ACTIVITY,
	REQUEST_ERROR,
} from './action-types';

export const getCountries = () => {
	return async function (dispatch) {
		try {
			let response;
			response = await axios.get(URL_COUNTRIES);
			return dispatch({
				type: GET_COUNTRIES,
				payload: response.data,
			});
		} catch (error) {
			return dispatch({
				type: REQUEST_ERROR,
				payload: error.response.data,
			});
		}
	};
};

export const getCountriesByName = (name) => {
	console.log('request al server ', name);

	return async function (dispatch) {
		try {
			let response = await axios.get(`${URL_COUNTRIES}?name=${name}`);
			return dispatch({
				type: GET_COUNTRY_BY_NAME,
				payload: response.data,
			});
		} catch (error) {
			return dispatch({
				type: REQUEST_ERROR,
				payload: error.response.data,
			});
		}
	};
};

export const getActivityNames = () => {
	return async function (dispatch) {
		try {
			let response = await axios.get(URL_ACTIVITIES);
			return dispatch({
				type: GET_ALL_ACTIVITY_NAMES,
				payload: response.data,
			});
		} catch (error) {
			return dispatch({
				type: REQUEST_ERROR,
				payload: error.response.data,
			});
		}
	};
};

export const postActivity = (activity) => {
	return async function (dispatch) {
		try {
			await axios.post(URL_ACTIVITIES, activity).then(({ data }) => {
				console.log(data);
				return dispatch({
					type: POST_ACTIVITY,
					payload: data,
				});
			});
		} catch (error) {
			return dispatch({
				type: REQUEST_ERROR,
				payload: error.response.data,
			});
		}
	};
};

export function orderByName(order) {
	console.log(order, 'en el action');
	return {
		type: ORDER_BY_NAME,
		payload: order,
	};
}
export function orderByPopulation(order) {
	return {
		type: ORDER_BY_POPULATION,
		payload: order,
	};
}
export function filterByActivity(activity) {
	return {
		type: FILTER_BY_ACTIVITY,
		payload: activity,
	};
}
export function filterByContinent(continent) {
	return {
		type: FILTER_BY_CONTINENT,
		payload: continent,
	};
}

export function resetCountries() {
	return {
		type: RESET,
	};
}

export function previousPage(page) {
	const prevPage = page - 1;
	return {
		type: PREV_PAGE,
		payload: prevPage,
	};
}

export function nextPage(page) {
	const nextPage = page + 1;
	return {
		type: NEXT_PAGE,
		payload: nextPage,
	};
}
