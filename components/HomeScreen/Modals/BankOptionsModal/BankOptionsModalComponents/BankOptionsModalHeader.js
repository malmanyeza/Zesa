import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BackButton from "../../BackButton";


const BankOptionsModalHeader = ({onBackPress}) => {
    
  return (

    <View style={styles.container}>
        <BackButton onBackPress={onBackPress}/>
            <Text style={styles.headerText}>Select your bank:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:20
    },
    headerText:{
      color:'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:20
      },
    image:{
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the image resizeMode
        borderRadius:5,
    },
   
    });

    export default BankOptionsModalHeader;