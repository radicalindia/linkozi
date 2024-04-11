import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from '../components/CustomButton';
import { http } from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ProfileDetail = ({route}) => {
  const id= route?.params?.id;
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
            method: 'myprofile',
            userId:id?id:userid,
            type:"accept"
        }
        setLoading(true)
        http.get('/', {
            params: {
            ...body
            }
        })
            .then(response => {
                console.log('response myprofile:', response.data);
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
            <TouchableOpacity
                  style={[styles.connectbutton]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Accept
                  </Text>
                </TouchableOpacity> 
                 <TouchableOpacity
                  style={[styles.connectbutton,{backgroundColor:theme.colors.buttonBG,marginLeft:5}]}>
                                  {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Reject
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
  return (
    <View style={[globalStyles.container2,{paddingHorizontal:1}]}>
      {/* <Text>ProfileDetail</Text> */}
      <View 
            style={[globalStyles.box,]}>
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
            <View style={{marginLeft: 10,flex:.99}}>
              {/* <View style={[globalStyles.rowflex, {width: '90%'}]}> */}
                <Text style={[globalStyles.text, {color: theme.colors.primary}]}>
                {data?.name}
                </Text>
                {/* <TouchableOpacity
                  style={[styles.connectbutton]}>
                                  <FontAwesome name ="paper-plane" size={16} color='white'/>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Connect Request
                  </Text>
                </TouchableOpacity> */}
              {/* </View> */}
              <Text style={[globalStyles.text, {opacity: 0.5,fontSize:13,}]}>
              Investment Banking Analyst at Evalueserve
              </Text>
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={[globalStyles.text,{fontSize:13}]}>Dehli</Text>
    
              </View>

            </View>
         <View>
         <MaterialCommunityIcons
                name="linkedin"
                size={25}
                color="#3B8FCF"
              />
         </View>
          </View>
          <View style={[globalStyles.rowflex,{marginTop:-8,}]}>
            <View style={[styles.box2]}>
            <MaterialCommunityIcons
                name="calendar-month"
                size={25}
                color={theme.colors.primary}
              />
                <Text style={[styles.text]}>Meeting</Text>
            </View>
            <View style={[styles.box2]}>
            <MaterialCommunityIcons
                name="handshake"
                size={25}
                color={theme.colors.primary}
              />
                <Text style={[styles.text]}>Want to meet</Text>
            </View>
            <View style={[styles.box2]}>
            <MaterialCommunityIcons
                name="hand-front-left"
                size={25}
                color={theme.colors.primary}
              />
                <Text style={[styles.text]}>Endorsements</Text>
            </View>

          </View>
            <View style={{paddingHorizontal:10}}>
            <View style={[{height:170,width:"99.5",elevation:1,borderRadius:10,backgroundColor:"white",marginVertical:10,justifyContent:"center",alignItems:"center",paddingLeft:20,paddingRight:10}]}>
          <View style={[globalStyles.rowflex,{justifyContent:"flex-start"}]}>
            <View style={{height:25,width:25,borderRadius:20,backgroundColor:theme.colors.primaryOpacity,justifyContent:"center",alignItems:"center",}}>
            <MaterialCommunityIcons
                name="file-document-outline"
                size={25}
                color={theme.colors.primary}
              />
            </View>
            <Text style={[styles.text,{marginLeft:15}]}>Worked with Evalueserve</Text>
   
          </View>
          <Text style={[globalStyles.text2,{marginTop:10}]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting is simply.
          </Text>
</View>
          <View style={[globalStyles.box,{flexDirection:"column",alignItems:"flex-start"}]}>
           <View style={{flexDirection:"row",alignItems:'center'}}>
           <View style={{height:25,width:25,borderRadius:20,backgroundColor:theme.colors.primaryOpacity,justifyContent:"center",alignItems:"center",}}>
            <MaterialCommunityIcons
                name="bullseye-arrow"
                size={25}
                color={theme.colors.primary}
              />
            </View>
            <Text style={[styles.text,{marginLeft:15}]}>Objectives</Text>
           </View>
           <View style={{flexDirection:"row"}}>
           <View style={[styles.posText]}>
              <Text style={{color:theme.colors.primary}}>ui/ux</Text>
              </View>
              <View style={[styles.posText,{marginLeft:10}]}>
              <Text style={{color:theme.colors.primary}}>Webdeveloper</Text>
              </View>
           </View>
          </View>
          <Text style={[globalStyles.text,{marginVertical:10}]}>
          We'll match you to more people like Sanjana
          </Text>
          <FlatList
        data={testdata}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      />
            <CustomButton text={"Connect"}  />

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
export default ProfileDetail