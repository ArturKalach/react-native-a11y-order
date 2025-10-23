package com.a11yorder.events;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.HashMap;
import java.util.Map;

public class EventHelper {
  public static void screenReaderFocusChanged(ReactContext context, int id, boolean hasFocus) {
    int surfaceId = UIManagerHelper.getSurfaceId(context);
    ScreenReaderFocusEvent event = new ScreenReaderFocusEvent(surfaceId, id, hasFocus);
    EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(context, id);
    if (eventDispatcher != null) {
      eventDispatcher.dispatchEvent(event);
    }
  }

  public static Map<String, Object> buildDirectEventMap(String registrationName) {
    Map<String, Object> eventMap = new HashMap<>();
    eventMap.put("registrationName", registrationName);
    return eventMap;
  }
}
