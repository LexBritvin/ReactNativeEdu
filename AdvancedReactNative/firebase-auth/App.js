import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';


export default class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCYJBZ29Cb4_v0yQIdDu147wIe5TgubpaY",
      authDomain: "one-time-password-32ecc.firebaseapp.com",
      databaseURL: "https://one-time-password-32ecc.firebaseio.com",
      projectId: "one-time-password-32ecc",
      storageBucket: "one-time-password-32ecc.appspot.com",
      messagingSenderId: "865666366707"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm/>
        <SignInForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
