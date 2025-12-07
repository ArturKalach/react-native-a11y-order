package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;

public abstract class A11yUIContainerViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> {
  public abstract void setContainerType(ViewGroup view, int value);
}
