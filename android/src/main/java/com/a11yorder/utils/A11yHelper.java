package com.a11yorder.utils;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;

import androidx.annotation.Nullable;
import androidx.core.view.ViewCompat;

public class A11yHelper {
  public static boolean isAccessible(@Nullable View view) {
    return view != null && ViewCompat.isImportantForAccessibility(view);
  }

  public static View findFirstAccessible(@Nullable ViewGroup viewGroup, boolean ignoreRoot) {
    if (viewGroup == null) {
      return null;
    }

    if(!ignoreRoot && isAccessible(viewGroup)) {
      return viewGroup;
    }

    for (int i = 0; i < viewGroup.getChildCount(); i++) {
      View child = viewGroup.getChildAt(i);
      if (isAccessible(child)) {
        return child;
      }

      if (child instanceof ViewGroup) {
        View accessibleChild = findFirstAccessible((ViewGroup) child, true);
        if (accessibleChild != null) {
          return accessibleChild;
        }
      }
    }

    return null;
  }

  public static View findFirstAccessible(@Nullable ViewGroup viewGroup) {
      return findFirstAccessible(viewGroup, false);
  }

  public static boolean isFocused(@Nullable View view) {
    if(view == null) return false;
    return view.isAccessibilityFocused();
  }

  private static void baseFocus (@Nullable View view) {
    if(view != null) {
      view.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
    }
  }

  public static void focus(@Nullable View view) {
    if(view == null || isFocused(view)) return;
    ChoreographerUtils.run(() -> baseFocus(view));
  }

  public static boolean isA11yServiceEnabled(Context context) {
    AccessibilityManager accessibilityManager =
      (AccessibilityManager) context.getSystemService(Context.ACCESSIBILITY_SERVICE);

    if (accessibilityManager == null) {
      return false;
    }

    return accessibilityManager.isEnabled() && accessibilityManager.isTouchExplorationEnabled();
  }
}
