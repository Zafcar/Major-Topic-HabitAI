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
  task_id,
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
          updateSubTask(value.nativeEvent.text, index, task_id);
          updateEdited();
        }}
      />
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          removeSubTask(index, task_id);
          updateEdited();
          tick ? [updateProgress(-1), updateTick()] : updateProgress(0);
        }}
      >
        <FontAwesome5 name={"trash"} size={14} color="white" />
      </TouchableOpacity>
    </>
  );
}

function DisplaySubTask({ text, completed, task_id, tick, updateTick, updateProgress, postProgressCompleted }) {

  // if (completed) {
  //   updateTick()
  // }

  return (
    <>
      <Text style={styles.subTaskButtonText}>{text}</Text>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => {
          [updateTick(), tick && filterCompletedTasks ? updateProgress(-1) : updateProgress(+1)];
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
  task_id,
  completed,
  updateSubTask,
  removeSubTask,
  progress,
  updateProgress,
  postProgressCompleted
}) {
  const [tick, setTick] = useState(completed);
  const updateTick = () => {
    setTick(!tick);
    postProgressCompleted(task_id)
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
          task_id={task_id}
          updateTick={updateTick}
          updateEdited={updateEdited}
          updateSubTask={updateSubTask}
          removeSubTask={removeSubTask}
          updateProgress={updateProgress}
        />
      ) : (
        <DisplaySubTask
          text={text}
          completed={completed}
          task_id={task_id}
          tick={tick}
          updateTick={updateTick}
          progress={progress}
          updateProgress={updateProgress}
          postProgressCompleted={postProgressCompleted}
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
  postProgressCompleted
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
        {subTasks.map((task, index) => (
          <Subtask
            text={task.name}
            index={index}
            task_id={task.id}
            completed={task.completed}
            updateSubTask={updateSubTask}
            removeSubTask={removeSubTask}
            progress={progress}
            updateProgress={updateProgress}
            key={index}
            postProgressCompleted={postProgressCompleted}
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
  const [subTasks, setSubTasks] = useState([]);
  const [tempSubTasks, setTempSubTasks] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const response = await axios.get(`http://172.27.64.24:3000/sub-tasks`, {
            params: {
              "data": {
                "attributes": {
                  "task_id": route.params.id
                }
              }
            }, 
            headers: {
              Accept: "application/vnd.api+json",
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer xrRybbDwy_pDaUhG8CCffJ3TYqYRp3whL7cQSYwbyFztVa7WWNJwVJRyKQxx`,
            }
            
          })
          
          setSubTasks(response.data);
        } catch (error) {
          console.error('Axios error:', error);
        }
      };
      
      fetchData();
    }, []);



  const [description, setDescription] = useState(route.params.description);

  const [tempAddTask, setTempAddTask] = useState([])

  const addSubTask = (newSubTask) => {
    postSubTask(newSubTask)
  };

  const postSubTask = async (newSubTask) => {
    try {
      const res = await fetch('http://172.27.64.24:3000/sub-tasks', {
        method: 'POST',
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer xrRybbDwy_pDaUhG8CCffJ3TYqYRp3whL7cQSYwbyFztVa7WWNJwVJRyKQxx`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              name: newSubTask,
              task_id: route.params.id,
            },
            type: "sub_tasks"
          }
        })
      });
  
      // console.log('Raw Response:', res); // Log the raw response
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/vnd.api+json')) {
        const data = await res.json(); // Attempt to parse the JSON
        // console.log('Parsed Response:', data);
        setTempAddTask(data)
        // console.log(data["data"])
        setSubTasks([...subTasks, {"completed": data["data"]["attributes"]["completed"], "created_at": data["data"]["attributes"]["created_at"], "id": data["data"]["id"], "name": data["data"]["attributes"]["name"], "task_id": data["data"]["attributes"]["task_id"], "updated_at": data["data"]["attributes"]["created_at"], "user_id": data["data"]["attributes"]["user_id"], "task_id": data["data"]["attributes"]["task_id"]}])
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // console.log(tempAddTask.data.attributes)


  const deleteSubTask = (task_id) => {
    try {
      const res =  fetch(`http://172.27.64.24:3000/sub-tasks/${task_id}`, {
        method: 'DELETE',
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer xrRybbDwy_pDaUhG8CCffJ3TYqYRp3whL7cQSYwbyFztVa7WWNJwVJRyKQxx`,
        }
      });

      if (res.status === 204) { // 204 No Content is a common response for successful DELETE requests
        console.log('Delete successful');
        setResponse({ message: 'Delete successful' });
      } 
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Failed to delete data' });
    }
  };

  const putSubTask = (task_id, task_name) => {
    fetch(`http://172.27.64.24:3000/sub-tasks/${task_id}`, {
      method: 'PUT',
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer xrRybbDwy_pDaUhG8CCffJ3TYqYRp3whL7cQSYwbyFztVa7WWNJwVJRyKQxx`,
      },
      body: JSON.stringify({
        "data": {
          "id": task_id,
          "attributes": {
              "name": task_name
          },
          "type": "sub_tasks"
      }
  
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const postProgressCompleted = async (task_id) => {
    try {
      const res = await fetch('http://172.27.64.24:3000/sub-tasks/mark_complete', {
        method: 'POST',
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer xrRybbDwy_pDaUhG8CCffJ3TYqYRp3whL7cQSYwbyFztVa7WWNJwVJRyKQxx`,
        },
        body: JSON.stringify({
            "data": {
                "attributes": {
                    "sub_task_id": task_id
                }
            }        
        })
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateSubTask = (updatedSubTask, index, task_id) => {
    const tempArray = [...subTasks];
    tempArray[index].name = updatedSubTask;
    setSubTasks(tempArray);
    putSubTask(task_id, tempArray[index].name);
  };

  const removeSubTask = (index, task_id) => {
    const tempArray = subTasks.filter((_, i) => i !== index);
    setSubTasks(tempArray);
    deleteSubTask(task_id)
  };

  // console.log(subTasks.filter((task) => task.completed === true).length);

  const [progress, setProgress] = useState(subTasks.filter((task) => task.completed === true).length);
  const updateProgress = (value) => {
    setProgress(progress + value);
  };

  const [click, setClick] = useState(false);
  const updateClick = (click) => {
    setClick(!click);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  return (
    <View style={styles.container}>
      <TopScreenDisplay navigation={navigation} title={"Task Details"} />
      {/* // ! Make sure the date formate is proper while passing the value. */}
      <MainTaskDetails title={route.params.name} dueDateString = {formatDate(route.params.dueDateTime)} />
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
        postProgressCompleted={postProgressCompleted}
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
