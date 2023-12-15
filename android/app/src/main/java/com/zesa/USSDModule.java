package com.zesa;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class USSDModule extends ReactContextBaseJavaModule {

    public USSDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "USSDModule";
    }

    @ReactMethod
    public void callUSSD(String ussdCode) {
        String ussd = "tel:" + Uri.encode(ussdCode + "#");
        Intent intent = new Intent("android.intent.action.CALL", Uri.parse(ussd));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }
}
