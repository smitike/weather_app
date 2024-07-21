// import React from 'react'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authcontext'
import { saveFavoriteLocation, getFavoriteLocations, removeFavoriteLocation } from '../../firebase/favorites';
import './Home.css';

const api = {
  key: "f00c38e0279b7bc85480c3fe775d518c",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Home() {
    const { currentUser } = useAuth();
    const [search, setSearch] = useState(''); // Use useState
    const [weather, setWeather] = useState({}); // Use useState
    const [favorites, setFavorites] = useState([]);
    const [favoriteDetails, setFavoriteDetails] = useState([]);
  
    const searchPressed = () => {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    };

    const toggleFavorite = () => {
      if (currentUser && weather.name) {
        const isFavorited = favorites.some(fav => fav.location === weather.name);
        if (isFavorited) {
          removeFavoriteLocation(currentUser.uid, weather.name).then(() => {
            setFavorites(favorites.filter(fav => fav.location !== weather.name));
            setFavoriteDetails(favoriteDetails.filter(fav => fav.name !== weather.name));
          });
        } else {
          saveFavoriteLocation(currentUser.uid, weather.name).then(() => {
            setFavorites([...favorites, { location: weather.name }]);
            fetchWeatherDetails(weather.name);
          });
        }
      }
    };

    const fetchWeatherDetails = (location) => {
      fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setFavoriteDetails(prevDetails => {
            // Check if the location already exists in favoriteDetails
            if (!prevDetails.some(fav => fav.name === result.name)) {
              return [...prevDetails, result];
            }
            return prevDetails;
          });
        });
    };

    useEffect(() => {
      if (currentUser) {
        getFavoriteLocations(currentUser.uid).then(favorites => {
          setFavorites(favorites);
          favorites.forEach(fav => fetchWeatherDetails(fav.location));
        });
      }
    }, [currentUser]);
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
          <div>
            <input
              type="text"
              placeholder="Enter city/town..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchPressed}>Search</button>
          </div>
          <p>{weather.name}</p>
          {typeof weather.main !== "undefined" ? (
            <div>
              <p>{weather.name}
              <button onClick={toggleFavorite} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                {favorites.some(fav => fav.location === weather.name) ? '⭐' : '☆'}
              </button>
              </p>
              <p>{weather.main.temp}°C</p>
              <p>{weather.weather[0].main}</p>
              <p>({weather.weather[0].description})</p>
            </div>
          ) : (
            ""
          )}
        </header>
        <div className="favorites-bar">
            <h2>Favorites</h2>
          <ul>
            {favoriteDetails.map((fav, index) => (
              <li key={index}>
                <p>{fav.name}</p>
                <p>{fav.main.temp}°C</p>
                <p>{fav.weather[0].main}</p>
                <p>({fav.weather[0].description})</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default Home;


// const Home = () => {
//     const { currentUser } = useAuth()
//     return (
//         <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
//     )
// }

// export default Home