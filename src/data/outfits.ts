import type { Outfit, Trend } from './types'

// 가짜 추천 코디 (프로토타입과 같음)
export const outfits: Outfit[] = [
  { top: 1, bottom: 6, outer: 10, trend: '오버핏 니트', reason: '요즘 뜨는 오버핏 니트로 맞춰 봤어요' },
  { top: 15, layer: 14, bottom: 16, outer: 11, trend: '뷔스티에', reason: '하이넥 위에 뷔스티에를 겹치고 레더 재킷까지 걸쳤어요' },
  { top: 13, bottom: 6, trend: '와이드 데님', reason: '체크 셔츠엔 무지 데님을 맞췄어요' },
  { top: 2, bottom: 7, outer: 10, trend: '오버핏 니트', reason: '그레이 니트에 플리츠 스커트로 부드럽게 맞췄어요' },
  { top: 12, outer: 11, trend: '레더 재킷', reason: '크로셰 원피스에 레더 재킷을 걸쳐 봤어요' },
]

// 가짜 트렌드 (상승·하락 방향만 씀)
export const trends: Trend[] = [
  { keyword: '오버핏 니트', up: true, why: '4주째 검색 관심도 상승' },
  { keyword: '와이드 데님', up: true, why: '3주째 검색 관심도 상승' },
  { keyword: '레더 재킷', up: true, why: '가을 들어 검색 관심도 상승' },
  { keyword: '플리츠 스커트', up: true, why: '2주째 검색 관심도 상승' },
  { keyword: '트렌치 코트', up: true, why: '날이 추워지며 검색 관심도 상승' },
  { keyword: '카고 팬츠', up: false, why: '검색 관심도 하락' },
  { keyword: '체크 셔츠', up: false, why: '검색 관심도 하락' },
]
