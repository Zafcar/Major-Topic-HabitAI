import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BottonTools } from "./ToolBars";

function HomeScreen() {
  const navigation = useNavigation();
  const completedTaskTexts = [
    "Clean the house",
    "Yoga Class",
    "ADAS Assignment",
    "Task 4",
    "Task 5",
    "Task 6",
  ];
  const ongoingTaskTexts = [
    "Review-1",
    "Week Gym",
    "Aero Assignnment",
    "Ongoing Task 4",
    "Ongoing Task 5",
    "Ongoing Task 6",
    "Ongoing Task 7",
  ];

  const dueDates = [
    "07-11-2023, 11AM - 1PM",
    "Daily, 5PM - 7PM",
    "12-11-2023",
    "aa-aa-aaaa",
    "bb-bb-bbbb",
    "cc-cc-cccc",
    "dd-dd-dddd",
  ];

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
          dueDates={dueDates}
        />
      </View>
      <BottonTools navigation={navigation} currentpage={"homeScreen"} />
    </View>
  );
}

function UserDisplay() {
  const name = "Amogh Iyengar";
  return (
    <Text style={[styles.welcomeText, { color: "black", marginTop: 40 }]}>
      Welcome {name}!!
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
          right: 20,
          bottom: 179,
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
            text={text}
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

function OngoingTasks({ navigation, ongoingTaskTexts, dueDates }) {
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
          right: 20,
          top: 25,
        }}
      >
        See all
      </Text>
      <ScrollView
        contentContainerStyle={styles.buttonContainer}
        snapToEnd={false}
      >
        {ongoingTaskTexts.map((text, index) => (
          <OngoingTask
            key={index}
            text={text}
            dueDate={dueDates[index]}
            navigation={navigation}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ text, dueDate, navigation, index }) {
  return (
    <TouchableOpacity
      style={styles.ongoingButtonContainer}
      onPress={
        index == 0 ? () => navigation.navigate("ongoingTaskDetails") : null
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
          Due on: {dueDate}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 35,
            right: 4,
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
    padding: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 40,
  },
  categoriesContainer: {},
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
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
    width: 384,
    height: 120,
    backgroundColor: "black",
    margin: 8,
    justifyContent: "center",
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
    marginLeft: 5,
    marginBottom: 50,
  },
  completedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  ongoingButtonContainer: {
    // Add any additional styles if needed for the container
  },
});
