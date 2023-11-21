import {
  ActivityType,
  Activity,
  ActivityArray,
  activities,
} from "./activities.js";

const logActivityForm = document.querySelector(
  "form[name='log-activity']"
) as HTMLFormElement;

if (!logActivityForm) {
  console.error("Couldn't find log activity form.");
} else {
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
    const duration = Number(durationInput.value);
    const date = dateInput.value;
    const location = locationInput.value.trim();

    if (!name || isNaN(duration) || !date) {
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

document.addEventListener("DOMContentLoaded", function () {
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

  activityTypeSelect.addEventListener("change", function () {
    const selectedType = activityTypeSelect.value;

    if (selectedType) {
      activityNameDiv.classList.remove("--display-none");
      activityLocationDiv.classList.remove("--display-none");
    } else {
      activityNameDiv.classList.add("--display-none");
      activityLocationDiv.classList.add("--display-none");
    }
  });

  activityNameInput.addEventListener("input", function () {
    const activityName = activityNameInput.value;

    if (activityName) {
      startButton.classList.remove("--display-none");
    } else {
      startButton.classList.add("--display-none");
    }
  });

  startButton.addEventListener("click", function () {
    pauseButton.classList.remove("--display-none");
    finishButton.classList.remove("--display-none");
    startButton.classList.add("--display-none");
  });

  trackActivityForm?.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});
