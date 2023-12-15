import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../../../../constants/constants';
import { usePaymentContext } from '../../../../../hooks/paymentContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PaymentOptions = () => {
  const { isOffline, setPaymentOption, paymentOptionIndex, setPaymentOptionIndex } = usePaymentContext();

  const paymentOptions = isOffline
    ? [
        { name: 'Ecocash', image: require('../../../../../assets/icons/ecocash.png') },
        { name: 'Bank', image: require('../../../../../assets/icons/bank.png')},
        { name: 'Airtime', image: require('../../../../../assets/icons/airtime.png') },
      ]
    : [
        { name: 'Visa Card', image: require('../../../../../assets/icons/visaCard.png')},
        { name: 'PayPal', image: require('../../../../../assets/icons/paypal.png') },
        { name: 'MasterCard', image: require('../../../../../assets/icons/masterCard.png') },
      ];

  const handleOptionPress = (option, index) => {
    setPaymentOptionIndex(index);
    setPaymentOption(option.name);
  };

  return (
    <View style={styles.container}>
      {paymentOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionPress(option, index)}
          style={styles.optionContainer}
        >
          <View style={styles.iconAndOption}>
            <Image source={option.image} style={styles.paymentImage} />
            <Text style={styles.optionText}>{option.name}</Text>
          </View>
          {paymentOptionIndex === index ? (
            <FontAwesome name="check-circle" size={24} color={Colors.primary} />
          ) : (
            <FontAwesome name="circle-o" size={23} color={Colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  paymentImage: {
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

export default PaymentOptions;
