import type { Item } from './types'
import img01 from '../assets/clothes/item_01.jpg'
import img02 from '../assets/clothes/item_02.jpg'
import img03 from '../assets/clothes/item_03.jpg'
import img04 from '../assets/clothes/item_04.jpg'
import img05 from '../assets/clothes/item_05.jpg'
import img06 from '../assets/clothes/item_06.jpg'
import img07 from '../assets/clothes/item_07.jpg'
import img08 from '../assets/clothes/item_08.jpg'
import img09 from '../assets/clothes/item_09.jpg'
import img10 from '../assets/clothes/item_10.jpg'
import img11 from '../assets/clothes/item_11.jpg'
import img12 from '../assets/clothes/item_12.jpg'
import img13 from '../assets/clothes/item_13.jpg'
import img14 from '../assets/clothes/item_14.jpg'
import img15 from '../assets/clothes/item_15.jpg'
import img16 from '../assets/clothes/item_16.jpg'

// 가짜 옷장 데이터 (프로토타입과 같은 16벌). 진짜 API가 생기면 이 파일만 바꾼다.
export const items: Item[] = [
  { id: 1, name: '아이보리 오버핏 니트', category: '상의', color: '아이보리', pattern: '무지', image: img01, lastWornDays: 120 },
  { id: 2, name: '그레이 오버핏 니트', category: '상의', color: '그레이', pattern: '무지', image: img02, lastWornDays: 200 },
  { id: 3, name: '블랙 오버핏 니트', category: '상의', color: '블랙', pattern: '무지', image: img03, lastWornDays: 14 },
  { id: 4, name: '화이트 티셔츠', category: '상의', color: '화이트', pattern: '무지', image: img04, lastWornDays: 1 },
  { id: 5, name: '네이비 스트라이프 셔츠', category: '상의', color: '네이비', pattern: '스트라이프', image: img05, lastWornDays: 45 },
  { id: 6, name: '인디고 와이드 데님', category: '하의', color: '데님', pattern: '무지', image: img06, lastWornDays: 14 },
  { id: 7, name: '블랙 플리츠 스커트', category: '하의', color: '블랙', pattern: '무지', image: img07, lastWornDays: 300 },
  { id: 8, name: '카키 카고 팬츠', category: '하의', color: '카키', pattern: '무지', image: img08, lastWornDays: 45 },
  { id: 9, name: '그레이 슬랙스', category: '하의', color: '그레이', pattern: '무지', image: img09, lastWornDays: 1 },
  { id: 10, name: '카멜 롱 코트', category: '아우터', color: '카멜', pattern: '무지', image: img10, lastWornDays: 20 },
  { id: 11, name: '블랙 레더 재킷', category: '아우터', color: '블랙', pattern: '무지', image: img11, lastWornDays: 400 },
  { id: 12, name: '아이보리 크로셰 원피스', category: '원피스', color: '아이보리', pattern: '무지', image: img12, lastWornDays: 20 },
  { id: 13, name: '그린 체크 셔츠', category: '상의', color: '그린', pattern: '체크', image: img13, lastWornDays: null },
  { id: 14, name: '블랙 벨벳 뷔스티에', category: '덧입기', color: '블랙', pattern: '무지', image: img14, lastWornDays: 60 },
  { id: 15, name: '화이트 하이넥 셔링 티', category: '상의', color: '화이트', pattern: '무지', image: img15, lastWornDays: 30 },
  { id: 16, name: '차콜 와이드 슬랙스', category: '하의', color: '차콜', pattern: '무지', image: img16, lastWornDays: 10 },
]

export const itemById = (id?: number) => items.find((i) => i.id === id)

// 옷 색 이름 → 색 코드 (프로토타입 COLORS와 같음)
export const clothColors: Record<string, string> = {
  화이트: '#FFFDF7', 아이보리: '#F1E9D6', 베이지: '#D9C7A7', 카멜: '#C49A6C', 브라운: '#6E4B32',
  블랙: '#1E2235', 차콜: '#3E4049', 그레이: '#A6A39B', 네이비: '#26324F', 데님: '#33467A',
  스카이: '#9DBBD9', 카키: '#6B6B3E', 그린: '#2F5130', 버건디: '#7A2436', 레드: '#C2353A',
  핑크: '#E7A9C2', 옐로: '#E8C547', 퍼플: '#6C5A8E',
}
