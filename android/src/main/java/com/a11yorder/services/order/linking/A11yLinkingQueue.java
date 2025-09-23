package com.a11yorder.services.order.linking;

import android.os.Build;
import android.view.View;

import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.NavigableSet;
import java.util.TreeSet;

public class A11yLinkingQueue {
  public WeakTreeMap viewMap = new WeakTreeMap();


  private void linkPosition(View prev, View next) {
    if (prev != null && next != null) {
      prev.setNextFocusForwardId(next.getId());
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
        prev.setAccessibilityTraversalBefore(next.getId());
      }
    }
  }

  private void addWithLinking(int position, View currentView) {
    viewMap.put(position, currentView);
    View nextView = viewMap.getNext(position);
    View prevView = viewMap.getPrev(position);

    if (prevView != null) {
      this.linkPosition(prevView, currentView);
    }

    if (nextView != null) {
      this.linkPosition(currentView, nextView);
    }
  }

  private void unlinkLast() {
    View lastView = viewMap.last();
    if (lastView != null) {
      lastView.setNextFocusForwardId(View.NO_ID);
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
        lastView.setAccessibilityTraversalBefore(View.NO_ID);
      }
    }
  }

  private void reLinkWithRemove(int position) {
    View nextView = viewMap.getNext(position);
    View prevView = viewMap.getPrev(position);

    if (prevView != null && nextView != null) {
      this.linkPosition(prevView, nextView);
    }

    boolean shouldUnlinkLast = nextView == null;
    this.viewMap.remove(position);

    if (shouldUnlinkLast) {
      this.unlinkLast();
    }
  }

  public void addPosition(View view, int position) {
    if (this.viewMap.get(position) == view) return;
    this.addWithLinking(position, view);
  }

  public void removeFromOrder(int position) {
    if (!this.viewMap.containsKey(position)) return;
    this.reLinkWithRemove(position);
  }

  public void refreshIndexes(View view, int position) {
    this.viewMap.put(position, view);

    for (Map.Entry<Integer, WeakReference<View>> positionEntry : this.viewMap.entrySet()) {
      View currentView = WeakTreeMap.unwrapViewRef(positionEntry);
      if (currentView != null) {
        View nextEntry = this.viewMap.getNext(positionEntry.getKey());

        if (nextEntry != null) {
          linkPosition(currentView, nextEntry);
        }
      }
    }

    unlinkLast();
  }

  public boolean isEmpty () {
    return this.viewMap.isEmpty();
  }
}
