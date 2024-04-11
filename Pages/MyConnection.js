import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from '../components/CustomButton';
import SearchBox from '../components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../utils/AxiosInstance';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '../App';
import {useDispatch} from "react-redux"
import { addNavREf } from '../redux/actions/navigationREf';

const MyConnection = ({navigation}) => {
  const dispatch = useDispatch()
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
            method: 'myConnection',
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
                setData(response.data?.friend);
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
            style={[globalStyles.box]}>
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
                <View style={{flexDirection:"row",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{dispatch(addNavREf("Chat")); navigation.navigate("Chat",{recivierId:item?.userId})} }
                  style={[styles.connectbutton]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Chat
                  </Text>
                </TouchableOpacity> 
                 <TouchableOpacity
                 onPress={()=>navigate("ProfileDetail",{id:item?.userId})}
                  style={[styles.connectbutton,{backgroundColor:theme.colors.buttonBG,marginLeft:5,width:80}]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                  See Profile
                  </Text>
                </TouchableOpacity>
            </View>
              </View>
              <Text style={[globalStyles.text2, {opacity: 0.5}]}>
                {item?.experience} Years
              </Text>
              <Text style={[globalStyles.text,{width:180}]}>{item?.compnay}</Text>
            </View>
   
          </TouchableOpacity>
        );
      };
      const [ search,setSearch]=useState();
  return (
    <View style={[globalStyles.container2,{paddingHorizontal:1}]}>
      <CustomButton onPressfuntion={()=>navigate("MyRequest")} text={"My Request"} bg={theme.colors.primary} />
      {/* <Text>MyConnection</Text> */}

            <View style={{paddingHorizontal:10}}>
            <SearchBox search={search} setSearch={setSearch} />


          <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      />
            {/* <CustomButton text={"Connect"}  /> */}

            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    box2:{
        // flex:.35,
        backgroundColor:"white",
        elevation:2,
        marginHorizontal:.5,
        height:40,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        paddingHorizontal:7
    },
    text:{
        fontSize:14,fontWeight:"bold",
        color:"black"
    },
    connectbutton:{
        height: 25,
        width: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        flexDirection:"row",
        alignItems:"center"
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
})
export default MyConnection