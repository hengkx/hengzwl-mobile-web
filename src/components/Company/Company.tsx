import * as React from 'react';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Card,
  InputNumber,
  DatePicker,
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import MD5 from 'md5.js';
import { TablePaginationConfig } from 'antd/lib/table';
import { StoreValue } from 'antd/lib/form/interface';
import api from '../../config/api';
import './less/company.less';

const { Column } = Table;

interface CompanyInterface {
  id: string;
  expireTime: number;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const Company: React.FC = () => {
  const [companies, setCompanies] = React.useState<CompanyInterface[]>();
  const [selected, setSelected] = React.useState<CompanyInterface>();
  const [visible, setVisible] = React.useState(false);
  const [userVisible, setUserVisible] = React.useState(false);
  const [pagination, setPagination] = React.useState<TablePaginationConfig>();
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();

  const loadData = async (params = {}) => {
    const res = await axios.get(api.company, { params: { ...params } });
    const { records: data, ...others } = res.data;
    setCompanies(data);
    setPagination(others);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handlePaginationChange = (page: number, pageSize: number | undefined) => {
    loadData({ page, pageSize });
  };

  const handleDelClick = async (id: string) => {
    const res = await axios.delete(`${api.company}/${id}`);
    if (res.code === 0) {
      message.success('删除成功');
      loadData();
    }
  };

  const handleFinish = async (values: StoreValue) => {
    const newValues = {
      ...values,
      expireTime: values.expireTime.valueOf(),
    };
    if (selected) {
      const res = await axios.put(`${api.company}/${selected.id}`, newValues);
      if (res.code === 0) {
        message.success('修改成功');
        setSelected(undefined);
        loadData();
      }
    } else {
      const res = await axios.post(api.company, newValues);
      if (res.code === 0) {
        message.success('添加成功');
        setVisible(false);
        loadData();
      }
    }
  };

  const handleUserFinish = async (values: StoreValue) => {
    const newValues = {
      ...values,
      password: new MD5().update(values.password).digest('hex'),
    };

    const res = await axios.post(`${api.company}/${selected!.id}/user`, newValues);
    if (res.code === 0) {
      message.success('添加成功');
      setUserVisible(false);
      setSelected(undefined);
      loadData();
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
        title={`${selected ? '编辑' : '添加'}公司`}
        visible={visible}
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
          <Form.Item label="账户数" name="accountCount" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="到期时间" name="expireTime" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="联系人" name="contact">
            <Input />
          </Form.Item>
          <Form.Item label="电话" name="tel">
            <Input />
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="添加用户"
        visible={userVisible}
        onOk={() => userForm.submit()}
        onCancel={() => {
          setUserVisible(false);
          setSelected(undefined);
        }}
      >
        <Form
          {...layout}
          form={userForm}
          onFinish={handleUserFinish}
          initialValues={{ password: '123456' }}
        >
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="tel" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        bordered
        rowKey="id"
        dataSource={companies}
        pagination={{ ...pagination, onChange: handlePaginationChange }}
      >
        <Column title="公司名称" dataIndex="name" />
        <Column title="账户数" dataIndex="accountCount" />
        <Column
          title="到期时间"
          dataIndex="expireTime"
          render={(text: string) => moment(text).format('YYYY-MM-DD')}
        />
        <Column title="联系人" dataIndex="contact" />
        <Column title="公司电话" dataIndex="tel" />
        <Column title="公司地址" dataIndex="地址" />
        <Column
          title="创建时间"
          dataIndex="createdAt"
          render={(text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')}
        />
        <Column
          title="更新时间"
          dataIndex="updatedAt"
          render={(text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')}
        />
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
                  setUserVisible(true);
                }}
              >
                添加用户
              </Button>
              <Button
                type="link"
                style={{ paddingRight: 0 }}
                onClick={() => {
                  setSelected(record);
                  form.setFieldsValue({ ...record, expireTime: moment(record.expireTime) });
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
