package com.a11yorder.utils;

import android.app.Activity;
import android.view.View;
import android.view.animation.Animation;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;

public class FragmentUtils {

  public static void waitForAnimationEnd(@NonNull Animation animation, @NonNull Runnable onAnimationEnd) {
    animation.setAnimationListener(new Animation.AnimationListener() {
      @Override
      public void onAnimationStart(Animation animation) {
      }

      @Override
      public void onAnimationEnd(Animation animation) {
        onAnimationEnd.run();
      }

      @Override
      public void onAnimationRepeat(Animation animation) {
      }
    });
  }

  public static void waitForFragmentAnimation (@NonNull Fragment fragment, @NonNull Runnable onReady) {
    View fragmentView = fragment.getView();
    if (fragmentView != null) {
      Animation fragmentAnimation = fragmentView.getAnimation();
      if (fragmentAnimation != null) {
        waitForAnimationEnd(fragmentAnimation, onReady);
      } else {
        onReady.run();
      }
    }
  }

  public static void waitForFragment(Activity activity, Fragment current, @NonNull Runnable onReady) {
    if (!(activity instanceof FragmentActivity)) {
      return;
    }

    FragmentManager fragmentManager = ((FragmentActivity) activity).getSupportFragmentManager();
    fragmentManager.registerFragmentLifecycleCallbacks(
      new FragmentManager.FragmentLifecycleCallbacks() {
        @Override
        public void onFragmentResumed(@NonNull FragmentManager fm, @NonNull Fragment f) {
          super.onFragmentResumed(fm, f);
          if (f == current) {
            waitForFragmentAnimation(f, onReady);
            fragmentManager.unregisterFragmentLifecycleCallbacks(this); // Unregister to prevent future callbacks
          }
        }
      }, false);
  }

  @Nullable
  public static
  Fragment findFragmentSafely(View view) {
    try {
      return FragmentManager.findFragment(view);
    } catch (Exception ignored) {
      return null;
    }
  }
}
