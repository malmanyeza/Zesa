import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context
const RatesContext = createContext();

// Create a custom hook to access the context
export const useRatesContext = () => useContext(RatesContext);

// Create a context provider component
export const RatesProvider = ({ children }) => {

    const [isAmountMode, setIsAmountMode] = useState(true)
    const [amountOrUnitsInputValue, setAmountOrUnitsInputValue] = useState('')
    const [equivalentValue, setEquivalentValue] = useState(null)
    const [selectedCurrency,setSelectedCurrency] = useState('USD')
    const [unitsAmount, setUnitsAmount] = useState(null)
    const [priceAmount, setPriceAmount] = useState(null)
    const [creditAmount, setCreditAmount] = useState(null)

    const currencyRate= 6061
      
    const tariffs = [
      { limit: 50, rate:  393.00},
      { limit: 100, rate: 453.00 },
      { limit: 200, rate: 785.50 },
      { limit: Infinity, rate: 1086.50 }
    ];

    const currencyConverter=(amount)=>{
      const crdt = selectedCurrency== 'USD'?(amount*currencyRate):(amount/currencyRate)
      setCreditAmount(crdt)
    }
    
    const equivalentValueGiver = (amountOrUnitsInputValue, selectedCurrency, isAmountMode) => {
      if (isAmountMode) {
        let units = 0;
        let amount = selectedCurrency == 'USD' ? (amountOrUnitsInputValue * currencyRate) : amountOrUnitsInputValue;
    
        for (let i = 0; i < tariffs.length; i++) {
          if (amount <= tariffs[i].limit * tariffs[i].rate) {
            units = (amount / tariffs[i].rate) + (i > 0 ? tariffs[i - 1].limit : 0);
            break;
          }
          amount -= tariffs[i].limit * tariffs[i].rate;
        }
    
        setEquivalentValue(units.toFixed(2));
        setPriceAmount(amountOrUnitsInputValue);
        setUnitsAmount(units.toFixed(2));
      } else {
        let cost = 0;
        let units = amountOrUnitsInputValue;
    
        for (let i = 0; i < tariffs.length; i++) {
          if (units <= tariffs[i].limit) {
            cost += (units * tariffs[i].rate);
            break;
          }
          cost += (tariffs[i].limit * tariffs[i].rate);
          units -= tariffs[i].limit;
        }
    
        cost = selectedCurrency == 'ZWL' ? cost : (cost / currencyRate);
    
        setEquivalentValue(cost.toFixed(2));
        setPriceAmount(cost.toFixed(2));
        setUnitsAmount(amountOrUnitsInputValue);
      }
    };
    

  const unitsAndmeterNoInputValidation = (meterNumber, unitsAmount) => {
  
    if (meterNumber.length === 11 && unitsAmount > 0) {
      return true;
    } else {
      return false;
    }
  }

  const unitsAmountInputValidation = (unitsAmount) => { 
    if (unitsAmount > 0) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <RatesContext.Provider value={{
        equivalentValue, setIsAmountMode, setSelectedCurrency, 
        equivalentValueGiver, unitsAmount, priceAmount,
        setAmountOrUnitsInputValue, amountOrUnitsInputValue,
        isAmountMode,selectedCurrency, setUnitsAmount, setPriceAmount,
        unitsAndmeterNoInputValidation, unitsAmountInputValidation,
        currencyConverter, creditAmount, setCreditAmount
    }}>
      {children}
    </RatesContext.Provider>
  );
};
