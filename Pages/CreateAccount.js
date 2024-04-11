import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import theme from '../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../App';
import { addNavREf } from '../redux/actions/navigationREf';
import { useNavigation } from '@react-navigation/native';


const CreateAccount = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [phone, setPhone] = useState();
    const genderArray = ["male", "female", "other"];
    const [ loading,setLoading]=useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [ visible,setVisible]=useState(false);
    const [ data,setdata]=useState();
    const [ userid,setUser]= useState();
    

    useEffect(()=>{
        const fetch =async()=>{

     const data = await AsyncStorage.getItem("user")
      const json = JSON.parse(data)
      const userid = await AsyncStorage.getItem('userid')
     if(json){
        setdata(json.response);
        setUser(userid);
        console.log(userid)
     }
        }
        fetch()
    },[])

    const createAccount = async() => {
        const fcmtoekn = await AsyncStorage.getItem("fcmtoken");
         
        const body={
            method: 'register',
            name: name?.trim(),
            // age: age?.trim(),
            // gender: gender,
            phone: phone?.trim(),
            email: email?.trim(),
            password:password?.trim(),
            deviceId:fcmtoekn

        }
        setLoading(true)
        axios.get('https://sellpe.in/circel13/api/activity.php', {
            params: {
            ...body
            }
        })
            .then(response => {
                console.log('Response:', response.data);
                setLoading(false)
                if(response?.data?.response?.status==1){
                    // AsyncStorage.setItem("user",JSON.stringify(response.data?.response));
                    // dispactch(addNavREf("Home"))
                    navigation.replace("Login");
                    console.log(response?.data);
                  }
                //   Alert.alert("Invalid Credentials")

            })
            .catch(error => {
                console.error('Error:', error);
               Alert.alert("Network Error")
                setLoading(false)
            });
    
        
    }

    const UpdateAcc = async() => {

        const body={
            method: 'edituser',
            name: name?.trim(),
            // age: age?.trim(),
            // gender: gender,
            phone: phone?.trim(),
            email: email?.trim(),
            userId:1
        }
        setLoading(true)
        axios.get('https://sellpe.in/circel13/api/activity.php', {
            params: {
            ...body
            }
        })
            .then(response => {
                console.log('Response:', response.data);
                setLoading(false)
                if(response?.data?.response?.status==1){
                    AsyncStorage.setItem("user",JSON.stringify(response.data?.response));
                    dispactch(addNavREf("Home"))
                    navigation.replace("Home");
                    console.log(response?.data);
                  }
                //   Alert.alert("Invalid Credentials")

            })
            .catch(error => {
                console.error('Error:', error);
               Alert.alert("Network Error")
                setLoading(false)
            });
    
        
    }

    return (
         <View style={{height:"100%",backgroundColor:theme.colors.bg}}>
                <ScrollView contentContainerStyle={{ padding: 20, justifyContent:"center",alignItems:'center' }}>
            <Text style={[globalStyles.text,{fontSize:20}]}>Sign Up</Text>
             <Image source={require("../assests/images/Z.png")} style={{width:200,height:200,borderRadius:100}}/>
            <CustomTextInput
                label={"Name"}
                value={data?.name||name}
                setValue={setName}
                placeholder={"Name"}
                marginTop={"5%"}
                iconName={"account"}
            />
           
            {/* <View style={{ height: 70, marginTop: "5%" }} >
                <Text style={{ color: "black", opacity: .3, marginBottom: 15 }}>Gender</Text>
                <ScrollView horizontal>
                    {genderArray.map((item) => (
                        <TouchableOpacity onPress={() => setGender(item)} style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10, borderRadius: 10, paddingVertical: 3, borderWidth: 1, borderColor: theme.colors.primaryOpacity, marginRight: 30, backgroundColor: item == gender ? theme.colors.primaryOpacity : "white" }}>
                            <Text style={{color:item==gender?"white":"black"}}>{item}</Text></TouchableOpacity>
                    ))}
                </ScrollView>
            </View> */}
            <CustomTextInput
                label={"Phone"}
                value={data?.mobile||phone}
                setValue={setPhone}
                iconName={"phone"}
                placeholder={"Mobile"}
                numeric={"numeric"}
                marginTop={"5%"}
            />
            <CustomTextInput
                label={"Email Id"}
                value={data?.email||email}
                iconName={"email"}
                setValue={setEmail}
                placeholder={"Email"}
                marginTop={"5%"}
            />
{          !data?.name&&  <CustomTextInput
                label={"Password"}
                value={password}
                setValue={setPassword}
                iconName={"key"}
                placeholder={"Create Password"}
                marginTop={"5%"}
                secure={true}
                visible={visible}
                setVisible={setVisible}
            />}
{   data?.name      ?
 <CustomButton loading={loading} onPressfuntion={()=>{UpdateAcc()}} text={"Update"} marginTop={"10%"} />
:
 <CustomButton loading={loading} onPressfuntion={()=>{createAccount()}} text={"Sign Up"} marginTop={"10%"} />
}                    

            {!data?.name&&<View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Text style={[{color:"black"}]}>Already have an account ? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}> Log in now</Text>
                </TouchableOpacity>
            </View>}
        </ScrollView>
         </View>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        width: "40%",
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white",
        height: 40,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",

    }
})

export default CreateAccount