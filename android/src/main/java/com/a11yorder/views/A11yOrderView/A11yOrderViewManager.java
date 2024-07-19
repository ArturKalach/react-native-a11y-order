package com.a11yorder.views.A11yOrderView;

import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.List;
import java.util.Map;


@ReactModule(name = A11yOrderViewManager.NAME)
public class A11yOrderViewManager extends com.a11yorder.A11yOrderViewManagerSpec<A11yOrderView> {

  public static final String NAME = "A11yOrderView";

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public A11yOrderView createViewInstance(ThemedReactContext context) {
    return new A11yOrderView(context);
  }


//  @Override
//  protected void addEventEmitters(final ThemedReactContext reactContext, ReactViewGroup viewGroup) {
//    viewGroup.setOnHierarchyChangeListener(new ViewGroup.OnHierarchyChangeListener() {
//      @Override
//      public void onChildViewAdded(View parent, View child) {
//        child.setOnFocusChangeListener(
//          (v, hasFocus) -> {
//            FocusChangeEvent event = new FocusChangeEvent(viewGroup.getId(), hasFocus);
//            UIManagerHelper.getEventDispatcherForReactTag(reactContext, v.getId()).dispatchEvent(event);
//          });
//
//        child.setOnKeyListener((View v, int keyCode, KeyEvent keyEvent) -> {
//          onKeyPressHandler(viewGroup, keyCode, keyEvent, reactContext);
//          return false;
//        });
//      }
//
//      @Override
//      public void onChildViewRemoved(View parent, View child) {
//      }
//    });
//  }

//  @Override
//  @ReactProp(name = "indexes")
//  public void setIndexes(A11yOrderViewManager view, List<String> value) {
//
//  }

  @Override
  public void setIndexes(A11yOrderView view, @Nullable ReadableArray value) {

  }
}
