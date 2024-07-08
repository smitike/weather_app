// import React from 'react'
import React, { useState } from 'react'; 
// import { useAuth } from '../../contexts/authcontext'

import './Home.css';

const api = {
  key: "f00c38e0279b7bc85480c3fe775d518c",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Home() {
    const [search, setSearch] = useState(''); // Use useState
    const [weather, setWeather] = useState({}); // Use useState
  
    const searchPressed = () => {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    };
  
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
              <p>{weather.name}</p>
              <p>{weather.main.temp}°C</p>
              <p>{weather.weather[0].main}</p>
              <p>({weather.weather[0].description})</p>
            </div>
          ) : (
            ""
          )}
        </header>
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