import { FontAwesome } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "../components/Modal";
import PressableText from "../components/PressableText";
import WorkoutItem from "../components/WorkoutItem";
import { useCountDown } from "../hooks/useCountDown";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { ExerciseSequenceItem } from "../types/data";
import { formatSec } from "../utils/time";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};
type Navigation = NativeStackHeaderProps & DetailParams;
export default function WorkoutDetailScreen({ route }: Navigation) {
  const { workout } = useWorkoutBySlug(route.params.slug);
  const [sequence, setSequence] = useState<ExerciseSequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);

  const countDown = useCountDown(
    trackerIdx,
    trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
  );

  useEffect(() => {
    if (!workout) {
      return;
    }

    if (trackerIdx === workout.sequence.length - 1) {
      return;
    }
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    setSequence([...sequence, workout!.sequence[idx]]);
    setTrackerIdx(idx);
  };

  if (!workout) {
    return null;
  }
  return (
    <View style={styles.container}>
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText text="Check Sequence" onPress={handleOpen} />
          )}
        >
          <View>
            {workout.sequence.map((si, index) => (
              <View style={styles.sequenceItem} key={si.slug}>
                <Text>
                  {si.name} | {si.type} | {formatSec(si.duration)}
                </Text>
                {index !== workout.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} />
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>
      <View style={styles.centerView}>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        )}
        {sequence.length > 0 && countDown >= 0 && (
          <View>
            <Text style={{ fontSize: 55 }}>{countDown}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  sequenceItem: {
    alignItems: "center",
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});
