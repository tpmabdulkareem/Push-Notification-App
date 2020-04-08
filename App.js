/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  PushNotificationIOS,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const App: () => React$Node = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    scheduledNotification();
  }, []);

  const localPushNotification = () => {
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'This is a local notification example',
    });
  };

  const scheduledNotification = () => {
    PushNotification.localNotificationSchedule({
      title: 'Scheduled Notification',
      message: 'Scheduled Notification Message', // (required)
      date: new Date(Date.now() + 60 * 300),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} onPress={localPushNotification}>
        Push Notification
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
