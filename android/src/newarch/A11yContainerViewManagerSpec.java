package com.a11yorder;

import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.viewmanagers.A11yContainerViewManagerInterface;
public abstract class A11yContainerViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements A11yContainerViewManagerInterface<T> {
}
