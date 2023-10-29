import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    // Update the current date, month, and week when the component mounts
    const date = new Date();
    setCurrentDate(date);

    const options = { month: "long", day: "numeric" };
    setCurrentMonth(date.toLocaleDateString("en-US", options));

    const week = getWeekDates(date);
    setCurrentWeek(week);
  }, []);

  const getWeekDates = (date) => {
    const currentDay = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - currentDay);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      week.push({ date: day.getDate(), isCurrentDay: isSameDay(day, currentDate) });
    }
    return week;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule</Text>
      </View>
      <View style={styles.content}>
        <Category1 currentMonth={currentMonth} currentWeek={currentWeek} />
        <Category2 />
      </View>
    </View>
  );
}

function Category1({ currentMonth, currentWeek }) {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>Today</Text>
      <View style={styles.weekContainer}>
        {currentWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              day.isCurrentDay ? styles.currentDayButton : {},
            ]}
          >
            <Text style={styles.dateText}>{day.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Category2() {
  // Add your logic to fetch and display today's tasks
  const todayTasks = [
    "Task 1: Complete todays work :cry:",
    "Task 2: Attend the meeting",
    "Task 3: Sleep early KEKW",
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
    color: 'white',
  },
  content: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  dateText: {
    fontSize: 20,
    color: 'white',
  },
  currentDayButton: {
    backgroundColor: "#0466C8", 
  },
  taskButton: {
    width: 385,
    height: 80,
    backgroundColor: "#0466C8",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Calendar;
