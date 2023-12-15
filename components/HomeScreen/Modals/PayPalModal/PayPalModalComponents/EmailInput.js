import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import Colors from '../../../../../constants/constants';

const EmailInput = () => {
  const {userPayPal, setUserPayPal} = usePaymentContext()

  const handleEmailChange = (text) => {
    setUserPayPal({...userPayPal, email: text})
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Enter PayPal email address"
        value={userPayPal.email}
        onChangeText={handleEmailChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
});

export default EmailInput;
