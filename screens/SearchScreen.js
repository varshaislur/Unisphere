import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import profiles from '../data/dummy_profiles.json'; // Adjust the path if necessary

const SearchPage = () => {
  const [fontsLoaded] = useFonts({
    'LexendDeca': require('../assets/fonts/LexendDeca-Black.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
    'LaBelleAurore': require('../assets/fonts/LaBelleAurore.ttf'),
  });

  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log('Search pressed');
    // Implement search logic here
  };

  const filteredProfiles = profiles.filter(profile => profile.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleFollow = (profile) => {
    navigation.navigate('SearchProfilePage', { profile });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#52307c']}
        style={styles.background}
      />
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchContainer}>
        <LinearGradient
          colors={['#141414', '#663a82']} // Gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={styles.searchInputContainer}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search Something..."
            placeholderTextColor="#707070"
            value={searchText}
            onChangeText={setSearchText}
          />
          <LinearGradient
            colors={['#663a82', '#141414']} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1.5, y: 0 }}
            style={styles.searchButton}
          >
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </View>

      <ScrollView>
        {filteredProfiles.map(profile => (
          <LinearGradient
            colors={['#663a82', '#141414']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.card}
          >
            <View key={profile.id} style={styles.card}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: profile.avatar }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.text}>{profile.name}</Text>
                <View style={styles.textContentContainer}>
                  <Text style={styles.textContent}>{profile.followers} Followers |</Text>
                  <Text style={styles.textContent}>{profile.following} Following</Text>
                </View>
                <Text style={styles.description}>{profile.description}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => handleFollow(profile)}>
                    <Text style={styles.buttonText}>Follow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  header: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
    marginTop: 40,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
  searchButton: {
    height: 40,
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
  },
  filters: {
    backgroundColor: '#2d2c35',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 20,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'LexendDeca',
  },
  textContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textContent: {
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    shadowColor: 'white',
    shadowOffset: { height: -1, width: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 20,
    elevation: 5,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C1361',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
  },
  avatarContainer: {
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
