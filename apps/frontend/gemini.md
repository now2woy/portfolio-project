# Gemini Code Assist 프로젝트 가이드

이 문서는 Gemini Code Assist가 이 프로젝트를 이해하고 일관성 있는 코드를 생성하는 데 도움을 주기 위한 가이드입니다.

## 1. 프로젝트 개요

- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS, shadcn/ui
- **상태 관리**:
    - 서버 상태: `@tanstack/react-query`
    - 클라이언트 상태: `useState`, `useRef` 및 `zustand` (예: `useAuthStore`)
- **API 통신**: BFF(Backend for Frontend) 패턴을 사용하며, `services/` 디렉토리의 클라이언트 서비스를 통해 API를 호출합니다.

## 2. 주요 아키텍처 및 패턴

### 컴포넌트 구조

- **`components/`**: 재사용 가능한 UI 컴포넌트가 위치합니다.
    - **`Buttons/`**: `LinkButton`, `MutationButton`, `ButtionArea` 등 버튼 관련 컴포넌트가 있습니다. `ButtionArea`는 버튼 설정을 배열로 받아 동적으로 버튼 그룹을 렌더링하는 중요한 패턴입니다.
    - **`Viewers/`**: `FormViewer`, `StaticViewer` 등 데이터 표시 및 입력을 위한 컴포넌트가 있습니다.
    - **`Grids/`**: 데이터 테이블(`Grid`, `DndTable`) 관련 컴포넌트가 있습니다.
- **`app/(main)/`**: 각 페이지의 라우팅 및 클라이언트 컴포넌트(`client.tsx`)가 위치합니다.

### 데이터 페칭

- 모든 서버 데이터 조회는 `@tanstack/react-query`의 `useQuery`를 사용합니다.
- 데이터 생성/수정/삭제는 `useMutation`을 사용하며, 재사용성을 위해 `MutationButton` 컴포넌트로 추상화되어 있습니다.

### 상태 관리

- 폼 데이터나 UI 상태 등 지역적인 상태는 `useState`를 사용합니다.
- 전역 사용자 인증 정보는 `zustand`를 사용한 `useAuthStore`로 관리합니다.

## 3. 코딩 컨벤션 및 규칙

- **네이밍**: 컴포넌트와 타입 이름은 `PascalCase`를 사용합니다. (예: `MutationButton`, `IFormFieldProps`)
- **주석**: 모든 함수와 컴포넌트에는 JSDoc 형식으로 한글 주석을 작성하여 그 목적과 파라미터를 명확히 설명합니다.
- **재사용성**: 반복되는 UI 로직이나 API 호출 로직은 별도의 컴포넌트나 훅으로 분리하여 재사용성을 높입니다. `ButtionArea` 컴포넌트가 좋은 예시입니다.
- **파일 분리**: 서버 컴포넌트와 클라이언트 컴포넌트의 로직은 명확히 분리합니다. 페이지 진입점은 서버 컴포넌트로 두고, 인터랙션이 필요한 부분은 `'use client'`를 사용한 클라이언트 컴포넌트로 분리합니다.
- **API 호출 규칙**: `services/server` 디렉토리의 함수는 백엔드 API를 호출합니다. **백엔드에 실제 구현된 API 엔드포인트만 사용해야 하며, 임의로 새로운 URL을 생성하여 호출하는 로직을 추가해서는 안 됩니다.**
- **API 호출 규칙**: `services/client` 디렉토리의 함수는 BFF API를 호출합니다. **BFF 서비스는 app/bff 디렉토리 아래 존재합니다.**
- **서버 서비스 생성 규칙**: "XXX타입, XXX url로 XXX 서버 서비스를 만들어 줘" 라는 요청을 받으면, `services/server/CdGroupServerService.ts`를 참고하여 `apiFetch` 헬퍼 함수를 사용하는 서버 서비스 파일을 생성합니다. 이 파일은 기본적으로 5가지 표준 CRUD 함수(페이지 조회, 단건 조회, 입력, 수정, 삭제)를 포함하며, 필요에 따라 관련 자원을 처리하는 함수를 추가할 수 있습니다.
- **BFF 서비스 생성 규칙**: "XXX 서버 서비스를 참고해서 BFF 서비스를 만들어 줘" 라는 요청을 받으면, 해당 서버 서비스의 함수들을 기반으로 BFF 라우트 핸들러를 생성합니다.
    - **마스터 서비스 (`/bff/[resource]/route.ts`)**: 페이지 조회(GET), 입력(POST) 함수를 포함합니다.
    - **PK 서비스 (`/bff/[resource]/[id]/route.ts`)**: 단건 조회(GET), 수정(PUT), 삭제(DELETE) 함수를 포함합니다.
    - 생성 요청 시 기존 대화 맥락을 무시하고, 파일 내용을 확인하여 없는 함수만 추가합니다.
- **클라이언트 서비스 생성 규칙**: "XXX BFF 서비스를 이용해서 클라이언트 서비스를 만들어줘" 라는 요청을 받으면, `app/bff/[resource]` 와 `app/bff/[resource]/[id]` 에 있는 마스터/PK BFF 서비스를 참고하여 5가지 표준 함수(페이지 조회, 단건 조회, 입력, 수정, 삭제)를 포함하는 클라이언트 서비스 파일을 `services/client` 디렉토리에 생성합니다.
- **쿼리 생성 규칙**: "XXX 클라이언트 서비스의 패치 함수를 쿼리파일로 만들어 줘" 라는 요청을 받으면, 해당 클라이언트 서비스의 조회 함수들(페이지 조회, 단건 조회)을 `react-query`의 `useQuery`에서 사용할 수 있도록 쿼리 키(`keys`)와 fetch 함수를 포함하는 파일을 `queries` 디렉토리에 생성합니다.
