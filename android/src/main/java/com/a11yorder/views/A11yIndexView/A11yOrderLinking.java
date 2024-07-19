package com.a11yorder.views.A11yIndexView;

import android.os.Build;
import android.view.View;

import java.util.HashMap;
import java.util.Map;
import java.util.NavigableMap;
import java.util.NavigableSet;
import java.util.Objects;
import java.util.TreeMap;
import java.util.TreeSet;

public class A11yOrderLinking {
  private class OrderLinkingQueue {
    public NavigableSet<Integer> positions = new TreeSet<>();
    public NavigableMap<Integer, View> viewMap = new TreeMap<>();


    private void linkPosition(View prev, View next) {
      if(prev != null && next != null) {
        prev.setNextFocusForwardId(next.getId());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
          prev.setAccessibilityTraversalBefore(next.getId());
        }
      }
    }
    private void addWithLinking(int position, View currentView) {
      viewMap.put(position, currentView);
      Map.Entry<Integer, View> nextView = viewMap.higherEntry(position);
      Map.Entry<Integer, View> prevView = viewMap.lowerEntry(position);

      if(prevView != null) {
        this.linkPosition(prevView.getValue(), currentView);
      }

      if(nextView != null) {
        this.linkPosition(currentView, nextView.getValue());
      }
    }

    private void unlinkLast() {
      Map.Entry<Integer, View> lastView = viewMap.lastEntry();
      if(lastView != null) {
        lastView.getValue().setNextFocusForwardId(View.NO_ID);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
          lastView.getValue().setAccessibilityTraversalBefore(View.NO_ID);
        }
      }
    }


    private void reLinkWithRemove(int position) {
      Map.Entry<Integer, View> nextView = viewMap.higherEntry(position);
      Map.Entry<Integer, View> prevView = viewMap.lowerEntry(position);

      if (prevView != null && nextView != null) {
        this.linkPosition(prevView.getValue(), nextView.getValue());
      }


      boolean shouldUnlinkLast = nextView == null;
      this.viewMap.remove(position);

      if(shouldUnlinkLast) {
        this.unlinkLast();
      }
    }

    public void addPosition(View view, int position) {
      if(this.viewMap.get(position) == view) {
        return;
      }

      this.addWithLinking(position, view);
    }

    public void removeFromOrder(int position) {
      if(!this.positions.contains(position)) return;
      this.reLinkWithRemove(position);
    }

    public void refreshIndexes(View view, int position) {
      this.viewMap.put(position, view);

      for (Map.Entry<Integer, View> positionEntry : this.viewMap.entrySet()) {
        if(positionEntry != null) {
          View currentView = positionEntry.getValue();
          Map.Entry<Integer, View> nextEntry = this.viewMap.higherEntry(positionEntry.getKey());

          if(nextEntry != null) {
            linkPosition(currentView, nextEntry.getValue());
          }
        }
      }

      unlinkLast();
    }
  }
  private static A11yOrderLinking instance;
  private final Map<String, OrderLinkingQueue> relationships;

  private A11yOrderLinking() {
    relationships = new HashMap<>();
  }

  public static synchronized A11yOrderLinking getInstance() {
    if (instance == null) {
      instance = new A11yOrderLinking();
    }
    return instance;
  }

  public void refreshIndexes(View view, String key, int position) {
    OrderLinkingQueue queue = relationships.get(key);
    if(queue != null) {
      queue.refreshIndexes(view, position);
    }
  }

  public void addViewRelationship(View view, String key, int position) {
    OrderLinkingQueue queue = relationships.get(key);
    if(queue == null) {
      queue = new OrderLinkingQueue();
      relationships.put(key, queue);
    }

    queue.addPosition(view, position);
  }


  public void removeRelationship(String key, int index) {
    OrderLinkingQueue queue = relationships.get(key);
    if(queue == null) return;

    queue.removeFromOrder(index);
  }
}
