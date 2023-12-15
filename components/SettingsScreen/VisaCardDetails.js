import React, { useState, memo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VisaCardDetails = () => {

  const { userVisaCard, setUserVisaCard, 
    saveUserVisaCard, isUserVisaCardSaved, 
    setIsUserVisaCardSaved, deleteVisaCardDetails  
  } = usePaymentContext();
  const [expirationDate, setExpirationDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);



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
    // Validate Visa card number
    if (userVisaCard.cardNumber.length < 16 || isNaN(userVisaCard.cardNumber)) {
      alert('Please enter a valid 16-digit Visa card number.');
      return;
    }

    // Validate expiration date
    if (!userVisaCard.expiryDate || !isValidExpirationDate(userVisaCard.expiryDate)) {
      alert('Please enter a valid expiration date.');
      return;
    }

    // Validate CCV
    if (userVisaCard.ccv.length !== 3 || isNaN(userVisaCard.ccv)) {
      alert('Please enter a valid 3-digit CCV.');
      return;
    }

    // Proceed with saving the Visa card details
    saveUserVisaCard(userVisaCard);
  };

  // Function to check if the expiration date is valid
  const isValidExpirationDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);

    return inputDate > currentDate;
  };

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
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.header}>Visa Card Details</Text>
       { userVisaCard.cardNumber?
       <TouchableOpacity 
          onPress={clearVisaCardDetails}
          style={styles.deleteVisaCardButton}>
          <Text style={styles.deleteText}>Clear</Text>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
        :null
        }
      </View>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input,{opacity:isUserVisaCardSaved?0.3:1,borderColor:isUserVisaCardSaved?'gray':Colors.primary}]}
        placeholder="Enter Visa card number"
        value={isUserVisaCardSaved? sanitizer(userVisaCard.cardNumber): userVisaCard.cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
        maxLength={20}
        onFocus={onFocus}
        editable={!isUserVisaCardSaved}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity 
            disabled={isUserVisaCardSaved}
            onPress={showDatePicker}
            style={[styles.dateInput,{borderColor:isUserVisaCardSaved?'gray':Colors.primary,opacity:isUserVisaCardSaved?0.3:1}]}

          >
            
            <Text style={{fontSize:18, marginVertical:5, color:'black', }}>
              {userVisaCard.expiryDate ? userVisaCard.expiryDate : 'Expiration Date'}
            </Text>
          
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={'black'}
          style={[styles.ccvInput,{opacity:isUserVisaCardSaved?0.3:1,borderColor:isUserVisaCardSaved?'gray':Colors.primary}]}
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
      <TouchableOpacity 
        disabled={isUserVisaCardSaved}
        onPress={handleSave}
        style={[styles.saveButton,{opacity:isUserVisaCardSaved?0.3:1}]} >
        <Text style={styles.saveButtonText}>{isUserVisaCardSaved?'Saved!':'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical:10
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
    backgroundColor: 'lightgray',
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

export default memo(VisaCardDetails);
