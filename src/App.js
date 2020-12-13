import React from 'react';
// import {SplashScreen} from './pages/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

export default class Application extends React.Component {
  // componentDidMount() {
  //   this.state = {
  //     view: <SplashScreen />,
  //   };

  //   setTimeout(() => {
  //     if (true) {
  //       this.setState({
  //         view: <Router />,
  //       });
  //     }
  //   }, 5000);
  // }

  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}
