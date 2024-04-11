import { View, Text, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './Pages/Home/Home';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import CreateAccount from './Pages/CreateAccount';
import BottomNav from './components/BottomNav';
// import Home from './Pages/Home';
import Login from './Pages/Login';
import { addNavREf } from './redux/actions/navigationREf';
import TopBar from './components/TopBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';
import theme from './utils/theme';
import PersonalDetail from './Pages/PersonalDetail';
import UpdateObjectives from './Pages/UpdateObjectives';
import UploadPhoto from './Pages/UploadPhoto';
import Home from './Pages/Home';
import MeetupPersonDetail from './Pages/MeetupPersonDetail';
import CreateMeetup from './Pages/CreateMeetup';
import MeetupDetail from './Pages/MeetupDetail';
import Inbox from './Pages/Inbox';
import Notification from './Pages/Notification';
import Mymeetups from './Pages/Mymeetups';
import ProfileDetail from './Pages/ProfileDetail';
import MyConnection from './Pages/MyConnection';
import MyRequest from './Pages/MyRequest';
import ForgotPassword from './Pages/ForgotPassword';
import Search from './Pages/search';
import Splash from './Pages/Splash';
import Feed from './Pages/Feed';
import CreatePost from './Pages/CreatePost';
import ChatePageNetwork from './Pages/Chatpage';
import appr from './firebase.config';
import OwnProfile from './Pages/OwnProfile';

const Tab = createBottomTabNavigator();


// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
const App = () => {
  const [currentroute, setCurrentroute] = useState();

  const nav = useSelector(({ nav }) => nav?.nav);
  const [keypad,setkeypad]=useState(false)
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setkeypad(true)
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setkeypad(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  console.log(nav)

  const getUserType = async () => {
    return await AsyncStorage.getItem('userType');
  }
  const isFocus = useIsFocused
  useEffect(() => {
    setCurrentroute(navigationRef.current?.getCurrentRoute()?.name);
    console.log("route name", navigationRef.current?.getCurrentRoute()?.name);
  });
  // const nav = useSelector(({nav}) => nav.nav);


  const NavbarAbsentScreens = [

    // "RegisterMineUser"
  ];
  const NavbarAbsentScreensBottom = [
    "CreateAccount",
    "Login",
    "PersonalDetail",
    "Search",
    "Splash",
    "Objective",
    "UploadPhoto",
    "Chat"
  ];



  const dispactch = useDispatch();
  // dispactch(addNavREf('CreateAccount'));
  // const focus = useIsFocused()
  // useEffect(()=>{
   dispactch(addNavREf(navigationRef.current?.getCurrentRoute()?.name))
  // },[focus]);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    console.log(navigationRef)
  }, [navigationRef]);
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state');
      alert('new meeage');
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:');
          alert('new');
        }
        // setLoading(false);
      });

    const fetch = async () => {
      // console.log("fes")
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // PushNotification.localNotification({
        //   channelId: 'Heytap PUSH', // Replace with your channel ID

        //   title: 'Flash Date',
        //   message: "new message",
        // });
        console.log(remoteMessage);
      });

      const oldtoken = await AsyncStorage.getItem('fcmtoken');
      // console.log("token",oldtoken)
      if (!oldtoken) {
        const fcmtoekn = await messaging().getToken();
        if (fcmtoekn) {
          try {
            console.log('fcmtoken..................', fcmtoekn);
            AsyncStorage.setItem('fcmtoken', fcmtoekn);

            // const db = getDatabase();
            // const userdeviceidRef = ref(db, `devicesid/`);
            // console.log(userdeviceidRef);
            // try {
            //   push(userdeviceidRef, fcmtoekn)
            //   .then((newRef) => {
            //     console.log('String pushed successfully with key:', newRef.key);
            //   })
            //   .catch((error) => {
            //     alert("Restart the App and Clear the Cache")
            //   });
            // } catch (error) {
            //   console.error('Error pushing string:', error);
            // }
          } catch (error) {
            alert(error);
          }
        }
      } else {
        // dispactch(setFcmToken(oldtoken));
        console.log(
          'oldtoken.........................................................................',
          oldtoken,
          currentroute,
        );
      }
    };
    requestUserPermission();
    fetch();
  }, []);

  useEffect(() => {
    const unsubscribe = navigationRef.current.addListener('focus', () => {
      setCurrentroute(navigationRef.current?.getCurrentRoute()?.name);

    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigationRef]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {/* {!NavbarAbsentScreens.includes(currentroute) && ((getUserType=="mine"||getUserType=="truckOwner")&&<AppBar />)} */}
        {!NavbarAbsentScreensBottom.includes(navigationRef.current?.getCurrentRoute()?.name) && <TopBar/>}
        {/* <TopBar /> */}
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="Feed"
            component={Feed}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="OwnProfile"
            component={OwnProfile}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="MeetupersonDetail"
            component={MeetupPersonDetail}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="Forgotpassword"
            component={ForgotPassword}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="CreateMeetUps"
            component={CreateMeetup}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="MeetupDetail"
            component={MeetupDetail}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Inbox"
            component={Inbox}
            options={{ title: 'Welcome', headerShown: false }}
          />
                   <Stack.Screen
            name="Chat"
            component={ChatePageNetwork}
            options={{ title: 'Welcome', headerShown: false }}
          />
           <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Mymeetups"
            component={Mymeetups}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="MyConnection"
            component={MyConnection}
            options={{ title: 'Welcome', headerShown: false }}
          />
                    <Stack.Screen
            name="MyRequest"
            component={MyRequest}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen
            name="PersonalDetail"
            component={PersonalDetail}
            options={{ title: 'Welcome', headerShown: false }}
          /> 
          <Stack.Screen
            name="UploadPhoto"
            component={UploadPhoto}
            options={{ title: 'Welcome', headerShown: false }}
          /> 
           <Stack.Screen
            name="Objective"
            component={UpdateObjectives}
            options={{ title: 'Welcome', headerShown: false }}
          /> 

          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </Stack.Navigator>
        {/* {!NavbarAbsentScreens.includes(currentroute) && (getUserType=="mine"?<BottomNav />:getUserType=="mineOwner"?<TruckOwner/>:<DriverBottomNav/>)} */}
        {!NavbarAbsentScreensBottom.includes(navigationRef.current?.getCurrentRoute()?.name)&&!keypad && <BottomNav />}
      </NavigationContainer>
      {/* <CurvedBottomBars/> */}
    </>
  );
};

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{tabBarStyle:{height:60}}}
//       tabBarOptions={{
//         activeTintColor: '#3498db',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       {/* Define your screens and icons */}
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: ()=>null,
//           tabBarIcon: ({ color, size,focused }) => (
//             <MaterialCommunityIcons            
//                name="home"
//             color={focused?theme.colors.primaryOpacity:color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Medicine"
//         component={Medicine}
//         options={{
//           tabBarLabel: ()=>null,
//           tabBarIcon: ({ color, size ,focused}) => (
//             <FontAwesome
//                name="first-aid"
//             color={focused?theme.colors.primaryOpacity:color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={Upload}
//         options={{
//           tabBarLabel: ()=>null,
//           tabBarIcon: ({ color, size ,focused}) => (
//             <View style={{height:45,width:45,borderRadius:25,justifyContent:"center",alignItems:"center",backgroundColor:theme.colors.primaryOpacity,marginBottom:15}}>
//                   <MaterialCommunityIcons
//                name="plus-thick"
//             color={"white"} size={size} />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Doctor"
//         component={Doctor}
//         options={{
//           tabBarLabel: ()=>null,
//           tabBarIcon: ({ color, size ,focused}) => (
//             <MaterialCommunityIcons    
//                name="doctor"
//             color={focused?theme.colors.primaryOpacity:color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Pathalogy"
//         component={Pathology}
//         options={{
//           tabBarLabel: ()=>null,
//           tabBarIcon: ({ color, size,focused }) => (
//             <Fontist name="test-bottle" color={focused?theme.colors.primaryOpacity:color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };


export default App;
