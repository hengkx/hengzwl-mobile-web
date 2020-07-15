import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Card, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/lib/table';
import api from '../../config/api';
import './less/company.less';

const { Column } = Table;
const { Option } = Select;

interface CompanyInterface {
  id: string;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Company = () => {
  const [tasks, setTasks] = useState<object[]>();
  const [platforms, setPlatforms] = useState<object[]>([]);
  const [selected, setSelected] = useState<CompanyInterface>();
  const [visible, setVisible] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>();
  const [form] = Form.useForm();

  const loadData = async (params = {}) => {
    const res = await axios.get(api.shop, { params: { ...params } });
    const { records: data, ...others } = res.data;
    setTasks(data);
    setPagination(others);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(api.platform);
      setPlatforms(res.data);
    })();
    loadData();
  }, []);

  const handlePaginationChange = (page: number, pageSize: number | undefined) => {
    loadData({ page, pageSize });
  };

  const handleDelClick = async (id: string) => {
    const res = await axios.delete(`${api.shop}/${id}`);
    if (res.code === 0) {
      message.success('删除成功');
      loadData();
    }
  };

  const handleFinish = async (values: unknown) => {
    if (selected) {
      const res = await axios.put(`${api.shop}/${selected.id}`, values);
      if (res.code === 0) {
        message.success('修改成功');
        setSelected(undefined);
        loadData();
      }
    } else {
      const res = await axios.post(api.shop, values);
      if (res.code === 0) {
        message.success('添加成功');
        setVisible(false);
        loadData();
      }
    }
  };

  return (
    <Card className="company">
      <div className="table-toolbar">
        <Button type="primary" onClick={() => setVisible(true)}>
          添加
        </Button>
      </div>
      <Modal
        title={`${selected ? '编辑' : '添加'}任务`}
        visible={visible || !!selected}
        onOk={() => form.submit()}
        onCancel={() => {
          setVisible(false);
          setSelected(undefined);
        }}
      >
        <Form {...layout} form={form} onFinish={handleFinish}>
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="平台" name="platformId" rules={[{ required: true }]}>
            <Select>
              {platforms.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        bordered
        rowKey="id"
        dataSource={tasks}
        pagination={{ ...pagination, onChange: handlePaginationChange }}
      >
        <Column title="店铺名称" dataIndex="name" />
        <Column title="平台" dataIndex="platformId" />
        <Column
          title="操作"
          dataIndex="id"
          render={(text, record: CompanyInterface) => (
            <>
              <Button
                type="link"
                style={{ paddingRight: 0 }}
                onClick={() => {
                  setSelected(record);
                  form.setFieldsValue(record);
                }}
              >
                编辑
              </Button>
              <Popconfirm title="确定删除这项吗?" onConfirm={() => handleDelClick(text)}>
                <Button type="link">删除</Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>
    </Card>
  );
};

export default Company;
