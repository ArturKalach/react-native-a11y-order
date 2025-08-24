package com.a11yorder.services.A11yFocusService;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.a11yorder.utils.A11yHelper;

import java.lang.ref.WeakReference;

public final class A11yFocusService {
  private static final int DEFAULT_DELAY = 300; // Default retry delay
  private static final int DEFAULT_RETRIES = 3; // Default retry count

  private static volatile A11yFocusService instance;
  private WeakReference<ViewGroup> viewRef = new WeakReference<>(null);
  private volatile boolean lock = false;
  private Runnable pendingRetryTask = null;

  private A11yFocusService() {
  }

  public static A11yFocusService getInstance() {
    if (instance == null) {
      synchronized (A11yFocusService.class) {
        if (instance == null) {
          instance = new A11yFocusService();
        }
      }
    }
    return instance;
  }

  @Nullable
  private ViewGroup getStoredView() {
    return viewRef.get();
  }

  public void requestFocus(@NonNull ViewGroup targetView) {
    requestFocus(targetView, DEFAULT_DELAY);
  }

  public void requestFocus(@NonNull ViewGroup targetView, int delay) {
    cancelPendingRetry();
    lock = true;
    storeViewReference(targetView);
    attemptFocus(delay);
  }

  public void simpleFocus(@NonNull ViewGroup targetView) {
    cancelPendingRetry();
    lock = true;
    storeViewReference(targetView);

    View accessibleView = A11yHelper.findFirstAccessible(targetView);
    A11yHelper.focus(accessibleView);
  }

  public void onFocused(@Nullable View view) {
    ViewGroup currentView = getStoredView();
    if (currentView != null && currentView == view) {
      lock = true;
      cancelPendingRetry();
    }
  }

  private void storeViewReference(ViewGroup targetView) {
    viewRef = new WeakReference<>(targetView);
  }

  private void cancelPendingRetry() {
    pendingRetryTask = null;
  }

  private void attemptFocus(int delay) {
    lock = false;
    ViewGroup targetViewGroup = getStoredView();
    if (targetViewGroup == null) return;

    View accessibleView = A11yHelper.findFirstAccessible(targetViewGroup);
    if (accessibleView != null) {
      attemptFocusRetry(accessibleView, DEFAULT_RETRIES, delay);
    }
  }

  private void attemptFocusRetry(@NonNull View targetView, int retries, int delay) {
    if (retries <= 0 || shouldAbortFocus(targetView)) return;
    cancelPendingRetry();

    ViewGroup storedView = getStoredView();
    if (storedView == null || A11yHelper.isFocused(storedView)) {
      lock = true;
      return;
    }

    pendingRetryTask = () -> {
      if (lock) return;

      Log.d("AUTO_FOCUS_FEATURE_RETRY", "Retrying focus for view ID: " + targetView.getId() + " | Retries left: " + retries + " | Delay: " + delay);

      focusOnPost(targetView);
      attemptFocusRetry(targetView, retries - 1, delay);
    };

    targetView.postDelayed(pendingRetryTask, delay);
  }

  private void focusOnPost(@NonNull View targetView) {
    if (shouldAbortFocus(targetView)) return;

    Log.d("AUTO_FOCUS_FEATURE", "Focusing view ID: " + targetView.getId());

    targetView.post(() -> {
      if (shouldAbortFocus(targetView)) return;
      A11yHelper.focus(targetView);
    });
  }

  private boolean shouldAbortFocus(@NonNull View targetView) {
    return lock || A11yHelper.isFocused(targetView);
  }
}
