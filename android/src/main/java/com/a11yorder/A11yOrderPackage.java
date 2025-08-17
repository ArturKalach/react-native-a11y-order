package com.a11yorder;


import com.a11yorder.views.A11yContainerView.A11yContainerViewManager;
import com.a11yorder.views.A11yGroupView.A11yGroupViewManager;
import com.a11yorder.views.A11yIndexView.A11yIndexViewManager;
import com.a11yorder.views.A11yOrderView.A11yOrderViewManager;
import com.a11yorder.views.A11yPaneTitle.A11yPaneTitleManager;
import com.a11yorder.views.A11yView.A11yViewManager;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

public class A11yOrderPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new A11yIndexViewManager());
    viewManagers.add(new A11yOrderViewManager());
    viewManagers.add(new A11yGroupViewManager());
    viewManagers.add(new A11yContainerViewManager());
    viewManagers.add(new A11yPaneTitleManager());
    viewManagers.add(new A11yViewManager());

    return viewManagers;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return new ArrayList<>();
  }
}
