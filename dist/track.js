document.addEventListener("DOMContentLoaded", function () {
    const trackActivityForm = document.querySelector("form[name='track-activity']");
    const activityTypeSelect = document.getElementById("track-activity-type");
    const activityNameInput = document.getElementById("activity-name");
    const activityLocationInput = document.getElementById("activity-location");
    const startButton = document.querySelector("button.--display-none");
    const pauseButton = document.querySelectorAll("button.--display-none")[1];
    const finishButton = document.querySelectorAll("button.--display-none")[2];
    activityTypeSelect.addEventListener("change", function () {
        const selectedType = activityTypeSelect.value;
        if (selectedType) {
            activityNameInput.classList.remove("--display-none");
            activityLocationInput.classList.remove("--display-none");
        }
        else {
            activityNameInput.classList.add("--display-none");
            activityLocationInput.classList.add("--display-none");
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
    });
    trackActivityForm?.addEventListener("submit", function (e) {
        e.preventDefault();
    });
});
