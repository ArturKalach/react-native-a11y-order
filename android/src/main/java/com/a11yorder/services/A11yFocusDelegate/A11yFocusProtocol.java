package com.a11yorder.services.A11yFocusDelegate;

import android.view.View;
import android.view.ViewManager;
import android.view.ViewParent;

public interface A11yFocusProtocol extends ViewParent, ViewManager {
  public View focusTarget();

  public boolean isFocused();
}
