/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
	GET_COUNTRIES,
	GET_COUNTRY_BY_NAME,
	GET_ALL_ACTIVITY_NAMES,
	ORDER_BY_NAME,
	ORDER_BY_POPULATION,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	RESET,
	NEXT_PAGE,
	PREV_PAGE,
	POST_ACTIVITY,
	REQUEST_ERROR,
} from './action-types';

import applyFilters from '../utils/applyFilters';

const initialState = {
	allCountries: [],
	filteredCountries: [],
	allActivities: [],
	searchQuery: '',
	axiosError: null,
	postMessage: '',
	pagination: {
		page: 1,
		pageSize: 10,
		countriesCount: 0,
		totalPageCount: 0,
	},
	appliedFilters: {
		activity: null,
		continent: null,
	},
	order: {
		by: null,
		type: null,
	},
};

const rootReducer = (state = initialState, action) => {
	let response;
	let totalCountries;

	switch (action.type) {
		case GET_COUNTRIES:
			console.log('ejecución de get_countries');
			totalCountries = [...action.payload];

			return {
				...state,
				axiosError: null,
				pagination: {
					...state.pagination,
					countriesCount: totalCountries.length,
					totalPageCount: Math.ceil(
						totalCountries.length / state.pagination.pageSize
					),
				},
				allCountries: totalCountries,
				filteredCountries: totalCountries,
			};

		case GET_COUNTRY_BY_NAME:
			console.log('ejecución de get country by name', action.payload);
			totalCountries = [...action.payload];

			return {
				...state,
				axiosError: null,
				filteredCountries: totalCountries,
				pagination: {
					...state.pagination,
					page: 1,
					countriesCount: totalCountries.length,
					totalPageCount: Math.ceil(
						totalCountries.length / state.pagination.pageSize
					),
				},
			};

		case GET_ALL_ACTIVITY_NAMES:
			console.log('ejecución de get all activities');

			return {
				...state,
				axiosError: null,
				allActivities: [...action.payload],
			};

		case POST_ACTIVITY:
			console.log('ejecución del post activity: ', action.payload);
			return {
				...state,
				axiosError: null,
				postMessage: action.payload,
			};

		case ORDER_BY_NAME:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: 1,
				},
				order: {
					by: 'name',
					type: action.payload === 'Name Ascending' ? 'asc' : 'desc',
				},
			};
			response.filteredCountries = applyFilters(
				state.allCountries,
				response.appliedFilters,
				response.order
			);

			return response;

		case ORDER_BY_POPULATION:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: 1,
				},
				order: {
					by: 'population',
					type: action.payload === 'Population Ascending' ? 'asc' : 'desc',
				},
			};
			response.filteredCountries = applyFilters(
				state.allCountries,
				response.appliedFilters,
				response.order
			);
			return response;

		case FILTER_BY_ACTIVITY:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: 1,
				},
				appliedFilters: {
					...state.appliedFilters,
					activity: action.payload === 'reset' ? null : action.payload,
				},
			};
			response.filteredCountries = applyFilters(
				state.allCountries,
				response.appliedFilters,
				response.order
			);
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case FILTER_BY_CONTINENT:
			response = {
				...state,
				appliedFilters: {
					...state.appliedFilters,
					continent: action.payload === 'reset' ? null : action.payload,
				},
				pagination: {
					...state.pagination,
					page: 1,
				},
			};
			response.filteredCountries = applyFilters(
				state.allCountries,
				response.appliedFilters,
				response.order
			);
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case RESET:
			response = {
				...state,
				axiosError: null,
				appliedFilters: {
					continent: null,
					activity: null,
				},
				order: {
					by: null,
					type: null,
				},
				pagination: {
					...state.pagination,
					page: 1,
				},
				searchQuery: '',
			};
			response.filteredCountries = applyFilters(
				state.allCountries,
				response.appliedFilters,
				response.order
			);
			response.pagination.countriesCount = response.filteredCountries.length;

			response.pagination.totalPageCount = Math.ceil(
				response.pagination.countriesCount / state.pagination.pageSize
			);
			return response;

		case NEXT_PAGE:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: action.payload,
				},
			};
			return response;

		case PREV_PAGE:
			response = {
				...state,
				pagination: {
					...state.pagination,
					page: action.payload,
				},
			};
			return response;

		case REQUEST_ERROR:
			console.log('Ejecución del error de petición ', action.payload);
			response = {
				...state,
				axiosError: action.payload,
			};
			return response;

		default:
			return {
				...state,
			};
	}
};

export default rootReducer;
