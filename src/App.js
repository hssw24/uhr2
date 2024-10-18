import React, { useState, useEffect } from 'react';
import './ClockApp.css'; // Importiere CSS für das Styling

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 12); // Stunden zwischen 0 und 11
  const minutes = Math.floor(Math.random() * 12) * 5; // Minuten in 5er-Schritten
  return { hours, minutes };
};

const formatTime = (hours, minutes) => {
  const formattedHours = hours === 0 ? 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

const generateTimeOptions = (correctTime) => {
  const options = new Set();
  options.add(correctTime);

  while (options.size < 6) {
    const randomTime = formatTime(Math.floor(Math.random() * 12), Math.floor(Math.random() * 12) * 5);
    options.add(randomTime);
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

const ClockApp = () => {
  const [currentTask, setCurrentTask] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [randomTime, setRandomTime] = useState(generateRandomTime());
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const correctTime = formatTime(randomTime.hours, randomTime.minutes);
    setOptions(generateTimeOptions(correctTime));
  }, [randomTime]);

  const handleOptionClick = (selectedTime) => {
    const correctTime = formatTime(randomTime.hours, randomTime.minutes);
    if (selectedTime === correctTime) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    if (currentTask < 20) {
      setCurrentTask(currentTask + 1);
      setRandomTime(generateRandomTime());
    } else {
      if (window.confirm("Möchtest du eine neue Übung starten?")) {
        resetGame();
      }
    }
  };

  const resetGame = () => {
    setCurrentTask(1);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setRandomTime(generateRandomTime());
  };

  return (
    <div className="app">
      <h1>Uhrzeit-Lernspiel</h1>
      <div className="stats">
        <p>Aufgabe: {currentTask}/20</p>
        <p>Richtig: {correctAnswers}</p>
        <p>Falsch: {wrongAnswers}</p>
      </div>

      {/* Uhr-Komponente */}
      <div className="clock">
        <div className="clock-face">
          {/* Beschriftung der Uhr */}
          <div className="number twelve">12</div>
          <div className="number three">3</div>
          <div className="number six">6</div>
          <div className="number nine">9</div>

          <div className="hour-hand" style={{ transform: `rotate(${(randomTime.hours % 12) * 30 + (randomTime.minutes / 60) * 30}deg)` }}></div>
          <div className="minute-hand" style={{ transform: `rotate(${randomTime.minutes * 6}deg)` }}></div>
          <div className="center-point"></div>
        </div>
      </div>

      {/* Buttons mit Zeitoptionen */}
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClockApp;
