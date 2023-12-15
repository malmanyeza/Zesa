import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import MeterNumberInput from './BuyForOtherModalComponents/MeterNumberInput';


const BuyForOtherModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {isBuyForOtherModalVisible, setIsBuyForOtherModalVisible,
    meterNumberInputValidation,otherMeterNumber,
    setIsUnitsAndCurrencyModalVisible,
  } = usePaymentContext()

  const goToUnitsAndCurrencyModal = async() =>{
    setIsBuyForOtherModalVisible(false)
    setIsNextButtonPressed(true)
  }


  const onModalHidden = ()=>{
    if(isNextButtonPressed)setIsUnitsAndCurrencyModalVisible(true)
  }

  const closeModal =()=>{
    setIsBuyForOtherModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isBuyForOtherModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <MeterNumberInput/>
       <NextButton
        onPress={goToUnitsAndCurrencyModal}
        isActivated={meterNumberInputValidation(otherMeterNumber)}
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
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
  }
});

export default BuyForOtherModal;
