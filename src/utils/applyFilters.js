export default function applyFilters(
	searchQuery,
	allCountries,
	filteredContries,
	filters,
	order
) {
	let countriesCopy;

	if (searchQuery.length === 0) {
		countriesCopy = [...allCountries];
	} else {
		countriesCopy = [...filteredContries];
	}

	if (filters.continent) {
		countriesCopy = countriesCopy.filter(
			(country) => country.continent === filters.continent
		);
	}
	if (filters.activity) {
		countriesCopy = countriesCopy.filter((country) =>
			country.Activities.some(
				(activity) => activity.name === filters.activity.toUpperCase()
			)
		);
	}
	if (order.by === 'name') {
		if (order.type === 'asc') {
			countriesCopy = countriesCopy.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
		} else if (order.type === 'desc') {
			countriesCopy = countriesCopy.sort((a, b) =>
				b.name.localeCompare(a.name)
			);
		}
	}
	if (order.by === 'population') {
		if (order.type === 'asc') {
			countriesCopy = countriesCopy.sort((a, b) => a.population - b.population);
		} else {
			countriesCopy = countriesCopy.sort((a, b) => b.population - a.population);
		}
	}
	return countriesCopy;
}
