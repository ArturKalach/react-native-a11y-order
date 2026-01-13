package com.a11yorder.views.A11yIndexView;

import android.content.Context;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.a11yorder.events.EventHelper;
import com.a11yorder.services.order.A11yOrderService;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.view.ReactViewGroup;


public class A11yIndexView extends ReactViewGroup {
  private final Context context;
  private final A11yOrderService orderService;

  public A11yIndexView(Context context) {
    super(context);
    this.context = context;
    this.orderService = new A11yOrderService(this);
  }

  public void setIndex(int index) {
    this.orderService.setIndex(index);
  }

  public void setOrderFocusType(int focusType) {
    this.orderService.setFocusType(focusType);
  }

  public void setOrderKey(String orderKey) {
    this.orderService.orderKey = orderKey;
  }

  @Override
  public void onViewAdded(View child) {
    super.onViewAdded(child);
    this.orderService.link(child);
  }

  @Override
  public void onViewRemoved(View child) {
    super.onViewRemoved(child);
    this.orderService.clear(child);
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    this.orderService.attach();
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    this.orderService.detach();
  }

  @Override
  public boolean onRequestSendAccessibilityEvent(View child, AccessibilityEvent event) {
    int eventType = event.getEventType();
    boolean isSubChild = (child == orderService.getStoredView());

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED && isSubChild) {
      EventHelper.screenReaderFocusChanged((ReactContext) context, this.getId(), true);
    }

    if (eventType == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUS_CLEARED && isSubChild) {
      EventHelper.screenReaderFocusChanged((ReactContext) context, this.getId(), false);
    }

    return super.onRequestSendAccessibilityEvent(child, event);
  }
}
