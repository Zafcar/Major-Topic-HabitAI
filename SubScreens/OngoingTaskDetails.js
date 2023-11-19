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
import { TextInput } from "react-native-gesture-handler";

import CircularProgress from "react-native-circular-progress-indicator";

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
          {/* // ! Make sure that due date displays as the one in figma */}
          <Text style={styles.dueDateText}>Due Date</Text>
          <Text style={styles.dueDate}>{dueDateString}</Text>
        </View>
      </View>
    </>
  );
}

function TaskDescription({ description, setDescription }) {
  return (
    <>
      <Text style={styles.heading}>Description</Text>
      <View style={styles.projectDetails}>
        <TextInput
          style={styles.projectText}
          multiline
          onChangeText={(text) => setDescription(text)}
        >
          {description}
        </TextInput>
      </View>
    </>
  );
}

function ProgressStatus({ progress, totalSubTasks }) {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressHeading}>Progress</Text>

      <CircularProgress
        value={(progress / totalSubTasks) * 100}
        radius={30}
        duration={500}
        progressValueColor={"black"}
        maxValue={100}
        valueSuffix={"%"}
        titleColor={"black"}
      />
    </View>
  );
}

// TODO: Need to refactor this.
function Subtask({
  text,
  index,
  updateSubTask,
  removeSubTask,
  progress,
  updateProgress,
}) {
  const [tick, setTick] = useState(false);
  const [edited, setEdited] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.subTaskRow]}
      onLongPress={() => {
        setEdited(!edited);
      }}
    >
      {edited ? (
        <>
          <TextInput
            style={styles.subTaskButtonText}
            defaultValue={text}
            autoFocus={true}
            onSubmitEditing={(value) => {
              updateSubTask(value.nativeEvent.text, index);
              setEdited(!edited);
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => {
              removeSubTask(index);
              setEdited(!edited);
            }}
          >
            <FontAwesome5 name={"trash"} size={14} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subTaskButtonText}>{text}</Text>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => {
              [
                setTick(!tick),
                tick
                  ? updateProgress(progress, -1)
                  : updateProgress(progress, +1),
              ];
            }}
          >
            <FontAwesome5
              name={tick ? "check" : "circle"}
              size={14}
              color="white"
            />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
}

function SubTasks({
  progress,
  updateProgress,
  subTasks,
  addingSubTask,
  updateSubTask,
  removeSubTask,
  click,
  updateClick,
}) {
  return (
    <>
      <View style={styles.subTaskHeader}>
        <Text style={styles.subTaskHeading}>Sub Tasks</Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => updateClick(click)}
        >
          <FontAwesome5 name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* // TODO: Need to add styles to inputText tag */}
      {click ? (
        <TextInput
          autoFocus={true}
          onSubmitEditing={(value) => {
            addingSubTask(value.nativeEvent.text);
            updateClick(click);
          }}
        ></TextInput>
      ) : null}

      <ScrollView style={styles.scrollContainer}>
        {subTasks.map((text, index) => (
          <Subtask
            text={text}
            index={index}
            updateSubTask={updateSubTask}
            removeSubTask={removeSubTask}
            progress={progress}
            updateProgress={updateProgress}
            key={index}
          />
        ))}
      </ScrollView>
    </>
  );
}

// TODO: Need to fix home screen navigation.
function TaskDetailsScreen() {
  const navigation = useNavigation();
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );

  const [subTasks, setSubTasks] = useState([
    "Make the ppt",
    "Ensure functioning of Front End",
    "Enter Project Timeline Details",
    "Presentation to Panel",
    "Post Review Discussion with Guide",
  ]);
  const addingSubTask = (newSubTask) => {
    setSubTasks([...subTasks, newSubTask]);
  };
  const updatingSubTask = (updatedSubTask, index) => {
    const tempArray = [...subTasks];
    tempArray[index] = updatedSubTask;
    setSubTasks(tempArray);
  };
  const removeSubTask = (index) => {
    const tempArray = subTasks.filter((_, i) => i !== index);
    setSubTasks(tempArray);
  };

  const [progress, setProgress] = useState(0);
  const updateProgress = (progress, value) => {
    setProgress(progress + value);
  };

  const [click, setClick] = useState(false);
  const updateClick = (click) => {
    setClick(!click);
  };

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        setClick(false);
      }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Task Details"} />
      {/* // ! Make sure the date formate is proper while passing the value. */}
      <MainTaskDetails title="Review 1" dueDateString="7/11/2023" />
      <TaskDescription
        description={description}
        setDescription={setDescription}
      />

      <ProgressStatus progress={progress} totalSubTasks={subTasks.length} />
      <SubTasks
        progress={progress}
        updateProgress={updateProgress}
        subTasks={subTasks}
        addingSubTask={addingSubTask}
        updateSubTask={updatingSubTask}
        removeSubTask={removeSubTask}
        click={click}
        updateClick={updateClick}
      />
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
  projectText: {
    height: 100,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 5,
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    flex: 2,
    height: 60,
    fontSize: 22,
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
