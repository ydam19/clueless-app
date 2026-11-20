/**
 * 클루리스(Clueless) 아바타 렌더러 - avatar.js
 * 
 * 디자인 시안(assets/avatar/female.jpg)을 원본 베이스로 완벽히 보존하며,
 * 외곽 회색 사각형 테두리와 흰색 카드 배경 박스를 100% 제거하고,
 * 인체의 실제 목선과 어깨 해부학적 곡선(y:364~430)에 완벽하게 감싸 들어가는
 * 3D 테일러드 핏(Tailored Fit) 렌더러입니다.
 */

(function () {
  'use strict';

  // 시안 원본 좌표계 규격 (female.jpg / male.jpg: 327 x 1424)
  // 머리끝 y:184 위 24px 여유(y:160), 발끝 y:1356 아래 19px 여유(y:1375)
  // 회색 카드 테두리(좌:0~2, 우:313~316, 상:68~72, 하:1398~1401)를 100% 배제한 유효 영역
  const VB_X = 4;
  const VB_Y = 120;
  const VB_W = 307;
  const VB_H = 1265;

  // 색상 토큰
  const INK = '#1E2235';          // 감색 잉크 윤곽선
  const SHOE_COLOR = '#1A181D';   // 신발 컬러

  /**
   * 메인 렌더 함수
   * @param {HTMLElement} el - 아바타가 들어갈 컨테이너 (.astage)
   * @param {Object} outfit - 코디 데이터 { top, layer, jacket, coat, bottom, isDress }
   * @param {Object} [options] - 성별 확장 { gender: 'female' | 'male' }
   */
  window.renderAvatar = function (el, outfit, options) {
    if (!el) return;
    const safeOutfit = outfit || {};
    const gender = (options && options.gender) === 'male' ? 'male' : 'female';
    el.innerHTML = generateAvatarSvg(safeOutfit, gender);
  };

  /**
   * SVG 마크업 생성
   * 단일 SVG 통합 아키텍처: 베이스 시안과 모든 의상이 단 하나의 동일한 SVG 뷰박스 내부에서 렌더링되므로,
   * 컨테이너 크기나 브라우저 레이아웃에 관계없이 인체 어깨선과 의상 어깨선이 100% 완벽하게 일치합니다.
   * mix-blend-mode: multiply를 SVG 루트에 적용하여 시안의 흰색 카드 박스를 앱 배경(#FFFDF7)에 완전히 융합합니다.
   */
  function generateAvatarSvg(outfit, gender) {
    const isDress = Boolean(outfit.isDress || (outfit.top && outfit.top.category === '원피스'));
    const top = outfit.top || null;
    const bottom = isDress ? null : (outfit.bottom || null);
    const layer = outfit.layer || null;
    const jacket = outfit.jacket || null;
    const coat = outfit.coat || null;

    const baseImgSrc = gender === 'male' ? 'assets/avatar/male.jpg' : 'assets/avatar/female.jpg';

    return `
<svg viewBox="${VB_X} ${VB_Y} ${VB_W} ${VB_H}"
     xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="xMidYMax meet"
     style="width: 100%; height: 100%; display: block; mix-blend-mode: multiply; pointer-events: none; transform: translateZ(0);">
  ${renderDefs()}

  <!-- 1. 원본 디자인 시안 (assets/avatar/female.jpg) -->
  <image href="${baseImgSrc}" x="0" y="0" width="327" height="1424" preserveAspectRatio="none" />

  <!-- 2. 의상 렌더링 레이어 (착용 순서: 하의 -> 상의 -> 덧입기 -> 재킷 -> 코트 -> 신발) -->
  <g id="clothing-layer">
    <!-- 하의 -->
    ${bottom ? renderBottom(bottom) : ''}

    <!-- 상의 또는 원피스 -->
    ${top ? (isDress ? renderDress(top) : renderTop(top, bottom)) : ''}

    <!-- 덧입기 (뷔스티에 / 조끼) -->
    ${layer ? renderLayer(layer, top) : ''}

    <!-- 재킷 -->
    ${jacket ? renderJacket(jacket) : ''}

    <!-- 코트 / 아우터 -->
    ${coat ? renderCoat(coat) : ''}

    <!-- 신발 (의상 착용 시 포인티드 뮬) -->
    ${(top || bottom || jacket || coat || isDress) ? renderShoes() : ''}
  </g>
</svg>`.trim();
  }

  /**
   * SVG 패턴 정의
   */
  function renderDefs() {
    return `
  <defs>
    <!-- 스트라이프 패턴 (네이비 스트라이프 셔츠 등) -->
    <pattern id="cl-pat-stripe" width="12" height="12" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.45" />
    </pattern>

    <!-- 깅엄 체크 패턴 (그린 체크 셔츠 등) -->
    <pattern id="cl-pat-check" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="7" height="7" fill="#FFFFFF" fill-opacity="0.22" />
      <rect x="7" y="7" width="7" height="7" fill="#FFFFFF" fill-opacity="0.22" />
      <rect x="7" y="0" width="7" height="7" fill="#000000" fill-opacity="0.18" />
      <rect x="0" y="7" width="7" height="7" fill="#000000" fill-opacity="0.18" />
    </pattern>

    <!-- 크로셰 레이스 패턴 -->
    <pattern id="cl-pat-crochet" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="8" r="4.5" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.35" />
      <circle cx="0" cy="0" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.35" />
      <circle cx="16" cy="16" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.35" />
    </pattern>

    <!-- 골지 니트 텍스처 패턴 -->
    <pattern id="cl-pat-ribbed" width="6" height="6" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#000000" stroke-width="1.2" stroke-opacity="0.1" />
    </pattern>
  </defs>`;
  }

  /**
   * 2. 하의 렌더링
   * 시안의 흰 반바지(y:690 ~ 860)를 100% 감싸는 완벽한 핏
   */
  function renderBottom(bottom) {
    const color = bottom.colorHex || '#2B4162';
    const name = bottom.name || '';

    // A. 플리츠 스커트 / 미니 랩스커트
    if (name.includes('스커트') || name.includes('skirt') || name.includes('랩')) {
      return renderSkirt(color);
    }

    // B. 카고 팬츠
    if (name.includes('카고')) {
      return renderCargoPants(color);
    }

    // C. 슬랙스
    if (name.includes('슬랙스')) {
      return renderSlacks(color);
    }

    // D. 기본 와이드 데님 팬츠
    return renderDenim(color);
  }

  // 플리츠 스커트 / 랩스커트 (y:688 ~ y:880, 시안 반바지 100% 차단)
  function renderSkirt(color) {
    return `
    <g id="bottom-skirt">
      <path d="M 46,688 
               Q 163.5,698 281,688 
               C 287,745 292,810 296,880 
               Q 163.5,892 31,880 
               C 35,810 40,745 46,688 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 허리 밴드 -->
      <path d="M 46,688 Q 163.5,698 281,688 L 282,708 Q 163.5,718 45,708 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.4" />

      <!-- 랩 오버랩 라인 & 플리츠 주름 선 -->
      <line x1="195" y1="708" x2="198" y2="885" stroke="${INK}" stroke-width="1.6" />
      <line x1="68" y1="708" x2="62" y2="881" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
      <line x1="95" y1="708" x2="91" y2="883" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
      <line x1="126" y1="708" x2="124" y2="885" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
      <line x1="160" y1="708" x2="160" y2="886" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
      <line x1="228" y1="708" x2="231" y2="884" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
      <line x1="258" y1="708" x2="264" y2="882" stroke="${INK}" stroke-width="1.1" opacity="0.4" />
    </g>`;
  }

  // 와이드 데님 팬츠
  function renderDenim(color) {
    return `
    <g id="bottom-denim">
      <path d="M 46,690 
               Q 163.5,700 281,690 
               C 284,735 284,800 281,860 
               C 283,950 284,1120 286,1285 
               L 182,1285 
               C 178,1200 173,1060 168,950 
               C 166,880 165,845 163.5,838 
               C 162,845 161,880 159,950 
               C 154,1060 149,1200 145,1285 
               L 41,1285 
               C 43,1120 44,950 46,860 
               C 43,800 43,735 46,690 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 하이웨이스트 밴드 -->
      <path d="M 46,690 Q 163.5,700 281,690 L 282,712 Q 163.5,722 45,712 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.4" />
      <line x1="102" y1="690" x2="102" y2="713" stroke="#D4AF37" stroke-width="1.5" />
      <line x1="225" y1="690" x2="225" y2="713" stroke="#D4AF37" stroke-width="1.5" />

      <!-- 캔톤 버튼 & 지퍼 플라이 J스티치 -->
      <circle cx="163.5" cy="703" r="3.2" fill="#D4AF37" stroke="${INK}" stroke-width="0.8" />
      <path d="M 163.5,712 L 163.5,765 Q 155,772 148,772" stroke="#D4AF37" stroke-width="1.5" fill="none" stroke-dasharray="3 2" />

      <!-- 프론트 스쿠프 포켓 스티치 -->
      <path d="M 48,714 Q 85,716 94,746" stroke="#D4AF37" stroke-width="1.5" fill="none" stroke-dasharray="3 2" />
      <path d="M 279,714 Q 242,716 233,746" stroke="#D4AF37" stroke-width="1.5" fill="none" stroke-dasharray="3 2" />

      <!-- 와이드 밑단 접힘 선 & 골드 스티치 -->
      <line x1="41" y1="1285" x2="145" y2="1285" stroke="#D4AF37" stroke-width="1.4" stroke-dasharray="4 2" />
      <line x1="182" y1="1285" x2="286" y2="1285" stroke="#D4AF37" stroke-width="1.4" stroke-dasharray="4 2" />
      <path d="M 50,980 C 48,1080 46,1200 44,1285" stroke="${INK}" stroke-width="1" fill="none" opacity="0.25" />
      <path d="M 277,980 C 279,1080 281,1200 283,1285" stroke="${INK}" stroke-width="1" fill="none" opacity="0.25" />
    </g>`;
  }

  // 와이드 슬랙스
  function renderSlacks(color) {
    return `
    <g id="bottom-slacks">
      <path d="M 46,688 
               Q 163.5,698 281,688 
               C 284,735 284,800 281,860 
               C 283,950 284,1120 286,1295 
               L 182,1295 
               C 178,1210 173,1070 168,950 
               C 166,880 165,845 163.5,838 
               C 162,845 161,880 159,950 
               C 154,1070 149,1210 145,1295 
               L 41,1295 
               C 43,1120 44,950 46,860 
               C 43,800 43,735 46,688 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <path d="M 46,688 Q 163.5,698 281,688 L 282,708 Q 163.5,718 45,708 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.4" />

      <!-- 칼주름 센터 프레스 라인 -->
      <line x1="94" y1="710" x2="94" y2="1290" stroke="${INK}" stroke-width="1.3" opacity="0.35" />
      <line x1="233" y1="710" x2="233" y2="1290" stroke="${INK}" stroke-width="1.3" opacity="0.35" />

      <!-- 미니멀 슬래시 포켓 -->
      <line x1="50" y1="710" x2="70" y2="745" stroke="${INK}" stroke-width="1.4" opacity="0.45" />
      <line x1="277" y1="710" x2="257" y2="745" stroke="${INK}" stroke-width="1.4" opacity="0.45" />
    </g>`;
  }

  // 카고 와이드 팬츠
  function renderCargoPants(color) {
    return `
    <g id="bottom-cargo">
      ${renderSlacks(color)}
      <rect x="32" y="930" width="22" height="65" rx="2" fill="${color}" stroke="${INK}" stroke-width="1.6" />
      <path d="M 30,930 L 56,930 L 54,944 L 32,944 Z" fill="${color}" stroke="${INK}" stroke-width="1.6" />
      <line x1="43" y1="944" x2="43" y2="990" stroke="${INK}" stroke-width="1" opacity="0.4" />

      <rect x="273" y="930" width="22" height="65" rx="2" fill="${color}" stroke="${INK}" stroke-width="1.6" />
      <path d="M 271,930 L 297,930 L 295,944 L 273,944 Z" fill="${color}" stroke="${INK}" stroke-width="1.6" />
      <line x1="284" y1="944" x2="284" y2="990" stroke="${INK}" stroke-width="1" opacity="0.4" />
    </g>`;
  }

  /**
   * 3. 상의 렌더링
   * 목선 U자 파임과 3D 립 밴드로 "사람 위에 얹힌 것"이 아닌 "목을 3차원으로 감싸 입은 핏" 구현
   */
  function renderTop(top, bottom) {
    const color = top.colorHex || '#8C2D38';
    const name = top.name || '';
    const pattern = top.pattern || '';

    // A. 가디건 (브라운 니트 가디건 등)
    if (name.includes('가디건') || name.includes('cardigan')) {
      return renderCardigan(color);
    }

    // B. 오버핏 울 니트
    if (name.includes('니트')) {
      return renderKnitTop(color);
    }

    // C. 골지 하이넥 셔링 티
    if (name.includes('하이넥') || name.includes('셔링')) {
      return renderHighNeckTee(color);
    }

    // D. 셔츠
    if (name.includes('셔츠')) {
      return renderShirt(color, pattern);
    }

    // E. 기본 탑 / 화이트 티셔츠
    return renderBasicTop(color);
  }

  // 오버핏 울 니트
  function renderKnitTop(color) {
    return `
    <g id="top-knit">
      <!-- 목 뒤 안쪽 칼라 림 (목 뒤를 감싸는 3D 음영) -->
      <path d="M 122,368 Q 163.5,358 205,368 Q 163.5,363 122,368 Z"
            fill="#3B1218" stroke="${INK}" stroke-width="1.2" opacity="0.6" />

      <!-- 니트 몸판: 목선을 유려한 U자로 파서 아바타 쇄골을 자연스럽게 드러내고 어깨를 100% 감쌈 -->
      <path d="M 122,368 
               C 85,372 40,395 20,432 
               C 30,458 40,482 50,508 
               C 46,580 48,660 44,742 
               Q 163.5,752 283,742 
               C 279,660 281,580 277,508 
               C 287,482 297,458 307,432 
               C 287,395 242,372 205,368 
               Q 163.5,402 122,368 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 앞 넥라인 도톰한 립 칼라 (목선에 자연스럽게 안착된 니트 골지 밴드) -->
      <path d="M 122,368 Q 163.5,402 205,368 Q 163.5,410 122,368 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M 123,370 Q 163.5,404 204,370" stroke="${INK}" stroke-width="0.8" fill="none" opacity="0.35" />

      <!-- 드롭 숄더 소매 - 왼쪽 -->
      <path d="M 20,432 
               C 8,530 6,650 16,772 
               L 50,772 
               C 44,660 46,565 50,508 
               C 40,482 30,458 20,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 드롭 숄더 소매 - 오른쪽 -->
      <path d="M 307,432 
               C 319,530 321,650 311,772 
               L 277,772 
               C 281,660 283,565 277,508 
               C 287,482 297,458 307,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 소매 시보리 -->
      <line x1="16" y1="755" x2="50" y2="755" stroke="${INK}" stroke-width="1.3" opacity="0.38" />
      <line x1="277" y1="755" x2="311" y2="755" stroke="${INK}" stroke-width="1.3" opacity="0.38" />

      <!-- 밑단 시보리 & 텍스처 -->
      <path d="M 44,728 Q 163.5,738 283,728" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.3" />
      <path d="M 88,570 C 82,630 84,680 88,726" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.22" />
      <path d="M 239,570 C 245,630 243,680 239,726" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.22" />
    </g>`;
  }

  // 라운드넥 니트 가디건
  function renderCardigan(color) {
    return `
    <g id="top-cardigan">
      <!-- 목 뒤 안쪽 칼라 림 -->
      <path d="M 124,370 Q 163.5,360 203,370 Q 163.5,365 124,370 Z"
            fill="#2B1D16" stroke="${INK}" stroke-width="1.2" opacity="0.6" />

      <!-- 몸판 -->
      <path d="M 124,370 
               C 85,373 40,396 20,432 
               C 30,458 40,482 50,508 
               C 46,580 48,660 44,738 
               Q 163.5,748 283,738 
               C 279,660 281,580 277,508 
               C 287,482 297,458 307,432 
               C 287,396 242,373 203,370 
               Q 163.5,404 124,370 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 앞 넥라인 립 칼라 -->
      <path d="M 124,370 Q 163.5,404 203,370 Q 163.5,412 124,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 센터 버튼 플래킷 & 자개 단추들 -->
      <line x1="163.5" y1="412" x2="163.5" y2="743" stroke="${INK}" stroke-width="1.6" />
      ${[435, 485, 535, 585, 635, 685].map(y => `
        <circle cx="163.5" cy="${y}" r="2.8" fill="#EDEBE6" stroke="${INK}" stroke-width="0.8" />
      `).join('')}

      <!-- 소매 - 왼쪽 -->
      <path d="M 20,432 C 8,530 6,650 16,770 L 50,770 C 44,660 46,565 50,508 C 40,482 30,458 20,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 소매 - 오른쪽 -->
      <path d="M 307,432 C 319,530 321,650 311,770 L 277,770 C 281,660 283,565 277,508 C 287,482 297,458 307,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
    </g>`;
  }

  // 골지 하이넥 셔링 티
  function renderHighNeckTee(color) {
    return `
    <g id="top-highneck-tee">
      <!-- 하이넥 목선 안쪽 -->
      <path d="M 132,350 Q 163.5,344 195,350 Q 163.5,348 132,350 Z"
            fill="#D0D0D0" stroke="${INK}" stroke-width="1.2" opacity="0.5" />

      <!-- 슬림핏 몸판 -->
      <path d="M 128,386 
               C 85,386 42,400 22,434 
               C 32,458 40,482 48,505 
               C 46,570 50,640 44,728 
               Q 163.5,738 283,728 
               C 277,640 281,570 279,505 
               C 287,482 295,458 305,434 
               C 285,400 242,386 199,386 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <path d="M 128,386 C 85,386 42,400 22,434 C 32,458 40,482 48,505 C 46,570 50,640 44,728 Q 163.5,738 283,728 C 277,640 281,570 279,505 C 287,482 295,458 305,434 C 285,400 242,386 199,386 Z"
            fill="url(#cl-pat-ribbed)" opacity="0.38" />

      <!-- 하이넥 터틀넥 칼라 (목선 원통형 곡면 y:350 ~ y:386) -->
      <path d="M 132,350 Q 163.5,356 195,350 L 199,386 Q 163.5,394 128,386 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 133,363 Q 163.5,368 194,363" stroke="${INK}" stroke-width="1" fill="none" opacity="0.3" />
      <path d="M 131,374 Q 163.5,380 196,374" stroke="${INK}" stroke-width="1" fill="none" opacity="0.3" />

      <!-- 슬림 소매 - 왼쪽 -->
      <path d="M 22,434 C 12,520 10,640 16,775 L 46,775 C 42,660 46,565 48,505 C 40,482 32,458 22,434 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 슬림 소매 - 오른쪽 -->
      <path d="M 305,434 C 315,520 317,640 311,775 L 281,775 C 283,660 281,565 279,505 C 287,482 295,458 305,434 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 셔링 주름 디테일 -->
      <path d="M 68,560 Q 82,564 96,560" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
      <path d="M 72,600 Q 86,604 100,598" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
      <path d="M 74,640 Q 88,644 102,638" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
      <path d="M 259,560 Q 245,564 231,560" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
      <path d="M 255,600 Q 241,604 227,598" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
      <path d="M 253,640 Q 239,644 225,638" stroke="${INK}" stroke-width="1.3" fill="none" opacity="0.35" />
    </g>`;
  }

  // 클래식 셔츠
  function renderShirt(color, pattern) {
    const isStripe = pattern === '스트라이프' || pattern.includes('스트라이프');
    const isCheck = pattern === '체크' || pattern.includes('체크');
    const patUrl = isStripe ? 'url(#cl-pat-stripe)' : (isCheck ? 'url(#cl-pat-check)' : 'none');

    return `
    <g id="top-shirt">
      <!-- 목 뒤 칼라 안쪽 -->
      <path d="M 122,368 Q 163.5,358 205,368 Q 163.5,364 122,368 Z"
            fill="#1E2A38" stroke="${INK}" stroke-width="1.2" opacity="0.5" />

      <!-- 셔츠 몸판: 목선을 V자로 열어두어 목과 쇄골이 자연스럽게 연출됨 -->
      <path d="M 122,368 
               C 85,372 40,395 20,432 
               C 30,458 40,482 50,505 
               C 48,580 52,650 46,735 
               Q 163.5,745 281,735 
               C 275,650 279,580 277,505 
               C 287,482 297,458 307,432 
               C 287,395 242,372 205,368 
               L 163.5,422 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      ${patUrl !== 'none' ? `
      <path d="M 122,368 C 85,372 40,395 20,432 C 30,458 40,482 50,505 C 48,580 52,650 46,735 Q 163.5,745 281,735 C 275,650 279,580 277,505 C 287,482 297,458 307,432 C 287,395 242,372 205,368 L 163.5,422 Z"
            fill="${patUrl}" />` : ''}

      <!-- 좌측 칼라 날개 -->
      <path d="M 122,368 L 110,422 L 152,402 L 140,368 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 우측 칼라 날개 -->
      <path d="M 205,368 L 217,422 L 175,402 L 187,368 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 앞 단추 여밈선 & 자개 단추 -->
      <line x1="163.5" y1="422" x2="163.5" y2="740" stroke="${INK}" stroke-width="1.6" />
      <circle cx="163.5" cy="460" r="2.2" fill="#FFFFFF" stroke="${INK}" stroke-width="0.7" />
      <circle cx="163.5" cy="510" r="2.2" fill="#FFFFFF" stroke="${INK}" stroke-width="0.7" />
      <circle cx="163.5" cy="560" r="2.2" fill="#FFFFFF" stroke="${INK}" stroke-width="0.7" />
      <circle cx="163.5" cy="610" r="2.2" fill="#FFFFFF" stroke="${INK}" stroke-width="0.7" />
      <circle cx="163.5" cy="660" r="2.2" fill="#FFFFFF" stroke="${INK}" stroke-width="0.7" />

      <!-- 소매 - 왼쪽 -->
      <path d="M 20,432 C 8,520 6,640 16,770 L 48,770 C 44,660 46,565 50,505 C 40,482 30,458 20,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 소매 - 오른쪽 -->
      <path d="M 307,432 C 319,520 321,640 311,770 L 279,770 C 283,660 281,565 277,505 C 287,482 297,458 307,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
    </g>`;
  }

  // 기본 탑 / 화이트 티셔츠
  function renderBasicTop(color) {
    return `
    <g id="top-basic">
      <!-- 목 뒤 안쪽 칼라 림 -->
      <path d="M 124,370 Q 163.5,360 203,370 Q 163.5,364 124,370 Z"
            fill="#D5D5D0" stroke="${INK}" stroke-width="1.2" opacity="0.5" />

      <!-- 몸판: 자연스러운 라운드넥 U자 커브 -->
      <path d="M 124,370 
               C 85,372 40,395 20,432 
               C 30,458 40,482 50,505 
               C 48,580 52,650 46,730 
               Q 163.5,740 281,730 
               C 275,650 279,580 277,505 
               C 287,482 297,458 307,432 
               C 287,395 242,372 203,370 
               Q 163.5,404 124,370 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 라운드넥 립 칼라 밴드 -->
      <path d="M 124,370 Q 163.5,404 203,370 Q 163.5,410 124,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 소매 - 왼쪽 -->
      <path d="M 20,432 C 10,520 8,640 16,770 L 48,770 C 44,660 46,565 50,505 C 40,482 30,458 20,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 소매 - 오른쪽 -->
      <path d="M 307,432 C 317,520 319,640 311,770 L 279,770 C 283,660 281,565 277,505 C 287,482 297,458 307,432 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
    </g>`;
  }

  /**
   * 4. 원피스 렌더링 (isDress: true)
   */
  function renderDress(dress) {
    const color = dress.colorHex || '#D87D56';
    return `
    <g id="dress-crochet">
      <path d="M 68,390 
               L 115,390 
               L 115,445 
               Q 163.5,465 212,445 
               L 212,390 
               L 259,390 
               C 268,450 272,490 277,505 
               C 275,580 272,640 274,690 
               C 290,780 300,960 306,1165 
               C 258,1178 211,1182 163.5,1182 
               C 116,1182 69,1178 21,1165 
               C 27,960 37,780 53,690 
               C 55,640 52,580 50,505 
               C 55,490 59,450 68,390 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <path d="M 68,390 L 115,390 L 115,445 Q 163.5,465 212,445 L 212,390 L 259,390 C 268,450 272,490 277,505 C 275,580 272,640 274,690 C 290,780 300,960 306,1165 C 258,1178 211,1182 163.5,1182 C 116,1182 69,1178 21,1165 C 27,960 37,780 53,690 C 55,640 52,580 50,505 C 55,490 59,450 68,390 Z"
            fill="url(#cl-pat-crochet)" opacity="0.85" />

      ${[21, 39, 57, 75, 93, 111, 129, 147, 165, 183, 201, 219, 237, 255, 273, 291].map(x => `
        <path d="M ${x},1165 Q ${x + 9},1173 ${x + 18},1165" stroke="${INK}" stroke-width="1.4" fill="none" />
      `).join('')}

      <path d="M 66,642 Q 163.5,650 261,642" stroke="${INK}" stroke-width="1.4" fill="none" opacity="0.4" />
      <path d="M 65,654 Q 163.5,662 262,654" stroke="${INK}" stroke-width="1.4" fill="none" opacity="0.4" />
    </g>`;
  }

  /**
   * 5. 덧입기 (layer) 렌더링
   */
  function renderLayer(layer, top) {
    const color = layer.colorHex || '#1C1C24';
    const name = layer.name || '';

    // 벨벳 뷔스티에 탑
    if (name.includes('뷔스티에')) {
      return `
      <g id="layer-bustier">
        <line x1="90" y1="395" x2="90" y2="485" stroke="${color}" stroke-width="3.5" />
        <line x1="90" y1="395" x2="90" y2="485" stroke="${INK}" stroke-width="1.5" />
        <line x1="237" y1="395" x2="237" y2="485" stroke="${color}" stroke-width="3.5" />
        <line x1="237" y1="395" x2="237" y2="485" stroke="${INK}" stroke-width="1.5" />

        <path d="M 90,485 
                 C 110,470 145,475 163.5,502 
                 C 182,475 217,470 237,485 
                 C 259,535 259,620 252,715 
                 Q 163.5,725 75,715 
                 C 68,620 68,535 90,485 Z"
              fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

        <line x1="118" y1="485" x2="112" y2="717" stroke="${INK}" stroke-width="1.2" opacity="0.45" />
        <line x1="163.5" y1="502" x2="163.5" y2="720" stroke="${INK}" stroke-width="1.2" opacity="0.45" />
        <line x1="209" y1="485" x2="215" y2="717" stroke="${INK}" stroke-width="1.2" opacity="0.45" />

        <path d="M 94,505 Q 112,550 104,650" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity="0.2" />
        <path d="M 233,505 Q 215,550 223,650" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity="0.2" />
      </g>`;
    }

    // 레트로 니트 베스트
    return `
    <g id="layer-vest">
      <path d="M 64,395 
               L 115,395 
               L 163.5,525 
               L 212,395 
               L 263,395 
               C 269,545 264,650 256,745 
               Q 163.5,755 71,745 
               C 63,650 58,545 64,395 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M 115,395 L 163.5,525 L 212,395" stroke="${INK}" stroke-width="1.6" fill="none" />
      <path d="M 71,732 Q 163.5,740 256,732" stroke="${INK}" stroke-width="1.2" fill="none" opacity="0.4" />
    </g>`;
  }

  /**
   * 6. 재킷 (jacket) 렌더링
   * 오버핏 라이더 레더 재킷 - 어깨를 100% 감싸는 입체 숄더와 와이드 라펠
   */
  function renderJacket(jacket) {
    const color = jacket.colorHex || '#18181C';
    const darkShade = '#0F0F12';

    return `
    <g id="jacket-rider">
      <!-- 목 뒤 칼라 안쪽 림 -->
      <path d="M 120,364 Q 163.5,355 207,364 Q 163.5,360 120,364 Z"
            fill="${darkShade}" stroke="${INK}" stroke-width="1.4" />

      <!-- 좌측 재킷 몸판 & 어깨: 아바타 어깨를 15~35px 바깥으로 완전히 감싸 어깨 노출 0% 달성 -->
      <path d="M 120,364 
               C 85,372 40,395 18,430 
               C 28,460 38,485 46,508 
               C 44,580 48,655 42,755 
               L 128,755 
               C 126,670 122,570 110,495 
               L 118,482 
               L 80,465 
               C 94,425 108,390 120,364 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 우측 재킷 몸판 & 어깨 -->
      <path d="M 207,364 
               C 242,372 287,395 309,430 
               C 299,460 289,485 281,508 
               C 283,580 279,655 285,755 
               L 199,755 
               C 201,670 205,570 217,495 
               L 209,482 
               L 247,465 
               C 233,425 219,390 207,364 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 좌측 와이드 라이더 라펠 -->
      <path d="M 120,364 L 74,455 L 114,475 L 104,495 L 118,755 L 126,755 L 112,495 L 122,475 L 82,455 L 124,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 우측 와이드 라이더 라펠 -->
      <path d="M 207,364 L 253,455 L 213,475 L 223,495 L 209,755 L 201,755 L 215,495 L 205,475 L 245,455 L 203,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />

      <!-- 라이더 소매 - 왼쪽 -->
      <path d="M 18,430 
               C 6,520 4,640 14,765 
               L 48,765 
               C 42,660 44,570 46,508 
               C 38,485 28,460 18,430 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 라이더 소매 - 오른쪽 -->
      <path d="M 309,430 
               C 321,520 323,640 313,765 
               L 279,765 
               C 285,660 283,570 281,508 
               C 289,485 299,460 309,430 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 은색 스냅 단추들 & 사선 메탈 지퍼 트랙 -->
      <circle cx="86" cy="465" r="2.5" fill="#E0E0E0" stroke="${INK}" stroke-width="0.8" />
      <circle cx="241" cy="465" r="2.5" fill="#E0E0E0" stroke="${INK}" stroke-width="0.8" />
      <line x1="110" y1="520" x2="118" y2="755" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="3 2" opacity="0.8" />

      <!-- 밑단 벨트 루프 -->
      <line x1="68" y1="752" x2="132" y2="750" stroke="${INK}" stroke-width="1.5" />
      <line x1="195" y1="750" x2="259" y2="752" stroke="${INK}" stroke-width="1.5" />
    </g>`;
  }

  /**
   * 7. 코트 / 아우터 (coat) 렌더링
   * 핸드메이드 롱 코트 - 목 뒤를 감싸는 3D 스탠드 칼라와 테일러드 노치 라펠
   */
  function renderCoat(coat) {
    const color = coat.colorHex || '#A77443';
    const darkShade = '#785028';

    return `
    <g id="coat-handmade-long">
      <!-- 목 뒤 카라 안쪽 림 (목 뒤를 자연스럽게 감싸 도는 3D 테일러드 칼라) -->
      <path d="M 120,364 Q 163.5,355 207,364 Q 163.5,360 120,364 Z"
            fill="${darkShade}" stroke="${INK}" stroke-width="1.4" />

      <!-- 좌측 코트 몸판 & 어깨: 아바타 어깨 바깥으로 15~35px 감싸 어깨 노출 0% 달성 -->
      <path d="M 120,364 
               C 85,372 40,395 18,430 
               C 28,460 38,485 46,508 
               C 42,650 36,850 26,1145 
               L 128,1145 
               C 136,950 136,780 130,640 
               C 126,590 120,535 106,495 
               L 116,482 
               L 78,465 
               C 92,425 108,390 120,364 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 우측 코트 몸판 & 어깨 -->
      <path d="M 207,364 
               C 242,372 287,395 309,430 
               C 299,460 289,485 281,508 
               C 285,650 291,850 301,1145 
               L 199,1145 
               C 191,950 191,780 197,640 
               C 201,590 207,535 221,495 
               L 211,482 
               L 249,465 
               C 235,425 219,390 207,364 
               Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 좌측 테일러드 노치 라펠 (입체적인 깃 접힘) -->
      <path d="M 120,364 L 78,465 L 116,482 L 106,495 C 114,535 118,580 122,635 L 126,635 C 124,580 120,535 112,495 L 122,482 L 88,465 L 124,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />
      <line x1="120" y1="364" x2="106" y2="495" stroke="${INK}" stroke-width="1.4" opacity="0.35" />

      <!-- 우측 테일러드 노치 라펠 -->
      <path d="M 207,364 L 249,465 L 211,482 L 221,495 C 213,535 209,580 205,635 L 201,635 C 203,580 207,535 215,495 L 205,482 L 239,465 L 203,370 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" />
      <line x1="207" y1="364" x2="221" y2="495" stroke="${INK}" stroke-width="1.4" opacity="0.35" />

      <!-- 코트 소매 - 왼쪽 (어깨 18,430에서 손목 y:770까지 볼륨감 있는 유려한 곡선) -->
      <path d="M 18,430 
               C 4,520 2,640 14,770 
               L 52,770 
               C 46,670 44,580 46,508 
               C 38,485 28,460 18,430 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 코트 소매 - 오른쪽 -->
      <path d="M 309,430 
               C 323,520 325,640 313,770 
               L 275,770 
               C 281,670 283,580 281,508 
               C 289,485 299,460 309,430 Z"
            fill="${color}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 테일러드 웰트 포켓 -->
      <line x1="54" y1="835" x2="98" y2="835" stroke="${INK}" stroke-width="1.6" />
      <line x1="229" y1="835" x2="273" y2="835" stroke="${INK}" stroke-width="1.6" />

      <!-- 고급 우드/혼 더블 단추 디테일 -->
      <circle cx="122" cy="640" r="3.2" fill="#3E2B1E" stroke="${INK}" stroke-width="1" />
      <circle cx="120" cy="715" r="3.2" fill="#3E2B1E" stroke="${INK}" stroke-width="1" />
      <circle cx="205" cy="640" r="3.2" fill="#3E2B1E" stroke="${INK}" stroke-width="1" />
      <circle cx="207" cy="715" r="3.2" fill="#3E2B1E" stroke="${INK}" stroke-width="1" />
    </g>`;
  }

  /**
   * 8. 신발 렌더링
   * 시안의 발(y:1278 ~ 1356)을 완벽히 감싸는 미니멀 포인티드 뮬
   */
  function renderShoes() {
    return `
    <g id="shoes">
      <!-- 왼발 뮬 (발가락 노출 완벽 차단) -->
      <path d="M 70,1278 
               C 62,1310 48,1335 38,1350 
               C 65,1360 102,1358 122,1338 
               C 120,1310 118,1292 118,1278 
               Z"
            fill="${SHOE_COLOR}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
      <line x1="38" y1="1350" x2="122" y2="1338" stroke="${INK}" stroke-width="2" />

      <!-- 오른발 뮬 (발가락 노출 완벽 차단) -->
      <path d="M 257,1278 
               C 265,1310 279,1335 289,1350 
               C 262,1360 225,1358 205,1338 
               C 207,1310 209,1292 209,1278 
               Z"
            fill="${SHOE_COLOR}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" />
      <line x1="289" y1="1350" x2="205" y2="1338" stroke="${INK}" stroke-width="2" />
    </g>`;
  }

})();
