#import "SceneDelegate.h"

#import "AppDelegate.h"

@implementation SceneDelegate

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions
{
  if (![scene isKindOfClass:[UIWindowScene class]]) {
    return;
  }

  // RCTAppDelegate creates the window and root view controller in didFinishLaunching;
  // attach that window to the scene so it is displayed.
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  appDelegate.window.windowScene = (UIWindowScene *)scene;
  [appDelegate.window makeKeyAndVisible];
  self.window = appDelegate.window;
}

@end
