import { useFetch } from '@/hooks';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Article } from '.';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

const WangEditor = dynamic(() => import('../../components/WangEditor'), { ssr: false });

function ArticlePage() {
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');

  const { id } = useParams() || {};

  const { data } = useFetch<Article>(id && id !== 'add' ? `/api/article/${id}` : null);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setHtml(data.html);
    }
  }, [data]);

  const handleSave = async () => {
    const res = await axios.post('/api/article', { ...data, title, html });
    console.log(res);
    if (res.code === 0) {
      message.success('保存成功');
      if (id === 'add') {
        router.push(`/article/${res.data.id}`);
      }
    } else {
      message.error('保存失败');
    }
  };

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="标题" />
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
      <WangEditor html={html} onChange={setHtml} />
    </div>
  );
}

export default ArticlePage;
