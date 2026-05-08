package com.a11yorder.core;

import android.content.Context;
import android.view.View;

import com.a11yorder.services.order.A11yOrderService;

public class A11yViewOrder extends A11yAutoFocusView {
  private final A11yOrderService orderService;

  public A11yViewOrder(Context context) {
    super(context);
    this.orderService = new A11yOrderService(this);
  }

  public void setIndex(int index) {
    this.orderService.setIndex(index);
  }

  public void setOrderFocusType(int focusType) {
    this.orderService.setFocusType(focusType);
  }

  public void setOrderKey(String orderKey) {
    this.orderService.setOrderKey(orderKey);
  }

  @Override
  protected void onChildAttached(View child) {
    this.orderService.link(child);
  }

  @Override
  protected void onChildRemoved() {
    this.orderService.detach();
  }
}
