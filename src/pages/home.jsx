import React, { useState, useEffect } from 'react';
import hearts from '../images/hearts.png';
import muteIcon from '../images/mute.png'
import playIcon from '../images/play.png'
import testMusic from '../music/ending.mp3'
import { Link } from 'react-router-dom';

function Home() {

  const [divs, setDivs] = useState([]); // Store the heart divs and their positions
  const [play, setPlay] = useState(muteIcon)

  const handlePlay = () => {
    const audio = document.getElementById('background-audio');
    
    if (play == playIcon) {
      setPlay(muteIcon);
      audio.pause();
    } else {
      setPlay(playIcon);
      audio.play();
    }
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a new heart with a fixed random 'left' position and a timestamp
      const newDiv = { id: Math.random(), left: `${Math.random() * 100}vw`, createdAt: Date.now() };

      // Add the new div to the state
      setDivs((prevDivs) => [...prevDivs, newDiv]);

      // Remove the heart after 3 seconds (3000ms)
      setTimeout(() => {
        setDivs((prevDivs) => prevDivs.filter(div => div.id !== newDiv.id));
      }, 10000); // Remove the div after 3000ms (3 seconds)

    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval when the component unmounts
  }, []);

  // const redirectTimeout = setTimeout(() => {
  //   navigate('/another-page'); // Redirect to '/another-page'
  // }, 10000);  // Change 5000 to the time you want (in milliseconds)


  return (
    <>
 <button className='homebtn' onClick={handlePlay}><img src={play} /></button>
 <Link to="/valentine">
      <div className='homepage'>
     
        {divs.map((div) => (
          <div 
            key={div.id} 
            className="hearts"
            style={{ left: div.left }} // Use the fixed random 'left' value
          >
            ♥️
          </div>
        ))}

        <div className='hpContainer'>
          <h1>
            <img className="leftImg" src={hearts} alt="My Image" />
            be<br />mine
            <img className="rightImg" src={hearts} alt="My Image" />
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
  )
}

export default Home;
