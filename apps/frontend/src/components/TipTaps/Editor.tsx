'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ITipTapEditorProps } from '@/types/TipTapType'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered } from 'lucide-react'

/**
 * TipTap 에디터
 * @param param
 * @returns
 */
export function TiptapEditor({ content, onUpdate }: ITipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // 버튼에 맞는 기능만 활성화합니다.
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false }
            })
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML())
        }
    })

    if (!editor) {
        return null // 에디터 인스턴스가 생성되기 전에는 null 반환
    }

    return (
        <div
            className="rounded-md border"
            onClick={() => editor.commands.focus()}>
            {/* 툴바 컴포넌트 */}
            <div className="flex flex-wrap items-center gap-1 border-b p-2">
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleBold().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleItalic().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleStrike().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleCodeBlock().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                    variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <Code className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleBulletList().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleOrderedList().run()
                        onUpdate(editor.getHTML())
                    }}
                    disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                    variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
                    size="sm"
                    type="button">
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>
            {/* 에디터 본문 */}
            <EditorContent
                editor={editor}
                className="min-h-[300px] p-4"
            />
        </div>
    )
}
