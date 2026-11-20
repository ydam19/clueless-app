import type { ReactNode } from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@/theme';

const SRC = {
  top: require('../../assets/ui/tartan_top.png'), // 진한 타탄 (위쪽 로고 띠)
  nav: require('../../assets/ui/tartan_nav.png'), // 연한 타탄 (하단 탭)
};

// 타탄 무늬 바탕. 웹·iOS·Android 모두 같게 보이도록 무늬 조각(390×120)을 직접 이어 붙인다.
export function Tartan({ kind, style, children }: { kind: 'top' | 'nav'; style?: StyleProp<ViewStyle>; children?: ReactNode }) {
  return (
    <View style={[s.wrap, style]}>
      <View style={s.tiles} pointerEvents="none">
        {Array.from({ length: 4 }, (_, i) => <Image key={i} source={SRC[kind]} style={s.tile} />)}
      </View>
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { overflow: 'hidden', backgroundColor: colors.yellow },
  tiles: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row' },
  tile: { width: 390, height: 120 },
});
