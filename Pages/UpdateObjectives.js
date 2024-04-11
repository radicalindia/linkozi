import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import PageHeader from '../components/PageHeader';
import theme from '../utils/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomButton } from '../components/CustomButton';
import { http } from '../utils/AxiosInstance';

const UpdateObjectives = ({navigation}) => {
  const [selected, setSeleted] = useState('');
  const [ selectedaarray  ,setArray]=useState([])
  const array = [
    {name: 'fund', icon: 'attach-money', text: 'Raise Funding'},
    {name: 'invest', icon: 'auto-graph', text: 'Want to invest in a startup'},
    {name: 'explore', icon: 'compass-outline', text: 'Explore Career Opportunities'},
    {name: 'hire', icon: 'supervised-user-circle', text: 'Hire Talent'},
    {name: 'Brain', icon: 'attach-money', text: 'Brainstorm Ideas'},
    // {name: '', icon: 'attach-money', text: 'Raise Funding'},


  ];
  const array2 = [
    {name: 'fund', icon: 'attach-money', text: 'Raise Funding'},
    {name: 'invest', icon: 'auto-graph', text: 'Want to invest in a startup'},
    {name: 'explore', icon: 'compass-outline', text: 'Explore Career Opportunities'},
    
    // {name: '', icon: 'attach-money', text: 'Raise Funding'},


  ];
  const [ loading,setLoading]=useState(false)
  
  const sendData = async() => {

    const body={
        method: 'objective',
        objective:selectedaarray.toString(),

    }
    setLoading(true)
    http.get('/', {
        params: {
        ...body
        }
    })
        .then(response => {
            console.log('Response:', response.data);
            setLoading(false)
        

        })
        .catch(error => {
            console.error('Error:', error);
           Alert.alert("Network Error")
            setLoading(false)
        });

    
}

  const RenderIt = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {if(!selectedaarray.includes(item.name)){
            setArray((prev)=>[...prev,item.name])
        }
    else{
        const da=selectedaarray.filter((it)=>it!==item?.name)
        setArray(da);

    }}}
        style={[
          styles.buttons,
          {
            backgroundColor:
              selectedaarray.includes(item.name)
                ? theme.colors.primary
                : theme.colors.primaryOpacity,
          },
        ]}>
        {selectedaarray.includes(item.name) ? (
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={22}
            color={'white'}
            style={{marginLeft: 'auto'}}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={22}
            color={theme.colors.primary}
            style={{marginLeft: 'auto'}}
          />
        )}
        <View style={[styles.cicrlebox, {marginTop: -10}]}>
          {item.name=="explore"?<MaterialCommunityIcons
            name={item.icon}
            size={30}
            color={theme.colors.primary}
          />:<MaterialIcons
          name={item.icon}
          size={30}
          color={theme.colors.primary}
        />}
        </View>
        <Text
          style={[
            globalStyles.text,
            {
              color: selectedaarray.includes(item.name) ? 'white' : 'rgba(0,0,0,.7)',
              marginTop: 10,fontSize:14
            },
          ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView contentContainerStyle={[globalStyles.container2, {paddingTop: 20}]}>
      <PageHeader name={'Update your Objectives'} navigation={navigation} />
      <Text style={[globalStyles.text2, {marginVertical: 10}]}>
        Click on your objective and update details.
      </Text>
      {/* <View
        style={{
          backgroundColor: 'white',
          height: 300,
          width: '100%',
          borderRadius: 20,
          marginTop: 20,
        }}>
        <FlatList
          data={array}
          renderItem={RenderIt}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
        />
      </View> */}
      <View
        style={{
          backgroundColor: 'white',
          // height: 300,
          width: '100%',
          borderRadius: 20,
          paddingHorizontal:5,
          marginTop: 20,
        }}>
          <View style={[globalStyles.rowflex,{marginVertical:10}]}>
            <View style={{width:50,height:50,justifyContent:"center",alignItems:"center",backgroundColor:theme.colors.primary,borderRadius:30}}>
            <MaterialCommunityIcons
            name="briefcase"
            size={28}
            color={"white"}
            // style={{marginLeft: 'auto'}}
          />
            </View>
            <Text style={[globalStyles.text,{fontSize:20}]}>JOB SEEKER</Text>
            <TouchableOpacity style={{backgroundColor:theme.colors.primary,paddingHorizontal:5,borderRadius:10}}><Text style={{color:"white"}}>Add More</Text></TouchableOpacity>
          </View>
        <FlatList
          data={array}
          renderItem={RenderIt}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
        />
      </View>
      <CustomButton loading={loading} onPressfuntion={()=>sendData()} text={"Next"} marginTop={30} />

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buttons: {
    width: 100,
    height: 140,
    borderRadius: 15,
    // elevation:1,
    marginRight:10,
    marginVertical:5,
    padding: 10,
  },
  cicrlebox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateObjectives;
