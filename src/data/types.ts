// 앱 전체에서 쓰는 데이터 모양. 나중에 진짜 API로 바꿔도 이 모양은 유지한다.
export type Category = '상의' | '덧입기' | '하의' | '아우터' | '원피스'

export type Item = {
  id: number
  name: string
  category: Category
  color: string // clothColors의 키
  pattern: '무지' | '스트라이프' | '체크' | '도트' | '플라워' | '프린트'
  image: string // 사진 주소
  lastWornDays: number | null // 며칠 전에 입었는지, null = 아직 안 입음
}

export type Outfit = {
  top: number // Item id
  layer?: number // 덧입기
  bottom?: number // 원피스면 없음
  outer?: number
  trend: string // 참고한 트렌드 키워드
  reason: string
}

export type Trend = { keyword: string; up: boolean; why: string }

export type Post = {
  id: number
  user: string
  title: string
  body: string
  likes: number
  comments: number
  ago: string
}
