import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Table, Typography } from 'antd';
import dayjs from 'dayjs';

const { Paragraph } = Typography;

interface Order {
  no: string;
  goods: string;
  date: string;
  count: number;
  price: number;
  codes: string[];
}

export interface OrderRes {
  orders: Order[];
  expireTime: string;
}

function Main() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  const { data } = useSWR<OrderRes>(key && `/api/chd/order?key=${key}`);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 py-4">
      <div className="text-red-500 text-3xl">
        注意安全请不要分享此链接，将在{data?.expireTime}过期
      </div>
      <Button
        type="primary"
        onClick={async () => {
          const data: any = await axios.post(
            '/api/chd/download/shop',
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
            `页面商城 ${dayjs().format('YYYY-MM-DD HHmmss')} by 恒记.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        }}
      >
        点击下载Excel
      </Button>
      <div className="flex-1 overflow-y-auto max-w-4xl">
        <Table
          rowKey="no"
          size="small"
          sticky
          scroll={{ y: 'calc(100% - 200px)' }}
          pagination={false}
          dataSource={data?.orders}
          columns={[
            {
              title: '订单编号',
              dataIndex: 'no',
              width: 320,
              render(value) {
                return (
                  <Paragraph copyable style={{ marginBottom: 0 }}>
                    {value}
                  </Paragraph>
                );
              },
            },
            {
              title: '编码',
              dataIndex: 'items',
              width: 180,
              render(value) {
                return value
                  .filter((p: any) => p)
                  .map((p: any) => <div key={p}>{p.name}</div>);
              },
            },
            {
              title: '编码',
              dataIndex: 'items',
              width: 180,
              render(value) {
                return value
                  .filter((p: any) => p)
                  .map((p: any) => (
                    <Paragraph key={p} copyable style={{ marginBottom: 0 }}>
                      {p.code}
                    </Paragraph>
                  ));
              },
            },
            {
              title: '实付款',
              dataIndex: 'price',
              width: 60,
            },
            { title: '购买时间', dataIndex: 'time', width: 170 },
          ]}
        />
      </div>
    </div>
  );
}

export default Main;
