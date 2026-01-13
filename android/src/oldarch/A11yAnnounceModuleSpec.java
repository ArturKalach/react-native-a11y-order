package com.a11yorder;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public abstract class A11yAnnounceModuleSpec extends ReactContextBaseJavaModule {
  protected A11yAnnounceModuleSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void announce(String message);
}
