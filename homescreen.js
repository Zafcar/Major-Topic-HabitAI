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
    <View style={[styles.completedButton, { borderRadius: 10, borderColor: "#0466C8", borderWidth: 1 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.buttonText, { fontWeight: "bold", color: "black" }]}>
          Task {count + 1}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <Text style={{ flex: 1, color: "black", fontSize: 14, marginLeft: 10, fontWeight: 'bold' }}>Completed</Text>
        <Text style={{ color: "black", fontSize: 15, marginRight: 10, fontWeight: 'bold' }}>100%</Text>
      </View>
      <View style={{ height: 6, width: 135, backgroundColor: "black", marginTop: 10, marginBottom: 20, borderRadius: 5  }}></View>
    </View>
  );
}

function OngoingTasks() {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={[styles.categoryText, { color: "white", marginTop: 20 }]}>
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
    <View style={[styles.ongoingButton, { borderRadius: 10, position: "relative", borderColor: "#0466C8", borderWidth: 1 }]}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={[styles.buttonText, { fontWeight: "bold", color: "black", marginLeft: 10 }]}>
          Task {count + 1}
        </Text>
      </View>
      <View style={{ position: "absolute", top: 0, right: 0, width: "25%", height: "100%", backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
        <Text style={{ color: "#0466C8", fontSize: 18 }}>X 🏆/🔥</Text> 
      </View>
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
    backgroundColor: "#0466C8",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ongoingButton: {
    width: 384,
    height: 80,
    backgroundColor: "#0466C8",
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
