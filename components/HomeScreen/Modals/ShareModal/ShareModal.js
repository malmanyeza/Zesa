import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import UnitsInput from './ShareModalComponents/UnitsInput';
import MeterNumberInput from './ShareModalComponents/MeterNumberInput';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import { useRatesContext } from '../../../../hooks/ratesContext';
import CancelButton from '../CancelButton';


const ShareModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const { setIsEcocashModalVisible, isShareModalVisible,
    setIsPaymentOptionsModalVisible, 
    setIsConfirmationModalVisible, otherMeterNumber, setIsShareModalVisible
  } = usePaymentContext()

  const {unitsAndmeterNoInputValidation, unitsAmount, setUnitsAmount} = useRatesContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsEcocashModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{
    setIsShareModalVisible(false)
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
    setIsShareModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isShareModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <UnitsInput/>
        <MeterNumberInput/>
       <NextButton
        onPress={goToConfirmationModal}
        buttonTitle={'Next'}
        isActivated={unitsAndmeterNoInputValidation(otherMeterNumber, unitsAmount)}
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

export default ShareModal;
