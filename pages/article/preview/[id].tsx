import { Avatar, Skeleton, Typography } from 'antd';
import { Article } from '..';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useFetch } from '@/hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';

dayjs.extend(relativeTime);

const { Text } = Typography;

function ArticlePage() {
  const { id } = useParams() || {};

  const { data } = useFetch<Article>(id ? `/api/article/${id}` : null);

  useEffect(() => {
    if (id) {
      axios.post(`/api/article/${id}/views`);
    }
  }, [id]);

  return (
    <div className="article h-screen p-4 flex flex-col gap-4 max-w-[680px] mx-auto">
      <Skeleton loading={!data}>
        {data && (
          <div className="flex flex-col">
            <div className="text-xl font-bold">{data.title}</div>
            <div className="flex items-center gap-2 mt-4">
              <Avatar
                src={
                  (!data.user.avatar.startsWith('http') ? 'https://oss.hengzwl.com/' : '') +
                  data.user.avatar
                }
              />
              <div className="flex flex-col gap-1 flex-1">
                <div style={{ fontSize: 14, lineHeight: 1 }}>{data.user.name}</div>
                <Text style={{ fontSize: 12, lineHeight: 1 }} type="secondary">
                  {dayjs(data.createdAt).fromNow()}
                </Text>
              </div>
              <div>
                <Text style={{ fontSize: 14, lineHeight: 1 }} type="secondary">
                  <EyeOutlined /> {data.views}
                </Text>
              </div>
            </div>
            <div className="" dangerouslySetInnerHTML={{ __html: data.html }} />
          </div>
        )}
      </Skeleton>
    </div>
  );
}

export default ArticlePage;
