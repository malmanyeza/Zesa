import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';

const PhoneNumberInput = () => {
  const {airtimePhone, setAirtimePhone} = usePaymentContext()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);


  const airtimeImage = require('../../../../../assets/icons/airtime.png');

  const handlePhoneNumberChange = (text) => {
    // Remove any non-digit characters
    const formattedPhoneNumber = text.replace(/\D/g, '');

    setAirtimePhone(formattedPhoneNumber)
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input]}
        placeholder="Enter your ecocash number here"
        keyboardType="numeric"
        maxLength={10}
        value={airtimePhone}
        onChangeText={handlePhoneNumberChange}
      />
      {!isValid && <Text style={styles.errorText}>Invalid phone number</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 5,
    paddingLeft: 15,
    fontSize:16
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  header:{
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
    image:{
        width: 50, // Adjust the width as needed
        height: 50, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the image resizeMode
        borderRadius:5,
        marginRight:10
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 20,
    }
});

export default PhoneNumberInput;
