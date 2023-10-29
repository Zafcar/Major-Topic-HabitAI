import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeLayout from './homescreen.js'; 

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mainText, {color: 'white'}]}>HabitAI</Text>
      <Text style={[styles.subText, {color: '#0466C8'}]}>Precision Habit Mastery</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Enter"
          color="#0466C8" 
          onPress={() => {
            navigation.navigate('HomeLayout'); 
          }}
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="HomeLayout" component={HomeLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  mainText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
  },
  buttonContainer: {
    width: 300, 
    height: 70, 
    position: 'absolute',
    bottom: 100, 
  },
});

export default App;
