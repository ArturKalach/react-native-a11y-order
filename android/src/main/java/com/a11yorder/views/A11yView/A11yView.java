package com.a11yorder.views.A11yView;


import android.content.Context;
import android.view.View;

import com.a11yorder.services.A11yFocusDelegate.A11yFocusDelegate;
import com.a11yorder.services.A11yFocusDelegate.A11yFocusProtocol;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yView extends ReactViewGroup implements A11yFocusProtocol {
  private final A11yFocusDelegate a11yFocusDelegate;
  private Boolean autoFocus = false;

  private Boolean autoFocusOnce = false;

  public A11yView(Context context) {
    super(context);
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
  }

  public boolean isFocused() {
    View focusTarget = this.isFocusable() ? this : this.getChildAt(0);
    return focusTarget.isAccessibilityFocused();
  }

  public void setAutoFocus(Boolean value) {
    this.autoFocus = value;
  }

  public View focusTarget() {
    return this.isFocusable() ? this : this.getChildAt(0);
  }

  public void focus() {
    a11yFocusDelegate.requestFocus();
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    if (autoFocus && !autoFocusOnce) {
      autoFocusOnce = true;
      a11yFocusDelegate.requestFocus();
    }
  }
}
