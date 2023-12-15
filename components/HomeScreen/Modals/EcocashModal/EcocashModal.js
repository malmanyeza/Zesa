import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import PhoneNumberInput from './EcocashModalComponents/PhoneNumberInput';
import ModalsHeader from '../ModalsHeader';


const EcocashModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {isEcocashModalVisible, setIsEcocashModalVisible,
    setIsPaymentOptionsModalVisible, ecocashDetails, ecocashNumberInputValidation,
    setIsConfirmationModalVisible
  } = usePaymentContext()

  

  const goBackToPaymentOptionsModal = async() =>{
    setIsEcocashModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToConfirmationModal = () =>{
    setIsEcocashModalVisible(false)
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
    setIsEcocashModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isEcocashModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <ModalsHeader
          onBackPress={goBackToPaymentOptionsModal}
          headerTitle={'Ecocash Payment'}
        />
        <PhoneNumberInput/>
       <NextButton
        onPress={goToConfirmationModal}
        buttonTitle={'Next'}
        isActivated={ecocashNumberInputValidation(ecocashDetails.ecocashNumber)}
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

export default EcocashModal;
