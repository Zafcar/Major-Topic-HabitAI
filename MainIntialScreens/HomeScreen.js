import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BottonTools } from "../CommonFunctions/ToolBars";

function HomeScreen() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://172.27.64.24:3000/tasks", {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ns1PvtaY8SK7if6WZy3nyhNsUsnC4924v9G8eN_2GZdkDdy7m7mZtZiuimxP`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setTasks(json);
      } catch (error) {
        console.error("Fetching tasks failed:", ercurrentDateror);
      }
    };

    fetchTasks();
  }, []);

  const uncompletedTasks = tasks.filter(
    (task) =>
      task.completed === false
  );

  const navigation = useNavigation();
  const completedTaskTexts = tasks.filter(
    (task) =>
      task.completed === true
  );
  const ongoingTaskTexts = tasks.filter(
    (task) =>
      task.completed === false
  );

  return (
    <View style={styles.container}>
      <UserDisplay />
      <CompletedTasks
        navigation={navigation}
        completedTaskTexts={completedTaskTexts}
      />
      <View style={{ flex: 1 }}>
        <OngoingTasks
          navigation={navigation}
          ongoingTaskTexts={ongoingTaskTexts}
        />
      </View>
      <BottonTools navigation={navigation} currentpage={"homeScreen"} />
    </View>
  );
}

function UserDisplay() {
  const name = "User!!";
  return (
    <Text
      style={{ color: "black", marginTop: 40, marginLeft: 7, marginBottom: 15 }}
    >
      <Text style={{ fontSize: 15, fontWeight: "bold", color: "#6357F4" }}>
        Welcome back
      </Text>
      {"\n"}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
    </Text>
  );
}

function CompletedTasks({ navigation, completedTaskTexts }) {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={[styles.categoryText, { color: "black", marginLeft: 5 }]}>
        Completed Tasks
      </Text>
      <Text
        style={{
          color: "#6357F4",
          fontSize: 16,
          position: "absolute",
          right: 22,
          bottom: 173,
          fontWeight: "bold",
        }}
      >
        See all
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonContainer}
      >
        {completedTaskTexts.map((text, index) => (
          <CompletedTask
            key={index}
            text={text.name}
            navigation={navigation}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CompletedTask({ text, navigation, index }) {
  return (
    <TouchableOpacity
      style={[styles.completedButton, { borderRadius: 14 }]}
      onPress={
        index == 0 ? () => navigation.navigate("completedTaskDetails") : null
      }
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.completedButtonText]}>{text}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 14,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          Completed
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginRight: 10,
            fontWeight: "bold",
          }}
        >
          100%
        </Text>
      </View>
      <View
        style={{
          height: 6,
          width: 135,
          backgroundColor: "#42F975",
          marginTop: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      ></View>
    </TouchableOpacity>
  );
}

function OngoingTasks({ navigation, ongoingTaskTexts}) {
  return (
    <View style={styles.categoriesContainer}>
      <Text
        style={[
          styles.categoryText,
          { color: "black", marginTop: 20, marginLeft: 5 },
        ]}
      >
        Ongoing Tasks
      </Text>
      <Text
        style={{
          color: "#6357F4",
          fontSize: 16,
          position: "absolute",
          right: 22,
          top: 25,
          fontWeight: "bold",
        }}
      >
        See all
      </Text>
      <ScrollView style={{ flexDirection: "column" }}>
        {ongoingTaskTexts.map((text, index) => (
          <OngoingTask
            key={index}
            id={text.id}
            text={text.name}
            description={text.description}
            dueDateTime={text.dueDateTime}
            navigation={navigation}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ id, text, description, dueDateTime, navigation, index }) {
  return (
    <TouchableOpacity
      style={styles.ongoingButtonContainer}
      onPress={ () =>
        {
          navigation.navigate("ongoingTaskDetails", {
            id: id,
            name: text,
            description: description,
            dueDateTime: dueDateTime,
          })
        }
      }
    >
      <View style={[styles.ongoingButton, { borderRadius: 14 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Text style={[styles.ongoingButtonText]}>{text}</Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 13,
            marginLeft: 10,
            position: "absolute",
            bottom: 12,
          }}
        >
          Due on: {dueDateTime}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 35,
            right: 15,
            bottom: 4,
            width: "25%",
            height: "40%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "black", fontSize: 18 }}>X 🔥/🏆</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D5D5",
    padding: 16,
  },
  categoriesContainer: {},
  categoryText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  completedButton: {
    width: 150,
    height: 150,
    backgroundColor: "black",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ongoingButton: {
    flex: 1,
    height: 120,
    backgroundColor: "black",
    margin: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonText: {
    color: "#0466C8",
    fontSize: 20,
    fontWeight: "bold",
  },
  ongoingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginBottom: 50,
  },
  completedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
