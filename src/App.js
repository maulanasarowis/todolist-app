import React from 'react';
// import {SplashScreen} from './pages/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import logo from './assets/img/logo.png';

// SplasScreen
class SplashScreen extends React.Component {
  render() {
    const logoStyles = {width: 40, height: 40};
    const viewStyles = [styles.container, {backgroundColor: '#2c3e50'}];
    const textStyles = {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    };

    return (
      <View style={viewStyles}>
        <Image source={logo} style={logoStyles} />
        <Text style={textStyles}>To Do List</Text>
        <ActivityIndicator color={'white'} />
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
