/* eslint-disable no-undef */
import applyFilters from '../applyFilters';

const mockCountries = [
	{
		name: 'Comoros',
		capital: ['Moroni'],
		id: 'com',
		continent: 'Africa',
		area: '1862',
		flag: 'https://flagcdn.com/w320/km.png',
		population: 869595,
		subregion: 'Eastern Africa',
		Activities: [
			{
				difficulty: 2,
				duration: '2',
				id: '5100f680-22d7-4c22-81ee-6cec9c54c01a',
				name: 'HIKING',
				seasons: ['Autumn'],
			},
		],
	},
	{
		name: 'Australia',
		capital: ['Canberra'],
		id: 'aus',
		continent: 'Oceania',
		area: '7692024',
		flag: 'https://flagcdn.com/w320/au.png',
		population: 25687041,
		subregion: 'Australia and New Zealand',
		Activities: [],
	},
	{
		name: 'Norway',
		capital: ['Oslo'],
		id: 'nor',
		continent: 'Europe',
		area: '323802',
		flag: 'https://flagcdn.com/w320/no.png',
		population: 5379475,
		subregion: 'Northern Europe',
		Activities: [],
	},
	{
		name: 'Venezuela',
		capital: ['Caracas'],
		id: 'ven',
		continent: 'South America',
		area: '916445',
		flag: 'https://flagcdn.com/w320/ve.png',
		population: 28435943,
		subregion: 'South America',
		Activities: [
			{
				id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
				name: 'SAMBA DANCING',
				difficulty: 1,
				duration: '2',
				seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
			},
		],
	},
	{
		name: 'Brazil',
		capital: ['Brasília'],
		id: 'bra',
		continent: 'South America',
		area: '8515767',
		flag: 'https://flagcdn.com/w320/br.png',
		population: 212559409,
		subregion: 'South America',
		Activities: [
			{
				id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
				name: 'SAMBA DANCING',
				difficulty: 1,
				duration: '2',
				seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
			},
		],
	},
];

describe('applyFilters', () => {
	describe('receives a valid Continent filter', () => {
		describe('the list has countries with matching continent', () => {
			it('returns a list of countries', () => {
				const filters = { continent: 'Europe' };
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});

				expect(result).toEqual([
					{
						name: 'Norway',
						capital: ['Oslo'],
						id: 'nor',
						continent: 'Europe',
						area: '323802',
						flag: 'https://flagcdn.com/w320/no.png',
						population: 5379475,
						subregion: 'Northern Europe',
						Activities: [],
					},
				]);
			});
		});

		describe('the list of countries has no matching continent', () => {
			it('returns an empty list', () => {
				const filters = { continent: 'Asia' };
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});
				expect(result).toEqual([]);
			});
		});
	});

	describe('receives a valid Activity filter', () => {
		describe('the list has countries with matching Activity', () => {
			it('returns a list of countries', () => {
				const filters = { activity: 'SAMBA DANCING' };
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});

				expect(result).toEqual([
					{
						name: 'Venezuela',
						capital: ['Caracas'],
						id: 'ven',
						continent: 'South America',
						area: '916445',
						flag: 'https://flagcdn.com/w320/ve.png',
						population: 28435943,
						subregion: 'South America',
						Activities: [
							{
								id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
								name: 'SAMBA DANCING',
								difficulty: 1,
								duration: '2',
								seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
							},
						],
					},
					{
						name: 'Brazil',
						capital: ['Brasília'],
						id: 'bra',
						continent: 'South America',
						area: '8515767',
						flag: 'https://flagcdn.com/w320/br.png',
						population: 212559409,
						subregion: 'South America',
						Activities: [
							{
								id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
								name: 'SAMBA DANCING',
								difficulty: 1,
								duration: '2',
								seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
							},
						],
					},
				]);
			});
		});

		describe('the list of countries has no matching Activity', () => {
			it('returns an empty list', () => {
				const filters = { activity: 'SURFING' };
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});
				expect(result).toEqual([]);
			});
		});
	});

	describe('receives a valid Continent AND Activity filter', () => {
		describe('the list has countries with matching Continent AND Activity', () => {
			it('returns a list of countries', () => {
				const filters = {
					continent: 'Africa',
					activity: 'HIKING',
				};
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});

				expect(result).toEqual([
					{
						name: 'Comoros',
						capital: ['Moroni'],
						id: 'com',
						continent: 'Africa',
						area: '1862',
						flag: 'https://flagcdn.com/w320/km.png',
						population: 869595,
						subregion: 'Eastern Africa',
						Activities: [
							{
								difficulty: 2,
								duration: '2',
								id: '5100f680-22d7-4c22-81ee-6cec9c54c01a',
								name: 'HIKING',
								seasons: ['Autumn'],
							},
						],
					},
				]);
			});
		});

		describe('the list of countries has no combined Continent and Activity', () => {
			it('returns an empty list', () => {
				const filters = { continent: 'Europe', activity: 'SAILING' };
				const result = applyFilters(mockCountries, filters, {
					by: '',
					type: '',
				});
				expect(result).toEqual([]);
			});
		});
	});

	describe('receives a valid order by: name and type: asc', () => {
		describe('the list has a filter applied', () => {
			describe('returns a list filtered by Continent and ordered by Name:ascending', () => {
				it('returns a list of countries', () => {
					const filters = { continent: 'South America' };
					const order = { by: 'name', type: 'asc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
				});
			});

			describe('returns a list filtered by Activity and ordered by Name:ascending', () => {
				it('returns a list of countries', () => {
					const filters = { activity: 'SAMBA DANCING' };
					const order = { by: 'name', type: 'asc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
				});
			});
		});

		describe('the list has no filters applied', () => {
			describe('returns all countries ordered by Name:ascending', () => {
				it('returns a list of countries', () => {
					const filters = { continent: '', activity: '' };
					const order = { by: 'name', type: 'asc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Australia',
							capital: ['Canberra'],
							id: 'aus',
							continent: 'Oceania',
							area: '7692024',
							flag: 'https://flagcdn.com/w320/au.png',
							population: 25687041,
							subregion: 'Australia and New Zealand',
							Activities: [],
						},
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Comoros',
							capital: ['Moroni'],
							id: 'com',
							continent: 'Africa',
							area: '1862',
							flag: 'https://flagcdn.com/w320/km.png',
							population: 869595,
							subregion: 'Eastern Africa',
							Activities: [
								{
									difficulty: 2,
									duration: '2',
									id: '5100f680-22d7-4c22-81ee-6cec9c54c01a',
									name: 'HIKING',
									seasons: ['Autumn'],
								},
							],
						},
						{
							name: 'Norway',
							capital: ['Oslo'],
							id: 'nor',
							continent: 'Europe',
							area: '323802',
							flag: 'https://flagcdn.com/w320/no.png',
							population: 5379475,
							subregion: 'Northern Europe',
							Activities: [],
						},
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
				});
			});
		});
	});

	describe('receives a valid order by: name and type: desc', () => {
		describe('the list has a filter applied', () => {
			describe('returns a list filtered by Continent and ordered by Name:descending', () => {
				it('returns a list of countries', () => {
					const filters = { continent: 'South America' };
					const order = { by: 'name', type: 'desc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
				});
			});

			describe('returns a list filtered by Activity and ordered by Name:descending', () => {
				it('returns a list of countries', () => {
					const filters = { activity: 'SAMBA DANCING' };
					const order = { by: 'name', type: 'desc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
				});
			});
		});
	});

	describe('receives a valid order by: population and type: asc', () => {
		//!develop only if time allows
		// describe('the list has a filter applied', () => {
		// 	describe('returns a list filtered by Continent and ordered by Population:ascending', () => {});

		// 	describe('returns a list filtered by Activity and ordered by Population:ascending', () => {});
		// });
		describe('the list has no filters applied', () => {
			describe('returns all countries ordered by Population:ascending', () => {
				it('returns a list of countries', () => {
					const filters = { continente: '', activity: '' };
					const order = { by: 'population', type: 'asc' };
					const result = applyFilters(mockCountries, filters, order);

					expect(result).toEqual([
						{
							name: 'Comoros',
							capital: ['Moroni'],
							id: 'com',
							continent: 'Africa',
							area: '1862',
							flag: 'https://flagcdn.com/w320/km.png',
							population: 869595,
							subregion: 'Eastern Africa',
							Activities: [
								{
									difficulty: 2,
									duration: '2',
									id: '5100f680-22d7-4c22-81ee-6cec9c54c01a',
									name: 'HIKING',
									seasons: ['Autumn'],
								},
							],
						},
						{
							name: 'Norway',
							capital: ['Oslo'],
							id: 'nor',
							continent: 'Europe',
							area: '323802',
							flag: 'https://flagcdn.com/w320/no.png',
							population: 5379475,
							subregion: 'Northern Europe',
							Activities: [],
						},
						{
							name: 'Australia',
							capital: ['Canberra'],
							id: 'aus',
							continent: 'Oceania',
							area: '7692024',
							flag: 'https://flagcdn.com/w320/au.png',
							population: 25687041,
							subregion: 'Australia and New Zealand',
							Activities: [],
						},
						{
							name: 'Venezuela',
							capital: ['Caracas'],
							id: 'ven',
							continent: 'South America',
							area: '916445',
							flag: 'https://flagcdn.com/w320/ve.png',
							population: 28435943,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
						{
							name: 'Brazil',
							capital: ['Brasília'],
							id: 'bra',
							continent: 'South America',
							area: '8515767',
							flag: 'https://flagcdn.com/w320/br.png',
							population: 212559409,
							subregion: 'South America',
							Activities: [
								{
									id: 'c67f0e8c-3775-4d82-ac1e-1b9d40d089d2',
									name: 'SAMBA DANCING',
									difficulty: 1,
									duration: '2',
									seasons: ['Autumn', 'Spring', 'Summer', 'Winter'],
								},
							],
						},
					]);
					//   });
					// });
				});
			});
		});
	});

	//! develop if time allows
	// describe('receives a valid order by: population and type: desc', () => {
	// describe('the list has a filter applied', () => {
	// 	describe('returns a list filtered by Continent and ordered by Population:descending', () => {});

	// 	describe('returns a list filtered by Activity and ordered by Population:descending', () => {});
	// });

	// 		describe('the list has no filters applied', () => {
	// 			describe('returns all countries ordered by Population:descending', () => {});
	// 		});
	// 	});
	// });
});
