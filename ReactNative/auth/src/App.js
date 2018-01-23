/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  View
} from 'react-native';
import firebase from 'firebase';
import {Button, Header, Spinner} from "./components/common";
import LoginForm from './components/LoginForm';

export default class App extends Component<{}> {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDSiVTsAjkTP_zmOrwMWpNtME_Bnug0CmY",
      authDomain: "auth-8f90b.firebaseapp.com",
      databaseURL: "https://auth-8f90b.firebaseio.com",
      projectId: "auth-8f90b",
      storageBucket: "auth-8f90b.appspot.com",
      messagingSenderId: "944251739502"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      }
      else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>;
      case false:
        return <LoginForm/>;

      case null:
        return <Spinner size="large"/>;
    }

  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}
