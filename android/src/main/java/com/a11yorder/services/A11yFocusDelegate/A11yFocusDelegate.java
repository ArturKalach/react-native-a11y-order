package com.a11yorder.services.A11yFocusDelegate;

import android.content.Context;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.a11yorder.services.AccessibilityUtils;
import com.facebook.react.bridge.ReactContext;

public class A11yFocusDelegate {
  private final A11yFocusProtocol delegate;
  private final Context context;

  public A11yFocusDelegate(ReactContext context, A11yFocusProtocol delegate) {
    this.delegate = delegate;
    this.context = context;
  }

  private void tryFocusWithRetry(int maxRetries) {
    if (delegate.isFocused() || maxRetries <= 0) {
      return;
    }

    ((View) delegate).postDelayed(() -> {
      if (delegate.isFocused()) return;
      this.focus();

      ((View) delegate).postDelayed(() -> tryFocusWithRetry(maxRetries - 1), 100);
    }, 450);
  }

  private void focus() {
    if (delegate.isFocused()) return;
    View focusTarget = delegate.focusTarget();
    if (focusTarget != null && focusTarget.isFocusable()) {
      focusTarget.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
    }
  }

  public void requestFocus() {
    AccessibilityManager am = (AccessibilityManager) context.getSystemService(Context.ACCESSIBILITY_SERVICE);
    boolean isExploreByTouchEnabled = am.isTouchExplorationEnabled();
    if (!isExploreByTouchEnabled) return;

    Fragment currentFragment = FragmentManager.findFragment((View) delegate);
    if (currentFragment.isResumed()) {
      int MAX_RETRIES = 3;
      tryFocusWithRetry(MAX_RETRIES);
    } else {
      View rootView = currentFragment.getView();
      if (rootView != null) {
        AccessibilityUtils.runOnFirstAccessibilityFocus(rootView, this::focus);
      }
    }

  }
}
