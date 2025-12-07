package com.a11yorder.core;

import android.content.Context;
import android.view.View;

import com.facebook.react.views.view.ReactViewGroup;

import java.lang.ref.WeakReference;

public class A11yViewGroup extends ReactViewGroup {
  private WeakReference<View> childRef;

  public A11yViewGroup(Context context) {
    super(context);
  }

  protected void onChildAttached(View child) {}
  protected void onChildRemoved() {}


  protected View getSubChild() {
    return childRef != null ? childRef.get() : null;
  }

  protected void onSubChildChange(View child) {
    if (child != null) {
      onChildAttached(child);
    } else {
      onChildRemoved();
    }
  }

  private void setSubChild(View child) {
    if (child != null) {
      childRef = new WeakReference<>(child);
    } else if (childRef != null) {
      childRef.clear();
      childRef = null;
    }
    onSubChildChange(child);
  }

  @Override
  public void onViewAdded(View child) {
    super.onViewAdded(child);
    if (getSubChild() == null) {
      setSubChild(child);
    }
  }

  @Override
  public void onViewRemoved(View child) {
    super.onViewRemoved(child);
    if (getSubChild() == child) {
      setSubChild(null);
    }
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();

    if (getSubChild() == null && getChildCount() > 0) {
      setSubChild(getChildAt(0));
    }
  }

  @Override
  protected void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    setSubChild(null);
  }
}
