package com.a11yorder.events;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.Event;

import java.util.HashMap;
import java.util.Map;

public class EventHelper {
  private static <T extends Event<T>> void dispatchEventIfPossible(ReactContext context, int id, T event) {
    EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(context, id);
    if (eventDispatcher != null) {
      eventDispatcher.dispatchEvent(event);
    }
  }

  public static void screenReaderFocusChanged(ReactContext context, int id, boolean hasFocus) {
    int surfaceId = UIManagerHelper.getSurfaceId(context);
    ScreenReaderFocusChangedEvent event = new ScreenReaderFocusChangedEvent(surfaceId, id, hasFocus);
    dispatchEventIfPossible(context, id, event);
  }

  public static void screenReaderFocused(ReactContext context, int id) {
    int surfaceId = UIManagerHelper.getSurfaceId(context);
    ScreenReaderFocusedEvent event = new ScreenReaderFocusedEvent(surfaceId, id);
    dispatchEventIfPossible(context, id, event);
  }

  public static void screenReaderDescendantFocusChanged(ReactContext context, int id, String status, String nativeId) {
    int surfaceId = UIManagerHelper.getSurfaceId(context);
    ScreenReaderDescendantFocusChangedEvent event = new ScreenReaderDescendantFocusChangedEvent(surfaceId, id, status, nativeId);
    dispatchEventIfPossible(context, id, event);
  }

  public static Map<String, Object> buildDirectEventMap(String registrationName) {
    Map<String, Object> eventMap = new HashMap<>();
    eventMap.put("registrationName", registrationName);
    return eventMap;
  }
}
