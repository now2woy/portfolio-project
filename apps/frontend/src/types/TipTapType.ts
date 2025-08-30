/**
 * Tiptap 에디터 프로퍼티 정의
 */
export interface ITipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
}

/**
 * Tiptap 뷰어 프로퍼티 정의
 */
export interface ITipTapViewerProps {
  content: string;
}