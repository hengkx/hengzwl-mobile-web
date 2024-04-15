import { useEffect, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

interface WangEditorProps {
  html?: string;
  onChange?: (html: string) => void;
}

function WangEditor({ onChange, ...props }: WangEditorProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  useEffect(() => {
    if ('html' in props) {
      setHtml(props.html || '');
    }
  }, [props]);

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    autoFocus: false,
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: 'http://localhost:5001/api/file/upload',
        fieldName: 'file',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        customInsert: (res: any, insertFn: any) => {
          insertFn(res.data);
        },
        // onSuccess: (res, insertImg) => {}
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="flex flex-col flex-1" style={{ border: '1px solid #d9d9d9', zIndex: 100 }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #d9d9d9' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => {
          const val = editor.getHtml();
          setHtml(val);
          onChange?.(val);
        }}
        mode="default"
        style={{ flex: 1, overflowY: 'hidden' }}
      />
    </div>
  );
}

export default WangEditor;
