import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

import CalendarScreen from "./Calendarscreen";
import TodoList from "./Createtaskscreen";
import NotificationScreen from "./Notificationscreen";
import RewardsScreen from "./Rewardsscreen";

function HomeLayout() {
  return (
    <View style={styles.container}>
      <UserDisplay />
      <CompletedTasks />
      <View style={{ flex: 1 }}>
        <OngoingTasks />
      </View>
      <BottonTools />
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

function CompletedTasks() {
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
          <CompletedTask key={index} count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function CompletedTask({ count }) {
  return (
    <View style={[styles.completedButton, { borderRadius: 14 }]}>
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
    </View>
  );
}

function OngoingTasks() {
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
          <OngoingTask key={index} count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ count }) {
  return (
    <View style={styles.ongoingButtonContainer}>
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
    </View>
  );
}

function BottonTools() {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonBar}>
      <UtilTool page="HomeScreen" icon="home" size={15} />
      <UtilTool page="rewardsScreen" icon="trophy" size={15} />
      <TouchableOpacity
        style={styles.middleButton}
        onPress={() => navigation.navigate("createTaskScreen")}
      >
        <View style={styles.middleButtonContent}>
          <Icon name="plus" size={24} color="white" style={styles.plusIcon} />
        </View>
      </TouchableOpacity>
      <UtilTool page="calendarScreen" icon="calendar" size={15} />
      <UtilTool page="notificationScreen" icon="bell" size={15} />
    </View>
  );
}

function UtilTool({ page, icon }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={() => navigation.navigate(page)}
    >
      <View style={styles.buttonContent}>
        <Icon name={icon} size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const HomeScreen = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="homeLayout"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="homeLayout" component={HomeLayout} />
        <Stack.Screen name="rewardsScreen" component={RewardsScreen} />
        <Stack.Screen name="createTaskScreen" component={TodoList} />
        <Stack.Screen name="calendarScreen" component={CalendarScreen} />
        <Stack.Screen
          name="notificationScreen"
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
  buttonBar: {
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    position: "absolute",
    bottom: 10,
    left: 5,
    right: 5,
    borderRadius: 14,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bottomButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleButton: {
    backgroundColor: "black",
    width: 50, // Increased width to make it a circle
    height: 50, // Increased height to make it a circle
    borderRadius: 25, // Added borderRadius to make it a circle
    overflow: "hidden",
    marginBottom: 1,
  },
  middleButtonContent: {
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 24, // Reduce the thickness
    marginTop: 12, // Adjust the vertical alignment
  },
});

export default HomeScreen;
