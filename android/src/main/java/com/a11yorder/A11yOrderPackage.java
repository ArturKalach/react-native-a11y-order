package com.a11yorder;

import com.a11yorder.modules.A11yAnnounceModule;
import com.a11yorder.views.A11yCardView.A11yCardViewManager;
import com.a11yorder.views.A11yIndexView.A11yIndexViewManager;
import com.a11yorder.views.A11yLockView.A11yLockViewManager;
import com.a11yorder.views.A11yOrderView.A11yOrderViewManager;
import com.a11yorder.views.A11yPaneTitle.A11yPaneTitleManager;
import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class A11yOrderPackage extends BaseReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.asList(
      new A11yIndexViewManager(),
      new A11yOrderViewManager(),
      new A11yPaneTitleManager(),
      new A11yLockViewManager(),
      new A11yCardViewManager()
    );
  }

  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(A11yAnnounceModule.NAME)) {
      return new A11yAnnounceModule(reactContext);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> getReactModuleInfos() {
        Map<String, ReactModuleInfo> map = new HashMap<>();

        map.put(A11yAnnounceModule.NAME, new ReactModuleInfo(
          A11yAnnounceModule.NAME, // name
          A11yAnnounceModule.NAME, // className
          false,                   // canOverrideExistingModule
          false,                   // needsEagerInit
          false,                   // isCxxModule
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED // isTurboModule
        ));
        return map;
      }
    };
  }
}
