import React from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator} from 'react-native';
import DetailsContainer from '../components/WelcomeScreen/DetailsContainer';
import Colors from '../constants/constants';
import { useFirebaseContext } from '../hooks/firebaseConext';

const WelcomeScreen = () => {
  const { loading } = useFirebaseContext();

  return (
    <ImageBackground
      style={[styles.container, { paddingHorizontal: loading ? 0 : 16 , paddingTop: loading ? 0 : 30}]}
      source={require('../assets/icons/cable.png')}
      resizeMode='cover'
      blurRadius={10}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <DetailsContainer />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#42586e72',
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity or color as needed
  },
});

export default WelcomeScreen;
