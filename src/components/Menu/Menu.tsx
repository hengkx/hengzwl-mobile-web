import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select, Card } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { TablePaginationConfig } from 'antd/lib/table';
import api from '../../config/api';
import './less/menu.less';

const { Column } = Table;
const { Option } = Select;

interface CompanyInterface {
  id: number;
  name: string;
}

interface View {
  id: number;
  name: string;
}

const Menu = () => {
  const [menus, setMenus] = useState<object[]>();
  const [companies, setCompanies] = useState<CompanyInterface[]>();
  const [views, setViews] = useState<View[]>();
  const [selected, setSelected] = useState<CompanyInterface>();
  const [visible, setVisible] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>();
  const [form] = Form.useForm();

  const loadData = async (params = {}) => {
    const res = await axios.get(api.menu, { params: { ...params } });
    const { records: data, ...others } = res.data;
    setMenus(data);
    setPagination(others);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePaginationChange = (page: number, pageSize: number | undefined) => {
    loadData({ page, pageSize });
  };

  const handleDelClick = async (id: string) => {
    const res = await axios.delete(`${api.menu}/${id}`);
    if (res.code === 0) {
      message.success('删除成功');
    }
  };

  const handleFinish = async (values: unknown) => {
    if (selected) {
      const res = await axios.put(`${api.menu}/${selected.id}`, values);
      if (res.code === 0) {
        message.success('修改成功');
        setSelected(undefined);
        loadData();
      }
    } else {
      const res = await axios.post(api.menu, values);
      if (res.code === 0) {
        message.success('添加成功');
        setVisible(false);
        loadData();
      }
    }
  };

  const handleAddClick = async () => {
    if (!views) {
      const viewRes = await axios.get(api.view, { params: { pagination: false } });
      setViews(viewRes.data);
    }
    if (!companies) {
      const companyRes = await axios.get(api.company, { params: { pagination: false } });
      setCompanies(companyRes.data);
    }
    setVisible(true);
  };

  return (
    <Card className="menu">
      <div className="table-toolbar">
        <Button type="primary" onClick={handleAddClick}>
          添加
        </Button>
      </div>
      <Modal
        title={`${selected ? '编辑' : '添加'}公司`}
        visible={visible || !!selected}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="公司" name="companyId" rules={[{ required: true }]}>
            <Select>
              {companies &&
                companies.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="视图" name="viewId" rules={[{ required: true }]}>
            <Select>
              {views &&
                views.map((item) => (
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
        dataSource={menus}
        pagination={{ ...pagination, onChange: handlePaginationChange }}
      >
        <Column title="名称" dataIndex="name" />
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

export default Menu;
