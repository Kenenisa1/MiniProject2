import React, { useState, useEffect, useRef } from 'react';
import './TimerStyle.css';

const Timer = () => {
    const [time, setTime] = useState(0); 
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };


    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 100); 
            }, 100);
        }
    };

    const pauseTimer = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTime(0);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="timer-container">
            <h1>Set a Timer Until Your Order Arrives</h1>
            <h1 id="PlayTimer">
                {formatTime(time)}
            </h1>
            <div className="buttons">
                {!isRunning ? (
                    <button id="play" onClick={startTimer}>Start</button>
                ) : (
                    <button id="pause" onClick={pauseTimer}>Pause</button>
                )}
                <button id="reset" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;