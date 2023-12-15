import React,{memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/constants';

const BackButton = ({onBackPress}) => {
    
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <View style={styles.backButtonCircle}>
          <Ionicons name="chevron-back" size={24} color='black' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  backButton: {
    zIndex: 1,
  },
  backButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.primary ,
    borderWidth:1,
    backgroundColor:'rgba(255, 255, 255, 0.6)'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default memo(BackButton);