// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useRef, useState } from 'react';
import './styles/WeatherCard.css';

const WeatherCard = ({ weather, temp, setCity, messageError, city }) => {
	const [isCelsius, setIsCelsius] = useState(true);
	const inputSearch = useRef();

	const changeDegrees = () => {
		setIsCelsius(!isCelsius);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setCity(inputSearch.current.value);
	};

	return (
		<section className="card flex-container">
			<h1 className="card__title">Weather App</h1>
			<h2 className="card__country">
				{weather?.name}, {weather?.sys.country}
			</h2>
			<form onSubmit={handleSubmit}>
				<input type="search" placeholder="Search by City" ref={inputSearch} />
				<button>Search</button>
			</form>
			{messageError && <p>{city} does not exist :ojos:</p>}
			<article className="card__body grid-container">
				<div className="card__image-container">
					<img
						className="card__image"
						src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
						alt={weather?.weather[0].main}
					/>
				</div>
				<article className="info grid-container">
					<h3 className="info__title">{weather?.weather[0].description}</h3>
					<ul className="info__list grid-container">
						<li className="info__item grid-container">
							<span className="info__label">Wind Speed</span>
							<span className="info__value">{weather?.wind.speed}m/s</span>
						</li>
						<li className="info__item grid-container">
							<span className="info__label">Clouds</span>
							<span className="info__value">{weather?.clouds.all}%</span>
						</li>
						<li className="info__item grid-container">
							<span className="info__label">Pressure</span>
							<span className="info__value">{weather?.main.pressure}hPa</span>
						</li>
					</ul>
				</article>
			</article>
			<h2 className="card__temp">
				{isCelsius ? `${temp?.celsius}°C` : `${temp?.fahrenheit}°F`}
			</h2>
			<button className="card__btn" onClick={changeDegrees}>
				Change to {isCelsius ? '°F' : '°C'}
			</button>
		</section>
	);
};

export default WeatherCard;
