package com.a11yorder;

import com.a11yorder.views.A11yView.A11yView;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.views.view.ReactViewManager;

import javax.annotation.Nullable;


public abstract class A11yViewSpec<T extends A11yView> extends ReactViewManager {
  public abstract void setAutoFocus(T view, boolean value);

  public abstract void focus(T view);

  public abstract void receiveCommand(T view, String commandId, @Nullable ReadableArray args);

  public abstract void setDescendantFocusChangedEnabled(A11yView view, boolean value);
}
