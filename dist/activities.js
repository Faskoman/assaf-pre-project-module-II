export let activities = [];
export const storedActivities = sessionStorage.getItem("activities");
if (storedActivities) {
    activities = JSON.parse(storedActivities);
}
