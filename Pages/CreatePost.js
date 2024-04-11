import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { addNavREf, setScreenName } from '../redux/actions/navigationREf'
import { CustomTextInput, CustomTextInput2 } from '../components/CustomTextInput'
import theme from '../utils/theme'
import { CustomButton } from '../components/CustomButton'
import { http } from '../utils/AxiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../App'

const CreatePost = () => {
    const dispactch = useDispatch()
    const nav = useSelector(({ nav }) => nav);
    console.log(nav);
    const [ loading,setLoading]=useState(false);
    const [ user,setUser]=useState()
    useEffect(()=>{
        fetch();
    },[]);
    const fetch=async()=>{
        const data = await AsyncStorage.getItem("user")
        const json = JSON.parse(data)
        setUser(json);
    }
    const createPost = async() => {
      setLoading(true)
      const userid = await AsyncStorage.getItem("userid")
      const body={
          method: 'postFeed',
          userId:userid,
          content:agendarules

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
              alert("Successfully created Feed")
              dispactch(addNavREf("Feed"));
              navigate('Feed')
     
  
          })
          .catch(error => {
              console.error('Error:', error);
             Alert.alert("Network Error")
              setLoading(false)
          });
  
      
  }
    const [subject,setSubject]=useState()
    const [ location,setLocation]=useState()
    const  [fees,setFees]=useState();
    const [ agendarules,setAgendaRules]=useState();
    const [ objective,setObjective]=useState()


    useEffect(()=>{
     dispactch(setScreenName("Create"))
     dispactch(addNavREf("Create Host"))
    },[]);
  return (
    <View style={[globalStyles.container2,{}]}>
      {/* <Text>CreatePost</Text> */}
      <View style={{ flexDirection: "row",marginTop:20 }}>
                    <Image style={{ height: 30, width: 30, borderRadius: 20, marginRight: 10 }} source={{ uri: user?.photo }} />
                    <View>
                        <Text style={[globalStyles.text, { color: theme.colors.primary }]}>{user?.name || "Test Name"}</Text>
                        {/* <Text style={[globalStyles.text2]}>{user?.time || "10 hours"}</Text> */}
                    </View>
           
                </View>
                <TextInput
             numberOfLines={5}
             style={{backgroundColor:"white",borderRadius:10,width:"100%",marginTop:10,borderWidth:1,borderColor:"white"}}
            
             value={agendarules}
             onChangeText={(e)=>setAgendaRules(e)}
             placeholder='write here ...'
             placeholderTextColor={"black"}
            />
            
         <CustomButton loading={loading} onPressfuntion={()=>createPost()}  text={"Post"} marginTop={"auto"} />      
      {/* </ScrollView> */}
    </View>
  )
}

export default CreatePost