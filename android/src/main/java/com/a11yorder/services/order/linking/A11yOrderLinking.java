package com.a11yorder.services.order.linking;


import android.view.View;

import java.util.HashMap;
import java.util.Map;

public class A11yOrderLinking {

  private static A11yOrderLinking instance;
  private final Map<String, A11yLinkingQueue> relationships;

  private A11yOrderLinking() {
    relationships = new HashMap<>();
  }

  public static synchronized A11yOrderLinking getInstance() {
    if (instance == null) {
      instance = new A11yOrderLinking();
    }
    return instance;
  }
  public void addViewRelationship(View view, String key, int position) {
    A11yLinkingQueue queue = relationships.get(key);

    if (queue == null) {
      queue = new A11yLinkingQueue();
      relationships.put(key, queue);
    }

    queue.addPosition(view, position);
  }


  public void removeRelationship(String key, int index) {
    A11yLinkingQueue queue = relationships.get(key);
    if (queue == null) return;

    queue.removeFromOrder(index);
    if(queue.isEmpty()) {
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
