package com.a11yorder.views.A11yIndexView;

import android.content.Context;
import android.view.View;

import com.a11yorder.services.AccessibilityUtils;
import com.a11yorder.views.A11yIndexView.Linking.A11yOrderLinking;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yIndexView extends ReactViewGroup {
  public static final int ORDER_FOCUS_TYPE_DEFAULT = 0;
  public static final int ORDER_FOCUS_TYPE_CHILD = 1;
  public static final int ORDER_FOCUS_TYPE_LEGACY = 2;

  public A11yIndexView(Context context) {
    super(context);
  }

  private Integer index;
  private String orderKey;
  private View firstChild;
  private boolean isLinked = false;

  private Integer focusType = ORDER_FOCUS_TYPE_DEFAULT;

  private View getFocusView(View firstChild) {
    if ((focusType == ORDER_FOCUS_TYPE_LEGACY) && firstChild != null) {
      return firstChild;
    }
    if (focusType == ORDER_FOCUS_TYPE_DEFAULT) {
      return this;
    }

    if (focusType == ORDER_FOCUS_TYPE_CHILD) {
      return AccessibilityUtils.findFirstAccessibleElement(this);
    }

    return null;
  }

  public void setIndex(int index) {
    if (this.index == null) {
      this.index = index;
    } else {
      this.index = index;
      View view = getFocusView(firstChild);
      if (orderKey != null && view != null) {
        A11yOrderLinking.getInstance().refreshIndexes(view, orderKey, index);
      }
    }
  }

  public void setOrderKey(String orderKey) {
    this.orderKey = orderKey;
  }

  private void linkViews(boolean removeFromOrderQueue) {
    if (orderKey != null && index != null && !removeFromOrderQueue) {
      View view = getFocusView(firstChild);
      if (view != null) {
        A11yOrderLinking.getInstance().addViewRelationship(view, orderKey, index);
        isLinked = true;
      }
    }
    if (removeFromOrderQueue && orderKey != null && index != null) {
      A11yOrderLinking.getInstance().removeRelationship(orderKey, index);
      isLinked = false;
    }
  }

  public void linkAddView(View child) {
    if (firstChild == null) {
      firstChild = child;
      linkViews(false);
    }
  }

  public void setOrderFocusType(int focusType) {
    int prevFocusType = this.focusType;
    this.focusType = focusType;

    if (isLinked && prevFocusType != focusType) {
      View view = getFocusView(firstChild);
      if (index != null && orderKey != null && view != null) {
        A11yOrderLinking.getInstance().refreshIndexes(view, orderKey, index);
      }
    }
  }

  public void linkRemoveView(View view) {
    if (view == firstChild) {
      firstChild = null;
      linkViews(true);
    }
  }
}
