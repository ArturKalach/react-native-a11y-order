package com.a11yorder;

import androidx.annotation.Nullable;

import com.a11yorder.views.A11yGroupView.A11yGroupViewManager;
import com.a11yorder.views.A11yIndexView.A11yIndexViewManager;
import com.a11yorder.views.A11yOrderView.A11yOrderViewManager;
import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class A11yOrderPackage extends BaseReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
      return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return null;
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new A11yIndexViewManager());
    viewManagers.add(new A11yOrderViewManager());
    viewManagers.add(new A11yGroupViewManager());
    return viewManagers;
  }
}
