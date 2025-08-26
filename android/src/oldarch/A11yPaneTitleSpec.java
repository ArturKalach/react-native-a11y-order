package com.a11yorder;

import com.a11yorder.views.A11yPaneTitle.A11yPaneTitle;
import com.facebook.react.views.view.ReactViewManager;


public abstract class A11yPaneTitleSpec<T extends A11yPaneTitle> extends ReactViewManager {
  public abstract void setTitle(T view, @androidx.annotation.Nullable String value);

  public abstract void setDetachMessage(T view, @androidx.annotation.Nullable String value);

  public abstract void setType(A11yPaneTitle view, int value);

  public abstract void setWithFocusRestore(A11yPaneTitle view, boolean withFocusRestore);
}
