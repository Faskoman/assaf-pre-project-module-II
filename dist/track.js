document.addEventListener("DOMContentLoaded", function () {
    const trackActivityForm = document.querySelector("form[name='track-activity']");
    const activityTypeSelect = document.getElementById("track-activity-type");
    const activityNameDiv = document.getElementById("activity-name-div");
    const activityNameInput = document.getElementById("activity-name");
    const activityLocationDiv = document.getElementById("activity-location-div");
    const activityLocationInput = document.getElementById("activity-location");
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    const finishButton = document.getElementById("finish-button");
    activityTypeSelect.addEventListener("change", function () {
        const selectedType = activityTypeSelect.value;
        if (selectedType) {
            activityNameDiv.classList.remove("--display-none");
            activityLocationDiv.classList.remove("--display-none");
        }
        else {
            activityNameDiv.classList.add("--display-none");
            activityLocationDiv.classList.add("--display-none");
        }
    });
    activityNameInput.addEventListener("input", function () {
        const activityName = activityNameInput.value;
        if (activityName) {
            startButton.classList.remove("--display-none");
        }
        else {
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
