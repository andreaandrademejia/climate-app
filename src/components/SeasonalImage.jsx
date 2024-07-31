import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import getSeason from '../utils/getSeason';
import seasonalImages from '../utils/seasonalImages';
import './styles/SeansonalImage.css';

const SeasonalImage = () => {
	const [season, setSeason] = useState(getSeason());

	useEffect(() => {
		const handleSeasonChange = () => {
			setSeason(getSeason());
		};

		const interval = setInterval(handleSeasonChange, 24 * 60 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	const getImageForSeason = () => {
		switch (season) {
			case 'spring':
				return seasonalImages.spring;
			case 'summer':
				return seasonalImages.summer;
			case 'autumn':
				return seasonalImages.autumn;
			case 'winter':
				return seasonalImages.winter;
			default:
				return seasonalImages.spring;
		}
	};

	return (
		<div className="image-container">
			<TransitionGroup className="fade">
				<CSSTransition key={season} timeout={1000}>
					<img src={getImageForSeason()} alt={season} className="fade__img" />
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
};

export default SeasonalImage;
