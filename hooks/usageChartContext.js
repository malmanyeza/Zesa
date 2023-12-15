import React, { createContext, useContext, useState } from 'react';

// Create a new context
const UsageChartContext = createContext();

// Create a custom hook to access the context
export const useUsageChartContext = () => useContext(UsageChartContext);

// Create a context provider component
export const UsageChartProvider = ({ children }) => {

    const [isUsageChartModalVisible, setIsUsageChartModalVisible] = useState(false)


  return (
    <UsageChartContext.Provider value={{
        isUsageChartModalVisible,setIsUsageChartModalVisible
    }}>
      {children}
    </UsageChartContext.Provider>
  );
};
