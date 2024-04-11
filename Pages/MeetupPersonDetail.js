import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import { CustomButton } from '../components/CustomButton'
import { http } from '../utils/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MeetupPersonDetail = ({route}) => {
    const item =route?.params?.item;
    const [ loading,setLoading]=useState(false)
    const  [ data,setData]=useState()
    useEffect(()=>{
      fetchdata()
    },[])
    const fetchdata = async() => {
      const userid = await AsyncStorage.getItem("userid");

      const body={
          method: 'meetupProfile',
          meetupId:item?.meetupId,
          userId:userid
      }
      setLoading(true)
      http.get('/', {
          params: {
          ...body
          }
      })
          .then(response => {
              console.log('Response:', response.data);
              setLoading(false);
              setData(response.data?.response)
              // setMeetupData(response?.data?.meetup);
              // setpeopleData(response?.data?.pepole);
  
          })
          .catch(error => {
              console.error('Error:', error);
             Alert.alert("Network Error")
              setLoading(false)
          });
  
      
  }

  const joinMeetup = async() => {
    setLoading(true)
    const userid = await AsyncStorage.getItem("userid");
    const body={
        method: 'joinMeetup',
        userId:userid
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
            alert("Successfully joined meetup")
            // setData(response.data?.response)
            // setMeetupData(response?.data?.meetup);
            // setpeopleData(response?.data?.pepole);

        })
        .catch(error => {
            console.error('Error:', error);
           Alert.alert("Network Error")
            setLoading(false)
        });

    
}
  return (
    <View style={[globalStyles.container2]}>
      {/* <Text>MeetupPersonDetail</Text> */}
      <View style={{margin:2,backgroundColor:"white",borderRadius:20,elevation:2,marginVertical:20,justifyContent:"center",alignItems:"center",paddingVertical:30}}>
      <Image
          source={require('../assests/images/download.png')}
          style={{
            height: 110,
            width: 110,
            borderRadius: 70,
            borderWidth: 1,
            borderColor: '#9B9B9B',
          }}
        />
        {/* <View style={{marginLeft: 10}}> */}
          {/* <View > */}
            <Text style={[globalStyles.text, {fontSize:17}]}>
              {data?.subject}
            </Text>
            <Text style={{color:"black",fontSize:13,fontWeight:"bold",opacity:.6}}>{data?.location}</Text>
            {/* <TouchableOpacity
              style={[styels.connectbutton]}>
                              <FontAwesome name ="paper-plane" size={16} color='white'/>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                Connect Request
              </Text>
            </TouchableOpacity> */}
          {/* </View> */}
          <Text style={[globalStyles.text2, {opacity: 0.5}]}>
            {item?.add} 80 visiter
          </Text>
          {/* <View style={{flexDirection:"row",alignItems:"center"}}> */}
          <View style={{flexDirection:"row",alignItems:"center"}}>
            {item?.objective=="null"&&item?.objective?.map((it)=>(
              <View style={[styels.posText]}>
              <Text style={{color:theme.colors.primary}}>{it}</Text>
              </View>
            ))}

          </View>
          <Text style={{color:"white",backgroundColor:theme.colors.primary,paddingHorizontal:15,fontWeight:"bold",paddingVertical:2,marginVertical:5,borderRadius:10}}>{item.fees}</Text>
          <Text style={[globalStyles.text2, {opacity: 0.5,marginTop:15,textAlign:"center",fontSize:14,marginHorizontal:20}]}>
            {data?.rules} 
          </Text>
          {/* </View> */}
        {/* </View>s */}
      </View>
      <CustomButton marginTop={"auto"}  text={"Explore on map"}  />
      <CustomButton loading={loading} onPressfuntion={()=>joinMeetup()}  marginTop={20} text={"Join"}  />


    </View>
  )
}
const styels = StyleSheet.create({
    button: {
      width: '50%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      marginVertical: 1,
    },connectbutton:{
      height: 25,
      width: 130,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      flexDirection:"row",
      alignItems:"center"
    },
    box:{
      height: 90,
      backgroundColor: 'white',
      borderRadius: 10,
      width: '99.5%',
      marginLeft: 1,
  
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 1,
      marginVertical: 10,
    },
    posText:{
      color:theme.colors.primary,
      backgroundColor:theme.colors.primaryOpacity,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center",
      paddingHorizontal:7,
      paddingVertical:3,
      marginTop:5,
      marginHorizontal:2
    }
  });

export default MeetupPersonDetail