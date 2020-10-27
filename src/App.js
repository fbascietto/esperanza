import Countdown from 'react-countdown';
import './App.css';

const Completionist = () => <span>¿Qué haces mirando esto? Andá a la quinta!</span>;
 
// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    const text = `Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
    return <span>{text}</span>;
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Cuadrazos, Cañuelas en:
        </h1>
        <Countdown date={'2020-12-08T16:00:00'} renderer={renderer}/>
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
