# 클루리스(Clueless) 앱 — 팀 규칙

내 옷장 안의 옷으로 요즘 유행 코디를 추천해 주는 앱. SeSAC MS AI 엔지니어 과정 1차 팀 프로젝트.
**React + Vite 모바일 웹**으로 만들고, **Capacitor**로 Android·iOS 앱으로 감싼다. TypeScript. 지금은 **전부 가짜 데이터**로 화면만 만든다.

## 설계도
- `docs/prototype/index.html`이 화면 설계도다. 브라우저로 열어서 보고 **같은 화면·문구·동작**으로 만든다.
- 프로토타입이 원래 HTML·CSS라서 구조와 스타일을 거의 그대로 옮겨 오면 된다.
- 프로토타입에 없는 장식, 문구, 기능을 마음대로 더하지 않는다.

## 폴더
- `src/pages/` 화면 하나 = 파일 하나 (+ 같은 이름의 `.css`). 주소는 `src/App.tsx`에서 연결한다.
- `src/components/` 여러 화면이 같이 쓰는 부품 (AppLayout, TabBar, Screen, Button, ItemCard, Icon)
- `src/data/` 가짜 데이터와 타입. 화면에서 데이터를 직접 만들지 말고 여기서 가져온다. 나중에 진짜 API로 바꿀 때 이 폴더만 고친다.
- `src/styles/theme.css` 색·글꼴 변수. **색 코드(#...)를 화면 CSS에 직접 쓰지 않고** `var(--pink)`처럼 쓴다.
- 화면 하나에서만 쓰는 부품은 그 화면 파일 안에 둔다.
- 화면 이동은 react-router의 `HashRouter`(주소에 `#`)를 쓴다. Capacitor 앱 안에서도 깨지지 않게 하려는 것이니 바꾸지 않는다.

## 담당 (파일이 겹치지 않게)
| 담당 | 파일 |
|---|---|
| A | `src/pages/Home.*` 홈(코디 추천, 맞춰보기) |
| B | `src/pages/Closet.*`, `Calendar.*` 옷장·옷 등록·캘린더 |
| C | `src/pages/Community.*`, `My.*`, 로그인·첫 설정 |

- 새 화면이 필요하면 `src/pages/`에 파일을 만들고 `src/App.tsx`에 `<Route>` 한 줄을 추가한다.
- `src/components`, `src/data`, `src/styles`, `src/App.tsx`는 **공통 파일**이다. 고치기 전에 팀 채팅에 먼저 말한다.

## 디자인 규칙
- 배경 `--ivory`, 강조 `--pink`(가장 중요한 버튼 하나), 진한 버튼 `--ink`.
- 영문 제목은 `--serif`(DM Serif Display), 한글은 `--sans`(Noto Sans KR).
- 이모지 쓰지 않기. 유치한 표현 쓰지 않기.
- 문구 통일: 코트·재킷은 "아우터", 겹쳐 입기 버튼은 "+ 겹쳐 입기", 빼는 버튼은 "아우터 빼기".
- 홈은 추천 버튼, "이 코디로 입을래요", "저장"이 **항상 한 화면에** 보여야 한다.

## 작업 순서
1. `git switch main && git pull` 로 최신 코드 받기
2. 내 브랜치 만들기: `git switch -c 이름/작업` (예: `yedam/home-spin`)
3. 작업하고 `npm run build` 통과 확인 (타입 검사 포함)
4. 커밋 → push → GitHub에서 PR 만들기 → 다른 한 명이 확인하고 합치기

## 실행
```bash
npm install
npm run dev          # 컴퓨터 브라우저에서 보기
npm run dev:phone    # 같은 와이파이의 폰 브라우저에서도 보기
```
