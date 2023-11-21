import { ActivityType, Activity, activities } from "./activities.js";
import { hideDisplay, unHideDisplay } from "./app.js";

const statsDisplayByDate = document.getElementById("by-date") as HTMLElement;
const statsDisplayByType = document.getElementById("by-type") as HTMLElement;
const statsDisplayByDuration = document.getElementById(
  "by-duration"
) as HTMLElement;
const statsDisplayByLocation = document.getElementById(
  "by-location"
) as HTMLElement;

const navMenuList = document.querySelector(".nav-menu__list") as HTMLElement;

statsDisplayByDate.innerHTML = generateStatsHTML("Date", activities);

const activityTypes = Array.from(
  new Set(activities.map((activity) => activity.activityType))
);
statsDisplayByType.innerHTML = generateStatsHTML("Type", activityTypes);

statsDisplayByDuration.innerHTML = generateStatsHTML(
  "Duration",
  activities.map((activity) => `${activity.activityDuration} minutes`)
);

const activityLocations = Array.from(
  new Set(activities.map((activity) => activity.activityLocation || "Unknown"))
);
statsDisplayByLocation.innerHTML = generateStatsHTML(
  "Location",
  activityLocations
);

navMenuList.addEventListener("click", function (e) {
  const target = e.target as HTMLElement;
  if (target.tagName === "A") {
    const selectedTopic = target.getAttribute("href")?.substring(1) || "";
    showStatsDisplay(selectedTopic);
  }
});

function generateStatsHTML(topic: string, data: any[]): string {
  let itemsHTML = "";

  if (topic === "Date") {
    data.sort(
      (a, b) =>
        new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
    );
    itemsHTML = data
      .map((activity) => {
        const details = `
        Date: ${activity.activityDate}<br>
        Name: ${activity.activityName}<br>
        Type: ${activity.activityType}<br>
        Duration: ${activity.activityDuration} minutes<br>
        Location: ${activity.activityLocation || "N/A"}<br>
      `;
        return `<li class="stats-display__by">${details}</li>`;
      })
      .join("");
  } else {
    itemsHTML = data.map((item) => `<li>${item}</li>`).join("");
  }

  return `<h2 class="--center-text">${topic}</h2><ul>${itemsHTML}</ul>`;
}

function showStatsDisplay(topic: string): void {
  const allStatsDisplays = document.querySelectorAll(
    ".stats-display article"
  ) as NodeListOf<HTMLElement>;

  allStatsDisplays.forEach((display) => {
    display.classList.add("--display-none");
  });

  const selectedStatsDisplay = document.querySelector(
    `.stats-display__by-${topic}`
  ) as HTMLElement;
  if (selectedStatsDisplay) {
    selectedStatsDisplay.classList.remove("--display-none");
  }
}
