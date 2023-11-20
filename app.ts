type ActivityType = "Sport" | "Study" | "Practice";

type Activity = {
  activityName: string;
  activityType: ActivityType;
  activityDuration: number;
  activityDate: string;
  activityLocation?: string;
};

type ActivityArray = Activity[];

let activities: ActivityArray = [];

const storedActivities = sessionStorage.getItem("activities");
if (storedActivities) {
  activities = JSON.parse(storedActivities);
}

const logActivityForm = document.querySelector("form[name='log-activity']");
if (!logActivityForm) {
  console.error("Couldn't find log activity form.");
} else {
  logActivityForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted!");

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

    const name = nameInput.value;
    const type = typeSelect.value as ActivityType;
    const duration = Number(durationInput.value);
    const date = dateInput.value;
    const location = locationInput.value;

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

    // need to add reset to form after submiting
  });
}
