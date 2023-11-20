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