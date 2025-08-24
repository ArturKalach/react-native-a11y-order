package com.a11yorder.utils;

import android.view.Choreographer;
import androidx.annotation.Nullable;

public class ChoreographerUtils {

  public static void run(@Nullable Runnable task) {
    runAfterFrames(2, task);
  }
  public static void runAfterFrames(int frameCount, @Nullable Runnable task) {
    if (frameCount <= 0 || task == null) {
      return;
    }

    Choreographer choreographer = Choreographer.getInstance();

    Choreographer.FrameCallback frameCallback = new Choreographer.FrameCallback() {
      private int frameCounter = frameCount;

      @Override
      public void doFrame(long frameTimeNanos) {
        frameCounter--;
        if (frameCounter <= 0) {
          task.run();
        } else {
          choreographer.postFrameCallback(this);
        }
      }
    };

    choreographer.postFrameCallback(frameCallback);
  }
}
