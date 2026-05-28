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
  CodeToggle,
  CreateLink,
  linkDialogPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  tablePlugin,
  ListsToggle,
  BlockTypeSelect,
  ChangeAdmonitionType,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  GenericDirectiveEditor,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

import { proseStyle } from "@/app/lib/styles";

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps) {
  return (
    <MDXEditor
      ref={editorRef}
      contentEditableClassName={proseStyle}
      plugins={[
        headingsPlugin(),
        linkPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkDialogPlugin(),
        tablePlugin(),
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
        imagePlugin(),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <BlockTypeSelect />
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <ListsToggle />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
    />
  );
}
