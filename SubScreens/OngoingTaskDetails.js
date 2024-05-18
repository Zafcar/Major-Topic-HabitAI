import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
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
        value={totalSubTasks == 0 ? 0 : (progress / totalSubTasks) * 100}
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

function EditSubTask({
  text,
  index,
  tick,
  updateTick,
  updateEdited,
  updateSubTask,
  removeSubTask,
  updateProgress,
}) {
  return (
    <>
      <TextInput
        style={styles.subTaskButtonText}
        defaultValue={text}
        autoFocus={true}
        onSubmitEditing={(value) => {
          updateSubTask(value.nativeEvent.text, index);
          updateEdited();
        }}
      />
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          removeSubTask(index);
          updateEdited();
          tick ? [updateProgress(-1), updateTick()] : updateProgress(0);
        }}
      >
        <FontAwesome5 name={"trash"} size={14} color="white" />
      </TouchableOpacity>
    </>
  );
}

function DisplaySubTask({ text, tick, updateTick, updateProgress }) {
  return (
    <>
      <Text style={styles.subTaskButtonText}>{text}</Text>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          [updateTick(), tick ? updateProgress(-1) : updateProgress(+1)];
        }}
      >
        <FontAwesome5
          name={tick ? "check" : "circle"}
          size={14}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
}

function Subtask({
  text,
  index,
  updateSubTask,
  removeSubTask,
  progress,
  updateProgress,
}) {
  const [tick, setTick] = useState(false);
  const updateTick = () => {
    setTick(!tick);
  };

  const [edited, setEdited] = useState(false);
  const updateEdited = () => {
    setEdited(!edited);
  };

  return (
    <TouchableOpacity
      style={[styles.subTaskRow]}
      onLongPress={() => {
        updateEdited();
      }}
    >
      {edited ? (
        <EditSubTask
          text={text}
          index={index}
          tick={tick}
          updateTick={updateTick}
          updateEdited={updateEdited}
          updateSubTask={updateSubTask}
          removeSubTask={removeSubTask}
          updateProgress={updateProgress}
        />
      ) : (
        <DisplaySubTask
          text={text}
          tick={tick}
          updateTick={updateTick}
          progress={progress}
          updateProgress={updateProgress}
        />
      )}
    </TouchableOpacity>
  );
}

function SubTasks({
  progress,
  updateProgress,
  subTasks,
  addSubTask,
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

      {click ? (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 60,
          }}
        >
          <TextInput
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 16,
            }}
            autoFocus={true}
            onSubmitEditing={(value) => {
              addSubTask(value.nativeEvent.text);
              updateClick(click);
            }}
          />
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => {
              updateClick(click);
            }}
          >
            <FontAwesome5 name={"trash"} size={14} color="white" />
          </TouchableOpacity>
        </View>
      ) : null}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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

// TODO: Need to add comments.
function TaskDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [subTasks, setSubTasks] = useState([
   
  ]);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await fetch("http://172.27.64.24:3000/sub-tasks", {
  //         headers: {
  //           // Accept: "application/vnd.api+json",
  //           // "Content-Type": "application/vnd.api+json",
  //           Authorization: `Bearer 6oj_yBGN2fo37WojHArhzKEnb5-Hs_FYpUgHSUH5zAFDP7GsW8PFatPaqYGk`,
  //         },
  //         body: JSON.stringify({
  //           "data": {
  //               "attributes": {
  //                   "task_id": 3
  //               }
  //           }
  //         })
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const json = await response.json();
  //       setSubTasks(json);
  //     } catch (error) {
  //       console.error("Fetching tasks failed:", ercurrentDateror);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://172.27.64.24:3000/sub-tasks';
      const data = {
        "data": {
          "attributes": {
              "task_id": 3
          }
      }
      };

      try {
        const response = await axios.get('http://172.27.64.24:3000/sub-tasks', {
          params: {
            "data": {
            "attributes": {
              "task_id": 3
            }
         }
          }, 
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer 6oj_yBGN2fo37WojHArhzKEnb5-Hs_FYpUgHSUH5zAFDP7GsW8PFatPaqYGk`,
        }
          
      })

      setSubTasks(response.data);
      } catch (error) {
        console.error('Axios error:', error);
      }
    };

    fetchData();
  }, []);



  console.log(subTasks);

  const [description, setDescription] = useState(route.params.description);

  
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

  const [progress, setProgress] = useState(0);
  const updateProgress = (value) => {
    setProgress(progress + value);
  };

  const [click, setClick] = useState(false);
  const updateClick = (click) => {
    setClick(!click);
  };

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Task Details"} />
      {/* // ! Make sure the date formate is proper while passing the value. */}
      <MainTaskDetails title={route.params.name} dueDateString = {route.params.dueDateTime} />
      <TaskDescription
        description={description}
        setDescription={setDescription}
      />

      <ProgressStatus progress={progress} totalSubTasks={subTasks.length} />
      <SubTasks
        progress={progress}
        updateProgress={updateProgress}
        subTasks={subTasks}
        addSubTask={addSubTask}
        updateSubTask={updateSubTask}
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
