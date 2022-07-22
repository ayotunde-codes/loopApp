import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    // Error saving data
    console.error(error.message);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.error(error.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const value = await AsyncStorage.getAllKeys();
    return value.includes(key);
  } catch (error) {
    // Error retrieving data
    console.error(error.message);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error retrieving data
    console.error(error.message);
  }
};

export const clearWorkouts = async () => {
  await removeItem("workout-data");
};
