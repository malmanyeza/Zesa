import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFirebaseContext } from '../../../../hooks/firebaseConext';
import Colors from '../../../../constants/constants';

const UnitsValue = ({ electricityUnits, daysLeft }) => {
 
  const { checkDatabaseConnection , isOnline} = useFirebaseContext();

  const connection = checkDatabaseConnection();

  return (
    <View style={styles.container}>
      {connection && isOnline ? (
        <View><Text style={styles.unitsText}>
          {electricityUnits} <Text style={styles.kWhText}>kWh</Text>
        </Text>
        <Text style={styles.daysLeftText}>{daysLeft} days left</Text>
        </View>
      ) : (
        <Text style={styles.offlineText}>Please connect to the internet to view your units</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    marginBottom: 10,
  },
  unitsText: {
    color: Colors.darkText,
    fontSize: 28,
    fontWeight: 'bold',
  },
  kWhText: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize: 20,
  },
  offlineText: {
    marginVertical: 20,
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysLeftText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default UnitsValue;
