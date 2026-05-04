package com.a11yorder.services.order;

import android.view.View;
import android.view.ViewGroup;

import com.a11yorder.services.order.linking.A11yOrderLinking;
import com.a11yorder.utils.A11yHelper;

import java.lang.ref.WeakReference;
import java.util.Objects;

public class A11yOrderService {
  public static final int ORDER_FOCUS_TYPE_DEFAULT = 0;
  public static final int ORDER_FOCUS_TYPE_CHILD = 1;
  public static final int ORDER_FOCUS_TYPE_LEGACY = 2;

  private final ViewGroup delegate;
  private String orderKey;
  private Integer index;
  private int focusType = ORDER_FOCUS_TYPE_DEFAULT;
  private WeakReference<View> orderViewRef;
  private boolean isLinked = false;

  public A11yOrderService(ViewGroup delegate) {
    this.delegate = delegate;
  }

  // ─── Accessors ────────────────────────────────────────────────────────────

  public View getStoredView() {
    return orderViewRef != null ? orderViewRef.get() : null;
  }

  public View getFocusView() {
    switch (focusType) {
      case ORDER_FOCUS_TYPE_LEGACY: {
        View stored = getStoredView();
        return stored != null ? stored : delegate.getChildAt(0);
      }
      case ORDER_FOCUS_TYPE_CHILD:
        return A11yHelper.findFirstAccessible(delegate, true);
      default:
        return delegate;
    }
  }

  // ─── Prop setters ─────────────────────────────────────────────────────────

  public void setIndex(int index) {
    if (this.index != null && this.index.equals(index)) return;
    boolean isFirstSet = this.index == null;
    this.index = index;
    if (isFirstSet) {
      // Both props may now be ready for the first time — attempt registration.
      register();
    } else if (isLinked) {
      refresh();
    }
  }

  public void setOrderKey(String newKey) {
    if (Objects.equals(this.orderKey, newKey)) return;
    if (isLinked) unregister();
    this.orderKey = newKey;
    register();
  }

  public void setFocusType(int focusType) {
    int prev = this.focusType;
    this.focusType = focusType;
    if (isLinked && prev != focusType) {
      refresh();
    }
  }

  // ─── Registration ─────────────────────────────────────────────────────────

  private boolean isReady() {
    return orderKey != null && index != null;
  }

  private void register() {
    if (!isReady() || isLinked) return;
    View target = getFocusView();
    if (target != null) {
      A11yOrderLinking.getInstance().addViewRelationship(target, orderKey, index);
      isLinked = true;
    }
  }

  private void unregister() {
    if (orderKey != null && index != null) {
      A11yOrderLinking.getInstance().removeRelationship(orderKey, index);
    }
    isLinked = false;
  }

  private void refresh() {
    if (!isReady()) return;
    View target = getFocusView();
    if (target != null) {
      A11yOrderLinking.getInstance().refreshIndexes(target, orderKey, index);
    }
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  public void link(View child) {
    if (orderViewRef != null && orderViewRef.get() != null) return;
    orderViewRef = new WeakReference<>(child);
    register();
  }

  public void attach() {
    if (!isReady() || isLinked) return;
    View child = delegate.getChildAt(0);
    if (child != null) link(child);
  }

  public void clear(View child) {
    if (orderViewRef != null && orderViewRef.get() == child) {
      orderViewRef.clear();
      orderViewRef = null;
    }
    unregister();
  }

  public void detach() {
    if (orderViewRef != null) {
      orderViewRef.clear();
      orderViewRef = null;
    }
    unregister();
  }
}
