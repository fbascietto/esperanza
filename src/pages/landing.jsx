import React, { useEffect } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';
import { Title } from '../components/title';
import { Footer } from '../components/footer';
import { Weather } from '../components/weather';
import '../App.css';

let weather;

// Renderer callback with condition
const renderer = ({
  days, hours, minutes, seconds, completed,
}) => {
  if (completed) {
    // Render a completed state
    return <span>¿Qué haces mirando esto? Andá a la quinta!</span>;
  }
  // Render a countdown
  const text = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
  return <span>{text}</span>;
};

const Landing = () => {
  useEffect(() => {
    const esperanza = {
      lat: '-35.0166700',
      lon: '-58.7166700',
    };
    const url = new URL('https://api.openweathermap.org/data/2.5/onecall');
    url.searchParams.set('lat', esperanza.lat);
    url.searchParams.set('lon', esperanza.lon);
    url.searchParams.set('exclude', 'current,minutely,hourly');
    url.searchParams.set('appid', '3bb1ce5cdda41cf78d642217d1d40e88');

    axios.get(url.href).then((res) => {
      weather = res.data;
      console.log(weather);
    });
  }, [weather]);

  return (
    <>
      <Title />
      <Countdown date="2021-12-07T16:00:00" renderer={renderer} />
      <Weather weatherData={weather} />
      <Footer />
    </>
  );
};

export { Landing };
