import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  return (
    <View>
      <Text>I am planner screens </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
