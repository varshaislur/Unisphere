import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Announcements') {
              iconName = 'bullhorn';
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b22',
  },
});
