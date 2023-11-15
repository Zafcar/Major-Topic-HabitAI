import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { TopScreenDisplay } from "../CommonFunctions/ToolBars";

const subtaskrow = [
  "Make the ppt",
  "Ensure functioning of Front End",
  "Enter Project Timeline Details",
  "Presentation to Panel",
  "Post Review Discussion with Guide",
];

// TODO: Need to add time.
// TODO: Need to make the date and time dynamic and editable.
function MainTaskDetails({ title, dueDateString }) {
  return (
    <>
      <Text style={styles.heading}>{title}</Text>

      <View style={styles.dueDateContainer}>
        <View style={styles.iconBackground}>
          <FontAwesome5 name="calendar" size={20} color="white" />
        </View>
        <View style={styles.dueDateTextContainer}>
          {/* // ! Make sure that due date displays as the on show in figma */}
          <Text style={styles.dueDateText}>Due Date</Text>
          <Text style={styles.dueDate}>{dueDateString}</Text>
        </View>
      </View>
    </>
  );
}

function TaskDescription({ description }) {
  return (
    <>
      <Text style={styles.heading}>Description</Text>
      <View style={styles.projectDetails}>
        <Text style={styles.projectText}>{description}</Text>
      </View>
    </>
  );
}

// TODO: Add a circular progress bar.
// TODO: Make sure that the progress bar is dynamic based on the number of subtasks completed.
function ProgressStatus() {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressHeading}>Progress</Text>
      <Text style={styles.progressText}>60%</Text>
    </View>
  );
}

// TODO: Ability to tick and untick tasks.
function Subtask({ text, index }) {
  const [tick, setTick] = useState(false);

  return (
    <View key={index} style={styles.subTaskRow}>
      <TouchableOpacity style={styles.subTaskButton} onPress={() => {}}>
        <Text style={styles.subTaskButtonText}>{text}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          setTick(!tick);
        }}
      >
        <FontAwesome5
          name={tick ? "check" : "circle"}
          size={14}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

// TODO: Ability add new subtasks.
// TODO: Ability to delete and change subtasks when long pressed.
function SubTasks() {
  return (
    <>
      <View style={styles.subTaskHeader}>
        <Text style={styles.subTaskHeading}>Sub Tasks</Text>
        <TouchableOpacity style={styles.plusButton}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {subtaskrow.map((text, index) => (
          <Subtask text={text} index={index} />
        ))}
      </ScrollView>
    </>
  );
}

// TODO: complete realignment of toolbar, title and container.
function TaskDetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Task Details"} />
      {/* // ! Make sure the date formate is proper while passing the value. */}
      <MainTaskDetails title="Review 1" dueDateString="7/11/2023" />
      <TaskDescription description="Ensure smooth presentation of the app and our future planned work for the same." />
      <ProgressStatus />
      <SubTasks />
    </View>
  );
}

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconBackground: {
    backgroundColor: "black",
    borderRadius: 14,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dueDateTextContainer: {
    marginLeft: 10,
    flexDirection: "column",
  },
  dueDateText: {
    fontSize: 16,
  },
  dueDate: {
    fontSize: 18,
    fontWeight: "bold",
  },
  projectDetails: {
    marginTop: 20,
  },
  projectText: {
    height: 100,
    fontSize: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 14,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  progressHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },
  progressText: {
    fontSize: 18,
    marginTop: 15,
    marginRight: 18,
  },
  subTaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  subTaskHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtaskadd: {
    fontSize: 16,
    color: "black",
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  subTaskRow: {
    backgroundColor: "white",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flex: 2,
  },
  subTaskButton: {
    // width: 370,
    height: 60,

    justifyContent: "center",
  },
  subTaskButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 16,
  },
  plusButton: {
    width: 40,
    height: 40,
    backgroundColor: "#D5D5D5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginRight: 20,
  },

  circleButton: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 14,
  },
  lastButton: {
    width: 380,
    height: 67,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 14,
  },
  lastButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
