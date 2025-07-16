package com.a11yorder.views.A11yIndexView;

import android.content.Context;
import android.view.View;

import com.a11yorder.services.AccessibilityUtils;
import com.a11yorder.views.A11yIndexView.Linking.A11yOrderLinking;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yIndexView extends ReactViewGroup {
  public A11yIndexView(Context context) {
    super(context);
  }
  private Integer index;
  private String orderKey;
  private View firstChild;

  private int focusType = 0;

  private View getFocusView(View firstChild) {
    if((focusType == 3 || focusType == 0) && firstChild != null) {
      return firstChild;
    }
    if(focusType == 1) {
      return this;
    }

    if(focusType == 2) {
      return AccessibilityUtils.findFirstAccessibleElement(this);
    }

    return null;
  }

  public void setIndex(int index) {
    if(this.index == null) {
      this.index = index;
    } else {
      this.index = index;
      View view = getFocusView(firstChild);
      if(orderKey != null && view != null) {
        A11yOrderLinking.getInstance().refreshIndexes(firstChild, orderKey, index);
      }
    }
  }

  public void setOrderKey(String orderKey) {
    this.orderKey = orderKey;
  }

  private void linkViews (boolean removeFromOrderQueue) {
    if(orderKey != null && index != null && !removeFromOrderQueue) {
      View view = getFocusView(firstChild);
      if(view != null) {
        A11yOrderLinking.getInstance().addViewRelationship(view, orderKey, index);
      }
    }
    if(removeFromOrderQueue && orderKey != null && index != null) {
      A11yOrderLinking.getInstance().removeRelationship(orderKey, index);
    }
  }

  public void linkAddView(View child) {
    if(firstChild == null) {
      firstChild = child;
      linkViews(false);
    }
  }

  @Override
  public void setImportantForAccessibility(int mode) {
    if(focusType == 1) {
      super.setImportantForAccessibility(IMPORTANT_FOR_ACCESSIBILITY_YES);
    } else {
      super.setImportantForAccessibility(mode);
    }
  }

  public void setOrderFocusType(int focusType) {
    this.focusType = focusType;
    if(focusType == 1) {
      this.setImportantForAccessibility(IMPORTANT_FOR_ACCESSIBILITY_YES);
    }
  }

  public void linkRemoveView(View view) {
    if(view == firstChild) {
      firstChild = null;
      linkViews(true);
    }
  }
}
