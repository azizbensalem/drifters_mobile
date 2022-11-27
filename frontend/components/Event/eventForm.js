import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { styles } from "./style";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Box,
  Modal,
  Alert,
   Pressable
} from 'react-native';
import Constants from 'expo-constants';


  export const EventForm = (props) => {

  const [ fullname, setFullname] = useState("");
  const [ timeStamp, setTimeStamp] = useState("");
  const [ recentText, setRecentText] = useState("");
  const [ avatarUrl, setAvatarUrl] = useState("");

  const [loading, setLoading] = useState(false);



  function handleAddDefi(){
    props.addRow(fullname ,timeStamp,recentText,avatarUrl);
}
const [modalVisible, setModalVisible] = useState(false);

  return (
    


<View style={styles.centeredView}>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
  }}
>
  
<View style={styles.container}>

<StatusBar style="auto" />
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Defi"
    placeholderTextColor="#D3D3D3"
    onChangeText={(Fullname) => setFullname(fullname)}
  />
</View>

<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="date"
    placeholderTextColor="#D3D3D3"
    onChangeText={(timeStamp) => setTimeStamp(timeStamp)}
  />

</View>
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="objectif"
    placeholderTextColor="#D3D3D3"
    onChangeText={(recentText) => setRecentText(recentText)}
  />

</View>
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="durée"
    placeholderTextColor="#D3D3D3"
    onChangeText={(avatarUrl) => setAvatarUrl( avatarUrl)}
  />

</View>


<TouchableOpacity style={styles.loginBtn} onPress={handleAddDefi} >
  <Text style={styles.loginText} >Add</Text>
</TouchableOpacity>
</View>
</Modal>
<Pressable
  style={[styles.button, styles.buttonOpen]}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.text}>Add</Text>
 
</Pressable>
</View>


  );
}




