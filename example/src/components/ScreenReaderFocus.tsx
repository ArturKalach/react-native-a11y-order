import React, { useCallback } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  A11y,
  type ScreenReaderDescendantFocusChangedEvent,
} from 'react-native-a11y-order';

const alpha = 'α';
const beta = 'β';
const gamma = 'γ';

export const ScreenReaderFocus = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [inFocus, setFocused] = React.useState('None');
  const [blurred, setBlurred] = React.useState('None');
  const [info, setInfo] = React.useState('None');

  const onScreenReaderDescendantFocusChangedHandler = useCallback(
    (e: ScreenReaderDescendantFocusChangedEvent) => {
      console.log('List', e.nativeEvent);
      setInfo(JSON.stringify(e.nativeEvent));
    },
    []
  );

  return (
    <View style={styles.flex}>
      <A11y.ScreenChange title="ScreenReader Focus Screen" />
      <View style={styles.container}>
        <A11y.View
          onScreenReaderSubViewFocused={() => setFocused('Sub Header')}
          onScreenReaderSubViewBlurred={() => setBlurred('Sub Header')}
          onScreenReaderSubViewFocusChange={(focused) =>
            console.log('Sub Header: ', focused)
          }
        >
          <View accessible style={styles.headerContainer}>
            <Text style={styles.header}>
              Screen Reader Focus and Blur Events
            </Text>
          </View>
        </A11y.View>
        <A11y.View
          onScreenReaderSubViewFocused={() => setFocused('Description')}
          onScreenReaderSubViewBlurred={() => setBlurred('Description')}
          onScreenReaderSubViewFocusChange={(focused) =>
            console.log('Description: ', focused)
          }
        >
          <View accessible>
            <Text>
              Test screen reader behavior for focus, blur, and focus change
              events on different elements.
            </Text>
          </View>
        </A11y.View>
        <View collapsable={false} style={styles.symbols}>
          <A11y.Order style={styles.orderContainer}>
            <A11y.Index
              onScreenReaderSubViewFocused={() => setFocused(beta)}
              onScreenReaderSubViewBlurred={() => setBlurred(beta)}
              onScreenReaderSubViewFocusChange={(focused) =>
                console.log(`${beta}: `, focused)
              }
              index={1}
            >
              <Pressable>
                <Text>{beta}</Text>
              </Pressable>
            </A11y.Index>
            <A11y.Index
              onScreenReaderSubViewFocused={() => setFocused(alpha)}
              onScreenReaderSubViewBlurred={() => setBlurred(alpha)}
              onScreenReaderSubViewFocusChange={(focused) =>
                console.log(`${alpha}: `, focused)
              }
              index={0}
            >
              <Button title={alpha} />
            </A11y.Index>
            <A11y.Index
              onScreenReaderSubViewFocused={() => setFocused(gamma)}
              onScreenReaderSubViewBlurred={() => setBlurred(gamma)}
              onScreenReaderSubViewFocusChange={(focused) =>
                console.log(`${gamma}: `, focused)
              }
              index={2}
            >
              <View accessible>
                <Text>{gamma}</Text>
              </View>
            </A11y.Index>
          </A11y.Order>
        </View>

        <A11y.View
          onScreenReaderDescendantFocusChanged={
            onScreenReaderDescendantFocusChangedHandler
          }
          onScreenReaderSubViewFocused={() => setFocused('List')}
          onScreenReaderSubViewBlurred={() => setBlurred('List')}
          onScreenReaderFocused={() => console.log('focused')}
          accessibilityLabel="Colors"
          style={styles.colorContainer}
        >
          <A11y.View
            nativeID="Red"
            onScreenReaderFocused={() => console.log('RED')}
            accessibilityLabel="Red Color"
            style={styles.colorRed}
            accessible
          />
          <A11y.View
            nativeID="Green"
            accessibilityLabel="Green Color"
            onScreenReaderFocused={() => console.log('GREEN')}
            style={styles.colorGreen}
            accessible
          />
          <A11y.View
            nativeID="Blue"
            accessibilityLabel="Blue Color"
            onScreenReaderFocused={() => console.log('BLUE')}
            style={styles.colorBlue}
            accessible
          />
        </A11y.View>
        <View style={styles.note}>
          <View accessible>
            <Text>
              <Text style={styles.bold}>Focused:</Text> {inFocus}
            </Text>
          </View>
          <View accessible>
            <Text>
              <Text style={styles.bold}>Blurred:</Text> {blurred}
            </Text>
          </View>
          <View accessible>
            <Text>
              <Text style={styles.bold}>Info:</Text> {info}
            </Text>
          </View>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { marginBottom: 4 },
  header: { fontSize: 20, fontWeight: 'bold' },
  orderContainer: { marginTop: 20, padding: 9, gap: 4, flexDirection: 'row' },
  note: {
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f0f8ff',
  },
  bold: { fontWeight: 'bold' },
  colorContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  colorRed: { width: 40, height: 40, backgroundColor: 'red' },
  colorGreen: { width: 40, height: 40, backgroundColor: 'green' },
  colorBlue: { width: 40, height: 40, backgroundColor: 'blue' },
  symbols: { alignItems: 'center', width: '100%' },
});
