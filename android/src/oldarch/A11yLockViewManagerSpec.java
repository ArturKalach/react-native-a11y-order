package com.a11yorder;

import com.a11yorder.views.A11yLockView.A11yLockView;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yLockViewManagerSpec<T extends A11yLockView> extends ReactViewManager {
  public abstract void setComponentType(T view, int value);

  public abstract void setContainerKey(T view, String value);

  public abstract void setLockDisabled(T view, boolean value);
}

