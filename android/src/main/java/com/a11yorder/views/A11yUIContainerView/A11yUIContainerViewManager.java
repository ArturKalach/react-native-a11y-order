package com.a11yorder.views.A11yUIContainerView;

import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.a11yorder.A11yUIContainerViewManagerSpec;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yUIContainerViewManager extends A11yUIContainerViewManagerSpec<ViewGroup> {
  public static final String REACT_CLASS = "A11yUIContainer";

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

  @Override
  public void setContainerType(ViewGroup view, int value) {
    //stub
  }
}
