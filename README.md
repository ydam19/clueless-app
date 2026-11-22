# Clueless

있는지도 몰랐던 내 옷이 요즘 유행 코디가 됩니다.
옷 사진만 올리면 디지털 옷장을 만들고, 트렌드 예측으로 내 옷장 안에서 코디를 추천하는 앱입니다.

SeSAC MS AI 엔지니어 과정 1차 팀 프로젝트

## 시작하기

### 1. 한 번만 준비
1. [Node.js](https://nodejs.org) 설치 (LTS)
2. 폰에 **Expo Go** 앱 설치 (App Store / Play 스토어)
3. [expo.dev](https://expo.dev)에서 Expo 계정 만들기 (무료, Personal로 가입)
   - 가입 중 Organization이나 Project를 만들라고 나오면 **Skip** 해도 됩니다.
4. 저장소 받기
   ```bash
   git clone https://github.com/ydam19/clueless-app.git
   cd clueless-app
   npm install
   ```
5. **컴퓨터에서 Expo 로그인**
   ```bash
   npx expo login
   ```
   브라우저가 열리면 로그인을 승인합니다. `npx expo whoami`로 내 아이디가 나오면 성공입니다.
6. **폰 Expo Go에서도 같은 계정으로 로그인**
   - 컴퓨터와 폰이 **같은 계정**이어야 앱이 열립니다. 아니면 "You need to be signed in to Expo Go and Expo CLI" 오류가 뜹니다.
   - Expo Go에는 GitHub 로그인 버튼이 없습니다. GitHub로 가입했다면 Expo Go 로그인 화면의 **Forgot password?**로 비밀번호를 새로 만든 뒤, 아이디와 그 비밀번호로 로그인하세요.

### 2. 매번 실행
```bash
npx expo start
```
- 터미널에 뜬 QR코드를 폰 카메라(iPhone) 또는 Expo Go(Android)로 찍으면 앱이 열립니다.
- QR이 잘려 보이면 Expo Go에서 "Enter URL manually"를 누르고 터미널의 `Metro: exp://...` 주소를 입력합니다.
- 웹으로 보려면 터미널에서 `w`를 누르세요.

## 앱이 안 열릴 때

| 폰에 뜨는 문구 | 원인 | 해결 |
|---|---|---|
| The Internet connection appears to be offline | 폰과 컴퓨터가 **같은 와이파이가 아님** (5G·LTE 포함) | 폰을 컴퓨터와 같은 와이파이에 연결. iPhone은 설정 → Expo Go → **로컬 네트워크** 켜기 |
| You need to be signed in to Expo Go and Expo CLI | 컴퓨터나 폰 중 한쪽이 로그인 안 됨, 또는 계정이 다름 | 위 5·6번을 다시 확인 |
| 같은 와이파이인데도 연결이 안 됨 | 학원·카페 같은 공용 와이파이는 기기끼리 연결을 막는 경우가 많음 | 아래 터널 방식으로 실행 |

**터널 방식** (와이파이가 달라도, 5G여도 열림. 조금 느림)
```bash
npx expo start --tunnel ngrok
```
처음 실행할 때 `@expo/ngrok`을 설치할지 물으면 `Y`를 누르세요.

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
