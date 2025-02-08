import React, { useState, useEffect } from 'react';
import kitten from '../images/kitten.gif';
import yesImage from '../images/yes.gif';
import until from '../music/until.mp3';

function Prop() {

  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // WhatsApp API URL format
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
  };

  const [image, setImage] = useState(kitten);
  const noOptions = [
    'NO 😒', 'NAH 😞', 'REALLY? 😐', 'ARE YOU SURE? 🫠', 
    'HAVE A HEART 😭', 'BE MY TEA BUDDY?', 'ARE YOU SURE ABOUT THAT? 🧐', 
    'IS THIS YOUR FINAL ANSWER? 💭', 'HAHA! YOU DO NOT HAVE A CHOICE 😎'
  ];
  
  const [yes, setYes] = useState(true);
  const [msgDisplay, setMsgDisplay] = useState(false);
  const [no, setNo] = useState(0);

  useEffect(() => {
    // Check localStorage to see if the user has answered the question
    const hasAnswered = localStorage.getItem('hasAnswered');
    const musicPlayed = localStorage.getItem('musicPlayed');

    if (hasAnswered === 'true') {
      // Hide the options and play the music
      setYes(false);
      setImage(yesImage);
      const untilAudio = document.getElementById('untilMusic');
      if (musicPlayed === 'true') {
        untilAudio.play();
      }
    }
  }, []);

  const yesClick = (e) => {
    e.preventDefault();
    const untilAudio = document.getElementById('untilMusic');
    const val = document.querySelector('.val');
    val.classList.add('opacity');
    
    // Save the state to localStorage
    localStorage.setItem('hasAnswered', 'true');
    localStorage.setItem('musicPlayed', 'true');
    
    setYes(false);
    setMsgDisplay(true);
    setImage(yesImage);
    untilAudio.play();
  };

  const noClick = (e) => {
    e.preventDefault();
    if (no < noOptions.length - 1) {
      setNo(no + 1);
      console.log(no);
    } else {
      setImage(yesImage);
      setMsgDisplay(true);
      const val = document.querySelector('.val');
      val.classList.add('opacity');
      const untilAudio = document.getElementById('untilMusic');
      
      // Save the state to localStorage
      localStorage.setItem('hasAnswered', 'true');
      localStorage.setItem('musicPlayed', 'true');
      
      untilAudio.play();
    }
  };

  return (
    <>
    
      <div className='val'>
        <div className='valContainer'>
          <h1>Will you be my<br /> Valentine?</h1>
          <div className="options">
            {no < noOptions.length - 1 && (
              <a href='#' onClick={yesClick}>YES ❤️</a>
            )}

            {yes && (
              <a href='#' onClick={noClick}>{noOptions[no]}</a>
            )}
          </div>
          <img src={image} alt="valentine" />
        </div>
      </div>
      <audio id='untilMusic' autoPlay loop hidden >
        <source src={until} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {msgDisplay && (
      <div className='message'>
      
      <input
        type="text"
        placeholder="Type a message for me"
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
      )}

    </>
  );
}

export default Prop;
