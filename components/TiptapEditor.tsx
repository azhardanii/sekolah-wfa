'use client';

import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import HardBreak from '@tiptap/extension-hard-break';

type Props = {
  content?: string;
  onChange?: (html: string) => void;
};

export default function TiptapEditor({ content = '', onChange }: Props) {
    const editor = useEditor({
        extensions: [
          StarterKit.configure({
            hardBreak: false,
          }),
          HardBreak.extend({
            addKeyboardShortcuts() {
              return {
                'Enter': () => this.editor.commands.setHardBreak(),
              };
            },
          }),
          Image,
          Underline,
          Heading.configure({ levels: [2, 3, 4] }),
          BulletList,
          OrderedList,
          ListItem,
          Placeholder.configure({
              placeholder: 'Tulis konten mading di sini...',
          }),
          Link.configure({
              autolink: true,
              openOnClick: true,
              linkOnPaste: true,
              HTMLAttributes: {
                  class: 'text-blue-600 underline hover:text-blue-800 transition',
                  target: '_blank',
                  rel: 'noopener noreferrer',
              },
          }),
          Youtube.configure({
              width: 640,
              height: 360,
              allowFullscreen: true,
              HTMLAttributes: {
                class: 'rounded-md shadow-md mx-auto',
              },
          }),
        ],
        content,
        editorProps: {
          attributes: {
              class: 'prose prose-sm sm:prose lg:prose-lg max-w-none p-4 outline-none min-h-[200px] border border-gray-300 rounded-md',
          },
        },
        onUpdate({ editor }) {
          onChange?.(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) {
          return;
        }
  
        // Bandingkan konten prop dengan konten internal editor
        const isSame = editor.getHTML() === content;
  
        // Jika tidak sama, baru perbarui konten editor.
        // Ini penting untuk menghindari infinite loop.
        if (!isSame) {
          // Parameter kedua `false` mencegah onUpdate trigger lagi untuk perubahan ini
          editor.commands.setContent(content, false);
        }
    }, [content, editor]);

    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editor || !editorRef.current) return;
    
        const handlePaste = (event: ClipboardEvent) => {
          const text = event.clipboardData?.getData('text/plain') || '';
          const isYouTubeLink =
            text.includes('youtube.com/watch') || text.includes('youtu.be');
    
          if (isYouTubeLink) {
            event.preventDefault();
            editor
              .chain()
              .focus()
              .setYoutubeVideo({
                src: text,
                width: 640,
                height: 360,
              })
              .run();
          }
        };
    
        const el = editorRef.current;
        el.addEventListener('paste', handlePaste);
    
        return () => {
          el.removeEventListener('paste', handlePaste);
        };
      }, [editor]);

    return (
        <div className="editor-wrapper">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2 text-sm">
            <button type='button' onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded hover:bg-gray-100">Bold</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded hover:bg-gray-100">Italic</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleUnderline().run()} className="px-2 py-1 border rounded hover:bg-gray-100">Underline</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className="px-2 py-1 border rounded hover:bg-gray-100">H1</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded hover:bg-gray-100">H2</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className="px-2 py-1 border rounded hover:bg-gray-100">H3</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded hover:bg-gray-100">• List</button>
            <button type='button' onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded hover:bg-gray-100">1. List</button>
            <button type='button' onClick={() => { const url = window.prompt('Masukkan URL gambar'); if (url) { editor?.chain().focus().setImage({ src: url }).run(); }}} className="px-2 py-1 border rounded">🖼️ Gambar</button>
            <button type='button'
                onClick={() => {
                    const previousUrl = editor?.getAttributes('link').href;
                    const url = window.prompt('Masukkan URL link', previousUrl || '');
                    if (url === null) return;
                    if (url === '') {
                        editor?.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }
                    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }} className="px-2 py-1 border rounded">
                🔗 Link
            </button>
        </div>

        {/* Editor Area */}
        <div ref={editorRef} className="max-h-96 w-full overflow-auto focus:outline-none">
            <EditorContent editor={editor} />
        </div>
      </div>
    );
}