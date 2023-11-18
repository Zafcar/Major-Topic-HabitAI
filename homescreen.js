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

import CalenderScreen from "./calenderscreen";

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
  return <Text className="text-color">Welcome {name}</Text>;
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
        {Array.from({ length: 10 }).map((_, index) => (
          <CompletedTask count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function CompletedTask({ count }) {
  return (
    <View key={count} style={styles.completedButton}>
      <Text style={[styles.buttonText, { fontWeight: "bold", color: "black" }]}>
        Task {count + 1}
      </Text>
    </View>
  );
}

function OngoingTasks() {
  return (
    <View style={styles.categoriesContainer}>
      <Text className="text-stone-500 font-bold text-2xl mb-4">
        Ongoing Tasks
      </Text>
      <ScrollView
        contentContainerStyle={{}}
        className="flex flex-row flex-wrap"
        snapToEnd={false}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <OngoingTask count={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function OngoingTask({ count }) {
  return (
    <View key={count} style={styles.ongoingButton}>
      <Text className= "font-bold text-white">
        Task {count + 1}
      </Text>
    </View>
  );
}

function BottonTools() {
  return (
    <View className="flex justify-between items-center bg-gray-900 p-4 fixed bottom-0 left-0 right-0" >
      <UtilTool page="HomeScreen" icon="home" name="Home" />
      <UtilTool page="SomeScreen" icon="cog" name="Settings" />
      <TouchableOpacity style={[ styles.middleButton]} className="flex flex-wrap justify-center item-center" >
        <View style={styles.buttonContent}> 
        {/* here  */}
          <Icon name="plus" size={20} color="black" />
          <Text className="text-blue-500 text-xl font-bold">Create</Text>
        </View>
      </TouchableOpacity>
      <UtilTool page="calenderScreen" icon="calendar" name="Calendar" />
      <UtilTool page="NotificationsScreen" icon="bell" name="Notis" />
    </View>
  );
}

function UtilTool({ page, icon, name }) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(page);
  };
  return (
    <TouchableOpacity key={name} className="flex justify-center item-center" onPress={onPress}>
      <View className="items-center">
        <Icon name={icon} size={30} color="#5c5bfb" />
        <Text className=" text-xs text-white ">
          {name}
        </Text>
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
        <Stack.Screen name="calenderScreen" component={CalenderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesContainer: {},
  categoryContainer: {
    marginBottom: 16,
    flex: 1,
  },
  categoryText: {
    fontSize: 22,
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
    backgroundColor: "#5c5bfb",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ongoingButton: {
    width: 400,
    height: 80,
    backgroundColor: "#5c5bfb",
    margin: 8,
    justifyContent: "center",
    alignItems: "left",
  },
  buttonText: {
    color: "#5c5bfb",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonBar: {
    justifyContent: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A2421",
    padding: 10,
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
    backgroundColor: "#5c5bfb",
    borderWidth: 1,
    borderColor: "#5c5bfb",
  },
  buttonContent: {
    alignItems: "center",
  },
  bottombuttonText: {
    fontSize: 12,
  },
});

export default HomeScreen;
