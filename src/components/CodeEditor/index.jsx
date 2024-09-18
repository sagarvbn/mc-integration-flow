import { useRef } from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = ({ defaultValue, defaultLanguage, height }) => {
  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    console.log('hhh', editor, monaco)
    editorRef.current = editor
  }
  return (
    <Editor
      height={height}
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue || ''}
      onMount={handleEditorDidMount}
    />
  )
}

export default CodeEditor
