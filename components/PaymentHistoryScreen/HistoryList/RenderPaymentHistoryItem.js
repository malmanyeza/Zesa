import React,{memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/constants';

const RenderPaymentHistoryItem = ({ date, units, meterNumber, paymentMethod, time, amount , repayment}) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.element}>
            <Text style={styles.elementText}>Time:</Text>
            <Text style={styles.elementText}>{time}</Text>
        </View>
        {amount?(<View style={styles.element}>  
            <Text style={styles.elementText}>Amount:</Text>
            <Text style={styles.elementText}>{amount}</Text>
        </View>):null}
        <View style={styles.element}>  
            <Text style={styles.elementText}>Units:</Text>
            <Text style={styles.elementText}>{units}</Text>
        </View>
        <View style={styles.element}>
            <Text style={styles.elementText}>Meter Number:</Text>
            <Text style={styles.elementText}>{meterNumber}</Text>
        </View>
        <View style={styles.element}>
            {paymentMethod=='Sharing'||paymentMethod==='Buy On Credit'? null:<Text style={[styles.elementText]}>Payment Method:</Text>}
            <Text style={[styles.elementText,{ color:paymentMethod==='Sharing'? Colors.primary:paymentMethod==='Buy On Credit'?'red':'black'}]}>{paymentMethod}</Text>
        </View>
        {repayment?<View style={styles.element}>
            <Text style={[styles.elementText,{color:'green'}]}>Credit Return</Text>
        </View>: null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  timeContainer: {
    marginRight: 10,
    marginBottom:5
  },
  dateText: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  element:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:5
  },
  elementText:{
    color:'black',
    fontSize:17
  }
});

export default memo(RenderPaymentHistoryItem);
