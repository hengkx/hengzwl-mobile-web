import { useFetch } from '@/hooks';
import { Avatar, Button, Input, Skeleton, Typography } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Article } from '..';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const { Text } = Typography;

function ArticlePage() {
  const [title, setTitle] = useState('');
  const [html, setHtml] = useState('');

  const { id } = useParams() || {};

  const { data } = useFetch<Article>(id ? `/api/article/${id}` : null);

  const router = useRouter();

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <Skeleton loading={!data}>
        {data && (
          <div className="flex flex-col gap-4">
            <div className="text-xl">{data.title}</div>
            <div className="flex items-center gap-1">
              <Avatar
                src={
                  !data.user.avatar.startsWith('http')
                    ? 'https://oss.hengzwl.com/'
                    : '' + data.user.avatar
                }
              />
              <Text style={{ fontSize: 16 }}>{data.user.name}</Text>
              <Text style={{ fontSize: 16 }} type="secondary">
                {dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </div>
            <div className="" dangerouslySetInnerHTML={{ __html: data.html }} />
          </div>
        )}
      </Skeleton>
    </div>
  );
}

export default ArticlePage;
