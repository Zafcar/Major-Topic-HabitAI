import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule</Text>
      </View>
      <View style={styles.content}>
        <CalendarDates />
        <DateTasks />
      </View>
    </View>
  );
}

function CalendarDates() {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const daysInMonths = new Date(currentYear, currentMonth + 1, 0).getDate();

  const initialScrollX = (currentDate - 1) * 80;

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>Today</Text>
      <View style={styles.weekContainer}>
        <ScrollView
          horizon
          horizontal
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: initialScrollX, y: 0 }}
        >
          {Array.from({ length: Number(daysInMonths) }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                index + 1 == currentDate ? styles.currentDayButton : null,
              ]}
            >
              <Text key={index} style={styles.dateText}>
                {index + 1}
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
    color: "white",
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
    color: "white",
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
    color: "white",
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
    color: "white",
  },
});

export default CalendarScreen;
