import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { http } from '../utils/AxiosInstance';

const MeetupDetail = ({route}) => {
  const [ data,setData]= useState();
  console.log("item")
  const item = route?.params?.item
    const testdata = [
        {name: 'amit jain', experience: '3', compnay: 'radical private limited '},
      ];
      useEffect(()=>{
        fetchdata()
      },[])
      const fetchdata = async() => {
    
        const body={
            method: 'homeScreen',
            meetupId:item?.meetupId
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
                // setMeetupData(response?.data?.meetup);
                // setpeopleData(response?.data?.pepole);
    
            })
            .catch(error => {
                console.error('Error:', error);
               Alert.alert("Network Error")
                setLoading(false)
            });
    
        
    }



      const renderitem = ({item}) => {
        return (
          <TouchableOpacity
            style={[styels.box]}>
            <Image
              source={require('../assests/images/download.png')}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#9B9B9B',
              }}
            />
            <View style={{marginLeft: 10}}>
              <View style={[globalStyles.rowflex, {width: '90%'}]}>
                <Text style={[globalStyles.text, {color: theme.colors.primary}]}>
                  {item?.name}
                </Text>
           
              </View>
              <Text style={[globalStyles.text2, {opacity: 0.5}]}>
                {item?.experience} Years
              </Text>
              <Text style={[globalStyles.text,{width:180}]}>{item?.compnay}</Text>
            </View>
            <View>
            <TouchableOpacity
                  style={[styels.connectbutton]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Accept
                  </Text>
                </TouchableOpacity> 
                 <TouchableOpacity
                  style={[styels.connectbutton,{marginTop:10,backgroundColor:theme.colors.buttonBG}]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Reject
                  </Text>
                </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <View style={[globalStyles.container2]}>
      {/* <Text>MeetupDetail</Text> */}
      <TouchableOpacity
    //    onPress={()=>navigation.navigate("MeetupersonDetail",{item:item})}
            style={[styels.box]}>
            {/* <Image
              source={require('../assests/images/download.png')}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#9B9B9B',
              }}
            /> */}
            <View style={{marginLeft: 10,width:"100%"}}>
              <View style={[globalStyles.rowflex, {width: '90%'}]}>
                <Text style={[globalStyles.text, {color: theme.colors.primary}]}>
                  {/* {item?.name} */} Rahul soni
                </Text>
                <Text style={{color:"black",fontSize:13,fontWeight:"bold",opacity:.6}}>20 visiter</Text>
                {/* <TouchableOpacity
                  style={[styels.connectbutton]}>
                                  <FontAwesome name ="paper-plane" size={16} color='white'/>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Connect Request
                  </Text>
                </TouchableOpacity> */}
              </View>
              <Text style={[globalStyles.text2, {opacity: 0.5}]}>
                leorm lorem
              </Text>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <View style={[styels.posText]}>
              <Text style={{color:theme.colors.primary}}>Webdeveloper</Text>
              </View>
              <Text style={{color:"white",backgroundColor:theme.colors.primary,paddingHorizontal:15,fontWeight:"bold",paddingVertical:2,marginVertical:5,borderRadius:10,marginLeft:"auto",marginRight:30}}>₹ 200</Text>
    
              </View>
            </View>
          </TouchableOpacity>
      <FlatList
        data={testdata}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      />
    </View>
  )
}

const styels = StyleSheet.create({
    button: {
      width: 60,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      marginVertical: 1,
    },connectbutton:{
      height: 25,
      width: 60,
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
      marginTop:5
    }
  });
export default MeetupDetail