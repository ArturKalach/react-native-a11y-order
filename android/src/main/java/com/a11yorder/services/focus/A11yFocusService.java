package com.a11yorder.services.focus;

import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.a11yorder.utils.A11yHelper;

import java.lang.ref.WeakReference;

public final class A11yFocusService {
  private static final int DEFAULT_DELAY = 300;
  private static final int DEFAULT_RETRIES = 3;

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

  public void requestFocus(@NonNull ViewGroup targetView, int delay, int times) {
    cancelPendingRetry();
    lock = true;
    storeViewReference(targetView);
    attemptFocus(delay, times);
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

  private void attemptFocus(int delay, int retry) {
    lock = false;
    attemptFocusRetry(retry, delay);
  }

  private void attemptFocus(int delay) {
    this.attemptFocus(delay, DEFAULT_RETRIES);
  }

  // The target can still be unmeasured when the command arrives (first frame of a
  // Modal window), so resolve the accessible view on every attempt instead of once
  // up front — otherwise a null on the first look cancels the whole request.
  private void attemptFocusRetry(int retries, int delay) {
    if (retries <= 0 || lock) return;
    cancelPendingRetry();

    ViewGroup storedView = getStoredView();
    if (storedView == null) return;

    if (A11yHelper.isFocused(storedView) || A11yHelper.isFocused(resolveTarget())) {
      lock = true;
      return;
    }

    pendingRetryTask = () -> {
      if (lock) return;

      focusOnPost();
      attemptFocusRetry(retries - 1, delay);
    };

    storedView.postDelayed(pendingRetryTask, delay);
  }

  @Nullable
  private View resolveTarget() {
    return A11yHelper.findFirstAccessible(getStoredView());
  }

  private void focusOnPost() {
    ViewGroup storedView = getStoredView();
    if (storedView == null || lock) return;

    storedView.post(() -> {
      View targetView = resolveTarget();
      if (targetView == null || shouldAbortFocus(targetView)) return;
      A11yHelper.focus(targetView);
    });
  }

  private boolean shouldAbortFocus(@NonNull View targetView) {
    return lock || A11yHelper.isFocused(targetView);
  }
}
