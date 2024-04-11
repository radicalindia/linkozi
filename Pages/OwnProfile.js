import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/GlobalStyles';
import theme from '../utils/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomButton} from '../components/CustomButton';
import {http} from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {CustomTextInput, CustomTextInput3} from '../components/CustomTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OwnProfile = ({route}) => {
  const id = route?.params?.id;
  const [editstatus, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [insta, setInsta] = useState('');
  const [fb, setFb] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [obj, setobj] = useState();
  const [github, setGithub] = useState('');
  const [youtube, setYoutube] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [grade, setGrade] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [Education, setEducations] = useState();
  const [work, setWork] = useState();
  const [workArray, setWorkArray] = useState([{companyName:"",experience:"",ctc:"",startDate:"",endDate:""}]);
  const [ educationArray , setEducationArray]=useState([{schoolName:"",degree:"",field:"",grade:"",startDate:"",endDate:""}])
  const [ctc, setCtc] = useState();
  const [experience, setExperience] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setCompanyName(obj?.companyName);
    setExperience(obj?.experience);
    setCtc(obj?.ctc);
    setStartDate(obj?.startDate);
    setEndDate(obj?.lastDate);
    setSchoolName(obj?.name);
    setDegree(obj?.degree);
    setGrade(obj?.grade);
    setField(obj?.field);
    console.log(obj);
  }, [obj]);

  const testdata = [
    {name: 'amit jain', experience: '3', compnay: 'radical private limited '},
  ];
  const [loading, setLoading] = useState(false);

  const editWork = async () => {
    const userid = await AsyncStorage.getItem('userid');

    if (!companyName || !ctc || !startDate || !endDate || !experience) {
      return Alert.alert('Fill all required fields');
    }
    const body = {
      method: 'editWork',
      userId: userid,
      cName: companyName,
      experience: experience,
      ctc: ctc,
      startDate: startDate,
      endDate: endDate,
      workexpId: obj?.workId,
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response work edit:', response.data);
        setLoading(false);

        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };

  const addeducation = async () => {
    const userid = await AsyncStorage.getItem('userid');


    const body = {
      method: 'addEducation',
      userId: userid,
      collage: educationArray?.map((item) => { return item?.schoolName }).toString(),
      grade: educationArray?.map((item) => { return item?.grade }).toString(),     
      degree: educationArray?.map((item) => { return item?.degree }).toString(),
      field: educationArray?.map((item) => { return item?.field }).toString(),
      startDate: educationArray?.map((item) => { return item?.startDate }).toString(),
      endDate: educationArray?.map((item) => { return item?.endDate }).toString()
      
    };
    // return console.log(workArray?.map((item)=>{return item?.companyName}).toString()) 
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response word add:', response.data);
        setLoading(false);
        setModalVisible(false);
       fetchEducation();
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const editEducation = async (id) => {
    const userid = await AsyncStorage.getItem('userid');


    const body = {
      method: 'editEducation',
      userId: userid,
      educationId:obj?.educationId,
      name:schoolName,
      field:field,
      grade:grade,
      startDate:startDate,
      endDate:endDate


      
    };
    // return console.log(workArray?.map((item)=>{return item?.companyName}).toString()) 
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response word add:', response.data);
        setLoading(false);
        setModalVisible(false);
       fetchEducation();
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const addWork = async () => {
    const userid = await AsyncStorage.getItem('userid');


    const body = {
      method: 'addWork',
      userId: userid,
      company: workArray?.map((item)=>{return item?.companyName}).toString(),
      experience: workArray?.map((item)=>{return item?.experience}).toString(),
      ctc: workArray?.map((item)=>{return item?.ctc}).toString(),
      startDate:workArray?.map((item)=>{return item?.startDate}).toString(),
      endDate: workArray?.map((item)=>{return item?.endDate}).toString()
    };
    // return console.log(workArray?.map((item)=>{return item?.companyName}).toString()) 
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response word add:', response.data);
        setLoading(false);
        setModalVisible(false);
       fetchWork();
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const deleteEducation = async id => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'deleteEducation',
      userId: userid,
      educationId: id,
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response word add:', response.data);
        setLoading(false);
        fetchEducation()
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const deleteWork = async id => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'deleteWork',
      userId: userid,
      workexpId: id,
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response delte work:', response.data);
        setLoading(false);
        fetchWork()
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const addEudcation = async () => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'addWork',
      userId: userid,
      collage: schoolName,
      degree: be,
      field: field,
      grade: grade,
      startDate: startDate,
      endDate: endDate,
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        console.log('response word add:', response.data);
        setLoading(false);

        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };

  const foucs = useIsFocused();
  const [data, setData] = useState();
  useEffect(() => {
    fetchdata();
    fetchEducation();
    fetchWork();
  }, [foucs]);
  const fetchdata = async () => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'myprofile',
      userId: id ? id : userid,
      type: 'accept',
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        // console.log('response myprofile:', response.data);
        setLoading(false);
        setData(response.data?.response);
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const fetchWork = async () => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'viewWork',
      userId: userid,
      type: 'accept',
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        // console.log('response myprofile:', response.data);
        setLoading(false);
        setWork(response.data?.response);

        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };
  const fetchEducation = async () => {
    const userid = await AsyncStorage.getItem('userid');

    const body = {
      method: 'viewEducation',
      userId: userid,
      type: 'accept',
    };
    setLoading(true);
    http
      .get('/', {
        params: {
          ...body,
        },
      })
      .then(response => {
        // console.log('response myprofile:', response.data);
        setLoading(false);
        setEducations(response.data?.response);
        // setMeetupData(response?.data?.meetup);
        // setpeopleData(response?.data?.pepole);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error');
        setLoading(false);
      });
  };

  const renderitem = ({item}) => {
    return (
      <TouchableOpacity style={[globalStyles.box]}>
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={[styles.connectbutton]}>
                {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.connectbutton,
                  {backgroundColor: theme.colors.buttonBG, marginLeft: 5},
                ]}>
                {/* <FontAwesome name ="paper-plane" size={16} color='white'/> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[globalStyles.text2, {opacity: 0.5}]}>
            {item?.experience} Years
          </Text>
          <Text style={[globalStyles.text, {width: 180}]}>{item?.compnay}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[globalStyles.container2, {paddingHorizontal: 1}]}>
      {/* <Text>OwnProfile</Text> */}
      <View style={[globalStyles.box]}>
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
        <View style={{marginLeft: 10, flex: 0.99}}>
          {/* <View style={[globalStyles.rowflex, {width: '90%'}]}> */}
          <Text style={[globalStyles.text, {color: theme.colors.primary}]}>
            {data?.name}
          </Text>
          {/* <TouchableOpacity
                  style={[styles.connectbutton]}>
                                  <FontAwesome name ="paper-plane" size={16} color='white'/>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                    Connect Request
                  </Text>
                </TouchableOpacity> */}
          {/* </View> */}
          <Text style={[globalStyles.text, {opacity: 0.5, fontSize: 13}]}>
            Investment Banking Analyst at Evalueserve
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[globalStyles.text, {fontSize: 13}]}>Dehli</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setStatus('Edit Intro');
            }}>
            <MaterialCommunityIcons
              name="account-edit"
              size={20}
              color="#3B8FCF"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={[
            globalStyles.rowflex,
            {paddingHorizontal: 10, marginTop: 10},
          ]}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Education
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setStatus('Education');
            }}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={Education}
          renderItem={({item}) => (
            <View style={[globalStyles.box]}>
              <Image
                source={require('../assests/images/Z.png')}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#9B9B9B',
                }}
              />
              <View style={{marginLeft: 10, flex: 0.99}}>
                {/* <View style={[globalStyles.rowflex, {width: '90%'}]}> */}
                <Text
                  style={[globalStyles.text, {color: theme.colors.primary}]}>
                  {item?.name}
                </Text>
                {/* <TouchableOpacity
                style={[styles.connectbutton]}>
                                <FontAwesome name ="paper-plane" size={16} color='white'/>
                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                  Connect Request
                </Text>
              </TouchableOpacity> */}
                {/* </View> */}
                <Text style={[globalStyles.text, {opacity: 0.5, fontSize: 13}]}>
                  {item?.degree} {item?.field} {item?.grade}
                </Text>
                <Text style={[globalStyles.text, {fontSize: 13}]}>Dehli</Text>
                <Text style={[globalStyles.text, {fontSize: 13}]}>
                  {item?.startDate} - {item?.lastDate}
                </Text>

                {/* </View> */}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    deleteEducation(item?.educationId);
                  }}>
                  <MaterialCommunityIcons name="delete" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    setModalVisible(true);
                    setStatus('Education');
                    setobj(item);
                    setEdit(true);

                  }}>
                  <MaterialCommunityIcons
                    name="circle-edit-outline"
                    size={20}
                    color="#3B8FCF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View>
        <View
          style={[
            globalStyles.rowflex,
            {paddingHorizontal: 10, marginTop: 10},
          ]}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Work
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setStatus('work');
            }}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={work}
          renderItem={({item}) => (
            <View style={[globalStyles.box]}>
              <Image
                source={require('../assests/images/Z.png')}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#9B9B9B',
                }}
              />
              <View style={{marginLeft: 10, flex: 0.99}}>
                {/* <View style={[globalStyles.rowflex, {width: '90%'}]}> */}
                <Text
                  style={[globalStyles.text, {color: theme.colors.primary}]}>
                  {item?.companyName}
                </Text>
                {/* <TouchableOpacity
                style={[styles.connectbutton]}>
                                <FontAwesome name ="paper-plane" size={16} color='white'/>
                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold',marginLeft:5}}>
                  Connect Request
                </Text>
              </TouchableOpacity> */}
                {/* </View> */}
                <Text style={[globalStyles.text, {opacity: 0.5, fontSize: 13}]}>
                  {item?.experience} Years
                </Text>
                <Text style={[globalStyles.text, {fontSize: 13}]}>Dehli</Text>
                <Text style={[globalStyles.text, {fontSize: 13}]}>
                  {item?.startDate} - {item?.lastDate}
                </Text>

                {/* </View> */}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    deleteWork(item?.workId);
                  }}>
                  <MaterialCommunityIcons name="delete" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => {
                    setModalVisible(true);
                    setStatus('work');
                    setobj(item);
                    setEdit(true);
                  }}>
                  <MaterialCommunityIcons
                    name="circle-edit-outline"
                    size={20}
                    color="#3B8FCF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/*  */}
      <Modal
        onRequestClose={() => {
          setModalVisible(false);
          setStatus('');
          setobj('');
          setEdit(false);
        }}
        transparent={true}
        animationType="slide"
        visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}>
          <View
            style={[
              globalStyles.rowflex,
              {borderBottomColor: 'black', borderBottomWidth: 1},
            ]}>
            <Text style={[globalStyles.text]}>{editstatus}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setStatus('');
                setobj('');
              }}>
              <MaterialCommunityIcons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {editstatus == 'Edit Intro' ? (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: 'white',
                padding: 20,
              }}>
              <CustomTextInput
                label={'Company Name'}
                value={companyName}
                setValue={setCompanyName}
                placeholder={'Enter company name'}
                iconName={'alpha-c-box'}
                marginTop={10}
              />
              <CustomTextInput
                label={'Username'}
                value={username}
                setValue={setUsername}
                placeholder={'Enter username'}
                iconName={'account'}
                marginTop={10}
              />
              <CustomTextInput
                label={'Mobile'}
                value={mobile}
                setValue={setMobile}
                placeholder={'Enter mobile number'}
                iconName={'phone'}
                marginTop={10}
              />
              <CustomTextInput
                label={'Address'}
                value={address}
                setValue={setAddress}
                placeholder={'Enter address'}
                iconName={'arrow-decision-auto'}
                marginTop={10}
              />
              
              <CustomTextInput
                label={'Instagram'}
                value={insta}
                setValue={setInsta}
                placeholder={'Enter Instagram handle'}
                iconName={'instagram'}
                marginTop={10}
              />
              <CustomTextInput
                label={'Facebook'}
                value={fb}
                setValue={setFb}
                placeholder={'Enter Facebook handle'}
                iconName={'facebook'}
                marginTop={10}
              />
              <CustomTextInput
                label={'LinkedIn'}
                value={linkedin}
                setValue={setLinkedin}
                placeholder={'Enter LinkedIn profile URL'}
                iconName={'linkedin'}
                marginTop={10}
              />
              <CustomTextInput
                label={'GitHub'}
                value={github}
                setValue={setGithub}
                placeholder={'Enter GitHub username'}
                iconName={'github'}
                marginTop={10}
              />
              <CustomTextInput
                label={'YouTube'}
                value={youtube}
                setValue={setYoutube}
                placeholder={'Enter YouTube channel URL'}
                iconName={'youtube'}
                marginTop={10}
              />
              <CustomButton loading={loading} text={'Save'} marginTop={'20%'} />
            </ScrollView>
          ) : editstatus == 'Education' ? (
            (edit?<ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: 'white',
                padding: 20,
              }}>
              <CustomTextInput
                label={'School Name'}
                value={schoolName}
                setValue={setSchoolName}
                placeholder={'Enter school name'}
                iconName={'school'}
                marginTop={10}
              />

              <CustomTextInput
                label={'Degree'}
                value={degree}
                setValue={setDegree}
                placeholder={'Enter degree'}
                marginTop={10}
                // noicon={true}
                iconName={"certificate"}
              />
              <CustomTextInput
                label={'Field of Study'}
                value={field}
                setValue={setField}
                placeholder={'Enter field of study'}
                marginTop={10}
                // noicon={true}
                iconName={"file-certificate"}
              />
              <CustomTextInput
                label={'Grade'}
                value={grade}
                setValue={setGrade}
                placeholder={'Enter grade'}
                marginTop={10}
                iconName={"book"}
              />
              <CustomTextInput
                label={'Start Date'}
                value={startDate}
                setValue={setStartDate}
                placeholder={'Enter start date'}
                marginTop={10}
                iconName={"update"}
              />
              <CustomTextInput
                label={'End Date'}
                value={endDate}
                setValue={setEndDate}
                placeholder={'Enter end date'}
                marginTop={10}
                // noicon={true}
                iconName={"update"}
              />
                              <CustomButton
                  onPressfuntion={() => {
                  editEducation()
                  }}
                  loading={loading}
                  text={'Save'}
                  marginTop={'10%'}
                />
            </ScrollView>:<ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: 'white',
                // padding: 20,
              }}>
             {educationArray?.map((item,index)=>(
              <View style={[styles.container]}>
            <CustomTextInput3
                label={'School Name'}
                value={educationArray}
                setValue={setEducationArray}
                placeholder={'Enter school name'}
                iconName={'school'}
                name={"schoolName"}
                marginTop={10}
                indexNumber={index}
              />

              <CustomTextInput3
                label={'Degree'}
                value={educationArray}
                setValue={setEducationArray}
                placeholder={'Enter degree'}
                marginTop={10}
                indexNumber={index}
                name={"degree"}
                // noicon={true}
                iconName={"certificate"}
                
              />
              <CustomTextInput3
                label={'Field of Study'}
                value={educationArray}
                setValue={setEducationArray}
                placeholder={'Enter field of study'}
                marginTop={10}
                // noicon={true}
                iconName={"file-certificate"}
                indexNumber={index}
                name={"field"}

              />
              <CustomTextInput3
                label={'Grade'}
                value={educationArray}
                setValue={setEducationArray}
                indexNumber={index}
                name={"grade"}
                placeholder={'Enter grade'}
                marginTop={10}
                iconName={"book"}
              />
              <CustomTextInput3
                label={'Start Date'}
                value={educationArray}
                setValue={setEducationArray}
                indexNumber={index}
                name={"startDate"}
                placeholder={'Enter start date'}
                marginTop={10}
                iconName={"update"}
              />
              <CustomTextInput3
                label={'End Date'}
                value={educationArray}
                indexNumber={index}
                name={"endDate"}
                setValue={setEducationArray}
                placeholder={'Enter end date'}
                marginTop={10}
                // noicon={true}
                iconName={"update"}
              />
              </View>
             ))}
               <View style={globalStyles.rowflex}>
               {educationArray?.length>1&&<TouchableOpacity
                  style={{backgroundColor: 'red', borderRadius: 10,width:90,padding:3,justifyContent:"center",alignItems:"center",marginTop:10,opacity:.8}}
                  onPress={() =>
                    setEducationArray(prev => [
                      ...prev,
                      {
                        schoolName:"",degree:"",field:"",grade:"",startDate:"",endDate:""
                      },
                    ])
                  }>
                  <Text style={{color: 'white'}}>Remove</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                  style={{backgroundColor: 'green', borderRadius: 10,width:90,padding:3,justifyContent:"center",alignItems:"center",marginTop:10}}
                  onPress={() =>
                    setEducationArray(prev => [
                      ...prev,
                      {
                        schoolName:"",degree:"",field:"",grade:"",startDate:"",endDate:""
                      },
                    ])
                  }>
                  <Text style={{color: 'white'}}>Add More +</Text>
                </TouchableOpacity>
               </View>
                <CustomButton
                  onPressfuntion={() => {
                    addeducation();
                  }}
                  loading={loading}
                  text={'Save'}
                  marginTop={15}
                />
            </ScrollView>)
          ) : (
            editstatus == 'work' &&
            (edit ? (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: 'white',
                  padding: 20,
                }}>
                <CustomTextInput
                  label={'Company Name'}
                  value={companyName}
                  setValue={setCompanyName}
                  placeholder={'Enter company name'}
                  iconName={'alpha-c-box'}
                  marginTop={10}
                />
                <CustomTextInput
                  label={'Experience'}
                  value={experience}
                  setValue={setExperience}
                  placeholder={'Enter Your Experience'}
                  marginTop={10}
                  //  noicon={true}
                  iconName={'timeline'}
                />
                <CustomTextInput
                  label={'CTC'}
                  value={ctc}
                  setValue={setCtc}
                  placeholder={'Enter CTC'}
                  marginTop={10}
                  //  noicon={true}
                  iconName={'account-network'}
                />

                <CustomTextInput
                  label={'Start Date'}
                  value={startDate}
                  setValue={setStartDate}
                  placeholder={'Enter start date'}
                  marginTop={10}
                  iconName={'timeline-clock'}
                />
                <CustomTextInput
                  label={'End Date'}
                  value={endDate}
                  setValue={setEndDate}
                  placeholder={'Enter end date'}
                  marginTop={10}
                  iconName={'timeline-clock'}
                />

                <CustomButton
                  onPressfuntion={() => {
                  editWork()
                  }}
                  loading={loading}
                  text={'Save'}
                  marginTop={'10%'}
                />
              </ScrollView>
            ) : (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: 'white',
                  paddingBottom:30
                }}>
                {workArray?.map((item, index) => (
                  <View style={[styles.container]}>
                    <CustomTextInput3
                      label={'Company Name'}
                      value={workArray}
                      setValue={setWorkArray}
                      placeholder={'Enter company name'}
                      iconName={'alpha-c-box'}
                      marginTop={10}
                      indexNumber={index}
                      name={'companyName'}
                    />
                    <CustomTextInput3
                      label={'Experience'}
                      value={workArray}
                      setValue={setWorkArray}
                      placeholder={'Enter Your Experience'}
                      marginTop={10}
                      indexNumber={index}
                      //  noicon={true}
                      name={'experience'}
                      iconName={'timeline'}
                    />
                    <CustomTextInput3
                      label={'CTC'}
                      value={workArray}
                      setValue={setWorkArray}
                      name={'ctc'}
                      placeholder={'Enter CTC'}
                      marginTop={10}
                      indexNumber={index}
                      //  noicon={true}
                      iconName={'account-network'}
                    />

                    <CustomTextInput3
                      label={'Start Date'}
                      value={workArray}
                      setValue={setWorkArray}
                      placeholder={'Enter start date'}
                      marginTop={10}
                      iconName={'timeline-clock'}
                      indexNumber={index}
                      name={'startDate'}
                    />
                    <CustomTextInput3
                      label={'End Date'}
                      value={workArray}
                      setValue={setWorkArray}
                      placeholder={'Enter end date'}
                      marginTop={10}
                      indexNumber={index}
                      name={'endDate'}
                      iconName={'timeline-clock'}
                    />
                  </View>
                ))}
                 <View style={[globalStyles.rowflex]}>
                 {workArray?.length>1&&<TouchableOpacity
                  style={{backgroundColor: 'red', borderRadius: 10,width:90,padding:3,justifyContent:"center",alignItems:"center",marginTop:10,opacity:.8}}
                  onPress={() =>
                    setWorkArray(prev=>prev.slice(0,prev?.length-1))
                  }>
                  <Text style={{color: 'white'}}>Remove</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                  style={{backgroundColor: 'green', borderRadius: 10,width:90,padding:3,justifyContent:"center",alignItems:"center",marginLeft:"auto",marginTop:10}}
                  onPress={() =>
                    setWorkArray(prev => [
                      ...prev,
                      {
                        companyName: '',
                        experience: '',
                        ctc: '',
                        startDate: '',
                        endDate: '',
                      },
                    ])
                  }>
                  <Text style={{color: 'white'}}>Add More +</Text>
                </TouchableOpacity>
                 </View>
                <CustomButton
                  onPressfuntion={() => {
                    addWork();
                  }}
                  loading={loading}
                  text={'Save'}
                  marginTop={15}
                />
              </ScrollView>
            ))
          )}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  box2: {
    // flex:.35,
    backgroundColor: 'white',
    elevation: 2,
    marginHorizontal: 0.5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 7,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  connectbutton: {
    height: 25,
    width: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  posText: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryOpacity,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 5,
  },
  container:{backgroundColor:"white",elevation:2,marginVertical:10,padding:5,marginLeft:2}
});
export default OwnProfile;
