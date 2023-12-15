import React from "react";
import {View } from  'react-native';
import UsageModal from "./UsageModal/UsageModal";
import UnitsAndCurrencyModal from "./UnitsAndCurrencyModal/UnitsAndCurrencyModal";
import PaymentOptionsModal from "./PaymentOptionsModal/PaymentOptionsModal";
import BankOptionsModal from "./BankOptionsModal/BankOptionsModal";
import EcocashModal from "./EcocashModal/EcocashModal";
import AirtimeModal from "./AirtimeModal/AirtimeModal";
import VisaCardModal from "./VisaCardModal/VisaCardModal";
import BankAccountNoModal from "./BankAccounNoModal/BankAccuntNoModal";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import BuyForOtherModal from "./BuyForOtherModal/BuyForOtherModal";
import ShareModal from "./ShareModal/ShareModal";
import BuyOnCreditModal from "./BuyOnCreditModal/BuyOnCreditModal";
import MasterCardModal from "./MasterCardModal/MasterCardModal";
import PayPalModal from "./PayPalModal/PayPalModal";
import BankPreconfirmationModal from "./PreConfirmationModals/BankPreConfirmationModal";
import BankSelectionsToSaveModal from "../../SettingsScreen/BankOptionsModal/BankSelectionToSaveModal";
import VisaCardPreConfirmationModal from "./PreConfirmationModals/VisaCardPreconfirmationModal";
import MasterCardPreConfirmationModal from "./PreConfirmationModals/MasterCardPreconfirmationModal";
import RepaymentCurrencyModal from "./RepaymentCurrencyModal/RepaymentCurrencyModal";

const Modals =()=>{
    return(
        <View>
            <AirtimeModal/>
            <BankAccountNoModal/>
            <BankOptionsModal/>
            <BuyForOtherModal/>
            <ConfirmationModal/>
            <EcocashModal/>
            <PaymentOptionsModal/>
            <UnitsAndCurrencyModal/>
            <VisaCardModal/>
            <UsageModal/>
            <ShareModal/>
            <BuyOnCreditModal/>
            <MasterCardModal/>
            <PayPalModal/>
            <BankPreconfirmationModal/>
            <BankSelectionsToSaveModal/>
            <VisaCardPreConfirmationModal/>
            <MasterCardPreConfirmationModal/>
            <RepaymentCurrencyModal/>
        </View>
    )
}

export default Modals