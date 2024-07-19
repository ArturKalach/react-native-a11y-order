package com.a11yorder.views.A11yDirectionView;

import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class A11yDirectionViewManager extends com.a11yorder.A11yDirectionViewManagerSpec<A11yDirectionView> {
  public static final String REACT_CLASS = "A11yDirectionView";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected A11yDirectionView createViewInstance(@NonNull ThemedReactContext context) {
    return new A11yDirectionView(context);
  }

  @Override
  @ReactProp(name = "horizontal", defaultBoolean = false)
  public void setHorizontal(A11yDirectionView view, boolean horizontal) {
    int orientation = horizontal ? LinearLayout.HORIZONTAL : LinearLayout.VERTICAL;
    if(orientation != view.getOrientation()) {
      view.setOrientation(orientation);
    }
  }
}
