package com.a11yorder.modules;

import com.a11yorder.A11yAnnounceModuleSpec;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class A11yAnnounceModule extends A11yAnnounceModuleSpec {

  public static final String NAME = "A11yAnnounceModule";

  public A11yAnnounceModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void announce(String message) {
    //stub
  }
}
