import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";

import { TopScreenDisplay } from "../CommonFunctions/ToolBars";

function TaskTitle() {
  return (
    <>
      <Text style={styles.heading}>Task Title</Text>
      <TextInput
        style={[styles.input, styles.commonInput]}
        placeholder="text...."
      />
    </>
  );
}

function TaskDescription() {
  return (
    <>
      <Text style={styles.heading}>Task Details</Text>
      <TextInput
        style={[styles.textarea, styles.commonTextArea]}
        multiline={true}
        numberOfLines={4}
        placeholder="description...."
      />
    </>
  );
}

function DateSelector() {
  const [display, setDisplay] = useState(
    new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear()
  );

  const [tick, setTick] = useState(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.iconBox}>
        <FontAwesome5
          name="calendar"
          size={16}
          color="white"
          style={styles.icon}
        />
      </View>
      <View
        style={{
          paddingLeft: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          textAlign={"center"}
          style={styles.timeTextBox}
          onPress={() => {
            setTick(!tick);
          }}
        >
          <Text style={{ fontSize: 17 }}>{display}</Text>
        </TouchableOpacity>
        {tick ? (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={(event, value) => {
              [
                setDisplay(
                  value.getDate() +
                    "/" +
                    value.getMonth() +
                    "/" +
                    value.getFullYear()
                ),
              ];
              Platform.OS === "android" ? setTick(false) : null;
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

function TimeSelector() {
  const [display, setDisplay] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const [tick, setTick] = useState(false);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.iconBox}>
        <FontAwesome5
          name="clock"
          size={16}
          color="white"
          style={styles.icon}
        />
      </View>
      <View
        style={{
          paddingLeft: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={[styles.timeTextBox]}
          onPress={() => {
            setTick(!tick);
          }}
        >
          <Text style={{ fontSize: 25 }}>{display}</Text>
        </TouchableOpacity>
        {tick ? (
          <DateTimePicker
            mode="time"
            value={new Date()}
            onChange={(event, value) => {
              [setDisplay(value.getHours() + ":" + value.getMinutes())];
              Platform.OS === "android" ? setTick(false) : null;
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

function TimeAndDate() {
  return (
    <>
      <Text style={styles.heading}>Time & Date</Text>

      <View style={styles.dateContainer}>
        <TimeSelector />
        <DateSelector />
      </View>
    </>
  );
}

function DisplaySubTask({ text, index, removeSubTask }) {
  return (
    <View
      style={[
        styles.input,
        styles.commonInput,
        {
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        },
      ]}
    >
      <Text style={styles.subTaskButtonText}>{text}</Text>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          removeSubTask(index);
        }}
      >
        <FontAwesome5 name="trash" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function AddSubTask({ addSubTask }) {
  const [tempInput, setTempInput] = useState();
  return (
    <View
      style={[
        styles.input,
        styles.commonInput,
        {
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        },
      ]}
    >
      <TextInput
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 16,
          paddingLeft: 16,
        }}
        placeholder="text...."
        value={tempInput}
        onChange={(value) => setTempInput(value.nativeEvent.text)}
      />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          [addSubTask(tempInput), setTempInput()];
        }}
      >
        <FontAwesome5 name="plus" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function SubTasks({ subTasks, addSubTask, removeSubTask }) {
  return (
    <>
      <Text style={styles.subTaskHeading}>Add Sub Tasks</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
        >
          {subTasks.map((text, index) => (
            <DisplaySubTask
              key={index}
              text={text}
              index={index}
              removeSubTask={removeSubTask}
            />
          ))}
          <AddSubTask addSubTask={addSubTask} />
        </ScrollView>
      </KeyboardAvoidingView>
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

function CreateTaskScreen() {
  const navigation = useNavigation();

  const [subTasks, setSubTasks] = useState([]);
  const addSubTask = (newSubTask) => {
    setSubTasks([...subTasks, newSubTask]);
  };
  const updateSubTask = (updatedSubTask, index) => {
    const tempArray = [...subTasks];
    tempArray[index] = updatedSubTask;
    setSubTasks(tempArray);
  };
  const removeSubTask = (index) => {
    const tempArray = subTasks.filter((_, i) => i !== index);
    setSubTasks(tempArray);
  };

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Create New Task"} />
      <TaskTitle />
      <TaskDescription />
      <TimeAndDate />
      <SubTasks
        subTasks={subTasks}
        addSubTask={addSubTask}
        removeSubTask={removeSubTask}
      />
      <CreateButton />
    </View>
  );
}

export default CreateTaskScreen;

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
    height: 60,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 10,
    fontSize: 16,
    padding: 10,
    color: "grey",
  },
  textarea: {
    height: 100,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 10,
    fontSize: 16,
    padding: 10,
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

    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  iconBox: {
    backgroundColor: "black",
    borderRadius: 14,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 1,
    padding: 10,
  },

  icon: {
    color: "white",
  },
  timeTextBox: {
    width: 115,
    height: 48,
    borderColor: "white",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,

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
    flex: 1,
  },
  subTaskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subTaskButton: {
    flex: 1,
    height: 60,
    backgroundColor: "white",
    borderRadius: 14,
    // justifyContent: "center",
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

    borderRadius: 14,
  },
  lastButton: {
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
