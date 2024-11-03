import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing tokens
import { Alert } from 'react-native';
import { BASE_URL } from '../secrets';


const LoginPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'LexendDeca': require('../assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username field cannot be empty";
    }
    if (!password.trim()) {
      errors.password = "Password field cannot be empty";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/login`,
          { email: username, password }
        );
  
        if (response.data.success) {
          const token = response.data.token;
  
          // Store token securely in AsyncStorage for future requests
          await AsyncStorage.setItem('token', token);
          
          Alert.alert('Success', 'Login successful!');
          setUsername("");
          setPassword("");
          setErrors({});
          navigation.replace("Main"); // Navigate to the main app screen
        } else {
          Alert.alert('Error', response.data.message || 'Login failed');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred during login');
      }
    }
  };
  

  if (!fontsLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.textthin}>Email:</Text>
        <TextInput
          style={styles.textinput}
          value={username}
          onChangeText={(value) => setUsername(value)}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

        <Text style={styles.textthin}>Password:</Text>
        <TextInput
          style={styles.textinput}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter password"
          secureTextEntry
        />

        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity onPress={handleSubmit} style={[styles.button, { marginVertical: 20 }]}>
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.textthin}>
          Don't have an account?{' '}
          <Text style={{ color: '#3C1361' }} onPress={() => navigation.replace('SignUpPage')}>
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#474747',
    borderRadius: 10,
    width: 288,
    alignItems: 'center',
  },
  text: {
    margin: 10,
    color: 'white',
    fontFamily: 'LexendDeca',
    fontSize: 30,
  },
  buttontext: {
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
  },
  textthin: {
    marginVertical: 10,
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  textinput: {
    color: 'white',
    height: 40,
    width: 237,
    borderWidth: 1,
    padding: 10,
    borderColor: '#474747',
    borderRadius: 15,
  },
  button: {
    shadowColor: 'white', // IOS
    shadowOffset: { height: -1, width: 3 }, // IOS (negative width for left shadow)
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    borderRadius: 20,
    elevation: 5, // Android
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#3C1361',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});
