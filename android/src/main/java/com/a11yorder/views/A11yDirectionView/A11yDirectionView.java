package com.a11yorder.views.A11yDirectionView;

import android.content.Context;
import android.widget.LinearLayout;

import com.facebook.react.uimanager.MeasureSpecAssertions;

public class A11yDirectionView extends LinearLayout {

  public A11yDirectionView(Context context) {
    super(context);
    setOrientation(LinearLayout.VERTICAL);
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    MeasureSpecAssertions.assertExplicitMeasureSpec(widthMeasureSpec, heightMeasureSpec);

    setMeasuredDimension(
      MeasureSpec.getSize(widthMeasureSpec), MeasureSpec.getSize(heightMeasureSpec));
  }
}

