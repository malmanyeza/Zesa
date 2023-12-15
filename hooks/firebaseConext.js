import React, { createContext, useContext, useState, useEffect , Alert, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePaymentContext } from './paymentContext';
import { db, collection, doc, setDoc, getDocs, query, where,orderBy, getDoc , updateDoc} from "../firebaseConfig";
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { useRatesContext } from './ratesContext';

// Create a new context
const FirebaseContext = createContext();

// Create a custom hook to access the context
export const useFirebaseContext = () => useContext(FirebaseContext);

// Create a context provider component
export const FirebaseProvider = ({ children }) => {
  const [myHistory, setMyHistory] = useState([]);
  const [paymentMade, setPaymentMade] = useState(false); // Track if a payment has been made
  const [userPaymentHistory, setUserPaymentHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [useUserPaymentHistory, setUseUserPaymentHistory] = useState(false);

  const { unitsAmount, selectedCurrency, priceAmount, creditAmount} = useRatesContext()
  const {paymentMethod, userInfo, openVerificationModal, meterNumber, isOffline, 
    buyingState} = usePaymentContext();
  const [loading, setLoading] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

// function to show internet connection 
const checkDatabaseConnection = async () => {
  try {
    // Try to fetch a document (you can replace this with any simple query)
    await getDoc(doc(db, 'connectionTest', 'test123'));
    return true; // Database connection successful
  } catch (networkError) {
    return false; // Database connection failed
  }
};
// function to register a user
const registerUser = async (meterNumber, setLoading, setUserInfo) => {
  try {

    // Start loading
    setLoading(true);

    // Check if the code can access the users collection
    try {
      // Try to fetch a document (you can replace this with any simple query)
      await getDoc(doc(db, 'connectionTest', 'test123'));
    } catch (networkError) {
      console.log('Network error:', networkError);
      alert('Network error. Please check your internet connection.');
      setLoading(false);
      return;
    }

    // Continue with the original logic

    // Check if the user with the provided meterNumber exists in the database
    const userQuery = query(collection(db, 'users'), where('meterNumber', '==', meterNumber));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      // User with the provided meterNumber does not exist
      alert('User not found in the database.');
      setLoading(false);
      return;
    }

    // User with the provided meterNumber exists, retrieve user data
    const userData = querySnapshot.docs[0].data();

    // Set userInfo
    const userInformation = {
      userName: userData.name,
      phoneNumber: userData.phoneNumber,
      meterNumber: userData.meterNumber,
    };

    // Save userInfo to AsyncStorage
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));

    // Update state with userInfo
    setUserInfo(userInformation);

    // Stop loading
    setLoading(false);

    openVerificationModal();
  } catch (error) {
    console.log('An error occurred during user registration:', error);

    // Handle other types of errors if needed

    // Stop loading in case of an error
    setLoading(false);
  }
};





  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
     // Load data from AsyncStorage when the component mounts
     useEffect(() => {
      const loadHistory = async () => {
        try {
          const storedHistory = await AsyncStorage.getItem('historyAsync');
          if (storedHistory !== null) {
            const loadedHistory = JSON.parse(storedHistory);
            setMyHistory(loadedHistory.slice(-10));
    
            const connection = await checkDatabaseConnection()
    
            if (connection) {
              // Iterate through each item in AsyncStorage
              for (const item of loadedHistory) {
    
                
                  // Item is not in Firebase, save it to Firebase
                  if (!item.isSavedToFirebase) {
                    // Save only if isSavedToFirebase is false
                    await saveToFirebase(item);
                    // Update isSavedToFirebase locally
                    setMyHistory(prevHistory => {
                      const updatedHistory = prevHistory.map(historyItem =>
                        historyItem === item ? { ...item, isSavedToFirebase: true } : historyItem
                      );
                      return updatedHistory;
                    });

                    saveToAsyncStorage('historyAsync', myHistory);
                  }
              }
            }
          }
        } catch (error) {
          console.error('Error loading history from AsyncStorage:', error);
        }
      };
    
      loadHistory();
    }, [paymentMade]);
     // Empty dependency array ensures this effect runs once on mount.


  // function to save data to AsyncStorage
  const saveToAsyncStorage = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };

  // function to save data to Firebase
  const saveToFirebase = async (data) => {
    try {
      const paymentCollectionRef = collection(db, 'payments');
      const paymentId = generateUniqueID();
      const docRef = doc(paymentCollectionRef, paymentId);
      await setDoc(docRef, data);
    } catch (error) {
      console.error('Error saving data to Firebase:', error);
    }
  };

  // function yekuSaver payment to firebase neAsync-Storage
  const makePayment = async (setUserInfo) => {

    setLoading(true);
    // Get the current date and time
    const date = getCurrentDate();
    const time = getCurrentTime();
  
    // Initialize data with common properties
    const data = {
      meterNumber: userInfo.meterNumber,
      date: date,
      time: time,
      units: unitsAmount,
      amount: priceAmount,
      isSavedToFirebase: false, // Initialize as false
      currency: selectedCurrency,
      repayment:false
    };
  
    // Modify data based on buyingState
    if (buyingState === 'Sharing' || buyingState === 'Buy On Credit') {
      data.paymentMethod = buyingState;
    } else {
      data.paymentMethod = paymentMethod;
    }

    if(buyingState ==='Repay Credit'){  
      data.units= userInfo.creditUnits
      data.amount= userInfo.creditAmount
      data.repayment=true
    }


    const connection = await checkDatabaseConnection()

    if(!isOffline){

      if(!connection){
        console.log('Network error:')
        alert('Please check your internet connection and try again.');
        setLoading(false);
        return;
      }
    }
    
    // Check network connectivity
    if (connection) {
      // Online: Save to Firebase and AsyncStorage
      setMyHistory([...myHistory, { ...data, isSavedToFirebase: true }]);
      saveToFirebase({ ...data, isSavedToFirebase: true });

      if (buyingState === 'Buy On Credit') {
        // Set isOnCredit to true in Firebase and AsyncStorage
        data.isOnCredit = true;
        try {
          const userDocRef = collection(db, 'users');
          const querySnapshot = await getDocs(query(userDocRef, where('meterNumber', '==', userInfo.meterNumber)));
  
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(userDoc.ref, { isOnCredit: true,creditAmount: priceAmount, creditUnits: unitsAmount,creditCurrency: selectedCurrency  });
          }
        } catch (error) {
          console.error('Error updating Firebase document:', error);
          // Handle error as needed
        }
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userInfo, isOnCredit: true, creditAmount: priceAmount, creditUnits: unitsAmount, creditCurrency: selectedCurrency }));
        await setUserInfo({ ...userInfo, isOnCredit: true, creditAmount: priceAmount, creditUnits: unitsAmount, creditCurrency: selectedCurrency }); // Move this line here
      } else if (buyingState === 'Repay Credit') {
        // Repaying credit: Set isOnCredit to false in Firebase and AsyncStorage
        data.isOnCredit = false;
        try {
          const userDocRef = collection(db, 'users');
          const querySnapshot = await getDocs(query(userDocRef, where('meterNumber', '==', userInfo.meterNumber)));
  
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(userDoc.ref, { isOnCredit: false,creditAmount: 0, creditUnits: 0 , creditCurrency:'' });
          }
        } catch (error) {
          console.error('Error updating Firebase document:', error);
          // Handle error as needed

        }
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userInfo, isOnCredit: false,creditAmount: 0, creditUnits: 0, creditCurrency:'' }));
        await setUserInfo({ ...userInfo, isOnCredit: false, creditAmount: 0, creditUnits: 0 , creditCurrency:''}); // Move this line here
      }
  
      saveToAsyncStorage('historyAsync', [...myHistory, { ...data, isSavedToFirebase: true }]);
    } else {
      // Offline: Save to AsyncStorage only
      if (buyingState === 'Buy On Credit' ) {
        // Set isOnCredit to true or false in AsyncStorage
        data.isOnCredit = true;
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userInfo, isOnCredit: data.isOnCredit, creditAmount: priceAmount, creditUnits: unitsAmount, creditCurrency: selectedCurrency }));
        await setUserInfo({ ...userInfo, isOnCredit: data.isOnCredit, creditAmount: priceAmount, creditUnits: unitsAmount, creditCurrency: selectedCurrency  }); // Move this line here
      }else if(buyingState === 'Repay Credit'){
        data.isOnCredit = false;
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userInfo, isOnCredit: data.isOnCredit, creditAmount: 0, creditUnits: 0 , creditCurrency:'' }));
        await setUserInfo({ ...userInfo, isOnCredit: data.isOnCredit, creditAmount: 0, creditUnits: 0 , creditCurrency:''}); // Move this line here
      }
  
      setMyHistory([...myHistory, data]);
      saveToAsyncStorage('historyAsync', [...myHistory, data]);
    }
  
    // Always save to AsyncStorage regardless of online/offline status
    setPaymentMade(true);
    setLoading(false);
    if (buyingState === 'Buy On Credit') {
      alert(`Payment successful \nYou bought ${unitsAmount} kWh worth ${priceAmount} ${selectedCurrency} on credit.`);
    } else if (buyingState === 'Buy For Other') {
      alert(`Payment successful \nYou have bought: ${unitsAmount} kWh for meter number ${meterNumber}.`);
    } else if (buyingState === 'Repay Credit') {
      alert(`Credit return successful \nYou have repaid: ${unitsAmount} kWh for ${creditAmount} ${selectedCurrency}`);
    } else {
      alert(`Payment successful \nUnits Bought: ${unitsAmount} kWh for ${priceAmount} ${selectedCurrency}`);
    }
  };
  
  
  

  // function yekutora an individual user's payment history from firebase
  const getUserPaymentHistory = async () => {
    try {
      // Check network connectivity
      ;
      setPaymentsLoading(true);

      const connection = await checkDatabaseConnection()
  
      if (connection) {
        // Online: Fetch data from Firebase
        const paymentsCollection = collection(db, "payments");
        const paymentsQuery = query(
          paymentsCollection,
          where("meterNumber", "==", userInfo.meterNumber),
          orderBy('date'),
          orderBy('time')
        );
  
        const querySnapshot = await getDocs(paymentsQuery);
        const paymentsData = [];
  
        querySnapshot.forEach((doc) => {
          paymentsData.push({ id: doc.id, ...doc.data() });
        });
  
        setUserPaymentHistory(paymentsData);
        setUseUserPaymentHistory(true);
        setPaymentsLoading(false);
      } else {
        setPaymentsLoading(false);
        alert(
          'You need to be online to load more history.'
        );
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };


  // function to generate a unique id for the payments documents
  const generateUniqueID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  };

  // function to get the current date
  const getCurrentDate = () => {
    const currentDateTime = new Date();
    // Format the date as "dd:mm:yyyy"
    const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`
    return formattedDate;
  };


  // function to get the current time
  const getCurrentTime = () => {
    const currentDateTime = new Date();
    // Format the time as "HH:mm"
    const formattedTime = `${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const contextValues = {
    makePayment,
    myHistory,
    getUserPaymentHistory,
    userPaymentHistory,
    useUserPaymentHistory,
    setUseUserPaymentHistory,
    isOnline,
    registerUser,
    loading,
    setLoading,
    paymentsLoading,
    checkDatabaseConnection
  };

  // Memoize the context values
  const memoizedContextValues = useMemo(() => contextValues, [
    makePayment,
    myHistory,
    getUserPaymentHistory,
    userPaymentHistory,
    useUserPaymentHistory,
    setUseUserPaymentHistory,
    isOnline,
    registerUser,
    loading,
    setLoading,
    paymentsLoading,
    checkDatabaseConnection
  ]);

  return (
    <FirebaseContext.Provider value={memoizedContextValues}>
      {children}
    </FirebaseContext.Provider>
  );
};
