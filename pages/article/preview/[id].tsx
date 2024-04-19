import { Avatar, Skeleton, Typography } from 'antd';
import { Article } from '..';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useFetch } from '@/hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

dayjs.extend(relativeTime);

const { Text } = Typography;

function ArticlePage() {
  const { id } = useParams() || {};

  const { data, mutate } = useFetch<Article>(id ? `/api/article/${id}` : null);

  useEffect(() => {
    if (id) {
      axios.post(`/api/article/${id}/views`);
    }
  }, [id]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      var target = event.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        // 检查目标元素是否是 HTMLImageElement 类型
        const url = target.src;
        console.log(url);
        const images: string[] = [];
        // 获取当前点击元素的父级元素
        const parent = target.parentElement;
        if (parent) {
          // 遍历父级元素的子元素
          const siblings = parent.children;
          for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            // 筛选出所有的图片元素
            if (sibling instanceof HTMLImageElement) {
              images.push(sibling.src);
            }
          }
        }
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: 'previewImage', images, index: images.indexOf(url) })
        );
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="article h-screen p-4 flex flex-col gap-4 max-w-[680px] mx-auto">
      <Skeleton loading={!data}>
        {data && (
          <div className="flex flex-col gap-4 pb-4">
            <div className="text-xl font-bold">{data.title}</div>
            <div className="flex items-center gap-2">
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
            <div className="flex items-end justify-end">
              <Text
                className="cursor-pointer"
                style={{ fontSize: 16, lineHeight: 1 }}
                type={data.like ? 'danger' : 'secondary'}
                onClick={async () => {
                  await axios.post(`/api/article/${id}/like`);
                  mutate();
                }}
              >
                <LikeOutlined />{' '}
                {data.likeUserIds && data.likeUserIds.length > 0 ? data.likeUserIds.length : '赞'}
              </Text>
            </div>
          </div>
        )}
      </Skeleton>
    </div>
  );
}

export default ArticlePage;
