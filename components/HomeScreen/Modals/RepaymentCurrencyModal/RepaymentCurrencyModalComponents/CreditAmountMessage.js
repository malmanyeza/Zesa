import React, {useEffect} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Colors from '../../../../../constants/constants'
import { useRatesContext } from '../../../../../hooks/ratesContext'
import { usePaymentContext } from '../../../../../hooks/paymentContext'



const CreditAmountMessage = () =>{

    const {userInfo} = usePaymentContext()

    const {selectedCurrency, creditAmount, setCreditAmount, setSelectedCurrency, setUnitsAmount} = useRatesContext()

    useEffect(()=>{
        if(userInfo.creditAmount){
            setCreditAmount(userInfo.creditAmount)
            setSelectedCurrency(userInfo.creditCurrency)
            setUnitsAmount(userInfo.creditUnits)
        }
    },[])
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>You will be paying:</Text>
            <Text style={styles.creditAmount}>{creditAmount} {selectedCurrency}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom:30
    },
    text:{
        color:Colors.darkText,
        fontSize:19,
    },
    creditAmount:{
        color:Colors.primary,
        fontSize:19,
        fontWeight:'bold',
        marginLeft:10
    }
})


export default CreditAmountMessage