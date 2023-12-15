import React, { memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PayPalDetails = () => {
  const { userPayPal, setUserPayPal, 
    saveUserPayPal, isUserPayPalSaved, 
    setIsUserPayPalSaved, deletePayPalDetails
  } = usePaymentContext();

  const handleSave = () => {
    // Regular expression for validating an Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email is empty or not in a valid format
    if (!userPayPal.email || !emailRegex.test(userPayPal.email)) {
      // Show an alert or perform any other validation error handling
      alert('Please enter a valid email address.');
      return;
    }
  
    // Proceed with saving the email address
    saveUserPayPal(userPayPal);
  };
  

  const onPayPalEmailChange = (text) => {
    setUserPayPal({ ...userPayPal, email: text });
  }

  const onFocus = () => {
    setIsUserPayPalSaved(false);
  }

  const clearPayPalDetails = ()=>{
    setUserPayPal({...userPayPal, email:''})
    setIsUserPayPalSaved(false)
    deletePayPalDetails()
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.header}>PayPal Details</Text>
        {userPayPal.email?
        <TouchableOpacity 
          onPress={clearPayPalDetails}
          style={styles.deletePayPalButton}>
          <Text style={styles.deleteText}>Clear</Text>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
        :null
        }
      </View>
      <TextInput
        placeholderTextColor={'black'}
        style={[styles.input, { opacity: isUserPayPalSaved ? 0.3 : 1 , borderColor:isUserPayPalSaved?'gray':Colors.primary}]}
        placeholder="Enter Your PayPal Email Address"
        value={userPayPal.email}
        onChangeText={onPayPalEmailChange}
        keyboardType='email-address'
        onFocus={onFocus}
        editable={!isUserPayPalSaved}
      />
      <TouchableOpacity 
        disabled={isUserPayPalSaved}  
        style={[styles.saveButton,{opacity:isUserPayPalSaved?0.3:1}]} 
        onPress={handleSave}>
        <Text style={styles.saveButtonText}>{isUserPayPalSaved?'Saved!':'Save'}</Text>
      </TouchableOpacity>
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
  input: {
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
  headerInfo:{
    color:'black',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  deletePayPalButton:{
    flexDirection:'row',
    backgroundColor: 'lightgray',
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    paddingHorizontal:15
  },
  deleteText:{
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:5
  }
});

export default memo(PayPalDetails);
