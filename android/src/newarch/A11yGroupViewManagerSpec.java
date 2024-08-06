package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.viewmanagers.A11yGroupViewManagerInterface;

public abstract class A11yGroupViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements A11yGroupViewManagerInterface<T> {
}
