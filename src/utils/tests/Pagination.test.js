// import { render } from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import Pagination from '../../components/Pagination/Pagination';
// import { Provider } from 'react-redux';
// import reduxStore from '../../redux/store';
// import React from 'react';

// //create a simulated div where to render my Pagination component
// let paginationContainer = null;
// beforeAll(() => {
// 	paginationContainer = document.createElement('div');
// 	document.body.appendChild(paginationContainer);
// 	const store = reduxStore;
// 	createRoot(paginationContainer).render(
// 		<Provider store={store}>
// 			<Pagination />
// 		</Provider>,
// 		paginationContainer
// 	);
// });

// describe('Pagination component', () => {
// 	it('renders Next and Previous buttons', () => {
// 		//add Next and Prev buttons to my simulated component
// 		const nextButton = paginationContainer.getElementById('next');
// 		const previousButton = paginationContainer.getElementById('prev');
// 		expect(nextButton).toBeTruthy();
// 		expect(previousButton).toBeTruthy();
// 	});
// });

// describe('Prev button is disabled when page is 1', () => {
// 	it('renders Next button, but Previous button is disabled', () => {
// 		const nextButton = paginationContainer.querySelector(
// 			'button:contains("Next >")'
// 		);
// 		const previousButton = paginationContainer.querySelector(
// 			'button:contains("< Previous")'
// 		);

// 		expect(nextButton).toBeTruthy();
// 		expect(previousButton.disabled).toBe(true);
// 	});
// });

it('pagination test', () => {});
