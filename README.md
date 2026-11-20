# Clueless

있는지도 몰랐던 내 옷이 요즘 유행 코디가 됩니다.
옷 사진만 올리면 디지털 옷장을 만들고, 트렌드 예측으로 내 옷장 안에서 코디를 추천하는 앱입니다.

SeSAC MS AI 엔지니어 과정 1차 팀 프로젝트

## 시작하기
1. [Node.js](https://nodejs.org) 설치 (LTS)
2. 폰에 **Expo Go** 앱 설치 (App Store / Play 스토어)
3. 터미널에서:
   ```bash
   git clone <이 저장소 주소>
   cd clueless-app
   npm install
   npx expo start
   ```
4. 화면에 뜬 QR코드를 폰 카메라(iPhone) 또는 Expo Go(Android)로 찍으면 앱이 열립니다. 컴퓨터와 폰이 같은 와이파이에 있어야 합니다.
   웹으로 보려면 터미널에서 `w`를 누르세요.

## 구조
```
src/
  app/(tabs)/   하단 탭 5개: 캘린더, 옷장, 홈, 커뮤니티, MY
  components/   공통 부품
  data/         가짜 데이터
  theme/        색, 글꼴
docs/prototype/ 화면 설계도 (index.html을 브라우저로 열기)
```

팀 규칙과 담당은 [CLAUDE.md](CLAUDE.md)에 있습니다.
