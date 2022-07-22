import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getWorkout } from "../storage/workout";
import { Workout } from "../types/data";

type WorkoutState = {
  workouts: Workout[];
  isLoading: boolean;
};

export const useWorkouts = (): WorkoutState => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const onLoadData = async () => {
      setIsLoading(true);
      const workouts = await getWorkout();
      setWorkouts(workouts);
      setIsLoading(false);
    };
    onLoadData();
  }, []);

  return { workouts, isLoading };
};
