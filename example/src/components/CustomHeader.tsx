import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export const CustomHeader = (props: NativeStackHeaderProps) => {
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack());

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setCanGoBack(navigation.canGoBack());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Pressable role="button" onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </Pressable>
      ) : (
        <View collapsable={false} />
      )}
      <View>
        <Text style={styles.title}>{props.route.name}</Text>
      </View>
      <View collapsable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    marginTop: 14,
  },
  title: { fontWeight: 'bold', fontSize: 20 },
});
