import { useFetch } from '@/hooks';
import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export interface Article {
  id: string;
  title: string;
  html: string;
  createdAt: number;
  updatedAt: number;
}

interface ArticleList {
  data: Article[];
  total: number;
}

function ArticlePage() {
  const { data } = useFetch<ArticleList>('/api/article/admin');

  const router = useRouter();

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <Button type="primary" onClick={() => router.push('/article/add')}>
        新增
      </Button>
      <Table
        bordered
        rowKey="id"
        columns={[
          { title: 'Id', dataIndex: 'id' },
          { title: '标题', dataIndex: 'title' },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            title: '编辑时间',
            dataIndex: 'updatedAt',
            render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            title: '操作',
            dataIndex: 'id',
            render: (text) => (
              <Button type="link" size="small" onClick={() => router.push(`/article/${text}`)}>
                编辑
              </Button>
            ),
          },
        ]}
        pagination={{ total: data?.total || 0, pageSize: 100 }}
        dataSource={data?.data || []}
      />
    </div>
  );
}

export default ArticlePage;
