/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component<{}> {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyB2QhPUA_jXPBwVoGvziwfXTklzK_o3Wr4",
      authDomain: "manager-446dd.firebaseapp.com",
      databaseURL: "https://manager-446dd.firebaseio.com",
      projectId: "manager-446dd",
      storageBucket: "",
      messagingSenderId: "470202592807"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;