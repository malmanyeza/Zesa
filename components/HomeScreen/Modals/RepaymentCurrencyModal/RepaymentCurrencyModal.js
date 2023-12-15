import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from '../NextButton';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import CancelButton from '../CancelButton';
import UsdAndZwlButtons from './RepaymentCurrencyModalComponents/UsdAndZwlButtons';
import Colors from '../../../../constants/constants';
import CreditAmountMessage from './RepaymentCurrencyModalComponents/CreditAmountMessage';


const RepaymentCurrencyModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)

  const {isRepaymentCurrencyModalVisible, 
    setIsPaymentOptionsModalVisible, 
    setIsRepaymentCurrencyModalVisible
  } = usePaymentContext()

  

  const goToPaymentOptionsModal = () =>{
    setIsRepaymentCurrencyModalVisible(false)
    setIsNextButtonPressed(true)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsPaymentOptionsModalVisible(true)
    }
  }

  const closeModal =()=>{
    setIsRepaymentCurrencyModalVisible(false)
    setIsNextButtonPressed(false)
  }

  return (
    <Modal
      isVisible={isRepaymentCurrencyModalVisible}
      animationIn= 'slideInRight' // Customize the animation as needed
      animationOut= 'slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
       <Text style={styles.header}>Select Currency</Text>
       <CreditAmountMessage/>
       <UsdAndZwlButtons/>
       <NextButton
        onPress={goToPaymentOptionsModal}
        buttonTitle={'Next'}
        isActivated={true}
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
  header:{
    color:Colors.darkText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:30
  }
});

export default RepaymentCurrencyModal;
