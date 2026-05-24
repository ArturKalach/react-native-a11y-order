package com.a11yorder.core;

import android.content.Context;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.a11yorder.services.focus.A11yFocusDelegate;
import com.a11yorder.services.focus.A11yFocusProtocol;
import com.facebook.react.bridge.ReactContext;

public class A11yManagedFocusView extends A11yScreenReaderView implements A11yFocusProtocol {
  private final A11yFocusDelegate a11yFocusDelegate;

  public A11yManagedFocusView(Context context) {
    super(context);
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
  }

  @Override
  public boolean isViewFocused() {
    View focusTarget = this.isFocusable() ? this : this.getSubChild();
    if (focusTarget == null) return false;
    return focusTarget.isAccessibilityFocused();
  }

  public void focus() {
    a11yFocusDelegate.requestFocus();
  }
}
