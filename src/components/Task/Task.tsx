import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Upload,
  Card,
  InputNumber,
  Select,
} from 'antd';
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
  const [shops, setShops] = useState<object[]>([]);
  const [selected, setSelected] = useState<CompanyInterface>();
  const [visible, setVisible] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>();
  const [form] = Form.useForm();

  const loadData = async (params = {}) => {
    const res = await axios.get(api.task, { params: { ...params } });
    const { records: data, ...others } = res.data;
    setTasks(data);
    setPagination(others);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(api.shop, { params: { pagination: false } });
      setShops(res.data);
    })();
    loadData();
  }, []);

  const handlePaginationChange = (page: number, pageSize: number | undefined) => {
    loadData({ page, pageSize });
  };

  const handleDelClick = async (id: string) => {
    const res = await axios.delete(`${api.task}/${id}`);
    if (res.code === 0) {
      message.success('删除成功');
      loadData();
    }
  };

  const handleFinish = async (values: any) => {
    if (selected) {
      const res = await axios.put(`${api.task}/${selected.id}`, values);
      if (res.code === 0) {
        message.success('修改成功');
        setSelected(undefined);
        loadData();
      }
    } else {
      const imgUrl = values.imgUrl[0].response.data.url;
      const res = await axios.post(api.task, { ...values, remainCount: values.count, imgUrl });
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
          <Form.Item
            label="图片"
            name="imgUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload
              action={`${axios.defaults.baseURL}/api/upload`}
              headers={{ Authorization: `Bearer ${localStorage.getItem('token')}` }}
            >
              <Button>
                <UploadOutlined /> 点击上传
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="标题" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="店铺" name="shopId" rules={[{ required: true }]}>
            <Select>
              {shops.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="价格" name="price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="佣金" name="commission" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="数量" name="count" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="购买方式" name="buy" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        bordered
        rowKey="id"
        dataSource={tasks}
        pagination={{ ...pagination, onChange: handlePaginationChange }}
      >
        <Column title="名称" dataIndex="title" ellipsis />
        <Column title="价格" dataIndex="price" />
        <Column title="数量" dataIndex="count" />
        <Column title="佣金" dataIndex="commission" />
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
