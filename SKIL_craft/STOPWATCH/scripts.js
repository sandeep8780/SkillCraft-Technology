let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const lapTimes = document.getElementById('lap-times');

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', recordLap);

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  lapTimes.innerHTML = '';
}

function recordLap() {
  if (!startTime) return;
  const lapTime = Date.now() - startTime;
  laps.push(lapTime);
  const lapElement = document.createElement('li');
  lapElement.textContent = formatTime(lapTime);
  lapTimes.appendChild(lapElement);
}

function updateDisplay() {
  const time = Date.now() - startTime;
  display.textContent = formatTime(time);
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return (
    (hours ? (hours < 10 ? "0" + hours : hours) + ":" : "") +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 10 ? "0" + milliseconds : milliseconds)
  );
}
