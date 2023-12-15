import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderAndMeterNo from './HeaderAndMeterNoInput';
import RegisterButton from './RegisterButton';
import VerifiedModal from './Modals/VerifiedModal';
import { useFirebaseContext } from '../../hooks/firebaseConext';
import Colors from '../../constants/constants';

const DetailsContainer = () => {

  const {loading} = useFirebaseContext()

  return (
    <View style={styles.container}>
        <HeaderAndMeterNo />
        <RegisterButton />
        <VerifiedModal/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    paddingBottom:20,
  },
});

export default DetailsContainer;
