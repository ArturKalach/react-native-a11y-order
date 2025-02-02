package com.a11yorder;

import android.view.ViewGroup;

import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yOrderViewManagerDelegate;
import com.facebook.react.viewmanagers.A11yOrderViewManagerInterface;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yOrderViewManagerSpec<T extends ViewGroup> extends ReactViewManager implements A11yOrderViewManagerInterface<T> {
}
