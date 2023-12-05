import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Table, Typography } from 'antd';
import dayjs from 'dayjs';

const { Paragraph } = Typography;

interface Order {
  no: string;
  name: string;
}

export interface LZ {
  orders: Order[];
  expireTime: string;
}

function Main() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  const { data } = useSWR<LZ>(key && `/api/chd/order?key=${key}`);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 py-4">
      <div className="text-red-500 text-3xl">
        注意安全请不要分享此链接，将在{data?.expireTime}过期
      </div>
      <Button
        type="primary"
        onClick={async () => {
          const data: any = await axios.post(
            '/api/chd/download/lz',
            { key },
            {
              responseType: 'blob',
            }
          );
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `礼赞 ${dayjs().format('YYYY-MM-DD HHmmss')} by 恒记.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        }}
      >
        点击下载Excel
      </Button>
      <div className="flex-1 overflow-y-auto max-w-xl">
        <Table
          rowKey="no"
          size="small"
          sticky
          scroll={{ y: 'calc(100% - 200px)' }}
          pagination={false}
          dataSource={data?.orders}
          columns={[
            { title: '名称', dataIndex: 'name', width: 260 },
            {
              title: '编码',
              dataIndex: 'no',
              render(value, record, index) {
                return (
                  <Paragraph copyable style={{ marginBottom: 0 }}>
                    {value}
                  </Paragraph>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Main;
