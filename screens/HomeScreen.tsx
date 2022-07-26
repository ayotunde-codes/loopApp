import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
  const { workouts, isLoading } = useWorkouts();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Keep fit, start workout</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("WorkoutDetail", { slug: item.slug })
              }
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
      />
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
    // fontWeight: "bold",
    fontFamily: "montserrat-bold",
  },
});
