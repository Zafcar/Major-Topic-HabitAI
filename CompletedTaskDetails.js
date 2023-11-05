import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { TopScreenDisplay } from "./ToolBars";

function TaskDetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Completed Task Details"} />

      <Text style={styles.heading}>Task name</Text>

      <View style={styles.dueDateContainer}>
        <View style={styles.iconBackground}>
          <FontAwesome5 name="calendar" size={20} color="white" />
        </View>
        <View style={styles.dueDateTextContainer}>
          <Text style={styles.dueDateText}>Due Date</Text>
          <Text style={styles.dueDate}>xx-xx-xxxx</Text>
        </View>
      </View>

      <Text style={styles.heading}>Details</Text>
      <View style={styles.projectDetails}>
        <Text style={styles.projectText}>Task Details.</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressHeading}>Progress</Text>
        <Text style={styles.progressText}>100%</Text>
      </View>

      <View style={styles.subTaskHeader}>
        <Text style={styles.subTaskHeading}>Sub Tasks</Text>
        <TouchableOpacity style={styles.plusButton}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.subTaskRow}>
            <TouchableOpacity style={styles.subTaskButton} onPress={() => {}}>
              <Text style={styles.subTaskButtonText}>{`Sub task ${i}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkButton}>
              <FontAwesome5 name="check" size={14} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.lastButton}>
        <Text style={styles.lastButtonText}>Edit task</Text>
      </TouchableOpacity>
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
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconBackground: {
    backgroundColor: "black",
    borderRadius: 14,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dueDateTextContainer: {
    marginLeft: 10,
    flexDirection: "column",
  },
  dueDateText: {
    fontSize: 18,
  },
  dueDate: {
    fontSize: 18,
  },
  projectDetails: {
    marginTop: 20,
  },
  projectText: {
    width: 370,
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
    marginTop: 10,
  },
  progressHeading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15,
  },
  progressText: {
    fontSize: 18,
    marginTop: 15,
    marginRight: 15,
  },
  subTaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  subTaskHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtaskadd: {
    fontSize: 16,
    color: "purple",
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  subTaskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subTaskButton: {
    width: 370,
    height: 60,
    backgroundColor: "white",
    borderRadius: 14,
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
    marginRight: 25,
  },
  checkButton: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
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
    fontSize: 16,
  },
});