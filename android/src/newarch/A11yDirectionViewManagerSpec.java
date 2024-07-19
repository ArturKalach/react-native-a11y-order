package com.a11yorder;
import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yDirectionViewManagerInterface;
import com.facebook.react.viewmanagers.A11yOrderViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yOrderViewManagerInterface;

public abstract class A11yDirectionViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements A11yDirectionViewManagerInterface<T> {
  private final ViewManagerDelegate<T> mDelegate;

  public A11yDirectionViewManagerSpec() {
    mDelegate = new A11yOrderViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
