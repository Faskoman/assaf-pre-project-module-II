import {
  ActivityType,
  Activity,
  ActivityArray,
  activities,
} from "./activities.js";

const statsDisplayByDate = document.querySelector(
  ".stats-display__by-date"
) as HTMLElement;
const statsDisplayByType = document.querySelector(
  ".stats-display__by-type"
) as HTMLElement;
const statsDisplayByDuration = document.querySelector(
  ".stats-display__by-duration"
) as HTMLElement;
const statsDisplayByLocation = document.querySelector(
  ".stats-display__by-location"
) as HTMLElement;
