const getSeason = () => {
	const date = new Date();
	const month = date.getMonth();
	if (month >= 2 && month <= 4) {
		return 'spring';
	} else if (month >= 5 && month <= 7) {
		return 'summer';
	} else if (month >= 8 && month <= 10) {
		return 'autumn';
	} else {
		return 'winter';
	}
};

export default getSeason;
