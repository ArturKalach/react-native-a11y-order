package com.a11yorder;

import com.a11yorder.views.A11yIndexView.A11yIndexView;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yIndexViewManagerSpec<T extends A11yIndexView> extends ReactViewManager {
  public abstract void setOrderIndex(T viewGroup, int value);

  public abstract void setOrderKey(T viewGroup, String value);

  public abstract void setOrderFocusType(T viewGroup, int value);

  public abstract void focus(T view);

  public abstract void setAutoFocus(A11yIndexView view, boolean value);
  public abstract void setDescendantFocusChangedEnabled(A11yIndexView view, boolean value);

  public abstract void setContainerType(A11yIndexView view, int value);

  public abstract void setShouldGroupAccessibilityChildren(A11yIndexView view, int value);

}
