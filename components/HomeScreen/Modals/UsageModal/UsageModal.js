import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the close button icon
import Modal from 'react-native-modal';
import UsageChart from './UsageModalComponents/UsageChart';
import { useUsageChartContext } from '../../../../hooks/usageChartContext';


const UsageModal = () => {

  const {isUsageChartModalVisible, setIsUsageChartModalVisible} = useUsageChartContext()


  const closeModal =()=>{
    setIsUsageChartModalVisible(false)
  }

    return (
      <Modal
        isVisible={isUsageChartModalVisible}
        swipeDirection={'down'}// Allow swiping down to close
        onSwipeComplete={closeModal} // Callback when swiped down
        onBackdropPress={closeModal} // Close on backdrop press
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.handle}/>
          <View style={styles.header}>
            <Text style={styles.headerText}>Usage History</Text>
          </View>
          {/* Your chart content goes here */}
          {/* Replace this with your chart component */}
          <View style={styles.chartContainer}>
            <UsageChart />
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    handle:{
      width: 50,
      height: 5,
      borderRadius: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      alignSelf: 'center',
      marginBottom: 10,
    },
    container: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      color:'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 5,
    },
    chartContainer: {
      // Add styles for your chart container as needed
    },
  });
  
  export default UsageModal;
  