import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Button, Modal, TouchableWithoutFeedback } from 'react-native';
import { navigate, navigationRef } from "../App.js";
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addNavREf } from '../redux/actions/navigationREf.js';
import theme from '../utils/theme.js';
import { globalStyles } from '../utils/GlobalStyles.js';
import PageHeader from '../components/PageHeader.js';
import { CustomButton } from '../components/CustomButton.js';

import ImageCropPicker from 'react-native-image-crop-picker';



const Upload = () => {
    const nav = useSelector(({ nav }) => nav?.nav);
    const dispatch = useDispatch();
    const [ image,setImage]=useState();

    const handleImagePick = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                cropping: true,
                width: 300,
                height: 400,
                cropperCircleOverlay: false,
                mediaType: 'photo',
            });
            console.log(image);
            setImage(image);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUploadImage = () => {
        console.log('Upload image');
    };

    const [visible,setModalVisible]=useState(false)
    return (
        <View style={[globalStyles.container2,{paddingTop:20}]}>
       <PageHeader name={"Your Personal Information"}/>
       

       <CustomButton onPressfuntion={()=>{ setModalVisible(true); handleImagePick()}} text={"Upload Profile Photo"} marginTop={"auto"}/>
       <CustomButton text={"Done"} marginTop={10} bg={theme.colors.cyan}/>

      <Modal visible={visible}
      onRequestClose={()=>setModalVisible(false)}
      transparent={true}
      animationType='slide'
      >
        <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>

<View style={{flex:1,backgroundColor:"rgba(0,0,0,.5)"}}></View>
        </TouchableWithoutFeedback>
        <View style={{height:250,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>

        </View>
        <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>

<View style={{flex:1,backgroundColor:"rgba(0,0,0,.5)"}}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    );
}

const styles = StyleSheet.create({})

export default Upload;
