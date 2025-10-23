package com.a11yorder.services.focus;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.a11yorder.utils.A11yHelper;
import com.a11yorder.utils.FragmentUtils;
import com.facebook.react.bridge.ReactContext;

public class A11yFocusDelegate {
  private static final int DEFAULT_DELAY = 300;
  private static final int DEFAULT_RETRIES = 3;

  private final A11yFocusProtocol delegate;
  private final Context context;

  public A11yFocusDelegate(ReactContext context, A11yFocusProtocol delegate) {
    this.delegate = delegate;
    this.context = context;
  }

  private void focus() {
    A11yFocusService.getInstance().requestFocus((ViewGroup) delegate, DEFAULT_DELAY, DEFAULT_RETRIES);
  }

  private void simpleFocus() {
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
    if(!A11yHelper.isA11yServiceEnabled(context)) return;

    Fragment currentFragment = FragmentUtils.findFragmentSafely((View) delegate);

    if (currentFragment != null && currentFragment.isResumed()) {
      this.simpleFocus();
      return;
    }

    if(currentFragment != null) {
      Activity activity = getCurrentActivityFromContext();
      FragmentUtils.waitForFragment(activity, currentFragment, this::focus);
      return;
    }

    this.focus();
  }
}



