import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BackButton from "./BackButton";
import Colors from "../../../constants/constants";


const ModalsHeader = ({onBackPress, headerImage, headerTitle}) => {

    
  return (

    <View style={styles.container}>
        <BackButton onBackPress={onBackPress}/>
        
            <Text style={styles.headerText}>{headerTitle}</Text>
            <Image source={headerImage} style={styles.image} />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:20
    },
    headerText:{
      color:Colors.darkText,
        fontSize: 20,
        fontWeight: 'bold',
      },
    image:{
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the image resizeMode
        borderRadius:5,
    },
   
    });

    export default ModalsHeader;