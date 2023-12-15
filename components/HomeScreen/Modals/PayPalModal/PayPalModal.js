import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import EmailInput from './PayPalModalComponents/EmailInput';
import ModalsHeader from '../ModalsHeader';


const PayPalModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const payPalImage = require('../../../../assets/icons/paypal.png')

  const {isPayPalModalVisible, setIsPayPalModalVisible,userPayPal,
    setIsPaymentOptionsModalVisible, payPalInputValidation,
    setIsConfirmationModalVisible
  } = usePaymentContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsPayPalModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{
    setIsPayPalModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsConfirmationModalVisible(true)
    }else if(isBackButtonPressed){
      setIsPaymentOptionsModalVisible(true)
    }
  }

  const closeModal =()=>{
    setIsPayPalModalVisible(false)
    setIsNextButtonPressed(false)
    setIsBackButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isPayPalModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <ModalsHeader
          headerImage={payPalImage}
          onBackPress={goBackToPaymentOptionsModal}
          headerTitle={'PayPal Payment'}
        />
        <EmailInput/>
       <NextButton
        onPress={goToConfirmationModal}
        buttonTitle={'Next'}
        isActivated={payPalInputValidation(userPayPal)}
       />
       <CancelButton onPress={closeModal}/>
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
    width: '100%', // 90% width
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
  }
});

export default PayPalModal;
