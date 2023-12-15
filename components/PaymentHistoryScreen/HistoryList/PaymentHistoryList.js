import React, { useState, memo, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import RenderPaymentHistoryItem from './RenderPaymentHistoryItem'; // Import the previously created component
import { useFirebaseContext } from '../../../hooks/firebaseConext';

const PaymentHistoryList = () => {
  const { myHistory, userPaymentHistory, getUserPaymentHistory,useUserPaymentHistory, setUseUserPaymentHistory } = useFirebaseContext();
  

  const [sortedHistory, setSortedHistory] = useState([]);
  useEffect(() => {

    // Convert date and time strings to sortable format and sort
    const history = (useUserPaymentHistory ? userPaymentHistory : myHistory).slice().sort((a, b) => {
      const datetimeA = new Date(`${a.date}${a.time}`).valueOf();
      const datetimeB = new Date(`${b.date}${b.time}`).valueOf();

      return datetimeB - datetimeA;
    })

    setSortedHistory(history);

  }, [useUserPaymentHistory])

  


  // Check if the length is 10 to decide whether to render a TouchableOpactiy
  const reversedHistory = sortedHistory.reverse();
  const isEleventhItem = !useUserPaymentHistory && reversedHistory.length >=10;


  return (
    <FlatList
      data={reversedHistory}
      keyExtractor={(item) => (item.id? item.id.toString() :Math.random().toString())}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      renderItem={({ item }) => (
        <RenderPaymentHistoryItem
          date={item.date}
          units={item.units}
          meterNumber={item.meterNumber}
          paymentMethod={item.paymentMethod}
          time={item.time}
          amount={item.amount}
          repayment={item.repayment}
        />
      )}
      ListFooterComponent={() => (
        // Render TouchableOpacity as the eleventh item
        isEleventhItem && (
          <TouchableOpacity
            style={{ padding: 16, backgroundColor: 'lightgray', alignItems: 'center' }}
            onPress={()=>getUserPaymentHistory()}
          >
            <Text style={{color:'black'}} >Load More</Text>
          </TouchableOpacity>
        )
      )}
    />
  );
};

export default memo(PaymentHistoryList);
