import { StyleSheet, Text, View } from 'react-native';
import { ItemCard, Screen } from '@/components';
import { items } from '@/data';
import { colors, fonts } from '@/theme';

// 옷장: 내 옷 목록, 옷 등록 (담당: B)
export default function Closet() {
  return (
    <Screen title={['My', 'Wardrobe']}>
      <Text style={s.count}>총 {items.length}벌</Text>
      <View style={s.grid}>
        {items.map((it) => <ItemCard key={it.id} item={it} />)}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  count: { fontFamily: fonts.sans, fontSize: 12, color: colors.soft },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});
