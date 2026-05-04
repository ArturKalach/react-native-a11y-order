package com.a11yorder.services.order.linking;

import android.view.View;

import java.util.HashMap;
import java.util.Map;

public class A11yOrderLinking {
  private static A11yOrderLinking instance;
  private final Map<String, A11yLinkingQueue> relationships = new HashMap<>();

  private A11yOrderLinking() {}

  public static synchronized A11yOrderLinking getInstance() {
    if (instance == null) {
      instance = new A11yOrderLinking();
    }
    return instance;
  }

  private A11yLinkingQueue getOrCreateQueue(String key) {
    A11yLinkingQueue queue = relationships.get(key);
    if (queue == null) {
      queue = new A11yLinkingQueue();
      relationships.put(key, queue);
    }
    return queue;
  }

  public void addViewRelationship(View view, String key, int position) {
    getOrCreateQueue(key).addPosition(view, position);
  }

  public void removeRelationship(String key, int position) {
    A11yLinkingQueue queue = relationships.get(key);
    if (queue == null) return;
    queue.removeFromOrder(position);
    if (queue.isEmpty()) {
      relationships.remove(key);
    }
  }

  public void refreshIndexes(View view, String key, int position) {
    A11yLinkingQueue queue = relationships.get(key);
    if (queue != null) {
      queue.refreshIndexes(view, position);
    }
  }
}
