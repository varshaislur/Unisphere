import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import AddPostScreen from './screens/AddPostsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignUpPage';
import SearchProfilePage from './screens/SearchProfilePage';
import FeedScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBarBackground() {
  return (
    <LinearGradient
      colors={['#353535','#000000']} // Gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={StyleSheet.absoluteFill}
    />
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'AddPosts') {
            iconName = 'plus';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Icon name={iconName} type="font-awesome" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8A56AC',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          height: 70, // Adjust height if necessary
          paddingBottom: 10,
          paddingTop: 5,
          borderRadius: 25,
          marginHorizontal: 10,
          marginBottom: 40,
          bottom: 10,
          left: 10,
          right: 10,
          overflow: 'hidden', // Ensure content does not overflow
        },
        tabBarBackground: () => <TabBarBackground />, // Add the gradient background
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AddPosts" component={AddPostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Mock authentication effect for demonstration
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // Add your authentication logic here
  //     // For example, check a token in storage
  //     setIsAuthenticated(false); // Set to true if authenticated
  //   };
  //   checkAuth();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignUpPage" component={SignupPage} />
       
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="SearchProfilePage" component={SearchProfilePage} />
       
         
          
          
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b22',
  },
});
