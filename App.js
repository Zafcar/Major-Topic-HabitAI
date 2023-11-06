import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import HomeScreen from "./HomeScreen";
import CalendarScreen from "./CalendarScreen";
import TodoList from "./CreateTaskScreen";
import NotificationScreen from "./NotificationScreen";
import RewardsScreen from "./RewardsScreen";
import OngoingTaskDetails from "./OngoingTaskDetails";
import CompletedTaskDetails from "./CompletedTaskDetails";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainText, { color: "black" }]}>HabitAI</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              navigation.navigate("homeScreen");
            }}
          >
            <Text style={styles.customButtonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="rewardsScreen" component={RewardsScreen} />
        <Stack.Screen name="createTaskScreen" component={TodoList} />
        <Stack.Screen name="calendarScreen" component={CalendarScreen} />
        <Stack.Screen
          name="notificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="ongoingTaskDetails"
          component={OngoingTaskDetails}
        />
        <Stack.Screen
          name="completedTaskDetails"
          component={CompletedTaskDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D5D5D5",
  },
  mainText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
  },
  buttonWrapper: {
    width: 300,
    margin: 20,
  },
  customButton: {
    height: 60,
    borderRadius: 14,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    elevation: 14, 
  },
  customButtonText: {
    fontSize: 20,
    color: "white",
  },
});

export default App;
