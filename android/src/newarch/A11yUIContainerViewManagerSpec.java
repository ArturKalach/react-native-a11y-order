package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.viewmanagers.A11yUIContainerManagerInterface;
public abstract class A11yUIContainerViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements A11yUIContainerManagerInterface<T> {
}
