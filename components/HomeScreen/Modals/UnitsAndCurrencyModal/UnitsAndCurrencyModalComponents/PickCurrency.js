import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRatesContext } from '../../../../../hooks/ratesContext';
import Colors from '../../../../../constants/constants';

const PickCurrency = () => {

  const {
    selectedCurrency, setSelectedCurrency
  } = useRatesContext()

  const handleCurrencySelection = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleCurrencySelection('USD')}
        style={[
          styles.currencyOption,
          selectedCurrency === 'USD' ? styles.selectedOption : null,
        ]}
      >
        {selectedCurrency === 'USD' && <View style={styles.selectedDot} />}
        <Text style={styles.currencyText}>USD</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleCurrencySelection('ZWL')}
        style={[
          styles.currencyOption,
          selectedCurrency === 'ZWL' ? styles.selectedOption : null,
        ]}
      >
        {selectedCurrency === 'ZWL' && <View style={styles.selectedDot} />}
        <Text style={styles.currencyText}>ZWL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  currencyOption: {
    color:'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedOption: {
    color: 'white',
    backgroundColor: 'lightgray',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginRight: 5,
  },
  currencyText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickCurrency;
