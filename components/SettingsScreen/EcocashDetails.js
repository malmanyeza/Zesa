import React, { memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EcocashDetails = () => {
  const { ecocashDetails, setEcocashDetails, 
    saveUserEcocashDetails, setIsUserEcocashDetailsSaved, 
    isUserEcocashDetailsSaved, deleteEcocashDetails
   } = usePaymentContext();

  const handleSave = () => {
    if (ecocashDetails.ecocashNumber.length < 10) {
      alert('Please enter a valid Ecocash number');
      return;
    }
    saveUserEcocashDetails(ecocashDetails);
  };

  const handleTextChange = (input) => {
    const formattedEcocashNumber = input.replace(/\D/g, '');
    setEcocashDetails({ ...ecocashDetails, ecocashNumber: formattedEcocashNumber });
  };

  const onFocus = () => {
    setIsUserEcocashDetailsSaved(false);
  }


  const clearEcocashDetails = ()=>{
    setEcocashDetails({...ecocashDetails, ecocashNumber:''})
    setIsUserEcocashDetailsSaved(false)
    deleteEcocashDetails()
  }


  const sanitizer = (digits) => {
    if (digits && isUserEcocashDetailsSaved) {
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
        <Text style={styles.header}>Ecocash Details</Text>
       { ecocashDetails.ecocashNumber.length>0?
       <TouchableOpacity 
          onPress={clearEcocashDetails}
          style={styles.deleteBankButton}>
          <Text style={styles.deleteText}>Clear</Text>
          <Ionicons name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
        :null
        }
      </View>
      <TextInput
        placeholderTextColor={'black'}
        editable={!isUserEcocashDetailsSaved}
        style={[styles.input, { opacity: isUserEcocashDetailsSaved ? 0.3 : 1 , borderColor:isUserEcocashDetailsSaved? 'gray':Colors.primary}]}
        placeholder="Enter Ecocash Number"
        value={isUserEcocashDetailsSaved? sanitizer(ecocashDetails.ecocashNumber): ecocashDetails.ecocashNumber}
        onChangeText={handleTextChange}
        maxLength={10}
        keyboardType="numeric"
        onFocus={onFocus}
      />
      <TouchableOpacity 
        disabled={isUserEcocashDetailsSaved}
        style={[styles.saveButton,{opacity:isUserEcocashDetailsSaved?0.3:1}]} 
        onPress={handleSave}>
        <Text style={styles.saveButtonText}>{isUserEcocashDetailsSaved?'Saved!':'Save'}</Text>
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
    color:'black',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center' 
  }
});

export default memo(EcocashDetails);
