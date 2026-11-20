import { Tabs } from 'expo-router/js-tabs';
import { TabBar } from '@/components';

// 하단 탭 순서: [캘린더][옷장][홈(가운데, 처음 화면)][커뮤니티][MY]
export const unstable_settings = { anchor: 'index' };

export default function TabLayout() {
  return (
    <Tabs backBehavior="initialRoute" tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="closet" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="my" />
    </Tabs>
  );
}
