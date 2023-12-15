import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import BankAccountNoInput from './BankAccountNoModalComponents/BankAccountNoInput';
import ModalsHeader from '../ModalsHeader';


const BankAccountNoModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)


  const {isBankAccountNoModalVisible, setIsBankAccountNoModalVisible,
    setIsBankOptionModalVisible, userBankAccount, setIsConfirmationModalVisible,
    setIsUnitsAndCurrencyModalVisible,bankAccountNoInputValidation,
  } = usePaymentContext()

  const goBackToBankOptionModal = async() =>{
    setIsBankAccountNoModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{
    setIsBankAccountNoModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsNextButtonPressed(false)
      setIsConfirmationModalVisible(true)
      
    }else if(isBackButtonPressed){
      setIsBackButtonPressed(false)
      setIsBankOptionModalVisible(true)
      
    }
  }

  const closeModal =()=>{
    setIsBankAccountNoModalVisible(false)
    setIsNextButtonPressed(false)
    setIsBackButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isBankAccountNoModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <ModalsHeader
          onBackPress={goBackToBankOptionModal}
          headerTitle={'Bank Payment'}
        />
        <BankAccountNoInput/>
        <NextButton
          buttonTitle={'Next'}
          onPress={goToConfirmationModal}
          isActivated={bankAccountNoInputValidation(userBankAccount.bankAccountNumber)}
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

export default BankAccountNoModal;
