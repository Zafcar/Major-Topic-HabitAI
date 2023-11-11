import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import { TopScreenDisplay } from "../CommonFunctions/ToolBars";

// TODO: complete realignment of toolbar, title and container.
// TODO: fix the function naming convention.
function TaskTitle() {
  const [taskTitle, setTaskTitle] = useState("   text....");
  return (
    <>
      <Text style={styles.heading}>Task Title</Text>
      <TextInput
        style={[styles.input, styles.commonInput]}
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
      />
    </>
  );
}

function TaskDescription() {
  const [taskDetails, setTaskDetails] = useState("  description....");
  return (
    <>
      <Text style={styles.heading}>Task Details</Text>
      <TextInput
        style={[styles.textarea, styles.commonTextArea]}
        value={taskDetails}
        onChangeText={(text) => setTaskDetails(text)}
        multiline={true}
        numberOfLines={4}
      />
    </>
  );
}

// TODO: Need to Refactor this
function TimeAndDate() {
  return (
    <>
      <Text style={styles.heading}>Time & Date</Text>

      <View style={styles.dateContainer}>
        <View style={styles.iconBox}>
          <FontAwesome5
            name="clock"
            size={16}
            color="white"
            style={styles.icon}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            style={styles.timeTextBox}
            value="HH:MM:SS"
            editable={false}
          />
        </View>
        <View style={styles.iconBox}>
          <FontAwesome5
            name="calendar"
            size={16}
            color="white"
            style={styles.icon}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            style={styles.timeTextBox}
            value="DD-MM-YYYY"
            editable={false}
          />
        </View>
      </View>
    </>
  );
}

// TODO: Need to Refactor this
function SubFunctions() {
  return (
    <>
      <Text style={styles.subTaskHeading}>Add Sub Tasks</Text>
      <ScrollView style={styles.scrollContainer}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} style={styles.subTaskRow}>
            <TouchableOpacity style={styles.subTaskButton} onPress={() => {}}>
              <Text style={styles.subTaskButtonText}>{`Sub task ${i}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusButton}>
              <FontAwesome5 name="plus" size={14} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function CreateButton() {
  return (
    <TouchableOpacity style={styles.lastButton}>
      <Text style={styles.lastButtonText}>Create</Text>
    </TouchableOpacity>
  );
}

const CreateTaskPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Create New Task"} />
      <TaskTitle />
      <TaskDescription />
      <TimeAndDate />
      <SubFunctions />
      <CreateButton />
    </View>
  );
};

export default CreateTaskPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    width: 370,
    height: 60,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 10,
    fontSize: 16,
    color: "grey",
  },
  textarea: {
    width: 370,
    height: 100,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 10,
    fontSize: 16,
    color: "grey",
  },
  commonInput: {
    height: 60,
  },
  commonTextArea: {
    height: 100,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconBox: {
    backgroundColor: "black",
    borderRadius: 14,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
  },
  textBox: {
    width: 135,
    height: 41,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 14,
    fontSize: 14,
    color: "black",
  },
  icon: {
    color: "white",
  },
  timeTextBox: {
    width: 115,
    height: 41,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 14,
    fontSize: 14,
    color: "black",
  },
  subTaskHeading: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
