import React,{memo} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";


const BankOptionsModalHeader = ({onBackPress}) => {
    
  return (

    <View style={styles.container}>
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
        textAlign:'center'
      },
    image:{
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the image resizeMode
        borderRadius:5,
    },
   
    });

    export default memo(BankOptionsModalHeader);