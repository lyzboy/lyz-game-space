"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  MDXEditor,
  linkPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const proseClasses = `
  prose prose-slate mt-3 max-w-none
  text-md
  prose-p:my-2
  prose-h1:text-3xl
  prose-h2:text-2xl
  prose-h3:text-xl
  prose-h4:text-base 
  prose-h4:bg-red-200 
  prose-h4:inline
  prose-h4:p-2
  prose-h4:rounded-md
  prose-h5:text-base
  prose-h5:bg-blue-200 
  prose-h5:inline
  prose-h5:p-2
  prose-h5:rounded-md
  prose-h6:text-base
  prose-h6:bg-green-200 
  prose-h6:inline
  prose-h6:p-2
  prose-h6:rounded-md
  prose-headings:font-bold
  prose-headings:mb-2
  prose-headings:mt-4
  prose-a:text-sky-600
  hover:prose-a:underline
  prose-code:before:content-none
  prose-code:after:content-none
  prose-pre:rounded-xl
  dark:prose-invert
  prose-headings:text-black
  prose-p:text-black
  prose-strong:text-black
  prose-em:text-black
  prose-li:text-black
  prose-a:text-black
  prose-blockquote:text-black
  prose-code:text-gray-500
`;

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      contentEditableClassName={proseClasses}
      plugins={[
        headingsPlugin(),
        linkPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            "": "Text",
            js: "JavaScript",
            ts: "TypeScript",
            jsx: "JavaScript (React)",
            html: "HTML",
            css: "CSS",
            java: "Java",
            py: "Python",
            csharp: "C#",
            tsx: "TypeScript (React)",
          },
        }),
        markdownShortcutPlugin(),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
    />
  );
}
