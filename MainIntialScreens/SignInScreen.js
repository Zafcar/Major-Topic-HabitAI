import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log('Signing in with email:', email, 'and password:', password);
    // Example: You might send a request to your backend server to authenticate the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D5D5',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 14,
  },
  button: {
    backgroundColor: 'black', 
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white', 
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'gray', 
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  backButtonText: {
    fontSize: 20,
    color: 'white', 
    fontWeight: 'bold',
  },
});

export default SignInScreen;