import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import SearchBox from '../components/Search'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { http } from '../utils/AxiosInstance'
import theme from '../utils/theme'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux'
import { addNavREf } from '../redux/actions/navigationREf'
import { navigate } from '../App'


const Search = () => {
    const [ search,setSearch]=useState()
    const  [ data,setData]=useState();
    const foucs = useIsFocused();
    

   const dispatch = useDispatch()
   const [ loading,setLoading]=useState(false);

   const addfrnd = async(frndid) => {
    const userid = await AsyncStorage.getItem("userid");

    const body={
        method: 'addFriend',
        friendId:frndid,
        userId:userid
    }
    setLoading(true)
    http.get('/', {
        params: {
        ...body
        }
    })
        .then(response => {
            console.log('Response:', response.data);;
            setLoading(false);
       
  
        })
        .catch(error => {
            console.error('Error:', error);
           Alert.alert("Network Error")
            setLoading(false)
        });
  
    
  }
      useEffect(()=>{
        if(search?.length>3){
          fetchdata()
        }
        return () => {
          dispatch(addNavREf("Home"))
        };
          },[search]);
      const fetchdata = async() => {
        const userid = await AsyncStorage.getItem("userid");
      
        const body={
            method: 'search',
            search:search,
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
                setData(response.data);
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
        <TouchableOpacity onPress={()=>navigate("ProfileDetail",{id:item?.userId})}
          style={[styels.box]}>
          <Image
            source={{uri:item?.photo}}
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
                {item?.name||"Test Name"}
              </Text>
              <TouchableOpacity onPress={()=>addfrnd(item?.friendId)}
                style={[styels.connectbutton]}>
                                <FontAwesome name ="paper-plane" size={16} color='white'/>
                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                  Connect Request
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[globalStyles.text2, {opacity: 0.5}]}>
              {item?.experience} Years
            </Text>
            <Text style={[globalStyles.text,{fontSize:14}]}>{item?.company}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    
  return (
    <View style={[{backgroundColor:"white",flex:1}]}>
        <SearchBox search={search} setSearch={setSearch}/>
      {/* <Text>search</Text> */}
    { loading?<ActivityIndicator size={"large"} color={"black"} />: <FlatList
        data={data?.response}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      />}
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

export default Search