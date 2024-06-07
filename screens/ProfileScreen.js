import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const ProfileScreen = () => {
  const [fontsLoaded] = useFonts({
    'LexendDeca': require('../assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
    'LaBelleAurore': require('../assets/fonts/LaBelleAurore.ttf'),
  });

  let followers = 100;
  let following = 250;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
      </View>
      <LinearGradient
        colors={['#353535', '#407855']}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.greyContainer}>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg?cs=srgb&dl=pexels-jibarofoto-1759530.jpg&fm=jpg' }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>DJ UNICODE</Text>
          <View style={styles.textcontentcontainer}>
            <Text style={styles.textcontent}>{followers} Followers   |</Text>
            <Text style={styles.textcontent}>{following} posts</Text>
          </View>
          <View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity style={[styles.button, { marginVertical: 20 }]}>
                <Text style={styles.buttontext}> Follow </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textcontent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 0,
    paddingLeft: 20,
  },
  header: {
    fontSize: 40,
    color: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 110, // Adjust top position to start after the header
    bottom: 0,
  },
  scrollContent: {
    paddingTop: 0,
    marginTop: 0, // Adjust padding to ensure content starts after the header
  },
  greyContainer: {
    backgroundColor: '#808080',
    margin: 0,
    padding: 10,
    alignItems: 'center',
    height: 140,
  },

  card: {
    backgroundColor: '#141414', // Black color
    borderRadius: 30,
    margin: 0,
    elevation: 3, // Adjust this to move the card below the avatar
    marginTop: -20, // Adjust this to overlap with the greyContainer
  },

 avatarContainer: {
  position: 'absolute',
  top: 70, // Adjust this to position the avatar correctly
  left: 150, // Adjust this to position avatar correctly
  zIndex: 1, // Ensure avatar is on top of the card
},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Ensure it's a perfect circle
  },
  text: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 60, // Adjust this to account for the avatar
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'LexendDeca',
  },
  textcontentcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textcontent: {
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttontext: {
    color: '#407855',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
  },
  button: {
    shadowColor: 'white', // IOS
    shadowOffset: { height: -1, width: 3 }, // IOS (negative width for left shadow)
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    borderRadius: 20,
    elevation: 5, // Android
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
