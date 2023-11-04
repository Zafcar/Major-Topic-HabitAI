import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./homescreen";
import TodoList from "./Createtaskscreen";

function CalendarLayout() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 50,
        }}
      >
        <View style={{ flex: 0 }}>
          <TouchableOpacity
            style={([styles.backButton], { paddingTop: 40, flex: 0 })}
            onPress={() => navigation.navigate("homeScreen")}
          >
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.header,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingRight: 20 }}>
            Schedule
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <CalendarDates />
        <DateTasks />
        <CircleButton navigation={navigation} />
      </View>
    </View>
  );
}

function getSevenDayList(currentDay, currentMonth) {
  const sevenDay = [];
  const sevenMonth = [];

  const currentYear = new Date().getFullYear();
  const currentDaysInMonths = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  const tempDate = currentDay - 3;

  for (let i = 0; i < 7; i++) {
    if (tempDate + i > currentDaysInMonths) {
      sevenDay.push((tempDate + i) % currentDaysInMonths);
      sevenMonth.push((currentMonth + 1) % 12);
    } else {
      if (tempDate + i < 1) {
        const tempDaysInMonths = new Date(
          currentYear,
          currentMonth,
          0
        ).getDate();
        sevenDay.push(tempDate + i + tempDaysInMonths);
        sevenMonth.push(currentMonth - 1 == -1 ? 11 : currentMonth - 1);
      } else {
        sevenDay.push(tempDate + i);
        sevenMonth.push(currentMonth);
      }
    }
  }

  return [sevenDay, sevenMonth];
}

function CalendarDates() {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();

  const monthList = [
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

  const [isComponentVisible, setComponentVisible] = useState(false);

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  return (
    <View style={styles.categoryContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Text style={[styles.categoryText]}>Today</Text>
        <TouchableOpacity
          onPress={toggleComponentVisibility}
          style={{
            backgroundColor: "black",
            borderRadius: 14,
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ color: "white", top: 5 }}>
            {(isComponentVisible && "Week") || isComponentVisible || "Month"}
          </Text>
        </TouchableOpacity>
      </View>
      {!isComponentVisible && (
        <DisplaySevenDayCalendar
          currentDate={currentDate}
          currentMonth={currentMonth}
          monthList={monthList}
        />
      )}
      {isComponentVisible && (
        <DisplayMonthCalendar
          currentDate={currentDate}
          currentMonth={currentMonth}
          monthList={monthList}
        />
      )}
    </View>
  );
}

function DisplaySevenDayCalendar({ currentDate, currentMonth, monthList }) {
  const [sevenDayList, sevenDayMonth] = getSevenDayList(
    currentDate,
    currentMonth
  );

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: (currentDate - 4) * 60, y: 0 }}
      >
        {sevenDayList.map((element, index) => (
          <TouchableOpacity
            key={element}
            style={[
              styles.dateButton,
              element === currentDate ? styles.currentDayButton : null,
              { marginRight: 10 },
              {
                backgroundColor: element === currentDate ? "black" : "white",
              },
            ]}
          >
            <Text
              key={element}
              style={[
                styles.dateText,
                element === currentDate
                  ? { color: "white" }
                  : { color: "black" },
              ]}
            >
              {element}
            </Text>
            <Text
              style={[
                { color: "black" },
                element === currentDate ? { color: "white" } : null,
              ]}
            >
              {monthList[sevenDayMonth[index]]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

function DisplayMonthCalendar({ currentDate, currentMonth, monthList }) {
  const currentYear = new Date().getFullYear();
  const daysInMonths = new Date(currentYear, currentMonth + 1, 0).getDate();
  const initialScrollX = (currentDate - 1) * 53;
  return (
    <>
      <View style={styles.weekContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: initialScrollX, y: 0 }}
        >
          {Array.from({ length: Number(daysInMonths) }).map((_, index) => (
            <View style={{ paddingRight: 10 }}>
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  index + 1 == currentDate ? null : styles.currentDayButton,
                ]}
              >
                <Text
                  key={index}
                  style={[
                    styles.dateText,
                    index + 1 == currentDate ? { color: "white" } : null,
                  ]}
                >
                  {index + 1}
                </Text>
                <Text
                  style={[index + 1 == currentDate ? { color: "white" } : null]}
                >
                  {monthList[currentMonth]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

function DateTasks() {
  // Add your logic to fetch and display today's tasks
  const todayTasks = [
    "Review 1",
    "Task 2",
    "Task 3",
    // Add more tasks for today
  ];

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>Today's Tasks</Text>
      {todayTasks.map((task, index) => (
        <TouchableOpacity key={index} style={styles.taskButton}>
          <View>
            <Text style={styles.taskText}>{task}</Text>
            <Text style={styles.secondLineText}> 16:00:00 - 18:00:00</Text>
          </View>
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
      <Icon name="plus" size={30} color="white" />
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
        <Stack.Screen name="createTaskScreen" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
  header: {
    marginTop: 30,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
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
    color: "black",
  },
  // weekContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  dateButton: {
    width: 44,
    height: 64,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  dateText: {
    fontSize: 20,
    color: "black",
  },
  currentDayButton: {
    backgroundColor: "white",
  },
  taskButton: {
    width: 385,
    height: 100,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 14,
    marginBottom: 8,
    borderColor: "white",
    borderWidth: 6,
    marginTop: 5,
  },
  taskText: {
    fontSize: 20,
    color: "white",
  },
  secondLineText: {
    fontSize: 13,
    color: "white",
    top: 20,
  },
  circleButton: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 5,
  },
});

export default CalendarScreen;
