import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import Colors from '../../../../../constants/constants';

const OfflineOnlinePick = () => {
  
  const {isOffline, setIsOffline, setPaymentOption, setPaymentOptionIndex} = usePaymentContext()

  const handleStateSelection = (state) => {
    setIsOffline(state);
    setPaymentOption(null)
    setPaymentOptionIndex(null)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleStateSelection(true)}
        style={[
          styles.stateOption,
          isOffline? styles.selectedOption : null,
        ]}
      >
        {isOffline && <View style={styles.selectedDot} />}
        <Text style={styles.stateText}>Buy Offline</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleStateSelection(false)}
        style={[
          styles.stateOption,
          !isOffline? styles.selectedOption : null,
        ]}
      >
        {!isOffline&& <View style={styles.selectedDot} />}
        <Text style={styles.stateText}>Buy Online</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  stateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
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
  stateText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OfflineOnlinePick;
