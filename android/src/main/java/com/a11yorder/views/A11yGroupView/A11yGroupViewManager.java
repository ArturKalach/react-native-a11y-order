package com.a11yorder.views.A11yGroupView;

import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.a11yorder.A11yGroupViewManagerSpec;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yGroupViewManager extends A11yGroupViewManagerSpec<ViewGroup> {
  public static final String REACT_CLASS = "A11yGroupView";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected ReactViewGroup createViewInstance(@NonNull ThemedReactContext context) {
    return new ReactViewGroup(context);
  }
}
