import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getWorkoutBySlug } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkoutBySlug = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>();
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const onLoadData = async () => {
      setIsLoading(true);
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
      setIsLoading(false);
    };
    if (isFocused) {
      onLoadData();
    }
  }, [isFocused]);

  return { workout, isLoading };
};
