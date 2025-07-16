package com.a11yorder.views.A11yIndexView;

import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.a11yorder.services.AccessibilityUtils;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;


@ReactModule(name = A11yIndexViewManager.NAME)
public class A11yIndexViewManager extends com.a11yorder.A11yIndexViewManagerSpec<A11yIndexView> {

  public static final String NAME = "A11yIndexView";

  @NonNull
  @Override
  public String getName() {
    return NAME;
  }

  @NonNull
  @Override
  public A11yIndexView createViewInstance(@NonNull ThemedReactContext context) {
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
  public void setOrderIndex(A11yIndexView viewGroup, int value) {
    viewGroup.setIndex(value);
  }

  @Override
  @ReactProp(name = "orderKey")
  public void setOrderKey(A11yIndexView viewGroup, String value) {
    viewGroup.setOrderKey(value);
  }

  @Override
  public void setOrderFocusType(A11yIndexView viewGroup, int value) {
    viewGroup.setOrderFocusType(value);
  }

  @Override
  public void focus(A11yIndexView view) {
    this.focus((ReactViewGroup) view);
  }

  private  <T extends ReactViewGroup> void focus(T view) {
    AccessibilityUtils.focus(view);
  }

  @Override
  public void receiveCommand(ReactViewGroup root, String commandId, @Nullable ReadableArray args) {
    if (commandId.equals("focus")) {
      this.focus(root);
    } else {
      super.receiveCommand(root, commandId, args);
    }
  }
}
