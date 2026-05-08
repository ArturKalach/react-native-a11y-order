package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.viewmanagers.A11yCardViewManagerInterface;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yCardViewManagerSpec<T extends ViewGroup> extends ReactViewManager implements A11yCardViewManagerInterface<T> {
}
