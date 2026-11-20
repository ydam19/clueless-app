# 클루리스(Clueless) 앱 — 팀 규칙

내 옷장 안의 옷으로 요즘 유행 코디를 추천해 주는 앱. SeSAC MS AI 엔지니어 과정 1차 팀 프로젝트.
Expo(React Native) + Expo Router + TypeScript. 지금은 **전부 가짜 데이터**로 화면만 만든다.

Expo 관련 코드를 쓰기 전에 `AGENTS.md`를 먼저 읽을 것 (SDK 버전이 바뀌어 예전 API가 안 맞는 경우가 많다).

## 설계도
- `docs/prototype/index.html`이 화면 설계도다. 브라우저로 열어서 보고 **같은 화면·문구·동작**으로 만든다.
- 프로토타입에 없는 장식, 문구, 기능을 마음대로 더하지 않는다.

## 폴더
- `src/app/` 화면(파일 하나 = 화면 하나). `(tabs)/`가 하단 탭 5개.
- `src/components/` 여러 화면이 같이 쓰는 부품 (Screen, Button, ItemCard, TabBar, Tartan, Icon)
- `src/data/` 가짜 데이터와 타입. 화면에서 데이터를 직접 만들지 말고 여기서 가져온다. 나중에 진짜 API로 바꿀 때 이 폴더만 고친다.
- `src/theme/` 색, 글꼴, 간격. **색 코드(#...)를 화면 파일에 직접 쓰지 않는다.**
- 화면 하나에서만 쓰는 부품은 그 화면 파일 안에 둔다.

## 담당 (파일이 겹치지 않게)
| 담당 | 파일 |
|---|---|
| A | `src/app/(tabs)/index.tsx` 홈(코디 추천, 맞춰보기) |
| B | `src/app/(tabs)/closet.tsx`, `calendar.tsx` 옷장·옷 등록·캘린더 |
| C | `src/app/(tabs)/community.tsx`, `my.tsx`, 로그인·첫 설정 |

- 내 화면에서 새 화면이 필요하면 `src/app/` 아래에 내 이름이 드러나는 위치로 만든다 (예: `src/app/closet/upload.tsx`).
- `src/components`, `src/data`, `src/theme`, `_layout.tsx`는 **공통 파일**이다. 고치기 전에 팀 채팅에 먼저 말한다.

## 디자인 규칙
- 배경 `colors.ivory`, 강조 `colors.pink`(가장 중요한 버튼 하나), 진한 버튼 `colors.ink`.
- 영문 제목은 `fonts.serif`(DM Serif Display), 한글은 `fonts.sans*`(Noto Sans KR).
- 이모지 쓰지 않기. 유치한 표현 쓰지 않기.
- 문구 통일: 코트·재킷은 "아우터", 겹쳐 입기 버튼은 "+ 겹쳐 입기", 빼는 버튼은 "아우터 빼기".
- 홈은 추천 버튼, "이 코디로 입을래요", "저장"이 **항상 한 화면에** 보여야 한다.

## 작업 순서
1. `git pull` 로 최신 main 받기
2. 내 브랜치 만들기: `git switch -c 이름/작업` (예: `yedam/home-spin`)
3. 작업하고 `npx tsc --noEmit` 로 타입 검사 통과 확인
4. 커밋 → push → GitHub에서 PR 만들기 → 다른 한 명이 확인하고 합치기

## 실행
```bash
npm install
npx expo start      # 폰에서 Expo Go로 QR 찍기, 또는 w 눌러 웹으로 보기
```
