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
  Box
} from 'react-native';
import Constants from 'expo-constants';


  export const DefiUpdate = (props) => {

    const { id,fullname ,timeStamp,recentText,avatarUrl } = props;

    const [updateMode, setUpdateMode] = useState(false);
  
    const [fullnameoUpdate, setfullnameToUpdate] = useState(fullname);
    const [timeStampToUpdate, settimeStampToUpdate] = useState(timeStamp);
    const [recentTextToUpdate, setrecentTextToUpdate] = useState(recentText);
    const [avatarUrlToUpdate, setavatarUrlToUpdate] = useState(avatarUrl);
    

    function handleUpdateDefi () {
        props.updateRow(id,fullname,recentText,timeStamp,avatarUrl)    
        setUpdateMode(false) 
    } 
  return (
    
    
    <View style={styles.container}>

    <StatusBar style="auto" />
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
      
        placeholderTextColor="#D3D3D3"
        value={fullnameoUpdate}
        onChange={(e) => setfullnameToUpdate(e.target.value)}
      />
    </View>

    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
      
        placeholderTextColor="#D3D3D3"
        value={timeStampToUpdate}
        onChange={(e) => settimeStampToUpdate(e.target.value)}
      />

    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
     
        placeholderTextColor="#D3D3D3"
        value={recentTextToUpdate}
        onChange={(e) => setrecentTextToUpdate( e.target.value)}
      />
    
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
      
        placeholderTextColor="#D3D3D3"
        value={avatarUrlToUpdate}
        onChange={(e) => setavatarUrlToUpdate(e.target.value)}
      />
    
    </View>
   

    <TouchableOpacity style={styles.loginBtn} onPress={handleUpdateDefi} >
    <Text style={styles.loginText} >update</Text>
    </TouchableOpacity>
  </View>
  );
}



