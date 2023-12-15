import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';

const HeaderAndMeterNo = () => {

    const {meterNumber,setMeterNumber} = usePaymentContext()

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome</Text>
      <TextInput
        value={meterNumber}
        style={styles.input}
        placeholder="Enter your meter number to register"
        keyboardType="numeric"
        maxLength={11}
        onChangeText={(text)=>setMeterNumber(text)}
        placeholderTextColor={'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  headerText: {
    color:Colors.darkText,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    color:'black',
    width:'100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom:40
  },
});

export default HeaderAndMeterNo;
