package com.a11yorder.views.A11yView;


import android.content.Context;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.a11yorder.core.A11yViewGroup;
import com.a11yorder.events.EventHelper;
import com.a11yorder.services.focus.A11yFocusDelegate;
import com.a11yorder.services.focus.A11yFocusProtocol;
import com.facebook.react.bridge.ReactContext;

public class A11yView extends A11yViewGroup implements A11yFocusProtocol {
  private final Context context;
  private final A11yFocusDelegate a11yFocusDelegate;
  private Boolean autoFocus = false;

  private Boolean autoFocusOnce = false;
  private Boolean hasBeenFocused = false;

  public A11yView(Context context) {
    super(context);
    this.context = context;
    this.a11yFocusDelegate = new A11yFocusDelegate((ReactContext) context, this);
  }

  public static String getNativeIdSafe(View view) {
    try {
      Object tag = view.getTag(com.facebook.react.R.id.view_tag_native_id);
      return (tag instanceof String) ? (String) tag : null;
    } catch (Exception e) {
      return null;
    }
  }

  public boolean isViewFocused() {
    View focusTarget = this.isFocusable() ? this : this.getChildAt(0);
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
  public void onPopulateAccessibilityEvent(AccessibilityEvent event) {
    super.onPopulateAccessibilityEvent(event);
    int eventType = event.getEventType();
    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED) {
      EventHelper.screenReaderFocused((ReactContext) context, this.getId());
    }
  }

  @Override
  public boolean onRequestSendAccessibilityEvent(View child, AccessibilityEvent event) {
    int eventType = event.getEventType();
    boolean isSubChild = (child == this.getSubChild());

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED && autoFocus && !hasBeenFocused) {
      hasBeenFocused = true;
      a11yFocusDelegate.onAccessibilityEvent(child, event);
    }

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED && isSubChild) {
      EventHelper.screenReaderFocusChanged((ReactContext) context, this.getId(), true);
    }

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUS_CLEARED && isSubChild) {
      EventHelper.screenReaderFocusChanged((ReactContext) context, this.getId(), false);
    }

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUS_CLEARED) {
      String nativeId = getNativeIdSafe(child);
      EventHelper.screenReaderDescendantFocusChanged((ReactContext) context, this.getId(), "blurred", nativeId);
    }

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED) {
      String nativeId = getNativeIdSafe(child);
      EventHelper.screenReaderDescendantFocusChanged((ReactContext) context, this.getId(), "focused", nativeId);
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
