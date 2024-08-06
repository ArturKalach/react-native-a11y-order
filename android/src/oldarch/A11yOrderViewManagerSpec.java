package com.a11yorder;

import com.a11yorder.views.A11yOrderView.A11yOrderView;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yOrderViewManagerSpec<T extends A11yOrderView> extends ReactViewManager {
  public abstract void setOrderKey(T view, @androidx.annotation.Nullable String value);
}
