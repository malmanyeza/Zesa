import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../../../constants/constants';
import { usePaymentContext } from '../../../../hooks/paymentContext';
import Modal  from 'react-native-modal';
import NextButton from '../NextButton';
import CancelButton from '../CancelButton';
import ModalsHeader from '../ModalsHeader';

const VisaCardPreConfirmationModal = () => {

  const { userVisaCard, setUserVisaCard, visaCardInputValidation, setIsConfirmationModalVisible,
    saveUserVisaCard, isUserVisaCardSaved, setIsVisaCardPreconfirmationModalVisible, setIsPaymentOptionsModalVisible,
    setIsUserVisaCardSaved, deleteVisaCardDetails, isVisaCardPreconfirmationModalVisible
  } = usePaymentContext();
  const [expirationDate, setExpirationDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false)
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false)



  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setExpirationDate(selectedDate.toISOString().split('T')[0]);
      setUserVisaCard({ ...userVisaCard, expiryDate: expirationDate });
      setDatePickerVisible(false);
    } else {
      setDatePickerVisible(false);
    }
  };

  const handleSave = () => {
    saveUserVisaCard(userVisaCard);
  }

  const onFocus = () => {
    setIsUserVisaCardSaved(false);
  }

  const handleCCVChange = (input) => {
    const formattedAccountNumber = input.replace(/\D/g, '');
    setUserVisaCard({ ...userVisaCard, ccv: formattedAccountNumber });
  }

  const handleCardNumberChange = (input) => {
    const formattedAccountNumber = input.replace(/\D/g, '');
    
    setUserVisaCard({ ...userVisaCard, cardNumber: formattedAccountNumber });

  }

  const clearVisaCardDetails = () => {
    setUserVisaCard({ ...userVisaCard, cardNumber: '', expiryDate: '', ccv: '' });
    setIsUserVisaCardSaved(false)
    deleteVisaCardDetails()
  }

  const backPress =()=>{
    setIsBackButtonPressed(true)
    setIsVisaCardPreconfirmationModalVisible(false)
  }

  const goToConfirmationModal = () =>{
    if(visaCardInputValidation(userVisaCard)){
        setIsVisaCardPreconfirmationModalVisible(false)
        setIsNextButtonPressed(true)
    }else{
        alert('Please fill in all the details')
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
    setIsVisaCardPreconfirmationModalVisible(false)
    setIsNextButtonPressed(false)
  }

  const sanitizer = (digits) => {
    if (digits && isUserVisaCardSaved) {
      // Check if the bank name has at least 4 characters
      if (digits.length >= 4) {
        // Get the first part of the name (all characters except the last 4)
        const firstPart = digits.slice(0, -4);
        // Create a sanitized bank name with 'X' characters for the first part
        const sanitizedNumber = 'X'.repeat(firstPart.length) + digits.slice(-4);
        return sanitizedNumber;
      }
    }
    return digits;
  }

  return (
    <Modal
      isVisible={isVisaCardPreconfirmationModalVisible}
      animationIn='slideInRight' // Customize the animation as needed
      animationOut='slideOutLeft' // Customize the animation as needed
      backdropOpacity={0.7}
      style={styles.modal}
      onBackdropPress={closeModal}
      onModalHide={onModalHidden}
    > 
      <View style={styles.container}>
        <ModalsHeader
         headerTitle={"Confirm Your Details"}
         onBackPress={backPress}
        />
      <View style={styles.headerInfo}>
        <Text style={styles.header}>Visa Card Details</Text>
       
       <TouchableOpacity 
          onPress={clearVisaCardDetails}
          style={styles.deleteVisaCardButton}>
          <Text style={styles.deleteText}>Change Details</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input, 
            {borderColor: isUserVisaCardSaved? Colors.disabled:Colors.primary},
            {color:isUserVisaCardSaved? Colors.disabled:"black"}]}
        placeholder="Enter Visa card number"
        value={isUserVisaCardSaved? sanitizer(userVisaCard.cardNumber): userVisaCard.cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
        maxLength={20}
        onFocus={onFocus}
        editable={!isUserVisaCardSaved}
      />
      <View style={styles.rowContainer}>
        <TextInput
          placeholderTextColor={'black'}
          style={[styles.dateInput,
            {borderColor: isUserVisaCardSaved? Colors.disabled:Colors.primary},
            {color:isUserVisaCardSaved? Colors.disabled:"black"}
        ]}
          placeholder="Expiration Date"
          value={userVisaCard.expirationDate}
          onFocus={showDatePicker}
          editable={!isUserVisaCardSaved}
        />
        <TextInput
          placeholderTextColor={'black'}
          style={[styles.ccvInput,
            {borderColor: isUserVisaCardSaved? Colors.disabled:Colors.primary},
            {color:isUserVisaCardSaved? Colors.disabled:"black"}
        ]}
          placeholder="CCV"
          value={userVisaCard.ccv}
          onChangeText={handleCCVChange}
          keyboardType="numeric"
          maxLength={3}
          onFocus={onFocus}
          editable={!isUserVisaCardSaved}
        />
      </View>
      {isDatePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <NextButton
       isActivated={true}
       buttonTitle={"Next"}
       onPress={goToConfirmationModal}
      />
      <CancelButton
        onPress={closeModal}
      />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // 90% width
    backgroundColor: 'lightgray',
    borderRadius: 15,
    padding: 20,
    },
  header: {
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
    paddingVertical: 5
  },
  invalidInput: {
    borderColor: 'red',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  dateInput: {
    color:'black',
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 5,
    marginRight: 5,
  },
  ccvInput: {
    color:'black',
    flex: 0.35,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 5
  },
  saveButtonText: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteVisaCardButton:{
    flexDirection:'row',
    backgroundColor: Colors.disabled,
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    paddingHorizontal:15
  },
  deleteText:{
    color:'black',
    marginRight:5,
    fontSize:16,
    fontWeight:'bold'
  },
  headerInfo:{
    color:'black',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10 
  }
});

export default VisaCardPreConfirmationModal;
