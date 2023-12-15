import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import UnitsInput from './BuyOnCreditModalComponents/UnitsInput';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import { useRatesContext } from '../../../../hooks/ratesContext';
import CancelButton from '../CancelButton';


const BuyOnCreditModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const { setIsEcocashModalVisible, isBuyOnCreditModalVisible,
    setIsPaymentOptionsModalVisible, setIsBuyOnCreditModalVisible,
    setIsConfirmationModalVisible,  setIsShareModalVisible
  } = usePaymentContext()

  const { unitsAmount, unitsAmountInputValidation} = useRatesContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsEcocashModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{
    setIsBuyOnCreditModalVisible(false)
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
    setIsBuyOnCreditModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isBuyOnCreditModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <UnitsInput/>
       <NextButton
        onPress={goToConfirmationModal}
        buttonTitle={'Next'}
        isActivated={unitsAmountInputValidation(unitsAmount)}
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

export default BuyOnCreditModal;
