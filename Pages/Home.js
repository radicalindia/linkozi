import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import SearchBox from '../components/Search';
import theme from '../utils/theme';
// import { Image } from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../components/CustomButton';
import { http } from '../utils/AxiosInstance';


const Home = ({navigation}) => {
  const [search, setSearch] = useState();
  const [selectType, setSelecttype] = useState('people');
  const testdata = [
    {name: 'amit jain', experience: '3', compnay: 'radical private limited '},
  ];
  const testdata2 = [
    {name: 'Sonakshi sharma', experience: '3', pos:"web developer",add:"vijay nagar"},
  ];
   
  const [loading,setLoading]=useState(false);
  const [ meetupData,setMeetupData]=useState();
  const [ peopleData,setpeopleData]=useState();
  const [ fitlerpeopedata,setfilterpeopledata]=useState()
  const [ meetupfilterdata,setMeetupfilterdata]=useState();

  useEffect(()=>{
  if(selectType=="people"){
    if(search){
     const data = peopleData?.response?.filter((item)=>item?.pepoleName?.toLowerCase().startsWith(search?.toLowerCase()))
     setfilterpeopledata(data);
    }
  }
  else{
    if(search){
      const data = meetupData?.filter((item)=>item?.subject?.toLowerCase().startsWith(search?.toLowerCase()))
      setMeetupfilterdata(data);
    }
  }
  },[search]);

  useEffect(()=>{
    fetchdata()
  },[])
  const fetchdata = async() => {

    const body={
        method: 'homeScreen',
    }
    setLoading(true)
    http.get('/', {
        params: {
        ...body
        }
    })
        .then(response => {
            console.log('Response:', response.data?.meetup,response?.data?.pepole?.response);;
            setLoading(false);
            setMeetupData(response?.data?.meetup);
            setpeopleData(response?.data?.pepole);

        })
        .catch(error => {
            console.error('Error:', error);
           Alert.alert("Network Error")
            setLoading(false)
        });

    
}
const addfrnd = async() => {

  const body={
      method: 'homeScreen',
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
  const renderitem = ({item}) => {
    return (
      <TouchableOpacity
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
              {item?.pepoleName||"Test Name"}
            </Text>
            <TouchableOpacity
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
  const renderitem2 = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("MeetupersonDetail",{item:item})}
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
              {item?.subject}
            </Text>
            <Text style={{color:"black",fontSize:13,fontWeight:"bold",opacity:.6}}>20 visiter</Text>
            {/* <TouchableOpacity
              style={[styels.connectbutton]}>
                              <FontAwesome name ="paper-plane" size={16} color='white'/>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                Connect Request
              </Text>
            </TouchableOpacity> */}
          </View>
          <Text style={[globalStyles.text2, {opacity: 0.5}]}>
            {item?.add} 
          </Text>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            {item?.objective.map((it)=>(
              <View style={[styels.posText]}>
              <Text style={{color:theme.colors.primary}}>{it}</Text>
              </View>
            ))}
          <Text style={{color:theme.colors.primary,marginLeft:'auto',marginRight:30}}>200</Text>

          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[globalStyles.container2]}>
      <View
        style={[
          globalStyles.rowflex,
          {
            marginTop: 10,
            borderRadius: 10,
            overflow: 'hidden',
            paddingHorizontal: 2,
          },
        ]}>
        <TouchableOpacity
          onPress={() => setSelecttype('people')}
          style={[
            styels.button,
            {
              backgroundColor:
                selectType == 'people' ? theme.colors.primary : 'white',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}>
          <Text
            style={[
              globalStyles.text,
              {color: selectType == 'people' ? 'white' : 'rgba(0,0,0,.3)'},
            ]}>
            People
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelecttype('meetup')}
          style={[
            styels.button,
            {
              backgroundColor:
                selectType == 'meetup' ? theme.colors.primary : 'white',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}>
          <Text
            style={[
              globalStyles.text,
              {color: selectType == 'meetup' ? 'white' : 'rgba(0,0,0,.3)'},
            ]}>
            Meet Up
          </Text>
        </TouchableOpacity>
      </View>
      <SearchBox width={'100%'} search={search} setSearch={setSearch} />
      {selectType=="meetup"?
      <FlatList
      data={search?meetupfilterdata: meetupData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderitem2}
    />:<FlatList
        data={ search?fitlerpeopedata: peopleData?.response}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderitem}
      />}
      {/* <CustomButton text={"Explore on map"}  /> */}
    </View>
  );
};

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

export default Home;
