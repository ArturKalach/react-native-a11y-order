package com.a11yorder.services.order;

import android.view.View;
import android.view.ViewGroup;

import com.a11yorder.services.order.linking.A11yOrderLinking;
import com.a11yorder.utils.A11yHelper;

import java.lang.ref.WeakReference;

public class A11yOrderService {
  public static final int ORDER_FOCUS_TYPE_DEFAULT = 0;
  public static final int ORDER_FOCUS_TYPE_CHILD = 1;
  public static final int ORDER_FOCUS_TYPE_LEGACY = 2;
  private final ViewGroup delegate;
  public String orderKey;
  private Integer index;
  private Integer focusType = ORDER_FOCUS_TYPE_DEFAULT;
  private WeakReference<View> orderViewRef;
  private boolean isLinked = false;

  public A11yOrderService(ViewGroup delegate) {
    this.delegate = delegate;
  }

  public View getStoredView() {
    return orderViewRef != null ? orderViewRef.get() : null;
  }

  public View getFocusView() {
    if (focusType == ORDER_FOCUS_TYPE_LEGACY) {
      if (orderViewRef != null && orderViewRef.get() != null) {
        return orderViewRef.get();
      }

      return delegate.getChildAt(0);
    }

    if (focusType == ORDER_FOCUS_TYPE_DEFAULT) {
      return delegate;
    }

    if (focusType == ORDER_FOCUS_TYPE_CHILD) {
      return A11yHelper.findFirstAccessible(delegate, true);
    }

    return null;
  }

  public void setIndex(int index) {
    boolean hasBeenChanged = this.index != null;

    this.index = index;
    if (hasBeenChanged) {
      this.refresh();
    }
  }

  public void setFocusType(int focusType) {
    int prevFocusType = this.focusType;
    this.focusType = focusType;

    if (isLinked && prevFocusType != focusType) {
      this.refresh();
    }
  }

  public boolean getIsReady() {
    return orderKey != null && index != null;
  }

  public void link(View view) {
    if (orderViewRef == null || orderViewRef.get() == null) {
      orderViewRef = new WeakReference<>(view);

      if (!this.getIsReady()) return;

      View target = getFocusView();
      if (target != null) {
        A11yOrderLinking.getInstance().addViewRelationship(target, orderKey, index);
        isLinked = true;
      }
    }
  }

  public void refresh() {
    if (!getIsReady()) return;

    View view = getFocusView();
    if (view != null) {
      A11yOrderLinking.getInstance().refreshIndexes(view, orderKey, index);
    }
  }

  public void clear(View view) {
    if (orderViewRef != null && orderViewRef.get() == view) {
      orderViewRef.clear();
      orderViewRef = null;
    }

    this.remove();
  }

  public void detach() {
    if (orderViewRef != null) {
      orderViewRef.clear();
      orderViewRef = null;
    }

    this.remove();
  }

  private void remove() {
    if (orderKey != null && index != null) {
      A11yOrderLinking.getInstance().removeRelationship(orderKey, index);
    }

    isLinked = false;
  }


  public void attach() {
    if (!getIsReady() || isLinked) return;

    View child = delegate.getChildAt(0);
    if (child == null) return;

    this.link(child);
  }
}
