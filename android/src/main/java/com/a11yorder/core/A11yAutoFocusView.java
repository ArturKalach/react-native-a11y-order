package com.a11yorder.core;

import android.content.Context;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.a11yorder.services.focus.A11yFocusDelegate;
import com.a11yorder.services.focus.A11yFocusProtocol;
import com.facebook.react.bridge.ReactContext;

public class A11yAutoFocusView extends A11yScreenReaderView implements A11yFocusProtocol {
  private final A11yFocusDelegate a11yFocusDelegate;
  private Boolean autoFocus = false;
  private Boolean autoFocusOnce = false;
  private Boolean hasBeenFocused = false;

  public A11yAutoFocusView(Context context) {
    super(context);
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
  }

  @Override
  public boolean isViewFocused() {
    View focusTarget = this.isFocusable() ? this : this.getSubChild();
    if (focusTarget == null) return false;
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
    int eventType = event.getEventType();

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED && autoFocus && !hasBeenFocused) {
      hasBeenFocused = true;
      a11yFocusDelegate.onFocused();
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
