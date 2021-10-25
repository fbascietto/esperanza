import React from 'react';

const Weather = (weatherData) => {
  console.log(weatherData);
  if (weatherData) {
    const date = new Date(weatherData.daily[0].dt * 1000);
    return <h1>{date}</h1>;
  }
  return <h1>No hay coati</h1>;
};

export { Weather };
