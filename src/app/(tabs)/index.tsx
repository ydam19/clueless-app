import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, ItemCard, Screen } from '@/components';
import { itemById, outfits } from '@/data';
import { colors, fonts } from '@/theme';

// 홈: 오늘의 코디 추천 (담당: A)
// 지금은 가짜 데이터의 첫 번째 코디만 보여 주는 뼈대. 프로토타입 홈을 보고 채운다.
export default function Home() {
  const o = outfits[0];
  const wear = [o.top, o.layer, o.bottom, o.outer].map(itemById).filter((x) => x !== undefined);
  return (
    <Screen title={['Today’s', 'Outfit']}>
      <Text style={s.reason}>{o.reason}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {wear.map((it) => <ItemCard key={it.id} item={it} />)}
      </ScrollView>
      <View style={{ gap: 8, marginTop: 8 }}>
        <Button label="다음 추천 코디로 맞추기" variant="pink" />
        <Button label="이 코디로 입을래요" variant="solid" />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  reason: { fontFamily: fonts.sans, fontSize: 13, color: colors.soft },
});
