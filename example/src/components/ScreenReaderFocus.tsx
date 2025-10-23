import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { A11y } from 'react-native-a11y-order';

const alpha = 'α';
const beta = 'β';
const gamma = 'γ';

export const ScreenReaderFocus = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [inFocus, setFocused] = React.useState('None');
  const [blurred, setBlurred] = React.useState('None');

  return (
    <View style={styles.flex}>
      <A11y.ScreenChange title="ScreenReader Focus Screen" />
      <View style={styles.container}>
        <A11y.View
          onScreenReaderFocus={() => setFocused('Sub Header')}
          onScreenReaderBlur={() => setBlurred('Sub Header')}
          onScreenReaderFocusChange={(focused) =>
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
          onScreenReaderFocus={() => setFocused('Description')}
          onScreenReaderBlur={() => setBlurred('Description')}
          onScreenReaderFocusChange={(focused) =>
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
        <A11y.Order style={styles.orderContainer}>
          <A11y.Index
            onScreenReaderFocus={() => setFocused(beta)}
            onScreenReaderBlur={() => setBlurred(beta)}
            onScreenReaderFocusChange={(focused) =>
              console.log(`${beta}: `, focused)
            }
            index={1}
          >
            <Pressable>
              <Text>{beta}</Text>
            </Pressable>
          </A11y.Index>
          <A11y.Index
            onScreenReaderFocus={() => setFocused(alpha)}
            onScreenReaderBlur={() => setBlurred(alpha)}
            onScreenReaderFocusChange={(focused) =>
              console.log(`${alpha}: `, focused)
            }
            index={0}
          >
            <Button title={alpha} />
          </A11y.Index>
          <A11y.Index
            onScreenReaderFocus={() => setFocused(gamma)}
            onScreenReaderBlur={() => setBlurred(gamma)}
            onScreenReaderFocusChange={(focused) =>
              console.log(`${gamma}: `, focused)
            }
            index={2}
          >
            <View accessible>
              <Text>{gamma}</Text>
            </View>
          </A11y.Index>
        </A11y.Order>
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
});
