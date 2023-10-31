import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

// ?
import HomeScreen from "./homescreen";
import CreateTaskScreen from "./Createtaskscreen";

function CalendarLayout() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("homeScreen")}
      >
        <Icon name="arrow-left" size={24} color="#0466C8" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule</Text>
      </View>
      <View style={styles.content}>
        <CalendarDates />
        <DateTasks />
        <CircleButton navigation={navigation} />
      </View>
    </View>
  );
}

function getSevenDayList(currentDay, currentDaysInMonths, currentMonth) {
  const sevenDay = [];
  const sevenMonth = [];

  for (let i = 0; i < 7; i++) {
    const tmpDate = currentDay - 3 + i;
    sevenDay.push(
      tmpDate > currentDaysInMonths ? tmpDate % currentDaysInMonths : tmpDate
    );
    sevenMonth.push(
      tmpDate > currentDaysInMonths ? currentMonth + 1 : currentMonth
    );
  }

  return [sevenDay, sevenMonth];
}

// TODO: Need to a drop to display the entire month.
function CalendarDates() {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonths = new Date(currentYear, currentMonth + 1, 0).getDate();

  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [sevenDayList, sevenDayMonth] = getSevenDayList(
    currentDate,
    daysInMonths,
    currentMonth
  );

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>Today</Text>
      <View style={styles.weekContainer}>
        <ScrollView
          horizon
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentOffset={{ x: 90, y: 0 }}
        >
          {sevenDayList.map((element, index) => (
            <TouchableOpacity
              key={element}
              style={[
                styles.dateButton,
                element == currentDate ? styles.currentDayButton : null,
              ]}
            >
              <Text key={element} style={styles.dateText}>
                {element}
              </Text>
              <Text style={{ color: "white" }}>
                {months[sevenDayMonth[index]]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function DateTasks() {
  // Add your logic to fetch and display today's tasks
  const todayTasks = [
    "Task 1",
    "Task 2",
    "Task 3",
    // Add more tasks for today
  ];

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>Today's Tasks</Text>
      {todayTasks.map((task, index) => (
        <TouchableOpacity key={index} style={styles.taskButton}>
          <Text style={styles.taskText}>{task}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CircleButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.circleButton}
      onPress={() => navigation.navigate("createTaskScreen")}
    >
      <Icon name="plus" size={30} color="black" />
    </TouchableOpacity>
  );
}

const CalendarScreen = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="calendarLayout"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="calendarLayout" component={CalendarLayout} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="createTaskScreen" component={CreateTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  header: {
    marginTop: 30,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0466C8",
    backgroundColor: "black",
  },
  dateText: {
    fontSize: 20,
    color: "white",
  },
  currentDayButton: {
    backgroundColor: "#0466C8",
  },
  taskButton: {
    width: 385,
    height: 80,
    backgroundColor: "#0466C8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 20,
    color: "black",
  },
  circleButton: {
    width: 60,
    height: 60,
    backgroundColor: "#0466C8",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default CalendarScreen;
