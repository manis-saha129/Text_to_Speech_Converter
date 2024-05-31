import React, { useEffect, useRef, useState } from 'react';

const TextToSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechText, setSpeechText] = useState('');
  const speech = useRef(new SpeechSynthesisUtterance());

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
        speech.current.voice = availableVoices[0];
      }
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (e) => {
    const selected = voices[e.target.value];
    setSelectedVoice(selected);
    speech.current.voice = selected;
  };

  const handleSpeak = () => {
    speech.current.text = speechText;
    window.speechSynthesis.speak(speech.current);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  };

  const handleResume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  const handleCancel = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="hero">
      <h1>Text to Speech <span>Converter</span></h1>
      <textarea
        placeholder="Write anything here..."
        value={speechText}
        onChange={(e) => setSpeechText(e.target.value)}
      ></textarea>
      <div className="row">
        <select onChange={handleVoiceChange}>
          {voices.map((voice, index) => (
            <option key={index} value={index}>{voice.name}</option>
          ))}
        </select>
      </div>
      <div className="btn">
        <button id="speak" onClick={handleSpeak}>Speak</button>
        <button id="pause" onClick={handlePause}>Pause</button>
        <button id="resume" onClick={handleResume}>Resume</button>
        <button id="cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TextToSpeech;
