import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import SearchBox from '../components/Search'
import theme from '../utils/theme'
import { getDatabase, onValue, ref } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNavREf } from '../redux/actions/navigationREf'
import {useDispatch} from "react-redux"

const Inbox = ({navigation}) => {
    const [ search,setSearch]=useState();
    const dispatch = useDispatch()
    const testdata = [

        {name: 'amit jain', experience: '3', compnay: 'radical private limited '},
      ];
    const [myid,setMyid]=useState();

    useEffect(()=>{
      const fetch =async()=>{
        const userid = await AsyncStorage.getItem('userid')
            setMyid(userid)
      }
      fetch()
    },[]);

    const [ networkchatData,setNeworkChatsData]=useState([])
    
     const [ loading,setLoading]=useState(false);
      useEffect(() => {
        const db = getDatabase();
        setLoading(true);
        // const userChatRef = ref(db, url);
        const userChatRef2 = ref(db, `ChatNetwork/${myid}`);
        const chatListener2 = onValue(userChatRef2, snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setNeworkChatsData(data);
            console.log(data)
            setLoading(false);
          } else {
            console.log('Chats data not found 2');
            setLoading(false);
          }
        });

        return () => {
          // Clean up the listener when the component unmounts
          chatListener2();
        };
      }, [myid]);


      const renderitem = ({item}) => {
        return (
          <TouchableOpacity
            style={[styles.box]}>
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
                <Text style={[globalStyles.text2]}>
                  4:10 PM
                </Text>
           
              </View>

              <Text style={[globalStyles.text,{width:230}]}>{item?.compnay}sdfsd sdfsdf</Text>
            </View>
     
          </TouchableOpacity>
        );
      };
  return (
    <View style={[globalStyles.container2]}>
        <SearchBox search={search} setSearch={setSearch} />
      {/* <Text>Inbox</Text> */}
      {/* <FlatList
        data={testdata}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      /> */}
            <ScrollView>
            {networkchatData &&
              Object.entries(networkchatData).map(innerItem => (
                // Object.entries(item[1]).map((innerItem) => (
                <TouchableOpacity
                onPress={()=>{dispatch(addNavREf("Chat")); navigation.navigate("Chat",{recivierId:innerItem[0]})} }
                  style={[globalStyles.rowflex, styles.messageBox]}>
                  {innerItem[1][0]?.url? (
                    <Image
                      source={{uri: innerItem[1][0]?.url}}
                      style={{height: 50, width: 50, borderRadius: 30}}
                    />
                  ) : (
                    <Image
                      source={require('../assests/images/download.png')}
                      style={{height: 50, width: 50, borderRadius: 30}}
                    />
                  )}
                  <View style={{marginRight: 'auto', marginLeft: 20}}>
                    <Text style={[globalStyles.text,{color:theme.colors.primary}]}>
                      {innerItem[1][0].name.substring(0, 16)}
                      {innerItem[1][0].name.length > 17 && '...'}
                    </Text>
                    <Text style={[globalStyles.text2]}>
                      {innerItem[1][1][innerItem[1][1]?.length - 1].message}
                    </Text>
                  </View>
                  <View style={{marginRight: 20}}>
                    <Text
                      style={[
                        globalStyles.text2,
                        {fontSize: 13, marginBottom: 15},
                      ]}>
                      {innerItem[1][1][innerItem[1][1]?.length - 1]?.time}
                    </Text>
                    {innerItem[1][0].status == 'unseen' && (
                      <Text
                        style={[
                          globalStyles.text2,
                          {
                            backgroundColor: theme.colors.primary,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            textAlign: 'center',
                          },
                        ]}>
                        {innerItem[1][0]?.number}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                // ))
              ))}
          </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
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
    messageBox: {
      height: 70,
      borderBottomWidth: 1,
      borderColor: 'rgba(0,0,0,.2)',
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
export default Inbox