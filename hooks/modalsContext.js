import React, { createContext, useContext, useState } from 'react';

// Create a new context
const ScreenModalsContext = createContext();

// Create a custom hook to access the context
export const useScreenModalsContext = () => useContext(ScreenModalsContext);

// Create a context provider component
export const ScreenModalsProvider = ({ children }) => {

    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
    const [isPaymentHistoryModalVisible, setIsPaymentHistoryModalVisible] = useState(false)
    const [isHomeModalVisible, setIsHomeModalVisible] = useState(true)


    const openSettingsModal = () => {
        setIsSettingsModalVisible(true)
        setIsHomeModalVisible(false)
    }

    const closeSettingsModal = () => {
       setIsHomeModalVisible(true)
        setIsSettingsModalVisible(false)
    }

    const openPaymentHistoryModal = () => {
        setIsPaymentHistoryModalVisible(true)
        setIsHomeModalVisible(false)
    }

    const closePaymentHistoryModal = () => {
        setIsHomeModalVisible(true)
        setIsPaymentHistoryModalVisible(false)
    }


  return (
    <ScreenModalsContext.Provider value={{
        isSettingsModalVisible,setIsSettingsModalVisible,openSettingsModal,closeSettingsModal,
        isPaymentHistoryModalVisible,setIsPaymentHistoryModalVisible,openPaymentHistoryModal,closePaymentHistoryModal,
        isHomeModalVisible,
    }}>
      {children}
    </ScreenModalsContext.Provider>
  );
};
