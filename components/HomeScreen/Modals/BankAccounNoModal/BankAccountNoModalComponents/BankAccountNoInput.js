import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import Colors from '../../../../../constants/constants';

const BankAccountNoInput = () => {

  const {userBankAccount, setUserBankAccount} = usePaymentContext()

  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (text) => {
    // Remove any non-digit characters
    const formattedInputValue = text.replace(/\D/g, '');

    if (formattedInputValue.length >= 6) {
      // Valid bank account number with at least 6 digits
      
      setUserBankAccount({ ...userBankAccount, bankAccountNumber: formattedInputValue });
    } else {
      setUserBankAccount({ ...userBankAccount, bankAccountNumber: formattedInputValue });
    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter your Bank Account Number here"
        keyboardType="numeric"
        maxLength={20}
        value={userBankAccount.bankAccountNumber}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    padding: 5,
    paddingLeft: 15,
    fontSize: 18,
    marginTop: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default BankAccountNoInput;
