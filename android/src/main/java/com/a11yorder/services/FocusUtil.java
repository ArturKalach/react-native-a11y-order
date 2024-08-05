package com.a11yorder.services;

import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.accessibility.AccessibilityEvent;

public class FocusUtil {
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
}
