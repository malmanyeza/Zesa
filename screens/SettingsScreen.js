import React,{memo} from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, StatusBar } from 'react-native';
import Header from '../components/SettingsScreen/Header/Header';
import BankDetails from '../components/SettingsScreen/BankDetails';
import EcocashDetails from '../components/SettingsScreen/EcocashDetails';
import VisaCardDetails from '../components/SettingsScreen/VisaCardDetails';
import MasterCardDetails from '../components/SettingsScreen/MasterCardDetails';
import PayPalDetails from '../components/SettingsScreen/PayPalDetails';
import BankSelectionsToSaveModal from '../components/SettingsScreen/BankOptionsModal/BankSelectionToSaveModal';
import Modal from 'react-native-modal'
import { useScreenModalsContext } from '../hooks/modalsContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {

const navigation = useNavigation();

const goBack = () => {
  navigation.goBack();
}

const { isSettingsModalVisible, closeSettingsModal } = useScreenModalsContext();

  return (
    <View
     style={styles.container}
      >
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/icons/cable.png')}
      resizeMethod='resize'
      resizeMode='cover'
      blurRadius={30}
    >
        <Header
        headerTitle={'Settings'}
        onBackPress={goBack}
        />
        <ScrollView>
          <BankDetails />
          <EcocashDetails />
          <VisaCardDetails />
          <MasterCardDetails/> 
          <PayPalDetails/>
          <BankSelectionsToSaveModal/>
        </ScrollView>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#42586e72",
    bottom:0,
    flex: 1,
    // Add your styles for the home screen as needed
  },
  backgroundImage:{
    marginTop:StatusBar.currentHeight,
    flex:1,
  }
});

export default memo(SettingsScreen);
