import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import MasterCardDetailsInput from './MasterCardModaComponents/MasterCardDetailsInput';

const MasterCardModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {isMasterCardModalVisible, setIsMasterCardModalVisible,
    setIsPaymentOptionsModalVisible,userMasterCard , masterCardInputValidation,
    setIsConfirmationModalVisible
  } = usePaymentContext()

  const goBackToPaymentOptionsModal = async() =>{
    setIsMasterCardModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = async() =>{
    setIsMasterCardModalVisible(false)
    setIsNextButtonPressed(true)
    }

  const onModalHidden = ()=>{
    if(isNextButtonPressed)setIsConfirmationModalVisible(true)
    else if(isBackButtonPressed)setIsPaymentOptionsModalVisible(true)
  }

  const closeModal =()=>{
    setIsMasterCardModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isMasterCardModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <MasterCardDetailsInput
         onBackPress={goBackToPaymentOptionsModal}
        />
       <NextButton
        onPress={goToConfirmationModal}
        isActivated={masterCardInputValidation(userMasterCard)}
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

export default MasterCardModal;
