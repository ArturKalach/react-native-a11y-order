package com.a11yorder;

import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yIndexViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yIndexViewManagerInterface;
import com.facebook.soloader.SoLoader;

public abstract class A11yIndexViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements A11yIndexViewManagerInterface<T> {

  private final ViewManagerDelegate<T> mDelegate;

  public A11yIndexViewManagerSpec() {
    mDelegate = new A11yIndexViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
