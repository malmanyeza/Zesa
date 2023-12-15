import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoadingScreen from './screens/LoadingScreen';
import { usePaymentContext } from './hooks/paymentContext';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const { userInfo } = usePaymentContext();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {userInfo.userName ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}} />
          </>
        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
