import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { colors, fonts } from '@/theme';
import { Icon, type IconName } from './Icon';
import { Tartan } from './Tartan';

const META: Record<string, { label: string; icon: IconName }> = {
  calendar: { label: '캘린더', icon: 'calendar' },
  closet: { label: '옷장', icon: 'closet' },
  index: { label: '홈', icon: 'home' },
  community: { label: '커뮤니티', icon: 'community' },
  my: { label: 'MY', icon: 'my' },
};

// 타탄 무늬 하단 탭 (프로토타입과 같은 모양)
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <Tartan kind="nav" style={[s.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {state.routes.map((route, i) => {
        const meta = META[route.name];
        if (!meta) return null;
        const on = state.index === i;
        const color = on ? colors.pink : 'rgba(30,34,53,0.78)';
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => { if (!on) navigateToTab(route.key); }}
            style={s.tab}
          >
            <Icon name={meta.icon} color={color} strokeWidth={on ? 2 : 1.6} />
            <Text style={[s.label, { color }]}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </Tartan>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: 'row', paddingTop: 8, paddingHorizontal: 12 },
  tab: { flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center', gap: 4 },
  label: { fontSize: 11, fontFamily: fonts.sansBold },
});
