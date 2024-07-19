package com.a11yorder;


import androidx.annotation.Nullable;

import com.a11yorder.views.A11yDirectionView.A11yDirectionViewManager;
import com.a11yorder.views.A11yIndexView.A11yIndexViewManager;
import com.a11yorder.views.A11yOrderView.A11yOrderViewManager;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class A11yOrderPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(A11yOrderModule.NAME)) {
      return new A11yOrderModule(reactContext);
    } else {
      return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      moduleInfos.put(
              A11yOrderModule.NAME,
              new ReactModuleInfo(
                      A11yOrderModule.NAME,
                      A11yOrderModule.NAME,
                      false, // canOverrideExistingModule
                      false, // needsEagerInit
                      true, // hasConstants
                      false, // isCxxModule
                      isTurboModule // isTurboModule
      ));
      return moduleInfos;
    };
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new A11yIndexViewManager());
    viewManagers.add(new A11yOrderViewManager());
    viewManagers.add(new A11yDirectionViewManager());
    return viewManagers;
  }
}
