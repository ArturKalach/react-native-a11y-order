package com.a11yorder;

import com.a11yorder.views.A11yLockView.A11yLockView;
import com.facebook.react.viewmanagers.A11yLockManagerInterface;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yLockViewManagerSpec<T extends ReactViewGroup> extends ReactViewManager implements A11yLockManagerInterface<T> {
    public abstract void setComponentType(T view, int value);
    public abstract void setContainerKey(T view, String value);
}

