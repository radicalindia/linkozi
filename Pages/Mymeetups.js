import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SearchBox from '../components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../utils/AxiosInstance';
import { useIsFocused } from '@react-navigation/native';

const Mymeetups = ({navigation}) => {
    const [ search,setSearch]=useState();
    const  [ data,setData]=useState();
    const foucs = useIsFocused()
    const [filter,setFilter]=useState()
    useEffect(()=>{
      if(search){
        const newata = data?.filter((item)=>item?.meetupName?.toLowerCase()?.startsWith(search.toLowerCase()))
        setFilter(newata);
      }
    },[search])

   const [ loading,setLoading]=useState(false)
      useEffect(()=>{
        fetchdata()
      },[foucs])
      const fetchdata = async() => {
        const userid = await AsyncStorage.getItem("userid");
      
        const body={
            method: 'myMeetup',
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
                console.log('Response:', response.data);
                setLoading(false);
                setData(response.data?.mymeetup);
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
      const renderitem2 = ({item}) => {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate("MeetupersonDetail",{item:item})}
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
                  {item?.meetupName}
                </Text>
                <Text style={{color:theme.colors.primary,fontSize:15,fontWeight:"bold",opacity:.6}}>Host</Text>
                {/* <TouchableOpacity
                  style={[styels.connectbutton]}>
                                  <FontAwesome name ="paper-plane" size={16} color='white'/>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Connect Request
                  </Text>
                </TouchableOpacity> */}
              </View>
              <Text style={[globalStyles.text2, {opacity: 0.5}]}>
                {item?.location} 
              </Text>
              <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                {item?.objective?.split(",").map((innterItem)=>(
                 <View style={[styels.posText]}>
              <Text style={{color:theme.colors.primary}}>{innterItem}</Text>
              </View>))}
                </View>
              <Text style={[{marginLeft:'auto',marginRight:30},globalStyles.text]}>{item?.fees==0?"Free":item?.fees}</Text>
    
              </View>
            </View>
          </TouchableOpacity>
        );
      };
      const testdata2 = [
        {name: 'Sonakshi sharma', experience: '3', pos:"web developer",add:"vijay nagar"},
      ];

      

  return (
    <View style={[globalStyles.container2]}>
      {/* <Text>Mymeetups</Text> */}
      <SearchBox width={'100%'} search={search} setSearch={setSearch} />

      <FlatList
        data={search?filter:data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem2}
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
export default Mymeetups