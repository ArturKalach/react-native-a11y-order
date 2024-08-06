package com.a11yorder.views.A11yOrderView;

import androidx.annotation.Nullable;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;

@ReactModule(name = A11yOrderViewManager.NAME)
public class A11yOrderViewManager extends com.a11yorder.A11yOrderViewManagerSpec<A11yOrderView> {

  public static final String NAME = "A11yOrderView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public A11yOrderView createViewInstance(ThemedReactContext context) {
    return new A11yOrderView(context);
  }

  @Override
  public void setOrderKey(A11yOrderView view, @Nullable String value) {
    //ToDo Add on layout logic to manage IndexView linking, should be optional based on prop (test perf, to understand whether we would have profit or not)
    view.setOrderKey(value);
  }
}
