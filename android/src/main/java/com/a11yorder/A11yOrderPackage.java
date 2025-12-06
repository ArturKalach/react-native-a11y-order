package com.a11yorder;


import com.a11yorder.modules.A11yAnnounceModule;
import com.a11yorder.views.A11yContainerView.A11yContainerViewManager;
import com.a11yorder.views.A11yGroupView.A11yGroupViewManager;
import com.a11yorder.views.A11yIndexView.A11yIndexViewManager;
import com.a11yorder.views.A11yLockView.A11yLockViewManager;
import com.a11yorder.views.A11yOrderView.A11yOrderViewManager;
import com.a11yorder.views.A11yPaneTitle.A11yPaneTitleManager;
import com.a11yorder.views.A11yView.A11yViewManager;
import com.facebook.react.BaseReactPackage;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

public class A11yOrderPackage extends BaseReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new A11yIndexViewManager());
    viewManagers.add(new A11yOrderViewManager());
    viewManagers.add(new A11yGroupViewManager());
    viewManagers.add(new A11yContainerViewManager());
    viewManagers.add(new A11yPaneTitleManager());
    viewManagers.add(new A11yViewManager());
    viewManagers.add(new A11yLockViewManager());

    return viewManagers;
  }

  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(A11yAnnounceModule.NAME)) {
      return new A11yAnnounceModule(reactContext);
    } else {
      return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> getReactModuleInfos() {
        Map<String, ReactModuleInfo> map = new HashMap<>();
        boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;

        map.put(A11yAnnounceModule.NAME, new ReactModuleInfo(
          A11yAnnounceModule.NAME,       // name
          A11yAnnounceModule.NAME,       // className
          false, // canOverrideExistingModule
          false, // needsEagerInit
          false, // isCXXModule
          isTurboModule   // isTurboModule
        ));
        return map;
      }
    };
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return new ArrayList<>();
  }
}
