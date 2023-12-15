import React, { createContext, useContext, useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useScreenModalsContext } from './modalsContext';

// Create a new context
const PaymentContext = createContext();

// Create a custom hook to access the context
export const usePaymentContext = () => useContext(PaymentContext);

// Create a context provider component
export const PaymentProvider = ({ children }) => {

 const {closeSettingsModal} = useScreenModalsContext()
  
  const bankOptions = [
    { name: 'CBZ Bank Limited', image: require('../assets/icons/cbz.jpg') },
    { name: 'Ecobank', image: require('../assets/icons/ecobank.png') },
    { name: 'Stanbic Bank', image: require('../assets/icons/stanbic.jpeg') },
    { name: 'Standard Chartered', image: require('../assets/icons/standardChartered.png') },
    { name: 'FBC Bank Limited', image: require('../assets/icons/fbc.webp') },
    { name: 'Barclays Bank Zimbabwe', image: require('../assets/icons/barclays.png') },
    { name: 'POSB', image: require('../assets/icons/posb.jpg') },
    { name: 'BancABC', image: require('../assets/icons/bankABC.jpeg') },
    { name: 'NMB Bank Limited', image: require('../assets/icons/nmb.png') },
    { name: 'ZB', image: require('../assets/icons/zb.jpeg') },
    { name: 'Steward Bank', image: require('../assets/icons/steward.png') },
  ];


  //States to store WelcomeScreen Modals

  const [isVerifiedModalVisible, setIsVerifiedModalVisible] = useState(false)


  const [tempUser, setTempUser] = useState({
    meterNumber: '',
    userName: '',
    
  });

  const [userInfo, setUserInfo] = useState({
    meterNumber: '',
    userName: '',
    isOnCredit: false,
    creditAmount: '',
    creditUnits: '',
    creditCurrency: '',
  });

  const [ecocashDetails, setEcocashDetails] = useState({
    ecocashNumber: '',
    usdBalance: '',
    zwlBalance: '',
  });

  const [userVisaCard, setUserVisaCard] = useState({
    cardNumber: '',
    expiryDate: '',
    ccv: '',
    usdBalance: '',

  });

  const [userMasterCard, setUserMasterCard] = useState({
    cardNumber: '',
    expiryDate: '',
    ccv: '',
    usdBalance: '',
  });

  const [userPayPal, setUserPayPal] = useState({
    email: '',
    usdBalance: '',
  });


  const [userBankAccount, setUserBankAccount] = useState({
    bankName: '',
    bankAccountNumber: '',
    usdBalance: '',
    zwlBalance: '',
    bankImage:""
  });

  const [airtimePhone, setAirtimePhone] = useState('');



  const [isEcocashModalVisible, setIsEcocashModalVisible] = useState(false)
  const [isAirtimeModalVisible, setIsAirtimeModalVisible] = useState(false)
  const [isVisaCardModalVisible, setIsVisaCardModalVisible] = useState(false)
  const [isPayPalModalVisible, setIsPayPalModalVisible] = useState(false)
  const [isMasterCardModalVisible, setIsMasterCardModalVisible] = useState(false)
  const [isBankAccountNoModalVisible, setIsBankAccountNoModalVisible] = useState(false)
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)
  const [isBuyForOtherModalVisible, setIsBuyForOtherModalVisible] = useState(false)
  const [isShareModalVisible, setIsShareModalVisible] = useState(false)
  const [isBuyOnCreditModalVisible, setIsBuyOnCreditModalVisible] = useState(false)
  const [isBankSelectionsToSaveModalVisible, setIsBankSelectionsToSaveModalVisible] = useState(false)
  const [isBankPreconfirmationModalVisible, setIsBankPreconfirmationModalVisible] = useState(false)
  const [isVisaCardPreconfirmationModalVisible, setIsVisaCardPreconfirmationModalVisible] = useState(false)
  const [isMasterCardPreconfirmationModalVisible, setIsMasterCardPreconfirmationModalVisible] = useState(false)
  const [isEcocashPreconfirmationModalVisible, setIsEcocashPreconfirmationModalVisible] = useState(false)
  const [isPayPalPreconfirmationModalVisible, setIsPayPalPreconfirmationModalVisible] = useState(false)
  const [isRepaymentCurrencyModalVisible, setIsRepaymentCurrencyModalVisible] = useState(false)

//Currency selections
const [selectedCurrency, setSelectedCurrency] = useState('USD');

//Variables to store the cofirmation price and units amount
  const [unitsAmount, setUnitsAmount] = useState(null)
  const [priceAmount, setPriceAmount] = useState(null)

//Variables to store data used in the paymentOptionsModal

  const [isOffline, setIsOffline] = useState(true)
  const [paymentOption, setPaymentOption] = useState(null)
  const [paymentOptionIndex, setPaymentOptionIndex] = useState(null)
  const [isPaymentOptionsModalVisible, setIsPaymentOptionsModalVisible] = useState(false)

//Variables to store data used in the unitsAndCurrencyModal
  const [isUnitsAndCurrencyModalVisible, setIsUnitsAndCurrencyModalVisible] = useState(false)
  const [amountOrUnitsInputValue, setAmountOrUnitsInputValue] = useState('');

//Variables to store data used in the bankOptionsModal
  const [bankOption, setBankOption] = useState(null)
  const [bankOptionIndex, setBankOptionIndex] = useState(null)
  const [isBankOptionModalVisible, setIsBankOptionModalVisible] = useState(false)

//Variablse to store ecocash number, meterNumber and bank account number and visa card number
  const [meterNumber, setMeterNumber] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')
  const [visaCardNumber, setVisaCardNumber] = useState(null)
  const [otherMeterNumber, setOtherMeterNumber] = useState('')


//State that store boolean that tell if user details are saved or not

  const [isUserInfoSaved, setIsUserInfoSaved] = useState(false)
  const [isUserBankAccountSaved, setIsUserBankAccountSaved] = useState(false)
  const [isUserVisaCardSaved, setIsUserVisaCardSaved] = useState(false)
  const [isUserMasterCardSaved, setIsUserMasterCardSaved] = useState(false)
  const [isUserPayPalSaved, setIsUserPayPalSaved] = useState(false)
  const [isUserEcocashDetailsSaved, setIsUserEcocashDetailsSaved] = useState(false)

//the state that stores one of the four buying states
  const [buyingState, setBuyingState] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')


// For now this is going to mimic the database storing zesa users

const [zesaUsers, setZesaUsers] = useState([
 {
  id:'1',
  userName:"Malvern",
  meterNumber:"11223344556"
 },
 {
  id:'2',
  userName:'Dexter',
  meterNumber:"77889911223"
 }
])


const openVerificationModal = () => {
  setIsVerifiedModalVisible(true)
}


useEffect(() => {
  // Define an array of keys for different data
  const storageKeys = ['userInfo', 'bankDetails', 'visaCardDetails', 'masterCardDetails', 'payPalDetails', 'ecocashDetails'];

  // Define an array of state setters for different data
  const stateSetters = [setUserInfo, setUserBankAccount, setUserVisaCard, setUserMasterCard, setUserPayPal, setEcocashDetails];
  const savedFlagsSetters = [setIsUserInfoSaved,setIsUserBankAccountSaved, setIsUserVisaCardSaved, setIsUserMasterCardSaved, setIsUserPayPalSaved, setIsUserEcocashDetailsSaved];





  // Listen for saved data in AsyncStorage





  const loadAsyncStorageData = async () => {
    for (let i = 0; i < storageKeys.length; i++) {
      const key = storageKeys[i];
      const stateSetter = stateSetters[i];
      const savedFlagSetter = savedFlagsSetters[i];

      try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
          const parsedData = JSON.parse(data);
          stateSetter(parsedData);

          // Set the corresponding boolean value to true
          savedFlagSetter(true);
        }
      } catch (error) {
        console.log(`Error loading ${key} from AsyncStorage:`, error);
      }
    }
  };

  // Call the function to load data from AsyncStorage
  loadAsyncStorageData();
}, []);

  
  

  useEffect(()=>{
    
    const loadBankImage = ()=>{
      if (userBankAccount.bankName) {
        // Find the bank in bankOptions with a matching name
        const selectedBank = bankOptions.find(
          (bank) => bank.name === userBankAccount.bankName
        );  
        if(selectedBank){
          setUserBankAccount({ ...userBankAccount, bankImage: selectedBank.image });
        }
      }
    }
    loadBankImage()
  },[userBankAccount.bankName])







//Function to delete user data from async storage



const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage data cleared successfully');
    setUserInfo({ userName: '', meterNumber: '' });
    setUserBankAccount({ bankName: '', bankAccountNumber: '' });
    setUserVisaCard({ cardNumber: '', expiryDate: '', ccv: '' });
    setUserMasterCard({ cardNumber: '', expiryDate: '', ccv: '' });
    setUserPayPal({ email: '' });
    setEcocashDetails({ ecocashNumber: '' });
    closeSettingsModal()
  } catch (error) {
    console.log('Error clearing AsyncStorage:', error);
  }
};


const deleteUserInfoFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('userInfo');
    console.log('userInfo removed from AsyncStorage.');
  } catch (error) {
    console.error('Failed to remove userInfo from AsyncStorage:', error);
  }
  setUserInfo({ userName: '', meterNumber: '' })
};



// Function to delete the 'bankDetails' key from AsyncStorage
const deleteBankDetails = async () => {
  try {
    await AsyncStorage.removeItem('bankDetails');
    console.log('bankDetails deleted successfully');
  } catch (error) {
    console.log('Error deleting bankDetails:', error);
  }
};

// Function to delete the 'visaCardDetails' key from AsyncStorage
const deleteVisaCardDetails = async () => {
  try {
    await AsyncStorage.removeItem('visaCardDetails');
    console.log('visaCardDetails deleted successfully');
  } catch (error) {
    console.log('Error deleting visaCardDetails:', error);
  }
};

// Function to delete the 'masterCardDetails' key from AsyncStorage
const deleteMasterCardDetails = async () => {
  try {
    await AsyncStorage.removeItem('masterCardDetails');
    console.log('masterCardDetails deleted successfully');
  } catch (error) {
    console.log('Error deleting masterCardDetails:', error);
  }
};

// Function to delete the 'payPalDetails' key from AsyncStorage
const deletePayPalDetails = async () => {
  try {
    await AsyncStorage.removeItem('payPalDetails');
    console.log('payPalDetails deleted successfully');
  } catch (error) {
    console.log('Error deleting payPalDetails:', error);
  }
};

// Function to delete the 'ecocashDetails' key from AsyncStorage
const deleteEcocashDetails = async () => {
  try {
    await AsyncStorage.removeItem('ecocashDetails');
    console.log('ecocashDetails deleted successfully');
  } catch (error) {
    console.log('Error deleting ecocashDetails:', error);
  }
};





//Functions to save user data to async storage

const saveUserBankAccount = async (bankAccount) => {

 { 
  try {
    await AsyncStorage.setItem('bankDetails', JSON.stringify(bankAccount));
    setIsUserBankAccountSaved(true);
  } catch (error) {
    console.log(error);
  }
}
};

const saveUserVisaCard = async (visaCard) => {

  try {
    await AsyncStorage.setItem('visaCardDetails', JSON.stringify(visaCard));
    setIsUserVisaCardSaved(true);
  } catch (error) {
    console.log(error);
  }
};

const saveUserMasterCard = async (masterCard) => {
  

  try {
    await AsyncStorage.setItem('masterCardDetails', JSON.stringify(masterCard));
    setIsUserMasterCardSaved(true);
  } catch (error) {
    console.log(error);
  }
};


const saveUserPayPal = async (payPal) => {
 

  try {

    await AsyncStorage.setItem('payPalDetails', JSON.stringify(payPal));
    setIsUserPayPalSaved(true);
  } catch (error) {
    console.log(error);
  }
};

const saveUserEcocashDetails = async (ecocashNumber) => {


  try {
    await AsyncStorage.setItem('ecocashDetails', JSON.stringify(ecocashNumber));
    setIsUserEcocashDetailsSaved(true);
  } catch (error) {
    console.log(error);
  }
};



//UseEffect to load userData from async storage




  //Function that handles the selection of a payment option

const goToPaymentOptionModal = (paymentOption) => {

  switch (paymentOption) {
    case 'Ecocash': // Ecocash
      setPaymentMethod('Ecocash');
      ecocashNumberInputValidation(ecocashDetails.ecocashNumber)?
        setIsConfirmationModalVisible(true)
        :
        setIsEcocashModalVisible(true); // Replace with the name of your Ecocash modal screen
     
      break;
    case 'Bank': // Bank
      userBankAccount.bankName?setPaymentMethod(userBankAccount.bankName):null
      bankInputValidation(userBankAccount) ? 
        setIsBankPreconfirmationModalVisible(true)
        :
        setIsBankOptionModalVisible(true);
      
      break;
    case 'Airtime': // Airtime
      setPaymentMethod('Airtime');
      setIsAirtimeModalVisible(true); // Replace with the name of your Airtime modal screen
      break;
    case 'Visa Card': // Visa Card
      setPaymentMethod('Visa Card');
      visaCardInputValidation(userVisaCard) ?
        setIsVisaCardPreconfirmationModalVisible(true)
        :
        setIsVisaCardModalVisible(true); // Replace with the name of your Visa Card modal screen
      break;
    case 'PayPal'://PayPal
      setPaymentMethod('PayPal');
      payPalInputValidation(userPayPal.email) ?
        setIsConfirmationModalVisible(true)
        :
        setIsPayPalModalVisible(true)// Replace with the name of your PayPal modal screen
      break;
    case 'MasterCard': // MasterCard
      setPaymentMethod('MasterCard');
      masterCardInputValidation(userMasterCard) ?
        setIsConfirmationModalVisible(true)
        :
        setIsMasterCardModalVisible(true); // Replace with the name of your MasterCard modal screen
      break;
    default:
      // Handle default case (e.g., show an error message)
      console.log('Invalid payment option');
      break;
  }
};





//Functions to handle validation of userData



const bankAccountNoInputValidation = (bankAccountNumber) => {

  if (bankAccountNumber.length >= 11 && bankAccountNumber.length <= 20) {
    return true;
  } else {    
    return false;
  }
}

const ecocashNumberInputValidation = (ecocashNumber) => {
  
  if (ecocashNumber.length === 10) {
    return true;
  } else {
    return false;
  }
}

const meterNumberInputValidation = (meterNumber) => {

  if (meterNumber.length === 11) {
    return true;
  }
  else {
    return false;
  }
}

const visaCardInputValidation =(visaCard) =>{
    
    if(visaCard.cardNumber && visaCard.expiryDate && visaCard.ccv){
      return true; // If any field is empty, return false
  
    }
    return false; // All fields are filled
}

const masterCardInputValidation =(masterCard) =>{

   
  if(masterCard.cardNumber.length>=12 && masterCard.expiryDate && masterCard.ccv.length === 3){
    return true; // If any field is empty, return false

  }

  return false; // All fields are filled
}
 const bankInputValidation =(bankAccount) =>{
  
  if(bankAccount.bankName && bankAccount.bankAccountNumber){
    return true; // If any field is empty, return false

  }
  return false; // All fields are filled
}

const payPalInputValidation =(userPayPal) =>{
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email is empty or not in a valid format
  if (!userPayPal.email || !emailRegex.test(userPayPal.email)) {
    // Show an alert or perform any other validation error handling
    return false;
  }else{
    return true
  }
 
}






  return (
    <PaymentContext.Provider value={{
        isOffline,setIsOffline,paymentOption,setPaymentOption,
        paymentOptionIndex, setPaymentOptionIndex,setIsBankOptionModalVisible,
        isPaymentOptionsModalVisible, setIsPaymentOptionsModalVisible,
        isUnitsAndCurrencyModalVisible, setIsUnitsAndCurrencyModalVisible,
        amountOrUnitsInputValue, setAmountOrUnitsInputValue,
        bankOption, setBankOption, bankOptionIndex, setBankOptionIndex,
        isBankOptionModalVisible, isEcocashModalVisible, isAirtimeModalVisible,
        goToPaymentOptionModal, setIsAirtimeModalVisible, setIsEcocashModalVisible,
        setIsVisaCardModalVisible, setIsPayPalModalVisible, setIsMasterCardModalVisible,
        isVisaCardModalVisible, isPayPalModalVisible, isMasterCardModalVisible,
        isBankAccountNoModalVisible, setIsBankAccountNoModalVisible,
        isConfirmationModalVisible, setIsConfirmationModalVisible,
        setUnitsAmount, setPriceAmount, unitsAmount, priceAmount,
        selectedCurrency, setSelectedCurrency, ecocashDetails, setEcocashDetails,
        meterNumber, setMeterNumber, bankAccountNumber, setBankAccountNumber,
        visaCardNumber, setVisaCardNumber, isBuyForOtherModalVisible,
        setIsBuyForOtherModalVisible, buyingState, setBuyingState, 
        bankAccountNoInputValidation, ecocashNumberInputValidation, 
        meterNumberInputValidation, setOtherMeterNumber, otherMeterNumber,
        isShareModalVisible, setIsShareModalVisible, isBuyOnCreditModalVisible, 
        setIsBuyOnCreditModalVisible, visaCardInputValidation, userVisaCard, setUserVisaCard,
        userBankAccount, setUserBankAccount, bankInputValidation, payPalInputValidation,
        userMasterCard, setUserMasterCard, masterCardInputValidation, userPayPal,
        setUserPayPal, isBankSelectionsToSaveModalVisible, 
        setIsBankSelectionsToSaveModalVisible, saveUserBankAccount, saveUserVisaCard,
        saveUserMasterCard, saveUserPayPal, saveUserEcocashDetails, isUserBankAccountSaved,
        isUserVisaCardSaved, isUserMasterCardSaved, isUserPayPalSaved, isUserEcocashDetailsSaved,
        setIsUserBankAccountSaved, setIsUserVisaCardSaved, setIsUserMasterCardSaved,
        setIsUserPayPalSaved, setIsUserEcocashDetailsSaved, bankOptions,
        isVerifiedModalVisible, setIsVerifiedModalVisible, userInfo,deleteUserInfoFromAsyncStorage,
        deleteBankDetails, deleteVisaCardDetails, deleteMasterCardDetails, setUserInfo,
        deletePayPalDetails, clearAllAsyncStorage, deleteEcocashDetails,tempUser,paymentMethod, setPaymentMethod,
        setAirtimePhone, airtimePhone, setUserInfo, openVerificationModal, isBankPreconfirmationModalVisible, 
        setIsBankPreconfirmationModalVisible, isEcocashPreconfirmationModalVisible, 
        setIsEcocashPreconfirmationModalVisible, isVisaCardPreconfirmationModalVisible, 
        setIsVisaCardPreconfirmationModalVisible, isMasterCardPreconfirmationModalVisible, 
        setIsMasterCardPreconfirmationModalVisible, isRepaymentCurrencyModalVisible, setIsRepaymentCurrencyModalVisible,
        isPayPalPreconfirmationModalVisible, setIsPayPalPreconfirmationModalVisible


       
     }}>
      {children}
    </PaymentContext.Provider>
  );
};
