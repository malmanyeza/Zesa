import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import Colors from '../../../../../constants/constants';

const MeterNumberInput = () => {

  const {otherMeterNumber, setOtherMeterNumber} = usePaymentContext()
  
  const [isValid, setIsValid] = useState(true);

  const handleMeterNumberChange = (text) => {
    // Remove any non-digit characters
    const formattedMeterNumber = text.replace(/\D/g, '');

    setOtherMeterNumber(formattedMeterNumber);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter the meter number here"
        keyboardType="numeric"
        maxLength={11}
        value={otherMeterNumber}
        onChangeText={handleMeterNumberChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    padding: 5,
    paddingLeft: 15,
    fontSize: 18,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  header:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10
  }
});

export default MeterNumberInput;
