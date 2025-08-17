package com.a11yorder;

import android.view.ViewGroup;

import com.a11yorder.views.A11yView.A11yView;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.viewmanagers.RNAOA11yContainerViewManagerInterface;

import javax.annotation.Nullable;

public abstract class A11yContainerViewManagerSpec<T extends ViewGroup> extends ViewGroupManager<T> implements RNAOA11yContainerViewManagerInterface<T> {
}
