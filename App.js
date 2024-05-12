import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./MainIntialScreens/SignInScreen"; 
import SignUpScreen from "./MainIntialScreens/SignUpScreen";
import HomeScreen from "./MainIntialScreens/HomeScreen"; 

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainText, { color: "black" }]}>HabitAI</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              navigation.navigate("SignIn"); 
            }}
          >
            <Text style={styles.customButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.customButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              navigation.navigate("TempHome");
            }}
          >
            <Text style={styles.customButtonText}>Temp - Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TempHome" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D5D5D5",
  },
  mainText: {
    fontSize: 50,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 70,
  },
  buttonWrapper: {
    width: 300,
    margin: 20,
  },
  customButton: {
    height: 60,
    borderRadius: 14,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    elevation: 14,
  },
  customButtonText: {
    fontSize: 20,
    color: "white",
  },
});

export default App;