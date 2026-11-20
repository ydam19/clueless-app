import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/components';
import { colors, fonts } from '@/theme';

// 커뮤니티: 피드, 글 보기, 글쓰기 (담당: C)
export default function Community() {
  return (
    <Screen title={['Community']}>
      <Text style={s.todo}>커뮤니티 피드를 여기에 만들어요</Text>
    </Screen>
  );
}

const s = StyleSheet.create({
  todo: { fontFamily: fonts.sans, fontSize: 13, color: colors.soft },
});
