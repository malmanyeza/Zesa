import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import { useRatesContext } from '../../../../../hooks/ratesContext';
import Colors from '../../../../../constants/constants';

const UnitsInput = () => {

  const { unitsAmount, setUnitsAmount } = useRatesContext()



  const handleUnitsAmountChange = (text) => {
    // Remove any non-digit characters
    const formattedUnitsAmount = text.replace(/\D/g, '');
  
    // Use the state updater function to ensure the latest state value
    setUnitsAmount(formattedUnitsAmount);
  };
  

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Enter Units and meter number:</Text>
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Enter the amount of units here"
        keyboardType="numeric"
        value={unitsAmount}
        onChangeText={handleUnitsAmountChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom:20,
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
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10
  }
});

export default UnitsInput;
