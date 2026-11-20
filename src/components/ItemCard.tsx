import { Image, StyleSheet, Text, View } from 'react-native';
import type { Item } from '@/data';
import { colors, fonts } from '@/theme';

// 옷 한 벌 카드 (옷장 목록, 추천 코디에서 같이 씀)
export function ItemCard({ item, width = 104 }: { item: Item; width?: number }) {
  return (
    <View style={{ width, gap: 4 }}>
      <Image source={item.image} style={[s.img, { width, height: width * 1.25 }]} />
      <Text style={s.name} numberOfLines={1}>{item.name}</Text>
      <Text style={s.sub}>{item.category}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  img: { backgroundColor: colors.ph, borderRadius: 2 },
  name: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.ink },
  sub: { fontFamily: fonts.sans, fontSize: 11, color: colors.soft },
});
