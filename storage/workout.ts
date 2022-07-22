import { containsKey, getData, storeData } from ".";
import data from "../data.json";
import { Workout } from "../types/data";

export const initWorkout = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    await storeData("workout-data", data);
    return true;
  }
  return false;
};

export const getWorkout = async (): Promise<Workout[]> => {
  try {
    const value = await getData("workout-data");
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.error(error.message);
  }
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkout();
  return workouts.find((workout) => workout.slug === slug);
};
