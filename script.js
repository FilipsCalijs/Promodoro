


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.querySelector("#timer").innerHTML = `

   <div class="base-timer">
        <svg
          class="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/1000/svg"
        >
          <g class="base-timer__circle">
            <circle
              class="base-timer__path-elapsed"
              cx="500"
              cy="500"
              r="400"
            ></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">${formatTime(
          timeLeft
        )}</span>
      </div>

`;

window.addEventListener("load", () => {
  const startBtn = document.getElementById("start-btn");
  const timeInput = document.getElementById("time-input");
  //   console.log(startBtn, timeInput);
  timeInput.onchange = () => {
    TIME_LIMIT = timeInput.value;
    timeInput.value = "";
  };
  startBtn.onclick = () => {
    TIME_LIMIT === 0 ? alert("Add time") : startTimer();
  };
});

function startTimer() {
  console.log("value");

  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);

    setCircleDasharray();

    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function onTimesUp() {
  clearInterval(timerInterval);
  TIME_LIMIT = 0;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}
    `;
  }

  return ` ${minutes}:${seconds}`;
}
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;

  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


// let timerInterval;
// const timerDisplay = document.getElementById("timer");
// const actionButton = document.getElementById("actionButton");
// const nextButton = document.getElementById("nextButton");
// const stageDisplay = document.getElementById("stageDisplay");
// const cycleCountDisplay = document.getElementById("cycleCount");
// const restartButton = document.getElementById("restartButton");
// const soundAlertWork = new Audio("sounds/work.mp3");
// const soundAlertChill = new Audio("sounds/chill.mp3");
// const titleElement = document.getElementById("title_text");
// const longChillFrequency = 3;

// const durations = {
//   Work: 1 * 5,
//   Chill: 1 * 3,
//   "Long Chill": 1 * 10,
// };

// let remainingSeconds = durations["Work"];
// let isTimerRunning = false;
// let stage = "Work";
// let cycleCount = 0;
// let workStagesCompleted = 0;
// let chillStagesCompleted = 0;
// let totalChillStages = 0;

// function updateTimerDisplay() {
//   const minutes = Math.floor(remainingSeconds / 60);
//   const seconds = remainingSeconds % 60;
//   timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// }

// function updateDisplay() {

//     titleElement.classList.remove("work-style", "chill-style", "long-chill-style");

//     if (stage === "Work") {
//         titleElement.innerHTML = "Time to Work";
//         titleElement.classList.add("work-style");
//     } else if (stage === "Chill") {
//         titleElement.innerHTML = "Take a Short Break";
//         titleElement.classList.add("chill-style");
//     } else if (stage === "Long Chill") {
//         titleElement.innerHTML = "Take a Long Break";
//         titleElement.classList.add("long-chill-style");
//     }

//     stageDisplay.textContent = stage;
//     cycleCountDisplay.textContent = `Cycles: ${cycleCount}`;
//     updateTimerDisplay();
//     remainingSeconds = durations[stage];
// }


  

// function switchStage() {
//   if (stage === "Work") {
//     workStagesCompleted++;
//     if (
//       workStagesCompleted % 2 === 0 &&
//       chillStagesCompleted >= longChillFrequency
//     ) {
//       stage = "Long Chill";
//       chillStagesCompleted = 0;
//     } else {
//       stage = "Chill";
//     }
//     playSound_work();
//   } else {
//     chillStagesCompleted++;
//     if (stage === "Chill" || stage === "Long Chill") {
//       cycleCount++;
//     }
//     stage = "Work";
//     playSound_chill();
//   }

//   remainingSeconds = durations[stage];
//   updateDisplay();
//   if (isTimerRunning) {
//     startTimer();
//   }
// }

// function startTimer() {
//   clearInterval(timerInterval);
//   timerInterval = setInterval(decrementTimer, 1000);
//   actionButton.textContent = "Pause";
//   isTimerRunning = true;
// }

// function decrementTimer() {
//   remainingSeconds--;
//   updateTimerDisplay();
//   if (remainingSeconds <= 0) {
//     clearInterval(timerInterval);
//     timerInterval = null;
//     switchStage();
//   }
// }

// function toggleTimer() {
//   if (!isTimerRunning) {
//     startTimer();
//   } else {
//     pauseTimer();
//   }
// }

// function pauseTimer() {
//   clearInterval(timerInterval);
//   timerInterval = null;
//   actionButton.textContent = "Start";
//   isTimerRunning = false;
// }

// function restartCurrentSession() {
//   clearInterval(timerInterval);
//   timerInterval = null;
//   isTimerRunning = false;
//   actionButton.textContent = "Start";
//   remainingSeconds = durations[stage];
//   updateTimerDisplay(); 
// }

// function playSound_work() {
//     soundAlertWork.play();
// }

// function playSound_chill() {
//     soundAlertChill.play();
// }

// const settingsModal = document.getElementById("settingsModal");
// const settingsButton = document.getElementById("settingsButton");
// const span = document.getElementsByClassName("close")[0];
// const applySettingsButton = document.getElementById("applySettings");

// settingsButton.onclick = function() {
//     settingsModal.style.display = "block";
// }

// span.onclick = function() {
//     settingsModal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == settingsModal) {
//         settingsModal.style.display = "none";
//     }
// }

// document.getElementById("workDuration").addEventListener("input", validateInput);
// document.getElementById("chillDuration").addEventListener("input", validateInput);
// document.getElementById("longChillDuration").addEventListener("input", validateInput);

// function validateInput() {
//     const workDuration = parseInt(document.getElementById("workDuration").value, 10);
//     const chillDuration = parseInt(document.getElementById("chillDuration").value, 10);
//     const longChillDuration = parseInt(document.getElementById("longChillDuration").value, 10);

//     if (workDuration > 0 && chillDuration > 0 && longChillDuration > 0) {
//         document.getElementById("applySettings").disabled = false;
//     } else {
//         document.getElementById("applySettings").disabled = true;
//     }
// }

// validateInput();

// applySettingsButton.onclick = function() {
//     const workDurationInput = parseInt(document.getElementById("workDuration").value, 10) * 60;
//     const chillDurationInput = parseInt(document.getElementById("chillDuration").value, 10) * 60;
//     const longChillDurationInput = parseInt(document.getElementById("longChillDuration").value, 10) * 60;

//     if (workDurationInput > 0 && chillDurationInput > 0 && longChillDurationInput > 0) {
//         durations['Work'] = workDurationInput;
//         durations['Chill'] = chillDurationInput;
//         durations['Long Chill'] = longChillDurationInput;

//         remainingSeconds = durations[stage];
//         updateTimerDisplay();
//         settingsModal.style.display = "none";
//     } else {
//         alert("Please enter positive numbers greater than zero for all durations.");
//     }
// }


// function initializeTimer() {
//   updateDisplay();
// }

// actionButton.addEventListener("click", toggleTimer);
// restartButton.addEventListener("click", restartCurrentSession);

// window.onload = initializeTimer;

