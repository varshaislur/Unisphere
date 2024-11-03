import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { BASE_URL } from '../secrets';

const SignUpPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'LexendDeca': require('../assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isCommittee, setIsCommittee] = useState(false); // New state for committee checkbox
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username field cannot be empty";
    }
    if (!password.trim()) {
      errors.password = "Password field cannot be empty";
    }
    if (password.trim() !== confirm.trim()) {
      errors.confirm = "Passwords do not match";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/register`,
          {
            username,
            email: username,
            password,
            isCommittee // Include committee status in request
          }
        );

        if (response.data.success) {
          Alert.alert('Success', 'Registration successful!');
          setUsername("");
          setPassword("");
          setConfirm("");
          setIsCommittee(false); // Reset committee checkbox
          setErrors({});
          navigation.replace("LoginPage"); // Navigate to LoginPage after successful signup
        } else {
          Alert.alert('Error', response.data.message || 'Registration failed');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred during registration');
      }
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Sign Up</Text>
        
        <Text style={styles.textthin}>Email:</Text>
        <TextInput
          style={styles.textinput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}
        
        <Text style={styles.textthin}>Password:</Text>
        <TextInput
          style={styles.textinput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        
        <Text style={styles.textthin}>Confirm Password:</Text>
        <TextInput
          style={styles.textinput}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm password"
          secureTextEntry
        />
        {errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}

        {/* New switch for committee status */}
        <View style={styles.switchContainer}>
          <Text style={styles.textthin}>Is this an official committee account?</Text>
          <Switch
            value={isCommittee}
            onValueChange={setIsCommittee}
            thumbColor={isCommittee ? "#3C1361" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#3C1361" }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { margin: 20, backgroundColor: '#3C1361' }]}
        >
          <Text style={styles.buttontext}>Sign Up</Text>
        </TouchableOpacity>
        
        <Text style={[styles.textthin, { color: '#3C1361' }]}>
          Already have an account?{' '}
          <Text style={styles.textthin} onPress={() => navigation.replace("LoginPage")}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
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
    shadowColor: 'white',
    shadowOffset: { height: -1, width: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
    margin: 20,
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 237,
    marginVertical: 10,
  },
});
