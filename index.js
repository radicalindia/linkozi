/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import { Provider } from 'react-redux';
import store from './redux/store';
PushNotification.configure({
    color: 'green',
    onNotification: function (notification) {
      const { title, message,image } = notification.data;
    
        PushNotification.localNotification({
          channelId:"Heytap PUSH",
            title:title||"Message",
            message:message||"new Unseen Message",
            bigPictureUrl: image,
            largeIcon: image,
        });
  
        // navigation.navigate("Singlenews");
     
    }
  });
      
  PushNotification.createChannel(
    {
      channelId: "Heytap PUSH", // (required)
      channelName: "Your_khabri_update", // (required)
      // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      // playSound: false, // (optional) default: true
      // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const ReduxWrap =()=>(
    <Provider store={store}>
        <App/>
    </Provider>
  )
  

AppRegistry.registerComponent(appName, () => ReduxWrap);
