package com.a11yorder;

import com.facebook.react.viewmanagers.A11yIndexViewManagerInterface;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.views.view.ReactViewManager;

public abstract class A11yIndexViewManagerSpec<T extends ReactViewGroup> extends ReactViewManager implements A11yIndexViewManagerInterface<T> {
}
