import type { Item } from './types';

// 가짜 옷장 데이터 (프로토타입과 같은 16벌). 진짜 API가 생기면 이 파일만 바꾼다.
export const items: Item[] = [
  { id: 1, name: '아이보리 오버핏 니트', category: '상의', color: '아이보리', pattern: '무지', image: require('../../assets/clothes/item_01.jpg'), lastWornDays: 120 },
  { id: 2, name: '그레이 오버핏 니트', category: '상의', color: '그레이', pattern: '무지', image: require('../../assets/clothes/item_02.jpg'), lastWornDays: 200 },
  { id: 3, name: '블랙 오버핏 니트', category: '상의', color: '블랙', pattern: '무지', image: require('../../assets/clothes/item_03.jpg'), lastWornDays: 14 },
  { id: 4, name: '화이트 티셔츠', category: '상의', color: '화이트', pattern: '무지', image: require('../../assets/clothes/item_04.jpg'), lastWornDays: 1 },
  { id: 5, name: '네이비 스트라이프 셔츠', category: '상의', color: '네이비', pattern: '스트라이프', image: require('../../assets/clothes/item_05.jpg'), lastWornDays: 45 },
  { id: 6, name: '인디고 와이드 데님', category: '하의', color: '데님', pattern: '무지', image: require('../../assets/clothes/item_06.jpg'), lastWornDays: 14 },
  { id: 7, name: '블랙 플리츠 스커트', category: '하의', color: '블랙', pattern: '무지', image: require('../../assets/clothes/item_07.jpg'), lastWornDays: 300 },
  { id: 8, name: '카키 카고 팬츠', category: '하의', color: '카키', pattern: '무지', image: require('../../assets/clothes/item_08.jpg'), lastWornDays: 45 },
  { id: 9, name: '그레이 슬랙스', category: '하의', color: '그레이', pattern: '무지', image: require('../../assets/clothes/item_09.jpg'), lastWornDays: 1 },
  { id: 10, name: '카멜 롱 코트', category: '아우터', color: '카멜', pattern: '무지', image: require('../../assets/clothes/item_10.jpg'), lastWornDays: 20 },
  { id: 11, name: '블랙 레더 재킷', category: '아우터', color: '블랙', pattern: '무지', image: require('../../assets/clothes/item_11.jpg'), lastWornDays: 400 },
  { id: 12, name: '아이보리 크로셰 원피스', category: '원피스', color: '아이보리', pattern: '무지', image: require('../../assets/clothes/item_12.jpg'), lastWornDays: 20 },
  { id: 13, name: '그린 체크 셔츠', category: '상의', color: '그린', pattern: '체크', image: require('../../assets/clothes/item_13.jpg'), lastWornDays: null },
  { id: 14, name: '블랙 벨벳 뷔스티에', category: '덧입기', color: '블랙', pattern: '무지', image: require('../../assets/clothes/item_14.jpg'), lastWornDays: 60 },
  { id: 15, name: '화이트 하이넥 셔링 티', category: '상의', color: '화이트', pattern: '무지', image: require('../../assets/clothes/item_15.jpg'), lastWornDays: 30 },
  { id: 16, name: '차콜 와이드 슬랙스', category: '하의', color: '차콜', pattern: '무지', image: require('../../assets/clothes/item_16.jpg'), lastWornDays: 10 },
];

export const itemById = (id?: number) => items.find((i) => i.id === id);
