import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const name = 'Amogh Iyengar'; //Name changed here later on

  return (
    <View style={styles.container}>
      <Text style={[styles.welcomeText, { color: 'white', marginTop: 40 }]}>Welcome {name}</Text>

      <View style={styles.categoriesContainer}>
        <View style={styles.categoryContainer}>
          <Text style={[styles.categoryText, { color: 'white' }]}>Completed Tasks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={styles.completedButton}>
                <Text style={[styles.buttonText, { fontWeight: 'bold', color: 'black' }]}>
                  Task {index + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={[styles.categoryText, { color: 'white' }]}>Ongoing Tasks</Text>
          <ScrollView style={styles.buttonContainer}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={styles.ongoingButton}>
                <Text style={[styles.buttonText, { fontWeight: 'bold', color: 'black' }]}>
                  Task {index + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.buttonBar}>
         <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('HomeScreen')}>
          <View style={styles.buttonContent}>
            <Icon name="home" size={30} color="#5c5bfb" />
            <Text style={[styles.bottombuttonText, {color:'white'}]}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('SomeScreen')}>
          <View style={styles.buttonContent}>
            <Icon name="cog" size={30} color="#5c5bfb" />
            <Text style={[styles.bottombuttonText, {color:'white'}]}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomButton, styles.middleButton]} onPress={() => navigation.navigate('createtask')}>
          <View style={styles.buttonContent}>
            <Icon name="plus" size={20} color="black" />
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('CalendarScreen')}>
          <View style={styles.buttonContent}>
            <Icon name="calendar" size={30} color="#5c5bfb" />
            <Text style={[styles.bottombuttonText, {color:'white'}]}>Calendar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('NotificationsScreen')}>
          <View style={styles.buttonContent}>
            <Icon name="bell" size={30} color="#5c5bfb" />
            <Text style={[styles.bottombuttonText, {color:'white'}]}>Notis</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        // Define your other screens here 
        <Stack.Screen name="CreateTask" component={CreateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  completedButton: {
    width: 100,
    height: 100,
    backgroundColor: '#5c5bfb',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ongoingButton: {
    width: 400,
    height: 80,
    backgroundColor: '#5c5bfb',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'left',
  },
  buttonText: {
    color: '#5c5bfb',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A2421',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    backgroundColor: '#5c5bfb',
    borderWidth: 1,
    borderColor: '#5c5bfb',
  },
  buttonContent: {
    alignItems: 'center',
  },
  bottombuttonText: {
    fontSize: 12, 
  },
});

export default HomeScreen;
