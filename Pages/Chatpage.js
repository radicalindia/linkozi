import { View, Text, TouchableOpacity, FlatList, StyleSheet, PermissionsAndroid,Keyboard, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { globalStyles } from '../utils/GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../utils/theme'; 
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import { http } from '../utils/AxiosInstance';
import { CustomTextInput } from '../components/CustomTextInput';
import { getprofile } from '../functions.js/profile';
import {useDispatch} from "react-redux"
import { addNavREf } from '../redux/actions/navigationREf';
import moment from 'moment';

// import { Image as img} from 'react-native-compressor';
// import ImagePicker from 'react-native-image-crop-picker';
// import { uploadpho } from '../../functions/Uploadphoto';
// import { convertImageToBase64 } from '../../utiles/ConvertTo64Base';
// import Geolocation from '@react-native-community/geolocation';

const ChatePageNetwork = ({ route, navigation }) => {
    const id = route?.params?.id;
    // const user= route?.params?.senderId
    const des = useSelector(({user})=>user?.data?.user?.des)

    const user2 = route?.params?.item
        ? route?.params?.item?._id
        : route?.params?.recivierId;
        console.log(user2)
    const companyName = route?.params?.companyName;
     const [ item,setItem]=useState(route?.params?.item)
    const state = route?.params?.state;
    const userType = useSelector(({ user }) => user?.userType);
    const [ userData,setuserdata]=useState()

    const [ user ,setUser]=useState();

    const [ user2Data]=useState();
    const [message, setMessage] = useState();
    const [array, setArray] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [ render ,setRemder]= useState(true)
    const [ data2,setData2]=useState();
    const isFirstRender = useRef(true);
    const [ count,setCount]=useState(0);
    const [keypad,setkeypad]=useState();
    const [ geolocation,setGeolocation]=useState()


    useEffect(()=>{
      const fetch = async()=>{
        const userid = await AsyncStorage.getItem('userid');
        setUser(userid)
        const data = await AsyncStorage.getItem("user")
        const json = JSON.parse(data)
        setuserdata(json);
        console.log(json,userid,"data")
      }
      fetch()
    },[]);

    
  const [focus,setFocus]=useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [ isActive,setIsActive]=useState();
  const [ usenseenStatus,setUnseenstatus]=useState(true);

    useEffect(()=>{
   const fetch =async()=>{
    try {
         const data = await getprofile(user2);
         console.log(data?.response);
        setItem(data.response);
    } catch (error) {
        console.log("errro in reteriving data of user2",error);
    }
   }
   fetch()
    },[])
    const lastIndex = data&& Object.values(data).length - 1;

    const flatListRef = useRef(null);

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };
    useEffect(() => {
        scrollToBottom();
    });

    useEffect(() => {
        const db = getDatabase();
        let url = `ChatNetwork/${user}/${user2}`;
        let url2 = `ChatNetwork/${user2}/${user}`;

        // if (userType == 'truckOwner') {
        //     url = `ChatNetwork/${user}/${user2}`;
        // } else {
        // }
        const userChatRef = ref(db, url);
        const userChatRef2 = ref(db, url2);
        const chatListener = onValue(userChatRef, snapshot => {
            console.log("s")
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data[1],'dat');
                if(data[0]?.status=="unseen"){
                    setUnseenstatus(true)
                }
                setData(data[1]);
            } else {
                console.log('ChatNetwork data not found');
            }
        });
        const chatListener2 = onValue(userChatRef2, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // console.log(data[1]);
                // if(data[0]?.status=="unseen"){
                //     setUnseenstatus(true)
                // }
                setData2(data[0]);
            } else {
                console.log('ChatNetwork data not found');
            }
        });

        return () => {
            // Clean up the listener when the component unmounts
            chatListener();
        };
    }, [user]);


    const requestExternalStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            openImagePicker();
          } else {
            console.log('Permission denied');
          }
        } catch (error) {
          console.log('Error requesting permission:', error);
        }
      };

      const removephoot = id => {
        const filtearrya = selectedImages.filter((_, index) => index != id);
        setSelectedImages(filtearrya);
      };
    
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
    // useEffect(()=>{
    //   if(render==true&&count==0){
    //     const setSeenStatus = async()=>{
    //         try {
    //             const db = getDatabase();
    //             setLoading(true);
    //             const chat = {
    //                 message: message,
    //                 // user:user,
    //                 // user2:user2,
    //                 userType: userType,
    //                 time: moment().format('h:mm A'),
    //             };
    //             const messageArray = [...data, chat];
    //             const obj = [
    //                 {
    //                     url: item?.files[0]||"empty",
    //                     name: item.companyName||item?.fullName,
    //                 },
    //                 [...data],
    //             ];
    //             set(ref(db, `ChatNetwork/${user}/${user2}`), {
    //                 ...obj,
    //             })
    //                 .then(() => {
    //                     // setresponse(true);
    //                     setLoading(false);
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                     setLoading(false);
    //                 });
    //                 let number= 0;
    
    //             const obj2 = [
    //                 {
    //                     url: (des?userData?.submitter: userData)?.files[0]||"empty",
    //                     name: (des?userData?.submitter: userData)?.companyName||(des?userData?.submitter: userData)?.fullName,
    //                     // status:"unseen",
                        
    //                     // number:number
    //                 } ,
    //                 [...data],
    //             ];
    //             set(ref(db, `ChatNetwork/${user2}/${user}`), {
    //                 ...obj2,
    //             })
    //                 .then(() => {
    //                     // setresponse(true);
    //                     setLoading(false);
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                     setLoading(false);
    //                 });
    //                 setMessage("")
    //                 console.log("setseen");
    //                 setCount(count+1)
    //                 console.log(count)
    //                 // await http.post("other/notification",{id:item?._id,title:`new message ${item?.companyName}`,message:message})
    //         } catch (error) {
    //             console.log("set seen",error);
    //         }
    //     }
    //     if(item&&data?.length>0&&usenseenStatus){
    //         setSeenStatus();
    //     }

    //   }
    // else {
    //     // Set isFirstRender to false after the initial render
    // setRemder(false)
    //   }
    // },[data,item]);

    
    // const up=async()=>{
    //     try {
    //         setLoading(true)
    //         convertImageToBase64(selectedImages).then((res)=>      
    //         http.post("other/uploadImage",{image:res}).then((res)=>sendMessage(res?.data?.url)).catch((e)=>{console.log(e); setLoading(false)})  
    //         ).catch(err=>console.log("e",err));   
    //                 // sendMessage(data?.url);
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    const sendMessage = async (images) => {
        const userid = await AsyncStorage.getItem('userid');
        try {
            const db = getDatabase();
            setLoading(true);
            let chat ={}
            console.log("1")
            if(message=="My Location"){
                chat= {
                    geolocation:geolocation||"loca",
                    // message:message,                
                     // senderId:senderId,
                     // recivierId:recivierId,
                     userType:userid,
                     time: moment().format('h:mm A'),
                   };
            }
            else{
              chat= {
            //    geolocation:geolocation,
               message:message,                
                // senderId:senderId,
                // recivierId:recivierId,
                userType:userid||"ne",
                time: moment().format('h:mm A'),
              };
            }

            const messageArray = [...data, chat];
            console.log("3")

            const obj = [
                {
                    name: item?.name||"test name",
                },
                [...data, chat],
            ];
            console.log("4")

            set(ref(db, `ChatNetwork/${user}/${user2}`), {
                ...obj,
            })
                .then(() => {
                    // setresponse(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
                let number= 0;

            const obj2 = [
                {
                    // url: (des?userData?.submitter: userData)?.files[0]||"empty",
                    name:userData?.name||"test name",

                    status:"unseen",
                    number:data2?.number+1||1 
                },
                [...data, chat],
            ];
            set(ref(db, `ChatNetwork/${user2}/${user}`), {
                ...obj2,
            })
                .then(() => {
                    // setresponse(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
                setMessage("")
                setLoading(false)
                // await http.post("other/notification",{id:item?.id,title:`new message ${item?.companyName}`,message:message})
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const RenderItem = ({ item }) => {
        return item.userType == user ? (
            <View style={{justifyContent:"center",marginLeft:"auto"}}>
                            {item?.images? <ScrollView>
                                {item?.images?.map((it)=>(
                                <Image source={{uri:it[0]}} style={{marginVertical:5,height:100,width:100}}/>
            // <Text style={[styles.senderText]}>{item}</Text>

                             ))}
                             </ScrollView>:
                             (  
                                item?.geolocation?
                                <Text style={[styles.senderText]}>My Location</Text>:              
                              <Text style={[styles.senderText]}>{item?.message }</Text>
                             )
                            }
                            <Text style={[{flexDirection:"row",alignItems:"center",fontSize:12,color:"black",opacity:.5,width:"20%",marginLeft:"auto",marginTop:-10}]}>{item?.time}</Text>

            </View>
        ) : (
            <View style={{justifyContent:"center",marginRight:"auto"}}>
            <Text style={[styles.reciverText]}>{item.message}</Text>
            <Text style={[{flexDirection:"row",alignItems:"center",fontSize:12,color:"black",opacity:.5,width:"20%",marginRight:"auto",marginTop:-10}]}>{item?.time}</Text>

</View>
        );
    };

    const dispatch = useDispatch()

    useEffect(()=>{
   return ()=>{
    dispatch(addNavREf("MyConnection"))
   }
    },[])

    return (
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
            <View
                style={{
                    // justifyContent: 'center',
                    paddingLeft:20,
                    alignItems: 'center',
                    backgroundColor: theme.colors.primary,
                    height: 40,
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <MaterialCommunityIcon
                        name="keyboard-backspace"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={[globalStyles.text]}>
                    {item?.name}
                </Text>
            </View>
            <View style={{ paddingHorizontal: 15,paddingBottom:150 }}>
                <FlatList
                    data={ data&&data}
                    ref={flatListRef}
                    renderItem={RenderItem}
                    keyExtractor={item => item._id}
                    
                    contentContainerStyle={{ paddingBottom: 50, }}
                />

                {/* <Text>{data.message}</Text> */}

            </View>
            <View style={{marginTop:"auto",position:"absolute",bottom:300}}>
      <FlatList
          numColumns={3}
          data={selectedImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => removephoot(index)}
                style={{
                  backgroundColor: 'rgba(0,255,255,.5)',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: -30,
                  zIndex: 1000,
                }}>
                <MaterialCommunityIcon name="close" size={25} color="rgba(0,0,0,.8)" />
              </TouchableOpacity>

              <Image
                source={{uri: item}}
                style={{
                  width: 100,
                  height: 100,
                  marginHorizontal: 5,
                  marginVertical: 5,
                  borderRadius: 2,
                }}
              />
            </View>
          )}
        />
      </View>
            <View onPress={()=>{console.log("s")}} style={{  marginTop:"auto",padding:10,flexDirection:"row",alignItems:"center"}}>
{     focus?     
<TouchableOpacity onPress={()=>{setFocus(false); setIsActive("add")}}>     
       <MaterialCommunityIcon style={{marginRight:7}} name="plus" size={30} color="black"/>
</TouchableOpacity>:<TouchableOpacity onPress={()=>{setFocus(true); setIsActive("textinput")}}>     
       <MaterialCommunityIcon style={{marginRight:7}} name="keyboard" size={30} color="black"/>
</TouchableOpacity>}
                    <CustomTextInput
                        placeholder={'Write here...'}
                        width={"80%"}
                        value={message}
                        focus={focus}
                        loading={loading}
                        setFocus={setFocus}
                        setValue={setMessage}
                        // backIcon={'send'}
                        iconOnClick={() => up()}
                    />
                <TouchableOpacity onPress={()=>sendMessage()}><FontAwesome name="paper-plane" size={25}/></TouchableOpacity>
                </View>
                {!focus&&isActive=="add"&&<View style={{height:250,backgroundColor:"white",elevation:15,borderRadius:30,shadowColor:"black"}}>
                  <View style={[globalStyles.rowflex,{padding:10}]}>
                    <TouchableOpacity onPress={()=>requestExternalStoragePermission()} style={[styles.docButton]}>
                    <MaterialCommunityIcon  name="image" size={40} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>addlocation()} style={[styles.docButton]}>
                    <MaterialIcons  name="location-pin" size={30} color="black"/>
                    </TouchableOpacity>
                  </View>
                  </View>}

        </View>
    );
};

const styles = StyleSheet.create({
    reciverText: {
        backgroundColor: "white",


        color: 'black',
        fontSize: 15,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 25,
        width: '60%',
        marginVertical: 10,
        opacity: 0.8,
    },
    senderText: {
        color: 'black',
        backgroundColor: theme.colors.primary,

        fontSize: 15,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 25,
        marginVertical:10,
        width: '60%',
        marginLeft: 'auto',
        color:"white"
    },
    docButton:{
        height:60,width:60,borderRadius:30,
        backgroundColor:theme.colors.primary,
        justifyContent:"center",
        alignItems:"center"
      }
});

export default ChatePageNetwork;
