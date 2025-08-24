package com.a11yorder.views.A11yView;


import android.content.Context;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;

import com.a11yorder.services.A11yFocusDelegate.A11yFocusDelegate;
import com.a11yorder.services.A11yFocusDelegate.A11yFocusProtocol;
import com.a11yorder.services.A11yFocusService.A11yFocusService;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.common.UIManagerType;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yView extends ReactViewGroup implements A11yFocusProtocol {
  private final A11yFocusDelegate a11yFocusDelegate;
  private Boolean autoFocus = false;
  private ReactContext context;

  private Boolean autoFocusOnce = false;
  private Boolean hasBeenFocused = false;

  public A11yView(Context context) {
    super(context);
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
    this.context = (ReactContext)context;

  }

  public boolean isViewFocused() {
    View focusTarget = this.isFocusable() ? this : this.getChildAt(0);
    if(focusTarget == null) return false;
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

  public View getRootViewForAccessibility() {
    return this.getRootView();
  }

  @Override
  public boolean onRequestSendAccessibilityEvent(View child, AccessibilityEvent event) {
    if(!autoFocus || event.getEventType() != AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED || hasBeenFocused) {
      return super.onRequestSendAccessibilityEvent(child, event);
    }

    Log.d("AUTO_FOCUS_FEATURE: HAS BEEN FOCUSED", String.valueOf(this.getId()) + " child: " + child.getId());
    hasBeenFocused = true;
    a11yFocusDelegate.onAccessibilityEvent(child, event);

    return super.onRequestSendAccessibilityEvent(child, event);
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
//    Log.d("AUTO_FOCUS_FEATURE: ATTACHED", String.valueOf(this.getId()));
    if (autoFocus && !autoFocusOnce) {
      autoFocusOnce = true;
      if(this.isViewFocused()) {return;}
      hasBeenFocused = false;
      a11yFocusDelegate.requestFocus();
    }
  }

}
