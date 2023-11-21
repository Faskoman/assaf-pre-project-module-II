import {
  ActivityType,
  Activity,
  ActivityArray,
  activities,
} from "./activities.js";

const logActivityForm = document.querySelector(
  "form[name='log-activity']"
) as HTMLFormElement;

if (logActivityForm) {
  logActivityForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById(
      "activity-name"
    ) as HTMLInputElement;
    const typeSelect = document.getElementById(
      "activity-type"
    ) as HTMLSelectElement;
    const durationInput = document.getElementById(
      "activity-duration"
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "activity-date"
    ) as HTMLInputElement;
    const locationInput = document.getElementById(
      "activity-location"
    ) as HTMLInputElement;

    const name = nameInput.value.trim();
    const type = typeSelect.value as ActivityType;
    const duration = durationInput.value;
    const date = dateInput.value;
    const location = locationInput.value.trim();

    if (!name || !duration || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const newActivity: Activity = {
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
let timerInterval: number | null = null;
let isTimerPaused = false;

const trackActivityForm = document.querySelector(
  "form[name='track-activity']"
) as HTMLFormElement;
const activityTypeSelect = document.getElementById(
  "track-activity-type"
) as HTMLSelectElement;
const activityNameDiv = document.getElementById(
  "activity-name-div"
) as HTMLElement;
const activityNameInput = document.getElementById(
  "activity-name"
) as HTMLInputElement;
const activityLocationDiv = document.getElementById(
  "activity-location-div"
) as HTMLElement;
const activityLocationInput = document.getElementById(
  "activity-location"
) as HTMLInputElement;
const startButton = document.getElementById(
  "start-button"
) as HTMLButtonElement;
const pauseButton = document.getElementById(
  "pause-button"
) as HTMLButtonElement;
const finishButton = document.getElementById(
  "finish-button"
) as HTMLButtonElement;
const timerDisplay = document.getElementById("timer-display") as HTMLElement;

activityTypeSelect.addEventListener("change", function () {
  const selectedType = activityTypeSelect.value;

  if (selectedType) {
    unHideDisplay(activityNameDiv, activityLocationDiv);
  } else {
    hideDisplay(activityNameDiv, activityLocationDiv);
  }
});

activityNameInput.addEventListener("input", function () {
  const activityName = activityNameInput.value;

  if (activityName && !activityStarted) {
    startButton.classList.remove("--display-none");
  } else {
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
    const newActivity: Activity = {
      activityName: activityNameInput.value,
      activityType: activityTypeSelect.value as ActivityType,
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
  hideDisplay(
    activityNameDiv,
    activityLocationDiv,
    timerDisplay,
    startButton,
    pauseButton,
    finishButton
  );

  activityNameInput.disabled = false;
  activityTypeSelect.disabled = false;
  activityLocationInput.disabled = false;

  activityStarted = false;

  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

function hideDisplay(...elements: HTMLElement[]) {
  elements.forEach((element) => {
    if (element) {
      element.classList.add("--display-none");
    }
  });
}

function unHideDisplay(...elements: HTMLElement[]) {
  elements.forEach((element) => {
    if (element) {
      element.classList.remove("--display-none");
    }
  });
}
