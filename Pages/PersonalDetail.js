import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import PageHeader from '../components/PageHeader'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import IconBox from '../components/iconBox';
import theme from '../utils/theme';
import { CustomTextInput } from '../components/CustomTextInput';

const PersonalDetail = ({navigation}) => {
    const [ acitve,setActive]= useState("");
    const [ education,setEducation]=useState()
  return (
    <View style={[globalStyles.container2,{paddingTop:20}]}>
        <PageHeader name="Personal Details" navigation={navigation}/>
      {/* <Text>PersonalDetail</Text> */}
      <TouchableOpacity onPress={()=>setActive("education")} style={[styles.buttons,{borderColor:acitve=="education"?theme.colors.primary:"rgba(0,0,0,.1)"}]}>
      <IconBox iconName={"book-education"}/>
      <Text style={[globalStyles.text,{marginLeft:30}]}>Education</Text>
      </TouchableOpacity>
      { acitve=="education"&&<CustomTextInput
                label={"Email Id"}
                value={education}
                setValue={setEducation}
                // placeholder={"education"}
                iconName={"book"}
                marginTop={7}
            /> }
      {acitve=="education"&&<View style={{width:"100%",backgroundColor:"white",borderRadius:10,elevation:2}}></View>}
      <TouchableOpacity onPress={()=>setActive("date")} style={[styles.buttons,{borderColor:acitve=="date"?theme.colors.primary:"rgba(0,0,0,.1)"}]}>
      <IconBox iconName={"update"}/>
      <Text style={[globalStyles.text,{marginLeft:30}]}>Date Of Birth</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setActive("about")} style={[styles.buttons,{borderColor:acitve=="about"?theme.colors.primary:"rgba(0,0,0,.1)"}]}>
      <IconBox iconName={"home"}/>
      <Text style={[globalStyles.text,{marginLeft:30}]}>About You</Text>
      </TouchableOpacity>

      
    </View>
  )
}

const styles = StyleSheet.create({
    buttons:{
        borderWidth:1,
        borderRadius:10,
        height:50,
        width:"100%",
        paddingHorizontal:10,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:15,
        marginTop:20
        
    }
})

export default PersonalDetail