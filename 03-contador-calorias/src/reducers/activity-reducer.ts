import { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      paylaod: { newActivity: Activity };
    }
  | {
      type: "save-activeId";
      paylaod: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      paylaod: { id: Activity["id"] };
    }
  | {
      type: "restart-app";
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};
export const inititalState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = inititalState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.paylaod.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.paylaod.newActivity];
    }

    //*Logica del State

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "save-activeId") {
    return {
      ...state,
      activeId: action.paylaod.id,
    };
  }
  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.paylaod.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }
  return state;
};
