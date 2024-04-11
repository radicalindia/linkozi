import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import theme from '../utils/theme'
import { http } from '../utils/AxiosInstance'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../App'
import { useIsFocused } from '@react-navigation/native'

const Feed = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState();
     const [userid ,setUserid]=useState()
     const focus = useIsFocused()
    useEffect(() => {
        fetchdata()
    }, [focus]);

    const deletedata = async (id) => {
        const userid = await AsyncStorage.getItem('userid')
       setUserid(userid);
        const body = {
            method: 'deleteFeed',
            postId:id,
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
                 fetchdata();
                // setData(response.data?.response)


            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert("Network Error")
                setLoading(false)
            });


    }

    const fetchdata = async () => {
        const userid = await AsyncStorage.getItem('userid')
       setUserid(userid);
        const body = {
            method: 'viewFeed',
        }
        setLoading(true)
        http.get('/', {
            params: {
                ...body
            }
        })
            .then(response => {
                console.log('Response:', response.data?.response);;
                setLoading(false);
                setData(response.data?.response)


            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert("Network Error")
                setLoading(false)
            });


    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{  borderRadius: 10, width: "100%", padding: 10, backgroundColor: "white", elevation: 2, marginLeft: 1, marginVertical: 7 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{ height: 30, width: 30, borderRadius: 20, marginRight: 10 }} source={{ uri: item?.photo }} />
                    <View>
                        <Text style={[globalStyles.text, { color: theme.colors.primary }]}>{item?.name || "Test Name"}</Text>
                        <Text style={[globalStyles.text2]}>{item?.time || "10 hours"}</Text>
                    </View>
                    {userid==item?.userId&&<TouchableOpacity onPress={()=>deletedata(item?.postId)} style={{marginRight:10,marginLeft:"auto"}}>
                        <MaterialCommunityIcons name="delete" size={20}  />
                    </TouchableOpacity>}
                </View>
                <Text style={{ marginVertical: 10, fontSize: 14, color: "black", fontWeight: "900" }}>{item?.description}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <MaterialCommunityIcons name="cards-heart-outline" size={20}  />
                <Text style={[globalStyles.text2]}>2 like</Text>
                <MaterialCommunityIcons name="cards-heart-outline" size={20} style={{marginLeft:10}}  />
                <Text style={[globalStyles.text2]}>2 comments</Text>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[globalStyles.container2]}>
            {/* <Text>Feed</Text> */}

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            />
            <TouchableOpacity onPress={()=>navigate("CreatePost")} style={{backgroundColor:theme.colors.primary,height:50,width:50,borderRadius:25,justifyContent:"center",alignItems:"center",position:"absolute",bottom:70,right:20}}>
            <MaterialCommunityIcons name="plus" size={40} color="white"  />

            </TouchableOpacity>
        </View>
    )
}

export default Feed