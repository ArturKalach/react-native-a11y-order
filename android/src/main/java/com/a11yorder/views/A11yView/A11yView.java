package com.a11yorder.views.A11yView;


import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.a11yorder.services.focus.A11yFocusDelegate;
import com.a11yorder.services.focus.A11yFocusProtocol;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yView extends ReactViewGroup implements A11yFocusProtocol {
  private final A11yFocusDelegate a11yFocusDelegate;
  private Boolean autoFocus = false;

  private Boolean autoFocusOnce = false;
  private Boolean hasBeenFocused = false;

  public A11yView(Context context) {
    super(context);
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
  }

  public boolean isViewFocused() {
    View focusTarget = this.isFocusable() ? this : this.getChildAt(0);
    if(focusTarget == null) return false;
    return focusTarget.isAccessibilityFocused();
  }

  public void setAutoFocus(Boolean value) {
    this.autoFocus = value;
  }

  public void focus() {
    a11yFocusDelegate.requestFocus();
  }

  @Override
  public boolean onRequestSendAccessibilityEvent(View child, AccessibilityEvent event) {
    if (autoFocus && event.getEventType() == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED && !hasBeenFocused) {
      hasBeenFocused = true;
      a11yFocusDelegate.onAccessibilityEvent(child, event);
    }
    return super.onRequestSendAccessibilityEvent(child, event);
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    if (autoFocus && !autoFocusOnce) {
      autoFocusOnce = true;

      if (!isViewFocused()) {
        hasBeenFocused = false;
        a11yFocusDelegate.requestFocus();
      }
    }
  }

}
