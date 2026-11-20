import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/components';
import { colors, fonts } from '@/theme';

// 캘린더: 달력, 저장한 코디, 입은 기록 (담당: B)
export default function Calendar() {
  return (
    <Screen title={['My', 'Calendar']}>
      <Text style={s.todo}>달력 · 저장한 코디 · 입은 기록 화면을 여기에 만들어요</Text>
    </Screen>
  );
}

const s = StyleSheet.create({
  todo: { fontFamily: fonts.sans, fontSize: 13, color: colors.soft },
});
