import React,{memo} from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import UnitsView from '../components/HomeScreen/UnitsView/UnitsView';
import Header from '../components/HomeScreen/Header';
import BuyButtons from '../components/HomeScreen/BuyButtons';
import Modal from 'react-native-modal'
import Modals from '../components/HomeScreen/Modals/Modals';
import VerifiedModal from '../components/WelcomeScreen/Modals/VerifiedModal';
import { Dimensions } from 'react-native';
import { useScreenModalsContext } from '../hooks/modalsContext';
import PaymentProcessingModal from '../components/HomeScreen/Modals/PaymentProcessingModal';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {

  const {isHomeModalVisible} = useScreenModalsContext()

  // Sample values for electricityUnits and daysLeft
  const electricityUnits = 380123;
  const daysLeft = 15;

  return (
    <View
    style={styles.container}
    >
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="dark-content"
    />
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/icons/cable.png')}
      resizeMode= 'cover'
      blurRadius={10}
      
    >
      <Header />
      <UnitsView electricityUnits={electricityUnits} daysLeft={daysLeft} />
      <BuyButtons/>
      <Modals/>
      <VerifiedModal/>
      <PaymentProcessingModal/>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor:"#42586e72",
   flex: 1,
    // Add your styles for the home screen as needed
  },
  backgroundImage:{
    marginTop:StatusBar.currentHeight,
    flex:1, 
   justifyContent:'space-between',
  }
});

export default memo(HomeScreen);
