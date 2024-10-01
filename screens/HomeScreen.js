import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import profiles from '../data/dummy_profiles.json';

const FeedScreen = ({ route }) => {
  const { image, caption } = route.params || {};
  const [showStories, setShowStories] = useState(false);
  const [showMoreMap, setShowMoreMap] = useState({});
  const [posts, setPosts] = useState([
    { type: 'stories' },
    { type: 'post', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://picsum.photos/id/237/150/150', id: '1' },
    { type: 'post', text: 'Another post with longer text to test show more functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://picsum.photos/id/250/150/150', id: '2' },
    { type: 'post', text: 'Short post.', image: 'https://picsum.photos/id/270/200/300', id: '3' }
  ]);

 useEffect(() => {
  if (image && caption) {
    setPosts(prevPosts => [...prevPosts, { type: 'post', image, text: caption, id: Date.now().toString() }]);
  }
}, [image, caption]);  

  const toggleStories = () => {
    setShowStories(!showStories);
  };

  const toggleShowMore = (id) => {
    setShowMoreMap({ ...showMoreMap, [id]: !showMoreMap[id] });
  };

  const renderStory = ({ item }) => (
    <View style={styles.storyCircle}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    </View>
  );

  const renderPost = ({ item }) => (
    <LinearGradient
      colors={['#282828', '#7c5295']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={styles.postContainer}
    >
      <Image source={{ uri: item.image }} style={styles.postContent} />
      <View style={styles.postFooter}>
        <View style={styles.postHeader}>
          <Text style={styles.postAuthor}>DJ Unicode</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.postText}>
          {showMoreMap[item.id] ? item.text : item.text.slice(0, 100)}
        </Text>
        {item.text.length > 100 && (
          <TouchableOpacity onPress={() => toggleShowMore(item.id)} style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>{showMoreMap[item.id] ? 'Show Less' : 'Show More'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'stories') {
      return (
        <View>
          <TouchableOpacity onPress={toggleStories}>
            <LinearGradient
              colors={['#282828', '#663a82']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.5, y: 0 }}
              style={styles.storiesToggle}
            >
              <Text style={styles.storiesText}>Stories</Text>
              <Ionicons name={showStories ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          {showStories && (
            <LinearGradient
              colors={['#282828', '#663a82']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.5, y: 0 }}
              style={styles.expandedStoriesContainer}
            >
              <FlatList
                data={profiles}
                renderItem={renderStory}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                style={styles.storiesList}
              />
            </LinearGradient>
          )}
        </View>
      );
    } else {
      return renderPost({ item });
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#52307c']}
      style={styles.container}
    >
      <Text style={styles.header}>Feed</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.postsList}
      />
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
  storiesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 12,
    marginBottom: 5,
  },
  storiesText: {
    color: 'white',
    fontSize: 16,
  },
  expandedStoriesContainer: {
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  storiesList: {
    marginVertical: 16,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#555',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  postsList: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    marginTop: 16,
    padding: 16,
    position: 'relative',
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postContent: {
    height: 200,
    backgroundColor: '#444',
    borderRadius: 12,
    marginBottom: 16,
  },
  postFooter: {
    marginTop: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAuthor: {
    color: 'white',
    fontSize: 16,
  },
  contactButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  contactButtonText: {
    color: '#7c5295',
  },
  postText: {
    color: 'white',
  },
  showMoreButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  showMoreText: {
    color: '#888',
  },
});

export default FeedScreen;
