# 🛒 쇼핑 리스트 앱

순수 HTML/CSS/JS로 만든 쇼핑 리스트 웹 앱입니다. 빌드 과정 없이 브라우저에서 바로 실행됩니다.

## 기능

- 아이템 추가 (버튼 클릭 또는 Enter 키)
- 체크박스로 완료 처리 (취소선 표시)
- 개별 아이템 삭제
- 완료 항목 일괄 삭제
- 전체 / 완료 / 남음 통계 바
- localStorage로 새로고침 후에도 데이터 유지

## 실행 방법

```bash
# Windows
start index.html

# macOS
open index.html
```

`index.html`을 브라우저에서 직접 열면 바로 사용할 수 있습니다.

## 구조

| 파일 | 역할 |
|------|------|
| `index.html` | DOM 구조 |
| `style.css` | 스타일 및 애니메이션 |
| `app.js` | 상태 관리 및 로직 |
