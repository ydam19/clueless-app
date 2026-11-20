import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/components';
import { colors, fonts } from '@/theme';

// MY: 내 정보, 설정 (담당: C)
export default function My() {
  return (
    <Screen title={['My', 'Page']}>
      <Text style={s.todo}>내 정보와 설정 화면을 여기에 만들어요</Text>
    </Screen>
  );
}

const s = StyleSheet.create({
  todo: { fontFamily: fonts.sans, fontSize: 13, color: colors.soft },
});
