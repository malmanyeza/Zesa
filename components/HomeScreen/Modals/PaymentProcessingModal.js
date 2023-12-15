import React,{useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useFirebaseContext } from '../../../hooks/firebaseConext';
import Colors from '../../../constants/constants';


const PaymentProcessingModal = () => {

const {loading} = useFirebaseContext()

  return (
    <Modal
      isVisible={loading}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <View style={styles.container}> 
        <Text style={styles.text}> Please wait...</Text> 
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // 90% width
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.darkText
  }
});

export default PaymentProcessingModal;
