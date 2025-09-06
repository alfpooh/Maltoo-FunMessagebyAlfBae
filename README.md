# 내 말투 변환기 / My Speaking Style Transformer 🎭✨

*AI-powered text transformation app that converts your text into personalized speaking styles*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/alfpoohs-projects/v0-mobile-app-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/r5psXjGIdgM)

## 🌟 개요 / Overview

**한국어:**
내 말투 변환기는 사용자가 입력한 텍스트를 개인화된 말투와 스타일로 변환해주는 AI 기반 모바일 웹 앱입니다. 단순히 친근한 말투로 바꾸는 것을 넘어서, 사용자가 원하는 특정한 말투 스타일을 학습하고 적용합니다.

**English:**
My Speaking Style Transformer is an AI-powered mobile web app that converts user input text into personalized speaking styles. Beyond simply making text friendly, it learns and applies specific speaking styles that users desire.

## 🎯 주요 기능 / Key Features

### 📝 개인화된 말투 변환 / Personalized Style Conversion
- **사용자 정의 말투**: 원하는 말투나 스타일을 직접 설정
- **AI 기반 변환**: Groq AI를 활용한 자연스러운 텍스트 변환
- **실시간 처리**: 입력 후 2초 자동 변환 또는 즉시 변환

### 🎨 Material 3 디자인 / Material 3 Design
- **다크/라이트 모드**: 사용자 선호에 따른 테마 전환
- **반응형 디자인**: 모바일 최적화된 인터페이스
- **이모지 활용**: 풍부한 이모지와 컬러풀한 텍스트

### ⚡ 편의 기능 / Convenience Features
- **원클릭 복사**: 변환된 텍스트 즉시 클립보드 복사
- **클리어 기능**: 입력/출력 텍스트 한번에 초기화
- **로컬 저장**: 말투 설정 자동 저장 및 복원

## 🚀 언제 사용하면 좋을까요? / When to Use

### 📱 소셜 미디어 / Social Media
- **SNS 게시물**: 딱딱한 텍스트를 친근하고 매력적으로 변환
- **메신저 대화**: 상황에 맞는 말투로 메시지 작성
- **댓글 작성**: 예의바르고 따뜻한 톤으로 소통

### 💼 비즈니스 / Business
- **고객 응대**: 친근하면서도 전문적인 고객 서비스 메시지
- **마케팅 콘텐츠**: 브랜드 톤앤매너에 맞는 텍스트 작성
- **이메일 작성**: 상황에 적합한 어조로 업무 메일 작성

### 🎓 학습 및 창작 / Learning & Creative
- **언어 학습**: 다양한 말투와 표현 방식 학습
- **창작 활동**: 캐릭터별 고유한 말투 개발
- **번역 후 자연화**: 번역된 텍스트를 자연스러운 한국어로 변환

## 🛠️ 기술 스택 / Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **AI Integration**: Groq API
- **Theme**: next-themes (다크/라이트 모드)
- **Deployment**: Vercel

## 📖 사용법 / How to Use

### 1️⃣ 기본 사용법 / Basic Usage
1. 상단 입력창에 변환하고 싶은 텍스트 입력
2. 2초 대기 후 자동 변환 또는 "지금 변환하기" 버튼 클릭
3. 하단에 변환된 결과 확인
4. 복사 버튼으로 결과 텍스트 복사

### 2️⃣ 말투 설정 / Style Configuration
1. 우상단 설정(⚙️) 버튼 클릭
2. "내 말투 설정"에서 원하는 스타일 입력
   - 예: "친근하고 귀여운 말투, 반말 사용"
   - 예: "정중하고 예의바른 존댓말"
   - 예: "유머러스하고 재미있는 표현"
3. "말투 저장하기" 버튼으로 설정 완료

### 3️⃣ 테마 변경 / Theme Change
1. 설정 메뉴에서 "테마 설정" 확인
2. 라이트/다크 모드 선택
3. 즉시 전체 앱 테마 적용

## 🎭 말투 스타일 예시 / Style Examples

| 설정 키워드 | 변환 결과 예시 |
|------------|---------------|
| "반말, 친구같은" | "안녕! 오늘 뭐해? 😊" |
| "정중한, 존댓말" | "안녕하세요! 오늘 어떻게 지내세요? 😊" |
| "귀여운, 애교" | "안녕하세요~ 오늘도 좋은 하루 보내세요! >.<" |
| "유머, 재미있는" | "안녕하세요! 오늘도 화이팅이에요! 🤣✨" |

## 🔧 개발 및 배포 / Development & Deployment

### 로컬 개발 / Local Development
\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
\`\`\`

### 환경 변수 / Environment Variables
\`\`\`env
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

## 🌐 라이브 데모 / Live Demo

**배포된 앱**: [https://vercel.com/alfpoohs-projects/v0-mobile-app-design](https://vercel.com/alfpoohs-projects/v0-mobile-app-design)

**개발 계속하기**: [https://v0.app/chat/projects/r5psXjGIdgM](https://v0.app/chat/projects/r5psXjGIdgM)

## 📱 모바일 최적화 / Mobile Optimization

- **터치 친화적 UI**: 모바일 터치에 최적화된 버튼과 입력창
- **반응형 레이아웃**: 다양한 화면 크기 지원
- **빠른 로딩**: 최적화된 번들 크기와 로딩 속도
- **오프라인 지원**: 네트워크 오류 시 로컬 변환 기능 제공

## 🤝 기여하기 / Contributing

이 프로젝트는 [v0.app](https://v0.app)에서 자동으로 동기화됩니다. 변경사항은 v0 인터페이스를 통해 적용해주세요.

## 📄 라이선스 / License

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

**Made by Alf Bae, 2025**

*이 앱은 사용자의 개성 있는 소통을 돕기 위해 만들어졌습니다. 여러분만의 특별한 말투로 더 따뜻한 대화를 나누세요! 🌟*
