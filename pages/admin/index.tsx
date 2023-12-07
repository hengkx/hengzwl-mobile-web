import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Form, Input, InputNumber, Space, Table } from 'antd';
import { useFetch } from '@/hooks';
import queryString from 'querystring';

const { Search } = Input;

function Main() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [count, setCount] = useState(26);
  const [score, setScore] = useState(
    '1000,1010,1020,1030,1040,1050,1070,1090,1110,1130,1150,1180,1210,1240,1270,1300,1335,1370,1405,1440,1475,1520,1560,1610,1700,1800'
  );

  const [form] = Form.useForm();

  const { data, mutate } = useFetch<any>(
    `/api/chd/score?${queryString.stringify(form.getFieldsValue())}`
  );

  useEffect(() => {
    if (data && selectedRowKeys.length > 0 && selectedRowKeys.length < count) {
      const index = data.findIndex((item: any) => item.id === selectedRowKeys[0]);
      setSelectedRowKeys([
        ...selectedRowKeys,
        ...data.slice(index + 1, index + count).map((item: any) => item.id),
      ]);
    }
  }, [selectedRowKeys, count, data]);

  const handleClick = async () => {
    const res = await axios.post('/api/chd/score/batch', {
      id: selectedRowKeys.join(','),
      score,
    });
    console.log(res);
    setSelectedRowKeys([]);
    mutate();
  };

  return (
    <div className="h-full px-4 overflow-y-hidden">
      <div className="flex gap-4 py-4">
        <InputNumber value={count} onChange={setCount as any} precision={0} />
        <Input value={score} onChange={(e) => setScore(e.target.value)} />
        <Button onClick={handleClick}>保存</Button>
      </div>
      <Form form={form} layout="inline" initialValues={{ superLv: 2200 }}>
        <Form.Item label="等级" name="superLv">
          <InputNumber />
        </Form.Item>
        <Form.Item label="等级" name="superLv">
          <InputNumber />
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        size="small"
        pagination={false}
        className="mt-4"
        scroll={{ y: 'calc(100vh - 200px)' }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys as any);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        }}
        columns={[
          { title: 'Id', dataIndex: 'id' },
          { title: '名称', dataIndex: 'name' },
          {
            title: 'Lv',
            dataIndex: 'superLv',
            width: 100,
            render: (text: any, record: any) => text || record.lv,
          },
          {
            title: 'Score',
            dataIndex: 'score',
            render: (text: any, record: any) => (
              <Search
                size="small"
                style={{ width: 100 }}
                defaultValue={text}
                placeholder={text}
                onSearch={async (value) => {
                  console.log(value);
                  const res = await axios.post('/api/chd/score', {
                    id: record.id,
                    score: value,
                  });
                  console.log(res);
                }}
              />
            ),
          },
        ]}
        dataSource={data}
      />
    </div>
  );
}

export default Main;
