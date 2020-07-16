import * as React from 'react';
import { Table, Button, Popconfirm, message, Form, Input, Card, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { TablePaginationConfig } from 'antd/lib/table';
import { Link, useRouteMatch } from 'react-router-dom';
import { StoreValue } from 'antd/lib/form/interface';

import api from '../../config/api';
import './less/student.less';
import { Student, Class, School } from './interface';

const { Column } = Table;
const { Option } = Select;

const StudentList: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>();
  const [classes, setClasses] = React.useState<Class[]>([]);
  const [schools, setSchools] = React.useState<School[]>([]);
  const [selected, setSelected] = React.useState<Student>();
  const [pagination, setPagination] = React.useState<TablePaginationConfig>();
  const [form] = Form.useForm();

  const match = useRouteMatch();

  const loadData = React.useCallback(
    async (params = {}) => {
      const res = await axios.get(api.student, { params: { ...form.getFieldsValue(), ...params } });
      const { records: data, ...others } = res.data;
      setStudents(data);
      setPagination(others);
    },
    [form],
  );

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(api.class);
      setClasses(res.data);
      const schoolRes = await axios.get(api.school);
      setSchools(schoolRes.data);
    })();
    loadData();
  }, [loadData]);

  const handlePaginationChange = (page: number, pageSize: number | undefined) => {
    loadData({ page, pageSize });
  };

  const handleDelClick = async (id: string) => {
    const res = await axios.delete(`${api.student}/${id}`);
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
      const res = await axios.put(`${api.student}/${selected.id}`, newValues);
      if (res.code === 0) {
        message.success('修改成功');
        setSelected(undefined);
        loadData();
      }
    } else {
      const res = await axios.post(api.student, newValues);
      if (res.code === 0) {
        message.success('添加成功');
        loadData();
      }
    }
  };

  return (
    <Card className="student">
      <div className="student-action">
        <div className="student-action-left">
          <Form
            layout="inline"
            form={form}
            initialValues={{
              classId: '0',
              schoolId: '0',
              status: '0',
            }}
            onFinish={handleFinish}
          >
            <Form.Item label="车型" name="classId" rules={[{ required: true }]}>
              <Select style={{ width: 150 }}>
                {classes.map((item) => (
                  <Option key={item.id} value={`${item.id}`}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="状态" name="status" rules={[{ required: true }]}>
              <Select style={{ width: 138 }}>
                <Option value="全部">所有学员</Option>
                <Option value="0">未领证</Option>
                <Option value="1">已领证</Option>
              </Select>
            </Form.Item>
            <Form.Item label="校区" name="schoolId" rules={[{ required: true }]}>
              <Select style={{ width: '138px' }}>
                {schools.map((item) => (
                  <Option key={item.id} value={`${item.id}`}>
                    {item.district}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="condition">
              <Input
                style={{ width: '280px' }}
                placeholder="请输入姓名/手机/身份证号进行模糊查询"
              />
            </Form.Item>
          </Form>
          <Button onClick={() => loadData()}>搜索</Button>
        </div>
        <Button type="primary" href={`${match.url}/add`}>
          添加学员
        </Button>
      </div>
      <Table<Student>
        rowKey="id"
        dataSource={students}
        pagination={{
          ...pagination,
          showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          onChange: handlePaginationChange,
        }}
      >
        <Column<Student>
          title="学员姓名"
          dataIndex="name"
          render={(text, record) => <Link to={`${match.url}/${record.id}`}>{text}</Link>}
        />
        <Column title="准驾车型" dataIndex="className" />
        <Column title="联系电话" dataIndex="phone" />
        <Column title="身份证号" dataIndex="idCard" />
        <Column
          title="报名日期"
          dataIndex="time"
          render={(text: string) => moment(text).format('YYYY-MM-DD')}
        />
        <Column<Student>
          title="总欠费"
          dataIndex="contact"
          render={(_, record) => (
            <span style={{ color: record.totalCost - record.paid > 0 ? '#f00' : '' }}>
              {record.totalCost - record.paid}
            </span>
          )}
        />
        <Column title="校区" dataIndex="schoolName" />
        <Column title="经办人" dataIndex="userName" />
        <Column<Student>
          title="操作"
          dataIndex="id"
          render={(text, record) => (
            <>
              {record.totalCost - record.paid > 0 && (
                <Button
                  type="link"
                  style={{ paddingRight: 0 }}
                  onClick={() => {
                    setSelected(record);
                    form.setFieldsValue({ ...record, time: moment(record.time) });
                  }}
                >
                  缴费
                </Button>
              )}
              <Button
                type="link"
                style={{ paddingRight: 0 }}
                onClick={() => {
                  setSelected(record);
                  form.setFieldsValue({ ...record, time: moment(record.time) });
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

export default StudentList;
