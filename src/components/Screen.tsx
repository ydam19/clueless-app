import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, space } from '@/theme';
import { Tartan } from './Tartan';

// 모든 탭 화면의 틀: 위쪽 타탄 띠 + Clueless 로고 + 화면 제목 + 내용
// title 예: ['Today’s', 'Outfit'] → 두 번째 단어는 기울임 (프로토타입 제목 모양)
export function Screen({ title, children, scroll = true }: { title?: [string, string?]; children: ReactNode; scroll?: boolean }) {
  const insets = useSafeAreaInsets();
  const body = (
    <>
      {title && (
        <Text style={s.title}>
          {title[0]}
          {title[1] ? <Text style={s.titleItalic}> {title[1]}</Text> : null}
        </Text>
      )}
      {children}
    </>
  );
  return (
    <View style={s.root}>
      <Tartan kind="top" style={[s.top, { paddingTop: insets.top + 8 }]}>
        <Text style={s.logo}>Clueless</Text>
      </Tartan>
      {scroll ? <ScrollView contentContainerStyle={s.body}>{body}</ScrollView> : <View style={[s.body, { flex: 1 }]}>{body}</View>}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.ivory },
  top: { paddingHorizontal: space.xl, paddingBottom: 14 },
  logo: { fontFamily: fonts.serif, fontSize: 34, color: colors.pink },
  body: { padding: space.xl, gap: space.md },
  title: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  titleItalic: { fontFamily: fonts.serifItalic },
});
