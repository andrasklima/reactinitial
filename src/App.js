import React, { useState, useEffect } from "react";

import LoadingMask from "./components/LoadingMask";
import Hotel from "./components/Hotel";

import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("api/hotels")
      .then((response) => response.json().then((data) => setHotels(data)))
      .finally(() => setIsLoading(false));
  }, [])

  const renderHotels= () => {
    
      return hotels.map((data, index) => {
        return (
          <Hotel
            key={"hotel_" + index + data.id}
            data={data}
          ></Hotel>
        );
      });
    
  };

  return (
    <div className="App">
      <h1>Hotels</h1>
      {isLoading && <LoadingMask />}
      {Array.isArray(hotels) && renderHotels()}
    </div>
  );
}

export default App
