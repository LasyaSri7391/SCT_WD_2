const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const statusText = document.getElementById("statusText");
const statusDot = document.getElementById("statusDot");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");
const lapCount = document.getElementById("lapCount");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;
let lapNumber = 0;

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
    millisecondsEl.textContent = String(milliseconds).padStart(3, "0");
}

function updateButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
    lapBtn.disabled = !isRunning;
    resetBtn.disabled = elapsedTime === 0 && !isRunning;
}

function updateStatus(text, color) {
    statusText.textContent = text;
    statusDot.style.background = color;
}

function startStopwatch() {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        formatTime(elapsedTime);
    }, 10);

    isRunning = true;

    updateStatus("Running", "#22c55e");
    updateButtons();
}

function pauseStopwatch() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;

    updateStatus("Paused", "#f59e0b");
    updateButtons();
}

function resetStopwatch() {
    clearInterval(timer);

    isRunning = false;
    elapsedTime = 0;
    lapNumber = 0;

    formatTime(0);

    lapList.innerHTML = `
        <li class="empty-state">
            No laps recorded yet.
        </li>
    `;

    lapCount.textContent = "0 Laps";

    updateStatus("Ready", "#f59e0b");
    updateButtons();
}

function addLap() {
    if (!isRunning) return;

    if (lapNumber === 0) {
        lapList.innerHTML = "";
    }

    lapNumber++;

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <strong>${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}.${millisecondsEl.textContent}</strong>
    `;

    lapList.prepend(lap);

    lapCount.textContent = `${lapNumber} ${lapNumber === 1 ? "Lap" : "Laps"}`;
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);

formatTime(0);
updateButtons();
updateStatus("Ready", "#f59e0b");