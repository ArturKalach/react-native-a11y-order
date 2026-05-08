#import "RNAOA11yGroupChildrenView.h"

@implementation RNAOA11yGroupChildrenView

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    _groupChildrenMode = -1;
  }
  return self;
}

- (BOOL)shouldGroupAccessibilityChildren {
  if (_groupChildrenMode == -1) {
    return [super shouldGroupAccessibilityChildren];
  }
  return (BOOL)_groupChildrenMode;
}

@end
