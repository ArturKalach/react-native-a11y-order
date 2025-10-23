package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.viewmanagers.A11yViewManagerInterface;
import com.facebook.react.views.view.ReactViewManager;

import javax.annotation.Nullable;

public abstract class A11yViewSpec<T extends ViewGroup> extends ReactViewManager implements A11yViewManagerInterface<T> {
  public abstract void receiveCommand(T view, String commandId, @Nullable ReadableArray args);
}
