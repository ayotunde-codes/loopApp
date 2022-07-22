import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { initWorkout } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const onLoadData = async () => {
      try {
        await initWorkout();
        await Font.loadAsync({
          montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    };

    onLoadData();
  }, []);

  return isLoadingComplete;
}
