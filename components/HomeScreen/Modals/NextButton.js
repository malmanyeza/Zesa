import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../constants/constants';

const NextButton = ({isActivated, onPress , buttonTitle}) => {
  return (
    <TouchableOpacity
     disabled={!isActivated}
     onPress={onPress} 
     style={[styles.button,{ opacity:isActivated? 1:0.5}]}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: Colors.primary, // Customize the button background color
    padding: 10,
    borderRadius: 25,
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
  },
});

export default NextButton;
