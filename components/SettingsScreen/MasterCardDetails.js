import React, { useState, memo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MasterCardDetails = () => {
  const {userMasterCard, setUserMasterCard, 
    saveUserMasterCard, isUserMasterCardSaved, 
    setIsUserMasterCardSaved, deleteMasterCardDetails
  } = usePaymentContext();
  const [expirationDate, setExpirationDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setExpirationDate(selectedDate.toISOString().split('T')[0]);
      setUserMasterCard({ ...userMasterCard, expiryDate: expirationDate });
      setDatePickerVisible(false);
    } else {
      setDatePickerVisible(false);
    }
  };

  const handleSave = () => {
    // Validate MasterCard number
    if (userMasterCard.cardNumber.length < 16 || isNaN(userMasterCard.cardNumber)) {
      alert('Please enter a valid 16-digit MasterCard number.');
      return;
    }
  
    // Validate expiration date
    if (!userMasterCard.expiryDate || !isValidExpirationDate(userMasterCard.expiryDate)) {
      alert('Please enter a valid expiration date.');
      return;
    }
  
    // Validate CCV
    if (userMasterCard.ccv.length !== 3 || isNaN(userMasterCard.ccv)) {
      alert('Please enter a valid 3-digit CCV.');
      return;
    }
  
    // Proceed with saving the MasterCard details
    saveUserMasterCard(userMasterCard);
  };
  
  // Function to check if the expiration date is valid
  const isValidExpirationDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    return inputDate > currentDate;
  };
  

  const onFocus = () => {
    setIsUserMasterCardSaved(false);
  }

  const handleCCVChange = (input) => {
    const formattedCCV = input.replace(/\D/g, '');
    setUserMasterCard({ ...userMasterCard, ccv: formattedCCV });
  }

  const handleCardNumberChange = (input) => {
    const formattedCardNumber = input.replace(/\D/g, '');
    setUserMasterCard({ ...userMasterCard, cardNumber: formattedCardNumber });
  }

  const clearMasterCardDetails = ()=>{
    setUserMasterCard({...userMasterCard, cardNumber:'', expiryDate:'', ccv:''})
    setIsUserMasterCardSaved(false)
    deleteMasterCardDetails()
  }

  const sanitizer = (digits) => {
    if (digits && isUserMasterCardSaved) {
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
        <Text style={styles.header}>MasterCard Details</Text>
       { userMasterCard.cardNumber.length>0?
       <TouchableOpacity 
          onPress={clearMasterCardDetails}
          style={styles.deleteBankButton}>
          <Text style={styles.deleteText}>Clear</Text>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
        :null
        }
      </View>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input,{borderColor:isUserMasterCardSaved?'gray':Colors.primary,opacity:isUserMasterCardSaved?0.3:1}]}
        placeholder="Enter MasterCard number"
        value={isUserMasterCardSaved? sanitizer(userMasterCard.cardNumber):userMasterCard.cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
        maxLength={20}
        onFocus={onFocus}
        editable={!isUserMasterCardSaved}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity 
            disabled={isUserMasterCardSaved}
            onPress={showDatePicker}
            style={[styles.dateInput,{borderColor:isUserMasterCardSaved?'gray':Colors.primary,opacity:isUserMasterCardSaved?0.3:1}]}

          >
            
            <Text style={{fontSize:18, marginVertical:5, color:'black', }}>
              {userMasterCard.expiryDate ? userMasterCard.expiryDate : 'Expiration Date'}
            </Text>
          
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={'black'}
          style={[styles.ccvInput,{borderColor:isUserMasterCardSaved?'gray':Colors.primary,opacity:isUserMasterCardSaved?0.3:1}]}
          placeholder="CCV"
          value={userMasterCard.ccv}
          onChangeText={handleCCVChange}
          keyboardType="numeric"
          maxLength={3}
          editable={!isUserMasterCardSaved}
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
        disabled={isUserMasterCardSaved}
        onPress={handleSave}
        style={[styles.saveButton,{opacity:isUserMasterCardSaved?0.3:1}]} >
        <Text style={styles.saveButtonText}>{isUserMasterCardSaved?'Saved!':'Save'}</Text>
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
    color:'black',
    backgroundColor: 'lightgray',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBankButton:{
    flexDirection:'row',
    backgroundColor: 'lightgray',
    borderRadius: 25,
    padding: 8,
    paddingHorizontal:15
  },
  deleteText:{
    color:'black',
    marginRight:5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerInfo:{
    color:'black',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center' ,
    marginBottom:10
  }
});

export default memo(MasterCardDetails);
