import { activities } from "./activities.js";
const statsDisplayByDate = document.getElementById("by-date");
const statsDisplayByType = document.getElementById("by-type");
const statsDisplayByDuration = document.getElementById("by-duration");
const statsDisplayByLocation = document.getElementById("by-location");
const navMenuList = document.querySelector(".nav-menu__list");
statsDisplayByDate.innerHTML = generateStatsHTML("Date", activities);
const activityTypes = Array.from(new Set(activities.map((activity) => activity.activityType || "Unknown")));
statsDisplayByType.innerHTML = generateStatsHTML("Type", activityTypes);
statsDisplayByDuration.innerHTML = generateStatsHTML("Duration", activities);
const activityLocations = Array.from(new Set(activities.map((activity) => activity.activityLocation || "Unknown")));
statsDisplayByLocation.innerHTML = generateStatsHTML("Location", activityLocations);
function generateStatsHTML(topic, data) {
    let itemsHTML = "";
    if (topic === "Date") {
        data.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime());
        itemsHTML = data
            .map((activity) => {
            const details = `
        Date: ${activity.activityDate}<br>
        Name: ${activity.activityName}<br>
        Type: ${activity.activityType}<br>
        Duration: ${activity.activityDuration} minutes<br>
        Location: ${activity.activityLocation || "N/A"}<br>
      `;
            return `<li class="stats-display__by --card">${details}</li>`;
        })
            .join("");
    }
    else if (topic === "Duration") {
        data.sort((a, b) => b.activityDuration - a.activityDuration);
        itemsHTML = data
            .map((activity) => {
            const details = `
        Duration: ${activity.activityDuration} minutes<br>
        Name: ${activity.activityName}<br>
        Type: ${activity.activityType || "Unknown"}<br>
        Date: ${activity.activityDate}<br>
        Location: ${activity.activityLocation || "N/A"}<br>
      `;
            return `<li class="stats-display__by --card">${details}</li>`;
        })
            .join("");
    }
    else if (topic === "Type") {
        data.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime());
        itemsHTML = data
            .map((activity) => {
            const details = `
        Date: ${activity.activityDate}<br>
        Type: ${activity.activityType}<br>
        Name: ${activity.activityName}<br>
        Duration: ${activity.activityDuration} minutes<br>
        Location: ${activity.activityLocation || "N/A"}<br>
      `;
            return `<li class="stats-display__by --card">${details}</li>`;
        })
            .join("");
    }
    else {
        itemsHTML = data.map((item) => `<li>${item}</li>`).join("");
    }
    return `<h2 class="--center-text">${topic}</h2><ul>${itemsHTML}</ul>`;
}
