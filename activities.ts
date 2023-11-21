export type ActivityType = "Sport" | "Study" | "Practice";

export type Activity = {
  activityName: string;
  activityType: ActivityType;
  activityDuration: string;
  activityDate: string;
  activityLocation?: string;
};

export type ActivityArray = Activity[];

export let activities: ActivityArray = [];

export const storedActivities = sessionStorage.getItem("activities");

if (storedActivities) {
    activities = JSON.parse(storedActivities);
  }
  