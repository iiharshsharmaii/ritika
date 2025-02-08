import React, { useState, useEffect } from 'react';
import hearts from '../images/hearts.png';
import muteIcon from '../images/mute.png';
import playIcon from '../images/play.png';
import testMusic from '../music/ending.mp3';
import { Link } from 'react-router-dom';

function Home() {
  const [divs, setDivs] = useState([]);
  const [play, setPlay] = useState(muteIcon);

  const handlePlay = () => {
    const audio = document.getElementById('background-audio');
    if (play === playIcon) {
      setPlay(muteIcon);
      audio.pause();
    } else {
      setPlay(playIcon);
      audio.play();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDiv = { id: Math.random(), left: `${Math.random() * 100}vw`, createdAt: Date.now() };
      setDivs((prevDivs) => [...prevDivs, newDiv]);

      setTimeout(() => {
        setDivs((prevDivs) => prevDivs.filter(div => div.id !== newDiv.id));
      }, 6000); // Remove div after 10 seconds
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <button className='homebtn' onClick={handlePlay}>
        <img src={play} alt="Play/Pause" />
      </button>
      <Link to="/valentine">
        <div className='homepage'>
          {divs.map((div) => (
            <div key={div.id} className="hearts" style={{ left: div.left }}>
              ♥️
            </div>
          ))}
          <div className='hpContainer'>
            <h1>
              <img className="leftImg" src={hearts} alt="Hearts" />
              be<br />mine
              <img className="rightImg" src={hearts} alt="Hearts" />
            </h1>
            <p>HAPPY VALENTINE'S DAY <br /> FROM HARSH</p>
          </div>
        </div>
      </Link>
      <audio id="background-audio" autoPlay loop hidden>
        <source src={testMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default Home;
