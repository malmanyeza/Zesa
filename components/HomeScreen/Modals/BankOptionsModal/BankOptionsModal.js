import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import NextButton from '../NextButton';
import BankOptions from './BankOptionsModalComponents/BankOptions';
import BankOptionsModalHeader from './BankOptionsModalComponents/BankOptionsModalHeader';
import CancelButton from '../CancelButton';


const BankOptionsModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {bankOption, isBankOptionModalVisible,
     setIsBankOptionModalVisible, setIsPaymentOptionsModalVisible,
      setIsBankAccountNoModalVisible, setPaymentMethod
    } = usePaymentContext()



  const goBackToPaymentOptionsModal = async() =>{
    setIsBankOptionModalVisible(false)
    setIsBackButtonPressed(true)
  }

  const goToBankAcountNoModal = () =>{
    setIsBankOptionModalVisible(false)
    setIsNextButtonPressed(true)
    setPaymentMethod(bankOption)
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsNextButtonPressed(false)
      setIsBankAccountNoModalVisible(true)
    }else if(isBackButtonPressed){
      setIsBackButtonPressed(false)
      setIsPaymentOptionsModalVisible(true)
    }
  }

  const closeModal =()=>{
    setIsBankOptionModalVisible(false)
    setIsNextButtonPressed(false)
    setIsBackButtonPressed(false)
  }
  

  return (
    <Modal
      isVisible={isBankOptionModalVisible}
      animationIn="slideInRight" // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7} // Adjust the backdrop opacity
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    >
      <View style={styles.container}>
        <BankOptionsModalHeader
          onBackPress={goBackToPaymentOptionsModal}
        />
         <BankOptions/>
         <NextButton 
          buttonTitle={'Next'}
          onPress={goToBankAcountNoModal}
          isActivated={bankOption}
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
    height:'70%'
  },
  container: {
    width: '100%', // 90% width
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
  },
    optionsHeader:{
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default BankOptionsModal;
