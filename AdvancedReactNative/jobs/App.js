import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';

import store from './store';

import registerForNotifications from './services/push_notifications';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

import {Notifications} from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const {data: {text}, origin} = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{text: 'Ok.'}]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: {
        screen: WelcomeScreen
      },
      auth: {
        screen: AuthScreen,
      },
      main: {
        screen: TabNavigator({
          map: {screen: MapScreen},
          deck: {screen: DeckScreen},
          review: {
            screen: StackNavigator({
              review: {screen: ReviewScreen},
              settings: {screen: SettingsScreen}
            })
          }
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          tabBarOptions: {
            labelStyle: {fontSize: 12}
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
  },
});
