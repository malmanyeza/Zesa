import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , NativeModules} from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import { useRatesContext } from '../../../../hooks/ratesContext'
import { useFirebaseContext } from '../../../../hooks/firebaseConext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';



let RunUssd = NativeModules.USSDModule;

const ConfirmationModal = () => {


  const [isConfirmButtonPressed, setIsConfirmButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {makePayment} = useFirebaseContext()

  const {
    isConfirmationModalVisible, setIsConfirmationModalVisible, setPaymentOption, setPaymentOptionIndex, userInfo, setUserInfo,
    buyingState, meterNumber, otherMeterNumber, paymentMethod, setMeterNumber, setOtherMeterNumber, setBuyingState
  } = usePaymentContext()

  const { setAmountOrUnitsInputValue, unitsAmount,priceAmount, selectedCurrency, setUnitsAmount, setPriceAmount, setIsAmountMode, setSelectedCurrency, creditAmount } = useRatesContext()

  const dialUSSD = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.CALL_PHONE);
  
      if (permissionStatus === RESULTS.GRANTED) {
        
        RunUssd.callUSSD("*125")
      } else {
        const requestResult = await request(PERMISSIONS.ANDROID.CALL_PHONE);
        if (requestResult === RESULTS.GRANTED) {
          RunUssd.callUSSD("*125")
        } else {
          alert(
            'Permission Denied',
            'You need to grant permission to use this feature.'
          );
        }
      }
    } catch (error) {
      console.error('Error checking or requesting permission:', error);
    }
  };

 const onModalHidden = ()=>{
  if(isConfirmButtonPressed){
    if(paymentMethod=='Airtime'){
      dialUSSD()
    }else{
      makePayment(setUserInfo)
    }
    setIsConfirmationModalVisible(false)
    setUnitsAmount('')
    setPriceAmount('')
    setMeterNumber('')
    setOtherMeterNumber('')
    setBuyingState('')
    setAmountOrUnitsInputValue('')
    setIsAmountMode(true)
    setSelectedCurrency('USD')
    setPaymentOption(null)
    setIsConfirmButtonPressed(false)
    setIsConfirmButtonPressed(false)
    setPaymentOptionIndex(null)
  }
}

 

  const confirm =()=>{
    setIsConfirmationModalVisible(false)
    setIsConfirmButtonPressed(true)
  }

  const closeModal =()=>{
    setIsConfirmationModalVisible(false)
  }
  

  const confirmationMessage = buyingState=='Buy For Other'? `Please review your request:
  You have requested ${unitsAmount} worth ${priceAmount} ${selectedCurrency} for meter number ${otherMeterNumber}. To confirm your purchase, please press the 'Confirm' button below.`
  : buyingState=='Buy On Credit'? `Please review your request:
  You have requested to purchase ${unitsAmount} worth ${priceAmount} ${selectedCurrency} units on credit. To confirm your purchase, please press the 'Confirm' button below.`
  : buyingState =='Sharing'? `Please review your request:
  You have requested to send ${unitsAmount} units to meter number ${otherMeterNumber}. To confirm your purchase, please press the 'Confirm' button below.`
  : buyingState =='Buy For Self'?
  `Please review your request:
  You have requested to buy${unitsAmount} units for ${priceAmount} ${selectedCurrency}. To confirm your purchase, please press the 'Confirm' button below.`
  : 
  `Please review your request:
  You have requested to repay ${userInfo.creditUnits} worth ${creditAmount} ${selectedCurrency}. To confirm your purchase, please press the 'Confirm' button below.`


  return (
    <Modal
      isVisible={isConfirmationModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <Text style={styles.confirmationText}>
          {confirmationMessage}
        </Text>
        <NextButton
          onPress={confirm}
          isActivated={true}
          buttonTitle={'Confirm'}
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
  },
  confirmationText:{
    marginTop:20,
    fontSize:18,
    textAlign:'center',
    color:'gray'
  }
});

export default ConfirmationModal;
