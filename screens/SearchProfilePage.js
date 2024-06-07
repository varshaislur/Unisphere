import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const SearchProfilePage = ({ route }) => {
  const { profile } = route.params;

  const [fontsLoaded] = useFonts({
    'LexendDeca': require('../assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
    'LaBelleAurore': require('../assets/fonts/LaBelleAurore.ttf'),
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['black', '#923CB5']}
        style={styles.background}
      />
      <View>
        <ScrollView>
          <View style={styles.card}>
            <Text style={styles.text}>{profile.name}</Text>
            <View style={styles.textContentContainer}>
              <Text style={styles.textContent}>{profile.followers} Followers   |</Text>
              <Text style={styles.textContent}>{profile.following} Following</Text>
            </View>
            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { marginVertical: 20 }]}>
                  <Text style={styles.buttonText}>Follow</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textContent}>
                {profile.description}
              </Text>
            </View>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatar}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContent: {
    display: 'flex',
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
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
    backgroundColor: '#3C1361',
  },
  text: {
    color: 'white',
    justifyContent: 'center',
    backgroundColor: 'black',
    textAlign: 'center',
    margin: 20,
    fontSize: 20,
    fontFamily: 'LexendDeca',
  },
  card: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    margin: 10,
    marginTop: 130, 
  },
  avatarContainer: {
    position: 'absolute',
    top: 70, 
    left: '45%',
    marginLeft: -30, 
    zIndex: 1, 
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
});