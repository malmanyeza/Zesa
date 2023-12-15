import React,{ memo } from "react"
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Colors from "../../../../../constants/constants"
import { useRatesContext } from "../../../../../hooks/ratesContext"


const UsdAndZwlButtons = ()=>{

    const {selectedCurrency, setSelectedCurrency, currencyConverter, creditAmount} = useRatesContext()

    const handleCurrencySelection = (currency)=>{
        setSelectedCurrency(currency)
        currencyConverter(creditAmount)
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                disabled={selectedCurrency === "ZWL"}
                onPress={()=>{handleCurrencySelection('ZWL')}}
                style={[styles.button, 
                    {backgroundColor: selectedCurrency === "ZWL"? Colors.primary:null}
            ]}
            >
                <Text style={[styles.buttonText,
                    {color: selectedCurrency ==="ZWL"? 'white' :Colors.darkText}
                    ]}>Pay in ZWL</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={selectedCurrency === "USD"}
                onPress={()=>{handleCurrencySelection('USD')}}
                style={[styles.button, 
                    {backgroundColor: selectedCurrency === "USD"? Colors.primary:null}
                ]}
            >
                <Text style={[styles.buttonText,
                    {color: selectedCurrency ==="USD"? 'white' :Colors.darkText}
                    ]}>Pay in USD</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:-20
    },
    button:{
        borderRadius:20,
        borderColor:Colors.primary,
        borderWidth:1,
        padding:10,
        width:"45%"
    },
    buttonText:{
        fontSize:18,
        textAlign:'center'
    }
})

export default memo(UsdAndZwlButtons)