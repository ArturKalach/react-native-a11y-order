package com.a11yorder.views.A11yIndexView;

import android.app.Activity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.List;
import java.util.Map;


@ReactModule(name = A11yIndexViewManager.NAME)
public class A11yIndexViewManager extends com.a11yorder.A11yIndexViewManagerSpec<A11yIndexView> {

  public static final String NAME = "A11yIndexView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public A11yIndexView createViewInstance(ThemedReactContext context) {
    A11yIndexView viewGroup = new A11yIndexView(context);

        viewGroup.setOnHierarchyChangeListener(new A11yIndexView.OnHierarchyChangeListener() {
      @Override
      public void onChildViewAdded(View parent, View child) {
        viewGroup.linkAddView(child);
      }

      @Override
      public void onChildViewRemoved(View parent, View child) {
        viewGroup.linkRemoveView(child);
      }
    });
    return viewGroup;
  }


  @Override
  @ReactProp(name = "orderIndex")
  public void setOrderIndex(A11yIndexView view, int value) {
    view.setIndex(value);
  }

  @Override
  @ReactProp(name = "orderKey")
  public void setOrderKey(A11yIndexView view, String value) {
    view.setOrderKey(value);
  }
}
