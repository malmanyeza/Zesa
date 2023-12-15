import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../../../constants/constants';
import { useRatesContext } from '../../../../../hooks/ratesContext';

const UnitsOrAmountInput = () => {
  

  const{
    amountOrUnitsInputValue, setAmountOrUnitsInputValue,selectedCurrency,
    equivalentValue, isAmountMode,setIsAmountMode, equivalentValueGiver
  } = useRatesContext()

  const toAmountSwitch = () => {
    setIsAmountMode(true);
  };

  const toUnitsSwitch = () => {
    setIsAmountMode(false);
  };

  useEffect(()=>{
    equivalentValueGiver(amountOrUnitsInputValue,selectedCurrency,isAmountMode)
  },[amountOrUnitsInputValue, selectedCurrency,isAmountMode])

 

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>You can enter </Text>
        <TouchableOpacity onPress={toAmountSwitch}>
          <Text
            style={[
              styles.modeButtonText,
              isAmountMode ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            {' '}
            Amount{' '}
          </Text>
        </TouchableOpacity>
        <Text style={styles.optionText}>or</Text>
        <TouchableOpacity onPress={toUnitsSwitch}>
          <Text
            style={[
              styles.modeButtonText,
              !isAmountMode ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            {' '}
            Units{' '}
          </Text>
        </TouchableOpacity>
      </View>
        <TextInput
          placeholderTextColor={'black'}
          style={styles.input}
          placeholder={isAmountMode ? 'Enter Amount' : 'Enter Units'}
          value={amountOrUnitsInputValue}
          onChangeText={(text) => setAmountOrUnitsInputValue(text)}
          keyboardType="numeric"
        />
      <Text style={styles.equivalentValue}>
        Equivalent{isAmountMode ? ' Units' : ' Amount'}:{' '}
        <Text style={styles.boldText}>{equivalentValue} {isAmountMode ? ' Units' : selectedCurrency }</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    color:'black',
    alignSelf:'stretch',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    padding: 5,
    paddingLeft: 15,
    fontSize: 18,
  },
  modeButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginLeft: 10,
  },
  modeButtonText: {
    color:'black',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  equivalentValue: {
    color:'black',
    alignSelf: 'flex-start',
    flexDirection:'row',
    marginTop: 30,
    fontSize: 18,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary, // Customize the text color for the equivalent value
  },
  optionText:{
    color:'black',
    paddingVertical:10,
    fontSize:18
  },
  activeButton:{
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
    inactiveButton:{
        borderRadius: 15,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    optionContainer:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'flex-start',
        marginBottom:5,
    }
});

export default UnitsOrAmountInput;
