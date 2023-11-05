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
  return (
    <View style={styles.container}>
      <UserDisplay />
      <CompletedTasks navigation={navigation} />
      <View style={{ flex: 1 }}>
        <OngoingTasks navigation={navigation} />
      </View>
      <BottonTools navigation={navigation} currentpage={"homeScreen"} />
    </View>
  );
}

function UserDisplay() {
  const name = "Amogh Iyengar"; //Name changed here later on
  return (
    <Text style={[styles.welcomeText, { color: "black", marginTop: 40 }]}>
      Welcome {name}!!
    </Text>
  );
}

function CompletedTasks({ navigation }) {
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
        {Array.from({ length: 6 }).map((_, index) => (
          <CompletedTask key={index} count={index} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

function CompletedTask({ count, navigation }) {
  return (
    <TouchableOpacity
      style={[styles.completedButton, { borderRadius: 14 }]}
      onPress={() => navigation.navigate("completedTaskDetails")}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.buttonText,
            {
              fontWeight: "bold",
              color: "white",
              marginTop: 15,
              marginLeft: -65,
            },
          ]}
        >
          Task {count + 1}
        </Text>
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

function OngoingTasks({ navigation }) {
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
        contentContainerStyle={{}}
        style={styles.buttonContainer}
        snapToEnd={false}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <OngoingTask key={index} count={index} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ count, navigation }) {
  return (
    <TouchableOpacity
      style={styles.ongoingButtonContainer}
      onPress={() => navigation.navigate("ongoingTaskDetails")}
    >
      <View style={[styles.ongoingButton, { borderRadius: 14 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Text
            style={[
              styles.buttonText,
              {
                fontWeight: "bold",
                color: "white",
                marginLeft: 10,
                marginTop: -45,
              },
            ]}
          >
            Task {count + 1}
          </Text>
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
          Due on: xx-xx-xxxx
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
          <Text style={{ color: "black", fontSize: 18 }}>X 🏆/🔥</Text>
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
  categoryContainer: {
    marginBottom: 15,
    flex: 1,
  },
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
    alignItems: "left",
  },
  buttonText: {
    color: "#0466C8",
    fontSize: 20,
    fontWeight: "bold",
  },
});
