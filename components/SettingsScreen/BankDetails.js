import React,{useState , memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image, TextInput } from 'react-native';
import { usePaymentContext } from '../../hooks/paymentContext';
import Colors from '../../constants/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BankDetails = () => {

  const [sanitizedBankAccountNumber, setSanitizedBankAccountNumber] = useState('');

  const {setIsBankSelectionsToSaveModalVisible, userBankAccount, 
    setUserBankAccount, saveUserBankAccount, isUserBankAccountSaved,
    setIsUserBankAccountSaved, deleteBankDetails
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
  }

  const handleOnSave = ()=>{
    if(userBankAccount.bankName && userBankAccount.bankAccountNumber){
    saveUserBankAccount(userBankAccount)
    }else{
      alert('Please select a bank and enter your bank account number')
    }
  }

  const deleteBankAccount = ()=>{
    setUserBankAccount({...userBankAccount, bankName:'', bankAccountNumber:''})
    setIsUserBankAccountSaved(false)
    deleteBankDetails()
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.header}>Bank Details</Text>
        {userBankAccount.bankName?
        <TouchableOpacity 
          onPress={deleteBankAccount}
          style={styles.deleteBankButton}>
          <Text style={styles.deleteText}>Clear</Text>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
        :null
        }
      </View>
      
      {userBankAccount.bankName?
      <View>
      <View style={styles.bankTitleAndChangeButton}>
        <View style={styles.bankTitle}>
           <Image
            style={styles.bankImage}
            source={userBankAccount.bankImage}
          />
          <Text style={styles.bankName}>{userBankAccount.bankName}</Text> 
        </View>
        <TouchableOpacity 
          onPress={openBankOptionsModal}
          style={styles.changeBankButton}>
          <Text style={styles.changeText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholderTextColor={'black'}
        editable={!isUserBankAccountSaved}
        style={[styles.input, {opacity:isUserBankAccountSaved?0.3:1, borderColor:isUserBankAccountSaved?'gray':Colors.primary}]}
        placeholder="Enter Your Bank Account Number"
        value={isUserBankAccountSaved ? sanitizeBankNumber(userBankAccount.bankAccountNumber) : userBankAccount.bankAccountNumber}
        onChangeText={onBankAccountNoChange}
        keyboardType="numeric"
        maxLength={20}
      />
      <TouchableOpacity 
        disabled={isUserBankAccountSaved}
        style={[styles.saveButton, {opacity:isUserBankAccountSaved?0.3:1}]} 
        onPress={handleOnSave}>
        <Text style={styles.saveButtonText}>{isUserBankAccountSaved?'Saved!':'Save'}</Text>
      </TouchableOpacity>
      </View>
      :
      <TouchableOpacity 
        onPress={openBankOptionsModal}
        style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Select Bank</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    marginVertical:10
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
    marginTop: 10,
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
    backgroundColor: 'lightgray',
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

export default memo(BankDetails);
