import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';

const {width, height} = Dimensions.get('window')

const BuyButtons = () => {
 
  
  
  const {
    setIsUnitsAndCurrencyModalVisible,setIsShareModalVisible, setIsRepaymentCurrencyModalVisible,
    setIsBuyForOtherModalVisible, setBuyingState, userInfo
  } = usePaymentContext()


  const goToUnitsAndCurrencyModal = ()=>{
    setIsUnitsAndCurrencyModalVisible(true)
    setBuyingState('Buy For Self')


  }

  const goToBuyForOtherModal = ()=>{
    setIsBuyForOtherModalVisible(true)
    setBuyingState('Buy For Other')
  }


  const goToSharingModal = ()=>{
    setIsShareModalVisible(true)
    setBuyingState('Sharing')
  }

  const goToBuyOnCreditModal = ()=>{
    
    if(userInfo.isOnCredit){
      setBuyingState('Repay Credit')
      setIsRepaymentCurrencyModalVisible(true)
    }else{
      setBuyingState('Buy On Credit')
      setIsUnitsAndCurrencyModalVisible(true)
    }
    
  }

  return (
    <View style={styles.container}>
        <Text style={styles.buttonsHeader}>  Make a payment</Text>
      <View style={styles.row}>
        <TouchableOpacity 
          onPress={goToUnitsAndCurrencyModal}
          style={styles.button}>
          <Image
            style={styles.icon}
            source={require('../../assets/icons/buySelfIcon.png')}
          />
          <Text style={styles.buttonText}>Buy for Self</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={goToBuyForOtherModal}
          style={styles.button}>
          <Ionicons name="people-outline" size={40} color= {Colors.iconColor} />
          <Text style={styles.buttonText}>Buy for Other</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity 
          onPress={goToSharingModal}
          style={styles.button}>
            <Image
                style={styles.icon}
                source={require('../../assets/icons/shareIcon.png')}
            />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={goToBuyOnCreditModal}
          style={styles.button}>
          <Image
                style={styles.icon}
                source={require('../../assets/icons/buyOnCreditIcon.png')}
            />
          <Text style={styles.buttonText}>{userInfo.isOnCredit?'Repay Credit':'Buy on Credit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  buttonsHeader:{
    fontSize:18,
    color:'white',
    marginTop:10,
    marginBottom:5,
    paddingHorizontal:16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: width*0.4, // Adjust button width as needed
    height: height*0.2, // Adjust button height as needed
    borderRadius: 20, // Adjust border radius as needed
    alignItems: 'center',
    justifyContent: 'center',
    margin:16
  },
  buttonText: {
    fontWeight:'bold',
    marginTop: 5,
    color: Colors.primary,
    fontSize: 18, // Adjust font size as needed
    textAlign: 'center',
  },
  icon:{
    width:50,
    height:50,
    resizeMode:'cover'
  }
});

export default BuyButtons;
