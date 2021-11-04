import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown'
import axios from 'axios';
import './App.css';

const quinta = new Date('07/12/2021');
const today = new Date();
const days = Math.ceil((quinta - today) / (1000 * 3600 * 24));
const readyToCanuelas = () => days < 10;

const Completionist = () => <span>¿Qué haces mirando esto? Andá a la quinta!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    const text = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
    return <span>{text}</span>;
  }
};

const renderTableHeader = () => {
  const header = ['', 'Dia', 'Max', 'Min', 'Descripcion', 'Lluvia'] 
  return header.map((key) => {
     return <th className='climaHeader'>{key.toUpperCase()}</th>
  })
}

const renderTableData = (clima) => {
  return clima.map((day, index) => {
     const { dt, temp, weather, rain } = day
     const date = new Date(dt * 1000);
     const d = date.getDate();
     const m = date.getMonth() + 1;
     const { description, icon } = weather[0];
     const iconSource = `https://openweathermap.org/img/wn/${icon}@2x.png`
     return (
        <tr key={index} className="climaRow">
           <td className="imgCell"><img src={iconSource} alt={description} className="climaImg"></img></td>
           <td>{d + '/' + m}</td>
           <td>{temp.max}°</td>
           <td>{temp.min}°</td>
           <td>{description}</td>
           <td>{rain ? rain : 0}mm</td>
        </tr>
     )
  })
}

const renderTable = (clima) => {
  if(!readyToCanuelas()){
    return <span className="disclaimer">Falta banda, no hay extendido. No hay coatí.</span>
  }
  return clima ? (<div className="clima">
    <h3 className='climaTitulo'>Pronóstico Extendido</h3>
    <table className='ClimaTotal'>
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData(clima)}
        </tbody>
    </table>
  </div>) : <span className="disclaimer">Ojalá esté lindo el clima.</span>
}

function App() {
  const [clima, setClima] = useState();

  useEffect(() => {
    if(readyToCanuelas()){
      axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=-35.05&lon=-58.76&exclude=current,minutely,hourly,alerts&appid=3bb1ce5cdda41cf78d642217d1d40e88&units=metric&lang=es')
      .then(res => setClima(res.data.daily));
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Cuadrazos, Cañuelas en:
        </h1>
        <div className="countdown">
          <Countdown date={'2021-12-03T16:00:00'} renderer={renderer}/>
        </div>
          { renderTable(clima) }
        <div className='Item'>
          <a
            className="link"
            href="https://docs.google.com/spreadsheets/d/1_4J21WzATOdeTBdpbAU_euGrJKQCbGvxqC9EdgN2TZQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='Tano-logo'></div>
          </a>
          <a
          className="link"
          href="https://discord.gg/Pbbn2CE"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className='Discord-logo'></div>
        </a>
        </div>
      </header>
    </div>
  );
}

export default App;
