import React,{memo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { usePaymentContext } from '../../../hooks/paymentContext';
import NextButton from '../../HomeScreen/Modals/NextButton';
import BankOptions from './BankOptionsModalComponents/BankOptions';
import BankOptionsModalHeader from './BankOptionsModalComponents/BankOptionsModalHeader';
import CancelButton from '../../HomeScreen/Modals/CancelButton';


const BankSelectionsToSaveModal = () => {


  const {bankOption, isBankSelectionsToSaveModalVisible,
     setIsBankSelectionsToSaveModalVisible, userBankAccount
    } = usePaymentContext()



  const closeModal =()=>{
    setIsBankSelectionsToSaveModalVisible(false)
  }
  

  return (
    <Modal
      isVisible={isBankSelectionsToSaveModalVisible}
      animationIn='slideInUp' // Customize the animation as needed
      animationOut='slideOutUp' // Customize the animation as needed
      backdropOpacity={0.7} // Adjust the backdrop opacity
      style={styles.modal}
      onBackdropPress={closeModal}
    >
      <View style={styles.container}>
        <BankOptionsModalHeader/>
         <BankOptions/>
         <NextButton 
          buttonTitle={'Done'}
          onPress={closeModal}
          isActivated={userBankAccount.bankName}
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
    color:'black',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default memo(BankSelectionsToSaveModal);
