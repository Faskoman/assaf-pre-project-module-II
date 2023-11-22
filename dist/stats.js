import { activities } from "./activities.js";
const statsDisplayByDate = document.getElementById("by-date");
const statsDisplayByType = document.getElementById("by-type");
const statsDisplayByDuration = document.getElementById("by-duration");
const statsDisplayByLocation = document.getElementById("by-location");
const navMenuItems = document.querySelectorAll(".nav-menu__list--item");
statsDisplayByDate.innerHTML = generateStatsHTML("Date", activities);
const activityTypes = Array.from(new Set(activities.map((activity) => activity.activityType || "Unknown")));
statsDisplayByType.innerHTML = generateStatsHTML("Type", activityTypes);
statsDisplayByDuration.innerHTML = generateStatsHTML("Duration", activities);
const activityLocations = Array.from(new Set(activities.map((activity) => activity.activityLocation || "Unknown")));
statsDisplayByLocation.innerHTML = generateStatsHTML("Location", activityLocations);
const backToTopButton = document.getElementById("backToTopButton");
backToTopButton?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
navMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
        unChooseFilter(...navMenuItems);
        chooseFilter(item);
        const selectedTopic = item.innerText.toLowerCase();
        switch (selectedTopic) {
            case "date":
                statsDisplayByDate.innerHTML = generateStatsHTML("Date", activities);
                break;
            case "type":
                statsDisplayByType.innerHTML = generateStatsHTML("Type", activityTypes);
                break;
            case "duration":
                statsDisplayByDuration.innerHTML = generateStatsHTML("Duration", activities);
                break;
            case "location":
                statsDisplayByLocation.innerHTML = generateStatsHTML("Location", activityLocations);
                break;
            default:
                break;
        }
    });
});
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
    else {
        itemsHTML = data.map((item) => `<li class="--card">${item}</li>`).join("");
    }
    return `<h2 class="--center-text">${topic}</h2><ul>${itemsHTML}</ul>`;
}
function chooseFilter(...elements) {
    elements.forEach((element) => {
        if (element) {
            element.classList.add("--chosen-filter");
        }
    });
}
function unChooseFilter(...elements) {
    elements.forEach((element) => {
        if (element) {
            element.classList.remove("--chosen-filter");
        }
    });
}
