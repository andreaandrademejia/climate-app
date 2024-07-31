import React, { useEffect, useState } from 'react';
import SeasonalImage from './components/SeasonalImage';
import WeatherCard from './components/WeatherCard';
import axios from 'axios';
import './App.css';

function App() {
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [temp, setTemp] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [city, setCity] = useState('');
	const [messageError, setMessageError] = useState(false);

	const updateCity = (newCity) => {
		setCity(newCity);
	};

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(true);
		}, 3000);

		const success = (position) => {
			setCoords({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			});
		};

		const error = () => {
			setHasError(true);
			setIsLoading(false);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	}, []);

	useEffect(() => {
		if (coords) {
			const API_KEY = '1a365b5d98ee9b230e63de27056a98a5';
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
			axios
				.get(url)
				.then((res) => {
					setWeather(res.data);
					const celsius = (res.data.main.temp - 273.15).toFixed(1);
					const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
					setTemp({ celsius, fahrenheit });
					setMessageError(false);
				})
				.catch((err) => {
					console.error(err);
					setMessageError(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [coords]);

	useEffect(() => {
		if (city) {
			const API_KEY = '1a365b5d98ee9b230e63de27056a98a5';
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
			axios
				.get(url)
				.then((res) => {
					setWeather(res.data);
					const celsius = (res.data.main.temp - 273.15).toFixed(1);
					const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(1);
					setTemp({ celsius, fahrenheit });
					setMessageError(false);
				})
				.catch((err) => {
					console.error(err);
					setMessageError(true);
				});
		}
	}, [city]);

	return (
		<div className="app flex-container">
			<SeasonalImage />
			{isLoading ? (
				<div>
					<video autoPlay loop muted className="loading-video">
						<source
							src="/videos/loading.mp4"
							type="video/mp4"
							className="mp4-loadingMp4"
						/>
					</video>
					{showMessage && <p>Please activate location</p>}
				</div>
			) : hasError ? (
				<h1>
					To obtain the weather of your city you must accept the permissions
				</h1>
			) : (
				<WeatherCard
					weather={weather}
					temp={temp}
					setCity={updateCity}
					messageError={messageError}
					city={city}
				/>
			)}
		</div>
	);
}

export default App;
