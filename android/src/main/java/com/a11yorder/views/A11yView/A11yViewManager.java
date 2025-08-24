package com.a11yorder.views.A11yView;

import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

@ReactModule(name = A11yViewManager.NAME)
public class A11yViewManager extends com.a11yorder.A11yViewSpec<A11yView> {
  public static final String NAME = "A11yView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public A11yView createViewInstance(ThemedReactContext context) {
    return new A11yView(context);
  }

  @Override
  public void receiveCommand(A11yView view, String commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case "focus": {
        this.focus(view);
      }
    }
  }

  @Override
  @ReactProp(name = "autoFocus")
  public void setAutoFocus(A11yView view, boolean value) {
    view.setAutoFocus(value);
  }

  @Override
  public void focus(A11yView view) {
    view.focus();
  }
}
