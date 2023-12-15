import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFirebaseContext } from '../../hooks/firebaseConext';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';

const RegisterButton = () => {
  const { registerUser, setLoading } = useFirebaseContext();
  const { meterNumber, setUserInfo } = usePaymentContext();

  const handleRegisterPress = async () => {
    try {
      await registerUser(meterNumber, setLoading, setUserInfo)
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RegisterButton;
