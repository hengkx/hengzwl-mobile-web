import * as React from 'react';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Card,
  Select,
  DatePicker,
  Checkbox,
  Space,
  AutoComplete,
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../config/api';
import './less/student.less';
import { Student } from './interface';

const { Column } = Table;

const StudentList: React.FC = () => {
  const match = useRouteMatch();
  const [subject, setSubject] = React.useState('科目一');
  const [time, setTime] = React.useState(moment());
  const [isPass, setIsPass] = React.useState(false);
  const [idCard, setIdCard] = React.useState('');
  const [options, setOptions] = React.useState<Student[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);

  const handleDelClick = async (id: number) => {
    const index = students.findIndex((p) => p.id === id);
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const handleSearch = async (val: string) => {
    setIdCard(val);
    if (val.length > 2) {
      const res = await axios.get(api.ds.getStudentListBySubject, {
        params: { subject, condition: val },
      });
      setOptions(res.data);
    }
  };

  const handleSelect = (val: string) => {
    if (students.findIndex((p) => p.id.toString() === val) === -1) {
      const newStudents = [...students];
      newStudents.push(options.find((p) => p.id.toString() === val)!);
      setStudents(newStudents);
      setIdCard('');
      setOptions([]);
    } else {
      message.error('已添加');
    }
  };

  const handleCommit = async () => {
    if (students.length > 0) {
      const res = await axios.post(api.ds.exam, {
        ids: students.map((p) => p.id),
        subject,
        isPass,
        time: moment(time).format('YYYY-MM-DD'),
      });
      if (res.code === 0) {
        message.success('处理成功');
        setStudents([]);
      }
    } else {
      message.error('请选择学员');
    }
  };

  return (
    <Card className="student">
      <div className="student-action">
        <Space>
          <Select style={{ width: 200 }} onChange={setSubject} value={subject}>
            <Select.Option value="科目一">科目一</Select.Option>
            <Select.Option value="科目二">科目二</Select.Option>
            <Select.Option value="科目三">科目三</Select.Option>
            <Select.Option value="科目四">科目四</Select.Option>
          </Select>
          <DatePicker value={time} onChange={(date) => setTime(date!)} />
          通过
          <Checkbox checked={isPass} onChange={(e) => setIsPass(e.target.checked)} />
          <AutoComplete
            allowClear
            placeholder="请输入身份证号"
            value={idCard}
            style={{ width: 230 }}
            onSearch={handleSearch}
            onSelect={handleSelect}
          >
            {options.map((item) => (
              <AutoComplete.Option key={`${item.id}`} value={`${item.id}`}>
                {item.name}-{item.idCard}
              </AutoComplete.Option>
            ))}
          </AutoComplete>
          <Button type="primary" onClick={handleCommit}>
            提交
          </Button>
        </Space>
      </div>
      <Table<Student> rowKey="id" dataSource={students} pagination={false}>
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
        <Column title="经办人" dataIndex="userName" />
        <Column<Student>
          title="操作"
          dataIndex="id"
          render={(text) => (
            <>
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
