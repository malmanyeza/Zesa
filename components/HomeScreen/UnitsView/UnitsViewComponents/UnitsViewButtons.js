import React, { useCallback , memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/constants';
import { useUsageChartContext } from '../../../../hooks/usageChartContext';
import { useScreenModalsContext } from '../../../../hooks/modalsContext';
import {useNavigation} from '@react-navigation/native'


const {width, height} = Dimensions.get('window')




const UnitsViewButtons = () => {

  const navigation = useNavigation()

  const goToPaymentsHistory = useCallback(()=>{
    navigation.navigate('PaymentHistory')
  })

  const {openPaymentHistoryModal} = useScreenModalsContext()

  const {setIsUsageChartModalVisible} = useUsageChartContext()

  const goToUsageChart =useCallback(()=>{
    setIsUsageChartModalVisible(true)
  })

 

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={goToUsageChart}
        style={styles.button}
      >
        <Ionicons name="bar-chart-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>View Usage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goToPaymentsHistory} 
        style={styles.button}>
        <Text style={styles.buttonText}>Payment History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:5
  },
  button: {
    flexDirection:'row',
    width:'45%',
    backgroundColor: Colors.primary,
    borderRadius: 50, // Set to the maximum to make it fully rounded
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical:10,
    elevation: 5, // Adds a shadow on Android
    shadowColor: 'black', // Shadow color on iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: width*0.043,
    fontWeight: 'bold',
  },
});

export default memo(UnitsViewButtons);
