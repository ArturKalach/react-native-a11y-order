package com.a11yorder.views.A11yIndexView;

import android.content.Context;
import android.view.View;

import com.a11yorder.views.A11yIndexView.Linking.A11yOrderLinking;
import com.facebook.react.views.view.ReactViewGroup;

public class A11yIndexView extends ReactViewGroup {
  public A11yIndexView(Context context) {
    super(context);
  }
  private Integer index;
  private String orderKey;
  private View firstChild;


  public void setIndex(int index) {
    if(this.index == null) {
      this.index = index;
    } else {
      this.index = index;
      if(firstChild != null && orderKey != null) {
        A11yOrderLinking.getInstance().refreshIndexes(firstChild, orderKey, index);
      }
    }
  }

  public void setOrderKey(String orderKey) {
    this.orderKey = orderKey;
  }

  private void linkViews (boolean removeFromOrderQueue) {
    if(firstChild != null && orderKey != null && index != null && !removeFromOrderQueue) {
      A11yOrderLinking.getInstance().addViewRelationship(firstChild, orderKey, index);
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

  public void linkRemoveView(View view) {
    if(view == firstChild) {
      firstChild = null;
      linkViews(true);
    }
  }
}
