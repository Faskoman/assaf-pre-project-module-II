let activities = [];
const storedActivities = sessionStorage.getItem("activities");
if (storedActivities) {
    activities = JSON.parse(storedActivities);
}
const logActivityForm = document.querySelector("form[name='log-activity']");
if (!logActivityForm) {
    console.error("Couldn't find log activity form.");
}
else {
    logActivityForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted!");
        const nameInput = document.getElementById("activity-name");
        const typeSelect = document.getElementById("activity-type");
        const durationInput = document.getElementById("activity-duration");
        const dateInput = document.getElementById("activity-date");
        const locationInput = document.getElementById("activity-location");
        const name = nameInput.value;
        const type = typeSelect.value;
        const duration = Number(durationInput.value);
        const date = dateInput.value;
        const location = locationInput.value;
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
        // need to add reset to form after submiting
    });
}
