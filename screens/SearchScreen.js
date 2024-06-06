// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CheckBox, Button, Icon, ListItem } from 'react-native-elements';

const SearchScreen=()=> {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ webDevelopment: false, comps: false });

  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search something..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#fff"
      />
      <Button
        icon={<Icon name="search" size={20} color="white" />}
        buttonStyle={styles.searchButton}
        title="Search"
      />
      <View style={styles.filters}>
        <Text style={styles.filterTitle}>Filter by</Text>
        <CheckBox
          title="Web Development"
          checked={filters.webDevelopment}
          onPress={() => toggleFilter('webDevelopment')}
          containerStyle={styles.checkbox}
          textStyle={{ color: 'white' }}
        />
        <CheckBox
          title="Comps"
          checked={filters.comps}
          onPress={() => toggleFilter('comps')}
          containerStyle={styles.checkbox}
          textStyle={{ color: 'white' }}
        />
      </View>
      <Text style={styles.resultsTitle}>Search Results</Text>
      <View style={styles.results}>
        <ListItem bottomDivider>
          <Icon name="music" type="font-awesome" color="white" />
          <ListItem.Content>
            <ListItem.Title style={{ color: 'white' }}>DJ Unicode</ListItem.Title>
            <ListItem.Subtitle style={{ color: 'white' }}>Key descriptive words -</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1b22',
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#2d2c35',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#5c4ae2',
    marginVertical: 10,
    borderRadius: 10,
  },
  filters: {
    backgroundColor: '#2d2c35',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  filterTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: '#2d2c35',
    borderWidth: 0,
  },
  resultsTitle: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
  results: {
    backgroundColor: '#2d2c35',
    borderRadius: 10,
    padding: 10,
  },
});
export default SearchScreen