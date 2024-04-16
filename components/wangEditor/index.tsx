import { useEffect, useState } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { Boot, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';
import axios from 'axios';
import ImageWidthAuto from './ImageWidthAuto';

const imageWidthAutoMenuConf = {
  key: 'imageWidthAuto', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new ImageWidthAuto(); // 把 `YourMenuClass` 替换为你菜单的 class
  },
};

Boot.registerMenu(imageWidthAutoMenuConf);

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
    hoverbarKeys: {
      image: {
        menuKeys: [
          'imageWidth30',
          'imageWidth50',
          'imageWidth100',
          'imageWidthAuto',
          'deleteImage',
        ],
      },
    },
    MENU_CONF: {
      uploadImage: {
        server: `${axios.defaults.baseURL}/api/file/upload`,
        fieldName: 'file',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        customInsert: (res: any, insertFn: any) => {
          insertFn(res.data);
        },
        // onSuccess: (res, insertImg) => {}
      },
    },
  };

  // console.log(editor?.getAllMenuKeys());

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div
      className="article flex flex-col flex-1 overflow-y-hidden"
      style={{ border: '1px solid #d9d9d9', zIndex: 100 }}
    >
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
        style={{ flex: 1, overflowY: 'auto' }}
      />
    </div>
  );
}

export default WangEditor;
