package com.a11yorder.views.A11yContainerView;

import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.a11yorder.A11yContainerViewManagerSpec;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yContainerViewManager extends A11yContainerViewManagerSpec<ViewGroup> {
  public static final String REACT_CLASS = "RNAOA11yContainerView";

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
