import React, { useEffect } from 'react';
import { PaymentProvider } from './hooks/paymentContext';
import { UsageChartProvider } from './hooks/usageChartContext';
import { RatesProvider } from './hooks/ratesContext';
import { ScreenModalsProvider } from './hooks/modalsContext';
import { FirebaseProvider } from './hooks/firebaseConext';
import Stacks from './Stacks';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  useEffect(() => {
    // Simulate a 2-second delay before hiding the splash screen
    const delayTime = 1000;

    const hideSplashScreen = () => {
      SplashScreen.hide();
    };

    const timeoutId = setTimeout(hideSplashScreen, delayTime);

    Orientation.lockToPortrait();

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return (
    <ScreenModalsProvider>
      <RatesProvider>
        <PaymentProvider>
          <FirebaseProvider>
            <UsageChartProvider>
              <Stacks />
            </UsageChartProvider>
          </FirebaseProvider>
        </PaymentProvider>
      </RatesProvider>
    </ScreenModalsProvider>
  );
};

export default App;
