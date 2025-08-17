package com.a11yorder.services;

import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class AccessibilityUtils {

  public static View findFirstAccessibleElement(ViewGroup viewGroup) {
    if (viewGroup == null) {
      return null;
    }

    for (int i = 0; i < viewGroup.getChildCount(); i++) {
      View child = viewGroup.getChildAt(i);
      if (isAccessibleView(child)) {
        return child;
      }

      if (child instanceof ViewGroup) {
        View accessibleChild = findFirstAccessibleElement((ViewGroup) child);
        if (accessibleChild != null) {
          return accessibleChild;
        }
      }
    }

    return null;
  }

  public static void focus(ViewGroup viewGroup) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if (viewGroup.isImportantForAccessibility()) {
        viewGroup.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
      } else {
        View child = viewGroup.getChildAt(0);
        if (child != null && child.isImportantForAccessibility()) {
          child.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
        }
      }
    } else {
      viewGroup.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
    }
  }

  private static boolean isAccessibleView(View view) {
    return view != null && view.isFocusable() && view.getVisibility() == View.VISIBLE;
  }

  public static void runOnFirstAccessibilityFocus(@NonNull final View rootView, @NonNull final Runnable onFocusAction) {
    rootView.setAccessibilityDelegate(new View.AccessibilityDelegate() {
      private boolean hasAlreadyRun = false;

      @Override
      public boolean onRequestSendAccessibilityEvent(@Nullable final ViewGroup host, @Nullable final View child, @Nullable final AccessibilityEvent event) {
        if (!hasAlreadyRun && event != null && event.getEventType() == AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED) {
          hasAlreadyRun = true;
          rootView.setAccessibilityDelegate(null);
          onFocusAction.run();
        }
        return super.onRequestSendAccessibilityEvent(host, child, event);
      }
    });
  }
}
