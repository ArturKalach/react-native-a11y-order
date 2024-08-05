package com.a11yorder;

import com.a11yorder.views.A11yIndexView.A11yIndexView;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yIndexViewManagerSpec<T extends A11yIndexView> extends ReactViewManager {
  public abstract void setOrderIndex(T viewGroup, int value);

  public abstract void setOrderKey(T viewGroup, String value);

  public abstract void focus(T view);
}
