package com.a11yorder.views.A11yCardView;



import android.view.ViewGroup;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;

@ReactModule(name = com.a11yorder.views.A11yCardView.A11yCardViewManager.NAME)
public class A11yCardViewManager extends com.a11yorder.A11yCardViewManagerSpec<ViewGroup> {
  public static final String NAME = "A11yCardView";

  @Override
  public String getName() {
    return NAME;
  }
}
