package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.viewmanagers.A11yPaneTitleManagerInterface;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yPaneTitleSpec<T extends ViewGroup> extends ReactViewManager implements A11yPaneTitleManagerInterface<T> {
}
