import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, PermissionsAndroid, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { addNavREf, setScreenName } from '../redux/actions/navigationREf'
import { CustomTextInput, CustomTextInput2 } from '../components/CustomTextInput'
import theme from '../utils/theme'
import { CustomButton } from '../components/CustomButton'
import { http } from '../utils/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from 'react-native-image-crop-picker';

import { navigate } from '../App'
import { goOnline } from 'firebase/database'

const CreateMeetup = () => {
    const dispactch = useDispatch()
    const nav = useSelector(({ nav }) => nav);
    const [image, setImage] = useState();

    console.log(nav);
    const [ loading,setLoading]=useState(false)
    const createMeetup = async() => {
      setLoading(true)
      const userid = await AsyncStorage.getItem("userid")
      const body={
          method: 'addMeetup',
          userId:userid,
          subject:subject,
          location:location,
          objective:objective,
          rules:agendarules,
          fees:fees
      }
      // setLoading(true)
      http.get('/', {
          params: {
          ...body
          }
      })
          .then(response => {
              console.log('Response:', response.data);
              setLoading(false);
              setAgendaRules("");
              setSubject("");
              setLocation("");
              alert("Successfully created meetup")
              dispactch(addNavREf("MY MEETUP"));
              navigate('Mymeetups')
     
  
          })
          .catch(error => {
              console.error('Error:', error);
             Alert.alert("Network Error")
              setLoading(false)
          });
  
      
  }
    const [subject,setSubject]=useState()
    const [ location,setLocation]=useState()
    const [ size,setSize]=useState()
    const  [fees,setFees]=useState();
    const [ active,setActive]=useState(false);
    const [ online,setOnline]=useState("");
    const [ agendarules,setAgendaRules]=useState();
    const [select ,setSelect]=useState();
    const [ objective,setObjective]=useState()

    const requestExternalStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            setImage(image);
            console.log(image.path);
          });
        } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.log('Error requesting permission:', error);
      }
    };

    useEffect(()=>{
     dispactch(setScreenName("Create"))
     dispactch(addNavREf("Create Host"))
    },[]);
  return (
    <View style={[globalStyles.container2,{}]}>
      {/* <Text>CreateMeetup</Text> */}
      <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
      {image ? (
          <Image
            source={{uri: image.path}}
            style={{height: 120, width: 120, borderRadius: 80}}
          />
        ) : (
          <TouchableOpacity
            style={{
              borderRadius: 80,
              height: 120,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#CAD6EB',
            }}>
<Image
          source={require('../assests/images/download.png')}
          style={{
            height: 120,
            width: 120,
            borderRadius: 70,
            borderWidth: 1,
            borderColor: '#9B9B9B',
          }}
        />         
         </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => requestExternalStoragePermission()}>
          <Image
            source={require('../assests/images/edit.png')}
            style={{marginTop: -15, marginLeft: 40, width: 20, height: 20}}
          />
        </TouchableOpacity>
      
      <CustomTextInput2
                label={"Meetup Subject"}
                value={subject}
                setValue={setSubject}
                placeholder={"Meetup Subject"}
                iconName={false}
                marginTop={20}
            />  
            <View style={{flexDirection:"row",marginTop:20}}>
              <View style={{flexDirection:"row",width:'50%'}}>
              <TouchableOpacity onPress={()=>setOnline("online")} style={{height:20,width:20,borderRadius:10,marginRight:10,borderWidth:1,borderColor:"black",backgroundColor:online=="online"?theme.colors.primary:"white"}}></TouchableOpacity>
              <Text style={[globalStyles.text,{fontSize:14}]}>Online</Text>
              </View>
              <View style={{flexDirection:"row",width:'50%'}}>
              <TouchableOpacity onPress={()=>setOnline("offline")} style={{height:20,width:20,borderRadius:10,marginRight:10,borderWidth:1,borderColor:"black",backgroundColor:online=="offline"?theme.colors.primary:"white"}}></TouchableOpacity>
              <Text style={[globalStyles.text,{fontSize:14}]}>Offline</Text>
              </View>
            </View>
            {online=="online"&&<CustomTextInput2
                label={"Link"}
                value={location}
                setValue={setLocation}
                placeholder={"Link"}
                iconName={false}
                marginTop={20}
            />  }
              <CustomTextInput2
                label={"Location"}
                value={size}
                setValue={setSize}
                placeholder={"Meetup size"}
                iconName={false}
                marginTop={20}
            />  
            <View style={{flexDirection:"row",marginTop:20}}>
              <View style={{flexDirection:"row",width:'50%'}}>
              <TouchableOpacity onPress={()=>setSelect("free")} style={{height:20,width:20,borderRadius:10,marginRight:10,borderWidth:1,borderColor:"black",backgroundColor:select=="free"?theme.colors.primary:"white"}}></TouchableOpacity>
              <Text style={[globalStyles.text,{fontSize:14}]}>Free</Text>
              </View>
              <View style={{flexDirection:"row",width:'50%'}}>
              <TouchableOpacity onPress={()=>setSelect("fees")} style={{height:20,width:20,borderRadius:10,marginRight:10,borderWidth:1,borderColor:"black",backgroundColor:select=="fees"?theme.colors.primary:"white"}}></TouchableOpacity>
              <Text style={[globalStyles.text,{fontSize:14}]}>Paid</Text>
              </View>
            </View>
           {select=="fees" && <CustomTextInput2
                label={"Location"}
                value={fees}
                setValue={setFees}
                placeholder={"Meetup fees"}
                iconName={false}
                marginTop={20}
            />  }
            <CustomTextInput2
                label={"Location"}
                value={objective}
                setValue={setObjective}
                placeholder={"Objective"}
                iconName={false}
                marginTop={20}
            /> 
            <TextInput
             numberOfLines={5}
             style={{backgroundColor:"white",borderRadius:10,width:"100%",marginTop:30,borderWidth:1,borderColor:active?theme.colors.primary:"white"}}
             onFocus={()=>setActive(true)}
             onBlur={()=>setActive(false)}
             value={agendarules}
             onChangeText={(e)=>setAgendaRules(e)}
             placeholder='Agenda Rules'
             placeholderTextColor={"black"}
            />   
         <CustomButton loading={loading} onPressfuntion={()=>createMeetup()} text={"Confirm"} marginTop={10} />      
      </ScrollView>
    </View>
  )
}

export default CreateMeetup