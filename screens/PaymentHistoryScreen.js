import React, { useEffect , memo} from 'react';
import { View, StyleSheet, ImageBackground, StatusBar, Text, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../components/PaymentHistoryScreen/Header/Header';
import PaymentHistoryList from '../components/PaymentHistoryScreen/HistoryList/PaymentHistoryList';
import { useNavigation } from '@react-navigation/native';
import { useFirebaseContext } from '../hooks/firebaseConext';
import Colors from '../constants/constants';


const { width, height } = Dimensions.get('window');


const PaymentHistoryScreen = () => {

  const {myHistory, paymentsLoading} = useFirebaseContext()

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View
      style={styles.container}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/icons/cable.png')}
        resizeMethod="resize"
        resizeMode="cover"
        blurRadius={30}
      >
        <Header headerTitle={'Payment History'} onBackPress={goBack} />
        {myHistory.length<1?
        <Text style={styles.noRecordsText}>No payment records available</Text>
        :paymentsLoading?
        (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
        )
        :
        <PaymentHistoryList />}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#42586e72',
    flex: 1,
    bottom: 0,
    // Add your styles for the home screen as needed
  },
  backgroundImage: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  noRecordsText:{
    color:Colors.darkText,
    fontSize:20,
    textAlign:'center',
    justifyContent:'center',
    marginTop:height/2.5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity or color as needed
  },
});

export default memo(PaymentHistoryScreen);
