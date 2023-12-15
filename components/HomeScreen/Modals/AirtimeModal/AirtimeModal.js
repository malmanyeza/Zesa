import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import PhoneNumberInput from './AirtimeModalComponents/PhoneNumberInput';
import ModalsHeader from '../ModalsHeader';

const AirtimeModal = () => {

  const airTimeImage = require('../../../../assets/icons/airtime.png')

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {isAirtimeModalVisible, setIsAirtimeModalVisible,
    setIsPaymentOptionsModalVisible, airtimePhone,
    setIsUnitsAndCurrencyModalVisible, setIsConfirmationModalVisible
  } = usePaymentContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsAirtimeModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{  
    setIsAirtimeModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed)setIsConfirmationModalVisible(true)
    else if(isBackButtonPressed)setIsPaymentOptionsModalVisible(true)
  }

  const closeModal =()=>{
    setIsAirtimeModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isAirtimeModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <ModalsHeader
          headerImage={airTimeImage}
          headerTitle={'Airtime Payment'}
          onBackPress={goBackToPaymentOptionsModal}
        />
        <PhoneNumberInput/>
       <NextButton
        onPress={goToConfirmationModal}
        isActivated={airtimePhone.length==10}
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

export default AirtimeModal;
