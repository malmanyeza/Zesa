import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import OfflineOnlinePick from './PaymentOptionsModalComponents/OfflineOnlinePick';
import PaymentOptions from './PaymentOptionsModalComponents/PaymentOptions';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import BackButton from '../BackButton';

const PaymentOptionsModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = React.useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = React.useState(false)

  const {paymentOption, isPaymentOptionsModalVisible, isOffline,
     setIsPaymentOptionsModalVisible, goToPaymentOptionModal, 
     setIsUnitsAndCurrencyModalVisible
    } = usePaymentContext()

  const goBackToUnitsAndCurrencyModal = () =>{
    setIsPaymentOptionsModalVisible(false)
    setIsBackButtonPressed(true)
  }

 
  const goToOptionModal = () =>{
    setIsPaymentOptionsModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsNextButtonPressed(false)
      goToPaymentOptionModal(paymentOption)
    }
    else if(isBackButtonPressed){
      setIsBackButtonPressed(false)
      setIsUnitsAndCurrencyModalVisible(true)
    }
  }

  const closeModal =()=>{
    setIsPaymentOptionsModalVisible(false)
    setIsNextButtonPressed(false)
  }

  const title = isOffline ? 'Offline Payment Options' : 'Online Payment Options'

  return (
    <Modal
      isVisible={isPaymentOptionsModalVisible}
      animationIn="slideInRight" // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7} // Adjust the backdrop opacity
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onBackPress={goBackToUnitsAndCurrencyModal}/>
          <OfflineOnlinePick/>
        </View> 
         <Text style={styles.optionsHeader}>{title}</Text>
         <PaymentOptions/>
         <NextButton 
            isActivated={paymentOption}
            onPress={goToOptionModal}
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
  },
    optionsHeader:{
      color:'black',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header:
    {
      flexDirection: 'row',
      justifyContent:'space-between'
    }
});

export default PaymentOptionsModal;
