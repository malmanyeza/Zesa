import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PickCurrency from './UnitsAndCurrencyModalComponents/PickCurrency';
import UnitsOrAmountInput from './UnitsAndCurrencyModalComponents/UnitsOrAmountInput';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import { useRatesContext } from '../../../../hooks/ratesContext';

const UnitsAndCurrencyModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)

  const {isUnitsAndCurrencyModalVisible, 
    setIsPaymentOptionsModalVisible, setIsConfirmationModalVisible,
    setIsUnitsAndCurrencyModalVisible, buyingState
  } = usePaymentContext()

  const {amountOrUnitsInputValue}= useRatesContext()

  const goToPaymentOptionsModal = async() =>{
  
      setIsUnitsAndCurrencyModalVisible(false)
      setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed&&buyingState==='Buy On Credit'){
      setIsConfirmationModalVisible(true)
    }else if(isNextButtonPressed){
      setIsPaymentOptionsModalVisible(true)
    }
  }

  const closeModal =()=>{
    setIsUnitsAndCurrencyModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isUnitsAndCurrencyModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.8}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
       <PickCurrency/>
       <UnitsOrAmountInput/>
       <NextButton
        onPress={goToPaymentOptionsModal}
        isActivated={amountOrUnitsInputValue}
        buttonTitle={'Next'}
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
    backgroundColor:'lightgray',
    borderRadius: 15,
    padding: 20,
  }
});

export default UnitsAndCurrencyModal;
