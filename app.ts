type ActivityType = "Sport" | "Study" | "Practice";

type Activity = {
  activityName: string;
  activityType: ActivityType;
  activityDuration: number;
  activityDate: string;
  activityLocation?: string;
};

type ActivityArray = Activity[];

const activities: ActivityArray = [];

function addActivity(e: Event) {
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

  activities.push(newActivity);

  console.log(activities);
}
