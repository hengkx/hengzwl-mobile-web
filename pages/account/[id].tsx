import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Button, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';

const { Paragraph, Text } = Typography;

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useFetch<AccountInfo>(id && `/api/chd/info/${id}`);
  if (!data) {
    return;
  }

  return (
    <div className="h-full overflow-hidden flex gap-4 py-4 px-4">
      <div>
        <Text strong>
          激活套装：{data.collectSetCount} 激活数：{data.collectCount}
        </Text>
        {data.collects.map((collect) => (
          <div key={collect.id}>
            <Text type={collect.active ? undefined : 'secondary'}>
              {collect.name}
            </Text>
            {collect.activeCount !== collect.totalCount && (
              <Text type="secondary">
                [{collect.activeCount}/{collect.totalCount}]
              </Text>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 h-full overflow-y-auto">
        {data.packages.map((item, index) => (
          <div key={index}>
            <Text>
              {item.type} {item.name || item.id} x{item.count}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
