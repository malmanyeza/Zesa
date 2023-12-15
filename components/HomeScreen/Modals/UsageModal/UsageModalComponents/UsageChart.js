import React, { useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Colors from '../../../../../constants/constants';
import { useFirebaseContext } from '../../../../../hooks/firebaseConext';

const { width, height } = Dimensions.get('window');

const data = {
  days: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [10, 15, 20, 22, 18, 25, 12],
        color: (opacity = 1) => `rgba(39, 195, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  },
  weeks: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [90, 110, 80, 95],
        color: (opacity = 1) => `rgba(39, 195, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  },
  months: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [50, 45, 60, 70, 80, 75],
        color: (opacity = 1) => `rgba(39, 195, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  },
};

const UsageChart = () => {

  const {isOnline} = useFirebaseContext();

  const [timeframe, setTimeframe] = useState('months');

  const toggleTimeframe = (selectedTimeframe) => {
    setTimeframe(selectedTimeframe);
  };

  const selectedData = data[timeframe];

  return (
    isOnline?(<View>

      <LineChart
        data={selectedData}
        width={width * 0.9}
        height={height * 0.5}
        bezier
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: (opacity = 1) => `rgba(39, 195, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        xLabelsOffset={-10}
        fromZero
        xLabels={selectedData.labels}
        xLabelStyle={{ fontSize: 12, color: 'black' }}
      />


      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => toggleTimeframe('days')}>
                <Text style={[styles.timeframeText,{ color: timeframe === 'days' ? Colors.primary : 'black' }]}>Days</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleTimeframe('weeks')}>
                <Text style={[styles.timeframeText,{ color: timeframe === 'weeks' ? Colors.primary : 'black' }]}>Weeks</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleTimeframe('months')}>
                <Text style={[styles.timeframeText,{ color: timeframe === 'months' ? Colors.primary : 'black' }]}>Months</Text>
              </TouchableOpacity>
      </View>
    </View>)
    :(<View>
      <Text  style={styles.offlineText}>Please make sure you have a good internet connection to view your usage</Text>
      </View>)
      
  );
};

export default UsageChart;

const styles = StyleSheet.create({
    timeframeText: {
        marginRight: 20,
        fontSize: 20,
        },
    offlineText:{
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
        },
});
