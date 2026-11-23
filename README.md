# Clueless

있는지도 몰랐던 내 옷이 요즘 유행 코디가 됩니다.
옷 사진만 올리면 디지털 옷장을 만들고, 트렌드 예측으로 내 옷장 안에서 코디를 추천하는 앱입니다.

SeSAC MS AI 엔지니어 과정 1차 팀 프로젝트

## 기술
- **React + Vite** 모바일 웹 (TypeScript)
- **Capacitor**로 Android·iOS 앱 패키징
- 화면 이동: react-router

## 시작하기

### 1. 한 번만 준비
1. [Node.js](https://nodejs.org) 설치 (LTS)
2. 저장소 받기
   ```bash
   git clone https://github.com/ydam19/clueless-app.git
   cd clueless-app
   npm install
   ```

### 2. 컴퓨터에서 보기
```bash
npm run dev
```
터미널에 나온 주소(`http://localhost:5173`)를 브라우저로 엽니다.
폰 크기로 보려면 Chrome 개발자 도구(⌥⌘I)를 열고 폰 모양 아이콘(⇧⌘M)을 누르세요.

### 3. 폰에서 보기
```bash
npm run dev:phone
```
- 터미널에 나온 `Network: http://192.168.x.x:5173` 주소를 **폰 브라우저**에 입력합니다.
- 폰과 컴퓨터가 **같은 와이파이**여야 합니다. 5G·LTE로는 열리지 않습니다.
- 학원·카페 같은 공용 와이파이는 기기끼리 연결을 막는 경우가 많습니다. 그럴 땐 컴퓨터 브라우저로 보세요.

### 4. 앱으로 만들기 (Capacitor, 나중에)
```bash
npm run build
npx cap add android      # 처음 한 번 (Android Studio 필요)
npx cap add ios          # 처음 한 번 (Mac + Xcode 필요)
npx cap sync             # 웹 코드가 바뀔 때마다
npx cap open android     # Android Studio로 열어 실행
```

## 구조
```
src/
  pages/        화면 (홈, 옷장, 캘린더, 커뮤니티, MY)
  components/   공통 부품 (화면 틀, 하단 탭, 버튼, 옷 카드)
  data/         가짜 데이터
  styles/       색, 글꼴 변수
  assets/       옷 사진, 타탄 무늬
docs/prototype/ 화면 설계도 (index.html을 브라우저로 열기)
```

팀 규칙과 담당은 [CLAUDE.md](CLAUDE.md)에 있습니다.
