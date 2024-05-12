import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('Signing up with Name:', name, 'Age:', age, 'Gender:', gender, 'Date of Birth:', dob, 'Email:', email, 'Phone Number:', phoneNumber);
    // Example: You might send a request to your backend server to register the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Gender:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your gender"
          onChangeText={setGender}
          value={gender}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Date of Birth (DOB):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your DOB"
          onChangeText={setDob}
          value={dob}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#D5D5D5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 15,
    marginBottom: 20,
    left: 140,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: 350,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 14,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
    left: 140,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    left: 140,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignUpScreen;