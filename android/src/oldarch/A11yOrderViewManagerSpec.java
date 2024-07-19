package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;

public abstract class A11yOrderViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> {
  public abstract void setIndexes(T wrapper, @Nullable ReadableArray value);
}