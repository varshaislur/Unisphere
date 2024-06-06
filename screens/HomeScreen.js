import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FeedScreen = () => {
  const [showStories, setShowStories] = useState(false);
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleStories = () => {
    setShowStories(!showStories);
  };

  const toggleShowMore = (id) => {
    setShowMoreMap({ ...showMoreMap, [id]: !showMoreMap[id] });
  };

  const renderStory = ({ item }) => (
    <View style={styles.storyCircle} />
  );

  const renderPost = ({ item }) => (
    <LinearGradient
      colors={['#282828', '#7c5295']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      style={styles.postContainer}
    >
      <View style={styles.postContent} />
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
              colors={['#282828', '#663a82']} // Gradient colors
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
              colors={['#282828', '#663a82']} // Gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1.5, y: 0 }}
              style={styles.expandedStoriesContainer}
            >
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Dummy data for stories
                renderItem={renderStory}
                keyExtractor={(item) => item.toString()}
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
        data={[
          { type: 'stories' },
          { type: 'post', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', id: '1' },
          { type: 'post', text: 'Another post with longer text to test show more functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', id: '2' },
          { type: 'post', text: 'Short post.', id: '3' }
        ]} // Dummy data for stories and posts
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
    marginBottom: 20, // Increased bottom margin
    flexDirection: 'column', // Align items in a column
    justifyContent: 'space-between', // Space between items
  },

  postContent: {
    height: 200,
    backgroundColor: '#444',
    borderRadius: 12,
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
    alignSelf: 'flex-end', // Align to the end (bottom) of the container
    marginTop: 10, // Add some top margin for spacing
  },
  showMoreText: {
    color: '#888',
  },
});

export default FeedScreen;
