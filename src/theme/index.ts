// 클루리스 디자인 값. 색·글꼴·간격은 반드시 여기서 가져다 쓴다 (화면에 색 코드를 직접 쓰지 않기).
export const colors = {
  ivory: '#FAF7EF', // 화면 배경
  paper: '#FFFDF7', // 카드·입력칸 배경
  ink: '#1E2235', // 기본 글자, 진한 버튼
  muted: '#3F4352',
  soft: '#5E6170', // 보조 글자
  line: '#DCD6C6', // 구분선
  ph: '#E8E2D4', // 사진 자리
  yellow: '#EDCF3A', // 타탄 바탕
  pink: '#B81E73', // 강조 (주요 버튼, 선택된 탭)
} as const;

export const fonts = {
  serif: 'DMSerifDisplay_400Regular', // 로고, 화면 제목의 영문
  serifItalic: 'DMSerifDisplay_400Regular_Italic',
  sans: 'NotoSansKR_400Regular',
  sansMedium: 'NotoSansKR_500Medium',
  sansBold: 'NotoSansKR_700Bold',
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;

// 옷 색 이름 → 색 코드 (프로토타입 COLORS와 같음)
export const clothColors: Record<string, string> = {
  화이트: '#FFFDF7', 아이보리: '#F1E9D6', 베이지: '#D9C7A7', 카멜: '#C49A6C', 브라운: '#6E4B32',
  블랙: '#1E2235', 차콜: '#3E4049', 그레이: '#A6A39B', 네이비: '#26324F', 데님: '#33467A',
  스카이: '#9DBBD9', 카키: '#6B6B3E', 그린: '#2F5130', 버건디: '#7A2436', 레드: '#C2353A',
  핑크: '#E7A9C2', 옐로: '#E8C547', 퍼플: '#6C5A8E',
};
