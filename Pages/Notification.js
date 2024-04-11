import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { http } from '../utils/AxiosInstance'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'

const Notification = () => {
    const [ search,setSearch]=useState();
    const testdata = [
        {name: 'amit jain', experience: '3', compnay: 'radical private limited '},
      ];
      const [ loading,setLoading]=useState(false)

      const foucs= useIsFocused()
      const [data,setData]=useState()
      useEffect(()=>{
        fetchdata()
      },[foucs])
      const fetchdata = async() => {
        const userid = await AsyncStorage.getItem("userid");
      
        const body={
            method: 'notification',
            userId:userid,
            type:"accept"
        }
        setLoading(true)
        http.get('/', {
            params: {
            ...body
            }
        })
            .then(response => {
                console.log('freinds:', response.data);
                setLoading(false);
                setData(response.data?.response);
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
              {/* <View style={[globalStyles.rowflex, {width: '90%'}]}>
                <Text style={[globalStyles.text, {color: theme.colors.primary}]}>
                  {item?.name}
                </Text>
                <Text style={[globalStyles.text2]}>
                  4:10 PM
                </Text>
           
              </View> */}

              <Text style={[globalStyles.text2,{width:230,fontSize:15}]}>{item?.title}</Text>
              <Text style={[globalStyles.text2,{width:230}]}>{item?.date}</Text>

            </View>
     
          </TouchableOpacity>
        );
      };
  return (
    <View style={[globalStyles.container2]}>
        {/* <SearchBox search={search} setSearch={setSearch} /> */}
      {/* <Text>Notification</Text> */}
      <FlatList
        data={data}
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
  
      paddingVertical:3,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 1,
      marginVertical: 10,
      paddingHorizontal:7
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
export default Notification