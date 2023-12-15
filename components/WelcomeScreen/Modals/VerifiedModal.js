import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePaymentContext } from '../../../hooks/paymentContext';
import Colors from '../../../constants/constants';

const VerifiedModal = () => {
  const { isVerifiedModalVisible, setIsVerifiedModalVisible } = usePaymentContext();

  const closeVerifiedModal = () => {
    setIsVerifiedModalVisible(false);
  };


  useEffect(() => {
    let timeout;
    if (isVerifiedModalVisible) {
      // Set a timeout to close the modal after 2 seconds
      timeout = setTimeout(() => {
        closeVerifiedModal();
      }, 2000);
    }

    return () => {
      // Clear the timeout when the component unmounts or the modal is closed
      clearTimeout(timeout);
    };
  }, [isVerifiedModalVisible]);

  return (
    <Modal 
      isVisible={isVerifiedModalVisible} 
      backdropOpacity={0.7} 
      style={styles.modal} 
      animationOut={'fadeOut'}
    >
      <View style={styles.container}>
        <View style={styles.verifiedContent}>
          {/* Text */}
          <Text style={styles.verifiedText}>User Registered Successfully</Text>

          {/* Green Check */}
          <Ionicons name="checkmark-circle" style={styles.check} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderRadius: 10,
  },
  verifiedContent: {
    alignItems: 'center',
  },
  verifiedText: {
    marginTop: 15,
    color: '#1B4B29',
    fontSize: 18,
    marginBottom: 10,
  },
  check: {
    fontSize: 48,
    color: Colors.primary,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default VerifiedModal;
