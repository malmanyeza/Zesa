import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useScreenModalsContext } from '../../../../hooks/modalsContext';
import { useNavigation } from '@react-navigation/native';

const UnitsViewHeader = () => {

  const navigation = useNavigation();

  const { openSettingsModal } = useScreenModalsContext();

  const goToSettings =useCallback(()=>{
    navigation.navigate('Settings')
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Units Left</Text>
      <TouchableOpacity
        onPress={goToSettings}
      >
       <Ionicons name="settings-outline" size={25} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:10,
  },
  title: {
    fontSize: 16,
    color: 'gray',
    fontWeight:'bold'
  },
});

export default memo(UnitsViewHeader);
