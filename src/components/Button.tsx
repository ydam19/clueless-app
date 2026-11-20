import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '@/theme';

type Variant = 'pink' | 'solid' | 'outline';

// 프로토타입 버튼 세 종류: pink(가장 중요한 행동), solid(진한 남색), outline(테두리만)
export function Button({ label, onPress, variant = 'outline', disabled }: { label: string; onPress?: () => void; variant?: Variant; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [s.base, s[variant], (pressed || disabled) && { opacity: 0.6 }]}
    >
      <Text style={[s.text, variant !== 'outline' && { color: colors.paper }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: { minHeight: 48, borderRadius: 2, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderWidth: 1 },
  pink: { backgroundColor: colors.pink, borderColor: colors.pink },
  solid: { backgroundColor: colors.ink, borderColor: colors.ink },
  outline: { backgroundColor: colors.paper, borderColor: colors.ink },
  text: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.ink },
});
