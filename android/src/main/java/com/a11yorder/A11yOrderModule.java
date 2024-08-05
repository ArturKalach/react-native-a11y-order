package com.a11yorder;

import static com.facebook.react.uimanager.common.UIManagerType.FABRIC;

import android.app.Activity;
import android.os.Build;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.common.ViewUtil;

import java.util.ArrayList;

public class A11yOrderModule extends com.a11yorder.A11yOrderSpec {
  public static final String NAME = "A11yOrder";
  private ReactApplicationContext context;

  A11yOrderModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }


  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void setA11yOrder(@NonNull ReadableArray reactTags, Double nativeTag) {
    final int length = reactTags.size();
    if (length < 2) return;


    final Activity activity = context.getCurrentActivity();

    if (activity == null) {
      return;
    }

    activity.runOnUiThread(() -> {
      UIManager manager = null;
      try {
        int uiManagerType = ViewUtil.getUIManagerType(reactTags.getInt(0));
        if (uiManagerType == FABRIC) {
          manager = UIManagerHelper.getUIManager(context, uiManagerType);
        } else {
          manager = context.getNativeModule(UIManagerModule.class);
        }
        final ArrayList<View> views = new ArrayList<>();
        for (int i = 0; i < length; i++) {
          try {
            views.add(manager.resolveView(reactTags.getInt(i)));
          } catch (IllegalViewOperationException error) {
            Log.e("ERROR", error.getMessage());
          }
        }
        for (int i = 0; i < views.size() - 1; i++) {
          final View currentView = views.get(i);
          final View nextView = views.get(i + 1);
          currentView.setNextFocusForwardId(nextView.getId());
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
            currentView.setAccessibilityTraversalBefore(nextView.getId());
          }
        }
      } catch (IllegalViewOperationException error) {
        Log.e("ORDER_FOCUS_ERROR", error.getMessage());
      }
    });

  }

}
