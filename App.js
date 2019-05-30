import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF3DD',
    flex: 1,
    padding: 20,
  },
  text: {
    textAlign: 'center',
    color: '#8FC0A9',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#8FC0A9',
    color: '#8FC0A9',
  },
});

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  blah() {
    return fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,
          dataSource: res,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Button
            color="#68B0AB"
            title="Get Quote"
            onPress={() => this.blah()}
          />
          <ActivityIndicator size="large" color="#C8D5B9" />
          <Text style={styles.text}>| Ron Swanson |</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Button color="#68B0AB" title="Get Quote" onPress={() => this.blah()} />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>{item}</Text>
              <Text style={styles.text}>| Ron Swanson |</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
