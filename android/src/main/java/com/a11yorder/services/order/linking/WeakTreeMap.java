package com.a11yorder.services.order.linking;

import android.view.View;

import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.NavigableMap;
import java.util.Set;
import java.util.TreeMap;

public class WeakTreeMap {
  public NavigableMap<Integer, WeakReference<View>> viewMap = new TreeMap<>();

  public static View unwrapViewRef(Map. Entry<Integer, WeakReference<View>> viewRef) {
    if(viewRef == null || viewRef.getValue() == null) return null;
    return viewRef.getValue().get();
  }

  public View getNext (int position) {
    Map.Entry<Integer, WeakReference<View>> view = viewMap.higherEntry(position);
    if(view == null || view.getValue() == null) return null;
    return view.getValue().get();
  }

  public View getPrev (int position) {
    Map.Entry<Integer, WeakReference<View>> view = viewMap.lowerEntry(position);
    if(view == null || view.getValue() == null) return null;
    return view.getValue().get();
  }

  public WeakReference<View> put (int position, View view) {
   return viewMap.put(position, new WeakReference<>(view));
  }

  public View last () {
    Map.Entry<Integer, WeakReference<View>> lastView = viewMap.lastEntry();
    if(lastView == null || lastView.getValue() == null) return null;
    return lastView.getValue().get();
  }

  public void remove (int position) {
    this.viewMap.remove(position);
  }

  public View get (int position) {
    WeakReference<View> viewRef = this.viewMap.get(position);
    if(viewRef == null) return null;
    return viewRef.get();
  }

  public Set<Map.Entry<Integer, WeakReference<View>>> entrySet() {
    return this.viewMap.entrySet();
  }

  public boolean containsKey(int position) {
    return this.viewMap.containsKey(position);
  }

  public boolean isEmpty() {
    return this.viewMap.isEmpty();
  }
}
