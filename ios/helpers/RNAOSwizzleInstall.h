//
//  RNAOSwizzleInstall.h
//  react-native-a11y-order
//
//  Created by Artur Kalach on 03/05/2026.
//

#ifndef RNAOSwizzleInstall_h
#define RNAOSwizzleInstall_h

#define RNAO_CONCAT_(a, b) a##b
#define RNAO_CONCAT(a, b)  RNAO_CONCAT_(a, b)

#ifdef RCT_DYNAMIC_FRAMEWORKS

#define RNAO_INSTALL_SWIZZLES(registerFn)                                    \
  __attribute__((constructor))                                               \
  static void RNAO_CONCAT(RNAOInstall_, registerFn)(void) { registerFn(); }

#else

#define RNAO_INSTALL_SWIZZLES(registerFn)                                    \
  +(void)load {                                                              \
    static dispatch_once_t RNAO_CONCAT(once_, registerFn);                  \
    dispatch_once(&RNAO_CONCAT(once_, registerFn), ^{ registerFn(); });     \
  }

#endif

#endif /* RNAOSwizzleInstall_h */
