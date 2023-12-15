import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../../constants/constants';
import { usePaymentContext } from '../../../hooks/paymentContext';

const ErrorModal = () => {

  const {isErrorModalVisible, closeErrorModal} = usePaymentContext()
  
  const errorMessage = "Please enter a valid meter number"
  

  return (
    <View>
      <Modal
        isVisible={isErrorModalVisible}
        backdropOpacity={0.5}
        onBackdropPress={closeErrorModal}
        style={styles.errorModal}
      >
        <View style={styles.errorContent}>
          {/* Text */}
          <Text style={styles.ErrorText}>Error</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={closeErrorModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  errorModal: {
    marginHorizontal: 40,
  },
  errorContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingTop: 10,
    alignItems: 'center',
  },
  ErrorText: {
    color: Colors.BRICK_RED,
    fontSize: 28,
    marginBottom: 10,
  },
  errorMessage:{
    color:'gray',
    fontSize: 16,
    marginBottom: 10,
    textAlign:'center',
  },
  closeButton: {
    width:'100%',
    justifyContent:'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.FRENCH_GRAY,
    paddingVertical: 20,
  },
  closeButtonText: {
    color: Colors.THEME_COLOR,
    fontSize: 16,
    alignSelf:'center',
  }
});

export default ErrorModal;
