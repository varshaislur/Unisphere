import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const AddPostScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!selectedImage || !caption) {
      Alert.alert('Error', 'Please select an image and write a caption.');
      return;
     
    }
     

    // Add the logic to upload the post
    console.log('Post:', { image: selectedImage, caption });

    // Show the success alert
    Alert.alert('Success', 'Image posted successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset the form
          setSelectedImage(null);
          setCaption('');

          // Navigate back to the feed screen
          navigation.navigate('Feed', { image: selectedImage, caption });
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#000000', '#52307c']}
      style={styles.container}
    >
      <Text style={styles.header}>Add Post</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera" size={40} color="white" />
            <Text style={styles.imagePlaceholderText}>Pick an image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        placeholderTextColor="#707070"
        value={caption}
        onChangeText={setCaption}
        multiline
      />
      <TouchableOpacity onPress={handlePost} style={styles.postButton}>
        <LinearGradient
          colors={['#663a82', '#141414']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={styles.postButtonGradient}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 40,
    color: 'white',
    marginBottom: 16,
    marginTop: 60,
    padding: 10,
  },
  imagePicker: {
    backgroundColor: '#444',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: 'white',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captionInput: {
    backgroundColor: '#444',
    borderRadius: 12,
    color: 'white',
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  postButton: {
    height: 40,
    marginLeft: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonGradient: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  postButtonText: {
    color: 'white',
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
  },
});

export default AddPostScreen;
