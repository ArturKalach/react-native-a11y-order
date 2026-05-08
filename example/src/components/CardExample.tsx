import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { A11y } from 'react-native-a11y-order';

// ─── Types ───────────────────────────────────────────────────────────────────

type CartItem = {
  id: string;
  emoji: string;
  name: string;
  variant: string;
  unitPrice: number;
  quantity: number;
  color: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    emoji: '🍵',
    name: 'Matcha Latte',
    variant: 'Medium · Oat milk',
    unitPrice: 5.5,
    quantity: 1,
    color: '#16a34a',
  },
  {
    id: '2',
    emoji: '🧁',
    name: 'Blueberry Muffin',
    variant: 'Fresh baked',
    unitPrice: 3.99,
    quantity: 2,
    color: '#7c3aed',
  },
  {
    id: '3',
    emoji: '🥤',
    name: 'Mango Smoothie',
    variant: 'Large · No sugar',
    unitPrice: 6.99,
    quantity: 1,
    color: '#d97706',
  },
];

const fmt = (n: number) => `$${n.toFixed(2)}`;

// ─── Thumbnail ───────────────────────────────────────────────────────────────

const Thumbnail = ({ color, emoji }: { color: string; emoji: string }) => (
  <View style={[styles.thumbnail, { backgroundColor: color }]}>
    <Text style={styles.thumbnailEmoji}>{emoji}</Text>
  </View>
);

// ─── Description ─────────────────────────────────────────────────────────────

const Description = ({ item }: { item: CartItem }) => (
  <View style={styles.description}>
    <Text style={styles.itemName} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.itemVariant} numberOfLines={1}>
      {item.variant}
    </Text>
  </View>
);

// ─── Controls ────────────────────────────────────────────────────────────────
//
// Content of the nested A11y.Card — the stepper box + subtotal.
// The A11y.Card wrapper is kept visible at the CartItemCard level
// so the nesting pattern is explicit.

const Controls = ({
  quantity,
  onChangeQty,
  subtotal,
}: {
  quantity: number;
  onChangeQty: (delta: number) => void;
  subtotal: number;
}) => (
  <View style={styles.controls}>
    <View style={styles.stepperBox}>
      <Pressable
        onPress={() => onChangeQty(-1)}
        style={styles.stepBtn}
        disabled={quantity <= 1}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: quantity <= 1 }}
      >
        <Text
          style={[styles.stepBtnText, quantity <= 1 && styles.stepBtnTextDim]}
        >
          −
        </Text>
      </Pressable>
      <Text style={styles.stepCount}>{quantity}</Text>
      <Pressable
        onPress={() => onChangeQty(1)}
        style={styles.stepBtn}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
      >
        <Text style={styles.stepBtnText}>+</Text>
      </Pressable>
    </View>
    <Text style={styles.subtotal}>{fmt(subtotal)}</Text>
  </View>
);

// ─── CartItemCard — outer A11y.Card ──────────────────────────────────────────
//
// Interaction model:
//   • tap the card → open product page       (outer A11y.Card)
//   • tap stepper / − / + → adjust quantity (nested A11y.Card)

const CartItemCard = ({
  item,
  onOpen,
  onChangeQty,
}: {
  item: CartItem;
  onOpen: () => void;
  onChangeQty: (delta: number) => void;
}) => {
  const subtotal = item.unitPrice * item.quantity;
  const accessibilityLabel = `${item.name}, ${item.variant}, quantity ${
    item.quantity
  }, ${fmt(subtotal)}`;
  const accessibilityHint = 'Opens product page';
  const qteA11y = {
    accessibilityLabel: `Quantity ${item.quantity}`,
    accessibilityHint: 'Double tap to add one more',
  };
  return (
    <A11y.Card
      onPress={onOpen}
      accessibility={{ accessibilityLabel, accessibilityHint }}
      style={styles.card}
    >
      <View style={styles.row}>
        <Thumbnail color={item.color} emoji={item.emoji} />
        <Description item={item} />
        <A11y.Card onPress={() => onChangeQty(1)} accessibility={qteA11y}>
          <Controls
            quantity={item.quantity}
            onChangeQty={onChangeQty}
            subtotal={subtotal}
          />
        </A11y.Card>
      </View>
    </A11y.Card>
  );
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export const CardExample = () => {
  const [cart, setCart] = useState(INITIAL_CART);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const changeQty = (id: string, delta: number) => {
    const item = cart.find((i) => i.id === id)!;
    setLastAction(
      delta > 0 ? `Added one more ${item.name}` : `Removed one ${item.name}`
    );
    setCart((prev) =>
      prev.map((i) =>
        i.id !== id ? i : { ...i, quantity: Math.max(1, i.quantity + delta) }
      )
    );
  };

  const handleOpen = (id: string) => {
    const item = cart.find((i) => i.id === id)!;
    setLastAction(`Opened: ${item.name}`);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>A11y.Card</Text>
      <Text style={styles.subtitle}>
        Tap a card to open the product page.{' '}
        <Text style={styles.subtitleHighlight}>QuantityStepper</Text> is a
        nested <Text style={styles.subtitleHighlight}>A11y.Card</Text> —
        VoiceOver can focus it as one unit or navigate into − / +.
      </Text>

      {lastAction && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{lastAction}</Text>
        </View>
      )}

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <View style={styles.list}>
            {cart.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onOpen={() => handleOpen(item.id)}
                onChangeQty={(delta) => changeQty(item.id, delta)}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{fmt(total)}</Text>
            </View>
            <Pressable
              style={styles.checkoutBtn}
              accessibilityRole="button"
              accessibilityLabel={`Checkout, total ${fmt(total)}`}
              onPress={() => setLastAction('Checkout tapped')}
            >
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b', marginBottom: 6 },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
    marginBottom: 20,
  },
  subtitleHighlight: { fontWeight: '700', color: '#7c3aed' },
  banner: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  bannerText: { fontSize: 13, color: '#15803d', fontWeight: '500' },
  list: { gap: 10 },
  // CartItemCard
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'stretch' },
  // Thumbnail
  thumbnail: { width: 72, alignItems: 'center', justifyContent: 'center' },
  thumbnailEmoji: { fontSize: 36 },
  // Description
  description: { flex: 1, padding: 12, justifyContent: 'center' },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  itemVariant: { fontSize: 12, color: '#94a3b8' },
  // Controls
  controls: {
    padding: 10,
    gap: 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  stepperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  subtotal: { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  stepBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0f172a',
    lineHeight: 22,
  },
  stepBtnTextDim: { color: '#cbd5e1' },
  stepCount: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 6,
  },
  // Footer
  empty: { paddingVertical: 56, alignItems: 'center', gap: 8 },
  emptyEmoji: { fontSize: 40 },
  emptyText: { fontSize: 16, color: '#94a3b8' },
  footer: { marginTop: 16, gap: 10 },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  totalLabel: { fontSize: 16, color: '#475569', fontWeight: '600' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  checkoutBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
