package com.a11yorder;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;

public abstract class A11yOrderSpec extends ReactContextBaseJavaModule {
  A11yOrderSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void setA11yOrder(@NonNull ReadableArray reactTags, Double _tag);
}
