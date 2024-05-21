import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { TopScreenDisplay } from "../CommonFunctions/ToolBars";

import CircularProgress from "react-native-circular-progress-indicator";

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

function TaskDescription({ description }) {
  return (
    <>
      <Text style={styles.heading}>Description</Text>
      <View style={styles.projectDetails}>
        <Text
          style={styles.projectText}
          multiline
          onChangeText={(text) => setDescription(text)}
        >
          {description}
        </Text>
      </View>
    </>
  );
}

function ProgressStatus() {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressHeading}>Progress</Text>

      <CircularProgress
        value={100}
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

function SubTasks({ subTaskTexts }) {
  return (
    <>
      <View style={styles.subTaskHeader}>
        <Text style={styles.subTaskHeading}>Sub Tasks</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {subTaskTexts.map((text, index) => (
          <View key={index} style={styles.subTaskRow}>
            <Text style={styles.subTaskButtonText}>{text.name}</Text>

            <View style={styles.checkButton}>
              <FontAwesome5 name="check" size={14} color="white" />
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function TaskDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [subTasks, setSubTasks] = useState([]);

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

  return (
    <View style={styles.container}>
      <TopScreenDisplay
        navigation={navigation}
      />

      <MainTaskDetails title={route.params.name} dueDateString={formatDate(route.params.dueDateTime)} />

      <TaskDescription
        description={
          route.params.description
        }
      />

      <ProgressStatus />

      <SubTasks subTaskTexts={subTasks} />
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
    width: 55,
    height: 55,
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
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 10,
  },
  projectText: {
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
    marginRight: 15,
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
    marginBottom: 1,
  },
  subTaskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 10,
    height: 60,
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
  },
  checkButton: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
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
    fontSize: 20,
  },
});
