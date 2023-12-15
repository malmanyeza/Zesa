import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import VisaCardDetailsInput from './VisaCardModalComponents/VisaCardDetailsInput';

const VisaCardModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {isVisaCardModalVisible, setIsVisaCardModalVisible,
    setIsConfirmationModalVisible,
    setIsPaymentOptionsModalVisible, userVisaCard,visaCardInputValidation
  } = usePaymentContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsVisaCardModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = async() =>{
    setIsVisaCardModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed)setIsConfirmationModalVisible(true)
    else if(isBackButtonPressed)setIsPaymentOptionsModalVisible(true)
  }

  const closeModal =()=>{
    setIsVisaCardModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isVisaCardModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <VisaCardDetailsInput
          onBackPress={goBackToPaymentOptionsModal}
        />
       <NextButton
        onPress={goToConfirmationModal}
        isActivated={visaCardInputValidation(userVisaCard)}
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

export default VisaCardModal;
