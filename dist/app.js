import { activities, } from "./activities.js";
const logActivityForm = document.querySelector("form[name='log-activity']");
if (logActivityForm) {
    logActivityForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nameInput = document.getElementById("activity-name");
        const typeSelect = document.getElementById("activity-type");
        const durationInput = document.getElementById("activity-duration");
        const dateInput = document.getElementById("activity-date");
        const locationInput = document.getElementById("activity-location");
        const name = nameInput.value.trim();
        const type = typeSelect.value;
        const duration = durationInput.value;
        const date = dateInput.value;
        const location = locationInput.value.trim();
        if (!name || !duration || !date) {
            alert("Please fill in all required fields.");
            return;
        }
        const newActivity = {
            activityName: name,
            activityType: type,
            activityDuration: duration,
            activityDate: date,
            activityLocation: location,
        };
        console.log("New activity added:", newActivity);
        activities.push(newActivity);
        console.log("All activities:", activities);
        sessionStorage.setItem("activities", JSON.stringify(activities));
        logActivityForm.reset();
    });
}
let activityStarted = false;
let timerInterval = null;
let isTimerPaused = false;
const trackActivityForm = document.querySelector("form[name='track-activity']");
const activityTypeSelect = document.getElementById("track-activity-type");
const activityNameDiv = document.getElementById("activity-name-div");
const activityNameInput = document.getElementById("activity-name");
const activityLocationDiv = document.getElementById("activity-location-div");
const activityLocationInput = document.getElementById("activity-location");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const finishButton = document.getElementById("finish-button");
const timerDisplay = document.getElementById("timer-display");
activityTypeSelect.addEventListener("change", function () {
    const selectedType = activityTypeSelect.value;
    if (selectedType) {
        unHideDisplay(activityNameDiv, activityLocationDiv);
    }
    else {
        hideDisplay(activityNameDiv, activityLocationDiv);
    }
});
activityNameInput.addEventListener("input", function () {
    const activityName = activityNameInput.value;
    if (activityName && !activityStarted) {
        startButton.classList.remove("--display-none");
    }
    else {
        startButton.classList.add("--display-none");
    }
});
startButton.addEventListener("click", function () {
    unHideDisplay(pauseButton, finishButton, timerDisplay);
    hideDisplay(startButton);
    activityNameInput.disabled = true;
    activityTypeSelect.disabled = true;
    activityLocationInput.disabled = true;
    activityStarted = true;
    let seconds = 0;
    timerInterval = setInterval(() => {
        if (!isTimerPaused) {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            if (timerDisplay) {
                timerDisplay.innerText = `${minutes}:${remainingSeconds}`;
            }
        }
    }, 1000);
});
pauseButton.addEventListener("click", function () {
    isTimerPaused = !isTimerPaused;
    pauseButton.innerText = isTimerPaused ? "Resume" : "Pause";
});
finishButton.addEventListener("click", function () {
    if (activityStarted) {
        const finishDate = new Date();
        const duration = timerDisplay.innerText;
        const newActivity = {
            activityName: activityNameInput.value,
            activityType: activityTypeSelect.value,
            activityDuration: duration,
            activityDate: finishDate.toISOString(),
            activityLocation: activityLocationInput.value,
        };
        activities.push(newActivity);
        console.log("New activity added:", newActivity);
        console.log("All activities:", activities);
        sessionStorage.setItem("activities", JSON.stringify(activities));
        activityFormReset();
    }
});
trackActivityForm?.addEventListener("submit", function (e) {
    e.preventDefault();
});
function activityFormReset() {
    trackActivityForm.reset();
    hideDisplay(activityNameDiv, activityLocationDiv, timerDisplay, startButton, pauseButton, finishButton);
    activityNameInput.disabled = false;
    activityTypeSelect.disabled = false;
    activityLocationInput.disabled = false;
    activityStarted = false;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}
function hideDisplay(...elements) {
    elements.forEach((element) => {
        if (element) {
            element.classList.add("--display-none");
        }
    });
}
function unHideDisplay(...elements) {
    elements.forEach((element) => {
        if (element) {
            element.classList.remove("--display-none");
        }
    });
}
