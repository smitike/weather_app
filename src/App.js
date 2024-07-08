// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authcontext';
import Login from './components/auth/login/index';
import Register from './components/auth/register/index';
import Home from './components/home/index';
import Header from './components/header/index';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;




// import "./App.css";
// import { useState } from "react";

// const api = {
//   key: "f00c38e0279b7bc85480c3fe775d518c",
//   base: "https://api.openweathermap.org/data/2.5/",
// };

// function App() {
//   const [search, setSearch] = useState("");
//   const [weather, setWeather] = useState({});

//   /*
//     Search button is pressed. Make a fetch call to the Open Weather Map API.
//   */
//   const searchPressed = () => {
//     // console.log("pressed")
//     fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
//       .then((res) => res.json())
//       .then((result) => {
//         setWeather(result);
//       });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* HEADER  */}
//         <h1>Weather App</h1>

//         {/* Search Box - Input + Button  */}
//         <div>
//           <input
//             type="text"
//             placeholder="Enter city/town..."
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button onClick={searchPressed}>Search</button>
//         </div>
//         <p>{weather.name}</p>
//         {/* If weather is not undefined display results from API */}
//         {typeof weather.main !== "undefined" ? (
//           <div>
//             {/* Location  */}
//             <p>{weather.name}</p>

//             {/* Temperature Celsius  */}
//             <p>{weather.main.temp}°C</p>

//             {/* Condition (Sunny ) */}
//             <p>{weather.weather[0].main}</p>
//             <p>({weather.weather[0].description})</p>
//           </div>
//         ) : (
//           ""
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;