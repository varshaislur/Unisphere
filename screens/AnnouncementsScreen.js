// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementsScreen=()=> {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Announcement Screen</Text>
    </View>
  );
}
export default AnnouncementsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1b22',
  },
  text: {
    color: 'white',
  },
});
