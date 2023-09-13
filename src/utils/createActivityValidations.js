const regexName = /^[a-zA-Z]+(?:[- ]?[a-zA-Z]+)*$/;

const createActivityValidations = (activity, activityNames) => {
	const errors = {};

	if (activity.name.length === 0) {
		errors.name = 'Please enter a name for the activity';
	}
	if (!regexName.test(activity.name)) {
		errors.name = 'Only letters, spaces or hyphon "-" allowed';
	}
	if (activityNames.includes(activity.name.trim())) {
		errors.name =
			'This name has already been used. Please create a different activity';
	}
	if (activity.difficulty.length === 0) {
		errors.difficulty =
			'Difficulty is a mandatory field. 1 for lowest, 5 for highest';
	}

	if (activity.duration < 0) {
		errors.duration = 'Only numbers greater than 0 are allowed';
	}

	if (activity.seasons.length === 0) {
		errors.seasons = 'Please include at least one season.';
	}

	if (activity.countries.length === 0) {
		errors.countries = 'Please include at least one country.';
	}
	return errors;
};

export default createActivityValidations;
