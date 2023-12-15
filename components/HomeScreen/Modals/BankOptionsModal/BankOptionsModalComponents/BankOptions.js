import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image , ScrollView} from 'react-native';
import Colors from '../../../../../constants/constants';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const BankOptions = () => {
  const { setBankOption, bankOptionIndex, setBankOptionIndex, userBankAccount, setUserBankAccount, bankOptions } = usePaymentContext();

    

  const handleOptionPress = (option, index) => {
    setBankOptionIndex(index);
    setBankOption(option.name);
    setUserBankAccount({ ...userBankAccount, bankName: option.name });
  };

  return (
    
    <ScrollView 
      style={styles.container}
    >
      {bankOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionPress(option, index)}
          style={styles.optionContainer}
        >
          <View style={styles.iconAndOption}>
            <Image source={option.image} style={styles.bankImage} />
            <Text style={styles.optionText}>{option.name}</Text>
          </View>
          {bankOptionIndex === index ? (
            <FontAwesome name="check-circle" size={24} color={Colors.primary} />
          ) : (
            <FontAwesome name="circle-o" size={23} color={Colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    maxHeight: 400,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,

  },
  bankImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the image resizeMode
    borderRadius:5,
    marginRight:10
  },
  optionText: {
    color:'black',
    fontSize: 18,
    marginRight: 10,
  },
  iconAndOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BankOptions;
