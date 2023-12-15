import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/constants';
import { usePaymentContext } from '../../hooks/paymentContext';


const Header = () => {

  const {userInfo, clearAllAsyncStorage} = usePaymentContext()

  const username = userInfo.userName;
  // Get the first letter of the username
  const userInitial = username.charAt(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {username}</Text>
      <TouchableOpacity
        onPress={clearAllAsyncStorage} 
        style={styles.outerCircle}>
        <View style={styles.circle}>
            <Text style={styles.circleText}>{userInitial}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:16,
    paddingHorizontal:20
  },
  text: {
    color: '#36454F',
    fontSize: 20,
    fontWeight:'bold'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle:{
    width:44,
    height:44,
    borderRadius:22,
    borderColor:Colors.primary,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  circleText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;
