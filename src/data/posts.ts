import type { Post } from './types';

// 가짜 커뮤니티 글
export const posts: Post[] = [
  { id: 1, user: 'mina.closet', title: '3년 묵힌 와이드 데님, 요즘 다시 입어요', body: '3년 묵힌 와이드 데님에 블랙 크롭 니트. 요즘 와이드핏이 다시 올라와서 꺼내 봤어요.', likes: 284, comments: 31, ago: '2시간 전' },
  { id: 2, user: 'soyeon', title: '작년 겨울 이후 처음 꺼낸 카멜 코트', body: '옷장 구석에 있던 카멜 코트. 검정 부츠만 맞추니 금방 끝났어요.', likes: 201, comments: 17, ago: '5시간 전' },
  { id: 3, user: 'yoon_daily', title: '크로셰 원피스 하나로 끝', body: '더운 날엔 크로셰 원피스 하나면 충분해요. 가방만 바꿔 들었어요.', likes: 96, comments: 8, ago: '어제' },
];
