import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../constants/constants';

const CancelButton = ({ onPress }) => {
  return (
    <TouchableOpacity
     onPress={onPress} 
     style={styles.button}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    justifyContent:'center',
    borderColor:Colors.primary
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
  },
});

export default CancelButton;

