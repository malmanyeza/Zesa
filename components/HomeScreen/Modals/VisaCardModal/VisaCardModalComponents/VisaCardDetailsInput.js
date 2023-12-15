import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalsHeader from '../../ModalsHeader';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import Colors from '../../../../../constants/constants';

const VisaCardDetailsInput = ({onBackPress}) => {

  const { userVisaCard, setUserVisaCard,  } = usePaymentContext();

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
    }
  };

  const handleCardNumberChange = (value) => {
    setUserVisaCard({ ...userVisaCard, cardNumber: value });
  };

  const handleCCVChange = (value) => {
    setUserVisaCard({ ...userVisaCard, ccv: value });
  };

  const visaCardImage = require('../../../../../assets/icons/visaCard.png');

  return (
    <View style={styles.container}>
      <ModalsHeader
        headerTitle={'Visa Card Details'}
        headerImage={visaCardImage}
        onBackPress={onBackPress}
      />

      {/* Card Number */}
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input]}
        placeholder="Enter Visa card number"
        value={userVisaCard.cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
        maxLength={20}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity 
          onPress={showDatePicker}
          style={[styles.dateInput]}

        >
          
          <Text style={{fontSize:18, marginVertical:5, color:'black', }}>
            {userVisaCard.expiryDate ? userVisaCard.expiryDate : 'Expiration Date'}
          </Text>
         
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={'black'}
          style={styles.ccvInput}
          placeholder="CCV"
          value={userVisaCard.ccv}
          onChangeText={handleCCVChange}
          keyboardType="numeric"
          maxLength={3}
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

        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    padding: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    color:'black',
    flex: 1,
    marginRight: 5,
  },
  header:{
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
    image:{
        width: 50, // Adjust the width as needed
        height: 50, // Adjust the height as needed
        resizeMode: 'contain', // Adjust the image resizeMode
        borderRadius:5,
        marginRight:10
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 20,
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
});

export default VisaCardDetailsInput;
