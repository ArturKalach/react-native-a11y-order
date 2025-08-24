package com.a11yorder.services.A11yFocusDelegate;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.a11yorder.services.A11yFocusService.A11yFocusService;
import com.a11yorder.utils.FragmentUtils;
import com.facebook.react.bridge.ReactContext;

public class A11yFocusDelegate {

  private final A11yFocusProtocol delegate;
  private final Context context;

  public A11yFocusDelegate(ReactContext context, A11yFocusProtocol delegate) {
    this.delegate = delegate;
    this.context = context;
  }

  private void focus() {
    Log.d("AUTO_FOCUS_FEATURE: DEFAULT FOCUS FIRE", String.valueOf(((ViewGroup)delegate).getId()));
    A11yFocusService.getInstance().requestFocus((ViewGroup) delegate, 300);
  }

  private void simpleFocus() {
    Log.d("AUTO_FOCUS_FEATURE: SIMPLE FOCUS FIRE", String.valueOf(((ViewGroup)delegate).getId()));
    A11yFocusService.getInstance().simpleFocus((ViewGroup) delegate);
  }

  public void onAccessibilityEvent(View child, AccessibilityEvent event) {
    if (event.getEventType() == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED) {
      A11yFocusService.getInstance().onFocused((View) delegate);
    }
  }

  @Nullable
  private Activity getCurrentActivityFromContext() {
    if (context instanceof ReactContext) {
      return ((ReactContext) context).getCurrentActivity();
    }
    return null;
  }

  public void requestFocus() {
    Log.d("AUTO_FOCUS_FEATURE: REQUEST", String.valueOf(((ViewGroup)delegate).getId()));

    Fragment currentFragment = FragmentUtils.findFragmentSafely((View) delegate);

    if (currentFragment != null && currentFragment.isResumed()) {
      Log.d("AUTO_FOCUS_FEATURE: SIMPLE FOCUS", String.valueOf(((ViewGroup)delegate).getId()));

      this.simpleFocus();
      return;
    }

    if(currentFragment != null) {
      Log.d("AUTO_FOCUS_FEATURE: FRAGMENT FOCUS", String.valueOf(((ViewGroup)delegate).getId()));
      Activity activity = getCurrentActivityFromContext();
      FragmentUtils.waitForFragment(activity, currentFragment, this::focus);
      return;
    }

    Log.d("AUTO_FOCUS_FEATURE: UNHANDLED FOCUS", String.valueOf(((ViewGroup)delegate).getId()));
    this.focus();
  }
}



