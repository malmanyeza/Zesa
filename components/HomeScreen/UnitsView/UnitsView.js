import React from 'react';
import { View, StyleSheet } from 'react-native';
import UnitsViewHeader from './UnitsViewComponents/UnitsViewHeader'
import UnitsValue from './UnitsViewComponents/UnitsValue';
import UnitsViewButtons from './UnitsViewComponents/UnitsViewButtons';

const UnitsView = ({ electricityUnits, daysLeft }) => {
  return (
    <View style={styles.container}>
      <UnitsViewHeader />
      <UnitsValue electricityUnits={electricityUnits} daysLeft={daysLeft} />
      <UnitsViewButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor:'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    margin: 16,
  },
});

export default UnitsView;
