import React,{useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image, TextInput } from 'react-native';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import Colors from '../../../../constants/constants';
import NextButton from '../NextButton';
import Modal from 'react-native-modal';
import ModalsHeader from '../ModalsHeader';
import CancelButton from '../CancelButton';

const BankPreconfirmationModal = () => {

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)

  const {setIsBankSelectionsToSaveModalVisible, userBankAccount, setIsPaymentOptionsModalVisible,
    setUserBankAccount, saveUserBankAccount, isUserBankAccountSaved, setIsConfirmationModalVisible,
    setIsUserBankAccountSaved, deleteBankDetails, isBankPreconfirmationModalVisible,
    setIsBankPreconfirmationModalVisible, bankInputValidation
  } = usePaymentContext()


  
  const sanitizeBankNumber = (name) => {
    if (name && isUserBankAccountSaved) {
      // Check if the bank name has at least 4 characters
      if (name.length >= 4) {
        // Get the first part of the name (all characters except the last 4)
        const firstPart = name.slice(0, -4);
        // Create a sanitized bank name with 'X' characters for the first part
        const sanitizedNumber = 'X'.repeat(firstPart.length) + name.slice(-4);
        return sanitizedNumber;
      }
    }
    return name;
  };




  const onBankAccountNoChange = (value) =>{

     const formattedAccountNumber = value.replace(/[^0-9]/g, '');
     setUserBankAccount({...userBankAccount, bankAccountNumber:formattedAccountNumber})
  }

  const handleCloseModal = ()=>{
    setIsBankSelectionsToSaveModalVisible(false)
  }

  const openBankOptionsModal = ()=>{ 
    setIsBankSelectionsToSaveModalVisible(true)
    setIsUserBankAccountSaved(false)
    setUserBankAccount({...userBankAccount, bankAccountNumber:''})
  }

  const backPress =()=>{
    setIsBackButtonPressed(true)
    setIsBankPreconfirmationModalVisible(false)
  }

  const goToConfirmationModal = () =>{
    if(bankInputValidation(userBankAccount)){
        setIsBankPreconfirmationModalVisible(false)
        setIsNextButtonPressed(true)
    }else{
        alert("Please fill in all the details")
    }
  }

  const onModalHidden = ()=>{
    if(isNextButtonPressed){
      setIsConfirmationModalVisible(true)
      setIsNextButtonPressed(false)
    }else if(isBackButtonPressed){
      setIsPaymentOptionsModalVisible(true)
      setIsBackButtonPressed(false)
    }
  }

  const closeModal =()=>{
    setIsBankPreconfirmationModalVisible(false)
    setIsNextButtonPressed(false)
  }
  

  return (
    <Modal
      isVisible={isBankPreconfirmationModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    > 
    <View style={styles.container}>
        <ModalsHeader
          headerTitle={"Confirm Bank Details"}
          onBackPress={backPress}
        />
      <View style={styles.headerInfo}>
        <Text style={styles.header}>My Bank Details</Text>

        <TouchableOpacity 
          onPress={openBankOptionsModal}
          style={styles.deleteBankButton}>
          <Text style={styles.deleteText}>Change Details</Text>
        </TouchableOpacity>
      </View>
      
      <View>
      <View style={styles.bankTitleAndChangeButton}>
        <View style={styles.bankTitle}>
           <Image
            style={styles.bankImage}
            source={userBankAccount.bankImage}
          />
          <Text style={styles.bankName}>{userBankAccount.bankName}</Text> 
        </View>
      </View>
      <TextInput
        placeholderTextColor={'black'}
        editable={!isUserBankAccountSaved}
        style={[styles.input, 
            {borderColor: isUserBankAccountSaved? Colors.disabled:Colors.primary},
            {color:isUserBankAccountSaved? Colors.disabled:"black"}
        ]}
        placeholder="Enter Your Bank Account Number"
        value={isUserBankAccountSaved ? sanitizeBankNumber(userBankAccount.bankAccountNumber) : userBankAccount.bankAccountNumber}
        onChangeText={onBankAccountNoChange}
        keyboardType="numeric"
        maxLength={20}
      />

      <NextButton
        isActivated={true}
        buttonTitle={'Next'}
        onPress={goToConfirmationModal}
      />

      <CancelButton
       onPress={closeModal}
      />
      
      </View>
      </View>
      </Modal>
  );
};

const styles = StyleSheet.create({

  modal:{
    justifyContent: 'center',
    
    },
container: {
    width: '100%', // 90% width
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
    },
  header: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bankTitleAndChangeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bankTitle: {
    color:'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  bankName: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeBankButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
    padding: 10,
    paddingHorizontal:20
  },
  changeText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal:10 ,
    marginTop: 20,
    paddingVertical: 5,
    fontSize: 16,

  },
  saveButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteBankButton:{
    flexDirection:'row',
    backgroundColor: Colors.disabled,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal:15
  },
  deleteText:{
    color:'black',
    marginRight:5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center' 
  }


});

export default BankPreconfirmationModal;
