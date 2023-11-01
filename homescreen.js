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
    <Text style={[styles.welcomeText, { color: "white", marginTop: 40 }]}>
      Welcome {name}!!
    </Text>
  );
}

function CompletedTasks() {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={[styles.categoryText, { color: "white" }]}>
        Completed Tasks
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonContainer}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <CompletedTask key={index} count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function CompletedTask({ count }) {
  return (
    <View style={[styles.completedButton, { borderRadius: 10 }]}>
      <Text style={[styles.buttonText, { fontWeight: "bold", color: "black" }]}>
        Task {count + 1}
      </Text>
    </View>
  );
}

function OngoingTasks() {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={[styles.categoryText, { color: "white" }]}>
        Ongoing Tasks
      </Text>
      <ScrollView
        contentContainerStyle={{}}
        style={styles.buttonContainer}
        snapToEnd={false}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <OngoingTask key={index} count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ count }) {
  return (
    <View style={[styles.ongoingButton, { borderRadius: 10 }]}>
      <Text style={[styles.buttonText, { fontWeight: "bold", color: "black" }]}>
        Task {count + 1} X🔥
      </Text>
    </View>
  );
}

function BottonTools() {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonBar}>
      <UtilTool page="HomeScreen" icon="home" size={25} />
      <UtilTool page="SomeScreen" icon="trophy" size={25} />
      <TouchableOpacity
        style={[styles.bottomButton, styles.middleButton]}
        onPress={() => navigation.navigate("createTaskScreen")}
      >
        <View style={styles.buttonContent}>
          <Icon name="plus" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <UtilTool page="calendarScreen" icon="calendar" size={25} />
      <UtilTool page="NotificationsScreen" icon="bell" size={25} />
    </View>
  );
}

function UtilTool({ page, icon, name }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={() => navigation.navigate(page)}
    >
      <View style={[styles.buttonContent]}>
        <Icon name={icon} size={30} color="#0466C8" />
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
        <Stack.Screen name="calendarScreen" component={CalendarScreen} />
        <Stack.Screen name="createTaskScreen" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  completedButton: {
    width: 100,
    height: 100,
    backgroundColor: "#0466C8",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ongoingButton: {
    width: 375,
    height: 80,
    backgroundColor: "#0466C8",
    margin: 8,
    justifyContent: "center",
    alignItems: "left",
  },
  buttonText: {
    color: "#0466C8",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonBar: {
    justifyContent: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A2421",
    padding: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleButton: {
    backgroundColor: "#0466C8",
    width: 40,
    height: 40,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 1,
  },
  buttonContent: {
    alignItems: "center",
  },
});

export default HomeScreen;
