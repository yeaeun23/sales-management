# sales-management

### 1. 기여도
- 화면 디자인, DB 설계, 개발 100%
- 기획 50%
- 서버 구축 50%

### 2. 개발 기간
- 2022.10 ~ 2023.03 (총 6개월)

### 3. 특징
- 영업 관리 시스템 '더 게이지(The Gauge)'의 실사용자는 영업 컨설턴트 및 영업 사원입니다.
- 기존에 MS Excel로 작성하던 시트를 React+Node.js+AWS 기반의 웹으로 구현한 시스템입니다.
- 사용자가 시트를 작성하며 어떤 항목에 강점/약점/불명확 사인(Sign)을 체크하면, 전략 분석 항목에 자동으로 입력됩니다.
- 연도별/거래처별/TGP별 수주 금액을 한눈에 볼 수 있습니다.

### 4. 웹서비스 구조

![11](https://user-images.githubusercontent.com/14077108/227976514-ced8ab15-f169-43fd-85d0-ceda15fe45c7.png)

<br>

## 기능 및 화면

### 1. 로그인
- 아이디와 비밀번호를 체크합니다.
- 로그인 시 활성/비활성/관리자 계정을 구분합니다.

![로그인](https://user-images.githubusercontent.com/14077108/227864499-1dd47244-a138-4307-b51e-7fcdd0189807.png)

<br>

### 2. 메뉴
- 공지사항, 거래처, 계정관리, 로그아웃

![thegauge co kr_account](https://user-images.githubusercontent.com/14077108/227885388-23d7d25d-6cb6-46e3-827e-1f0111c6c771.png)

<br>

### 3. 거래처 목록
- 거래처를 생성하고, 이름을 수정할 수 있습니다.
- 연도별/거래처별 성공 수주 금액을 한눈에 볼 수 있습니다.

![thegauge co kr_account (1)](https://user-images.githubusercontent.com/14077108/227886204-c7c92257-cef2-44a8-91f6-375d76896a36.png)

<br>

### 4. 거래처 > TGP 목록
- TGP를 생성하고, 이름과 진행 상태를 수정할 수 있습니다.
- 연도별/TGP별로 진행 상태와 수주 금액을 한눈에 볼 수 있습니다.

![thegauge co kr_account (2)](https://user-images.githubusercontent.com/14077108/227887164-54100d46-19fb-4de4-ae6b-5f2aa6aee935.png)

<br>

### 5. 거래처 > TGP > 시트
- 중간 저장한 시트를 이어서 작성하거나, 이어서 작성할게 없으면(완료되었으면) 새로 작성할 수 있습니다.
- 완료된 시트를 복사 후 불러올 수 있습니다.

![thegauge co kr_account (5)](https://user-images.githubusercontent.com/14077108/227889655-dc89223c-3136-4288-a200-8c7290f23393.png)

- 시트는 총 3단계로 나누어 작성하며, 중간 저장이 가능합니다.

![thegauge co kr_account (6)](https://user-images.githubusercontent.com/14077108/227889709-7aeb9ee0-ffe4-4223-a9ce-5f16a5d122c4.png)

- 필요한 항목마다 행 추가/삭제를 할 수 있습니다.

![thegauge co kr_account (7)](https://user-images.githubusercontent.com/14077108/227889746-acad8d5a-0e78-4276-9764-820059290cef.png)

- 2단계에서 체크한 강점/약점/불명확 사인(Sign)이 3단계에서 전략 분석 항목으로 자동 입력됩니다.

![thegauge co kr_account (8)](https://user-images.githubusercontent.com/14077108/227889768-bd458e6e-c7aa-4ed7-ba28-07977c8cbb1c.png)

<br>

### 5. 거래처 > TGP > 시트 미리보기
- 작성한 시트를 한눈에 보고, 인쇄할 수 있습니다.
- 3단계 전략 분석에서 음영 처리된 칸이 자동으로 입력된 항목입니다. 

![thegauge co kr_account_119_109_193_preview](https://user-images.githubusercontent.com/14077108/227889865-d76324d7-e417-4cca-a24c-4868a82f4441.png)

<br>

## DB 구조

![제목 없음](https://user-images.githubusercontent.com/14077108/227973013-a5ada6dc-8b57-414e-a07f-b9563040c3b4.png)
