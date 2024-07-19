package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;

public abstract class A11yIndexViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> {
  public abstract void setOrderIndex(T wrapper, String orderIndex);
}
