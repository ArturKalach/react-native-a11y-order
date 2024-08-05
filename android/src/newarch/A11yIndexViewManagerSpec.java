package com.a11yorder;

import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yIndexViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yIndexViewManagerInterface;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yIndexViewManagerSpec<T extends ReactViewGroup> extends ReactViewManager implements A11yIndexViewManagerInterface<T> {
//
//  private final ViewManagerDelegate<T> mDelegate;
//
//  public A11yIndexViewManagerSpec() {
//    mDelegate = new A11yIndexViewManagerDelegate(this);
//  }
//
//  @Nullable
//  @Override
//  protected ViewManagerDelegate<T> getDelegate() {
//    return mDelegate;
//  }
}
