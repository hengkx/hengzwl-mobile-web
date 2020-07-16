import * as React from 'react';
import { Table, Card, Descriptions } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../config/api';
import './less/student.less';
import { StudentDetail } from './interface';

const { Column } = Table;

const Detail: React.FC = () => {
  const [student, setStudent] = React.useState<StudentDetail>();
  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const res = await axios.get(`${api.ds.student}/${id}`);
      setStudent(res.data);
    })();
  }, [id]);

  if (!student) {
    return <div />;
  }
  return (
    <Card className="student">
      <Descriptions title="学员详情" column={1}>
        <Descriptions.Item label="学员姓名">{student.name}</Descriptions.Item>
        <Descriptions.Item label="身份证号">{student.idCard}</Descriptions.Item>
        <Descriptions.Item label="家庭住址">{student.address}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{student.phone}</Descriptions.Item>
        <Descriptions.Item label="准驾车型">{student.className}</Descriptions.Item>
        <Descriptions.Item label="退伍">{student.isVeteran ? '是' : '否'}</Descriptions.Item>
        <Descriptions.Item label="校区">{student.schoolName}</Descriptions.Item>
        <Descriptions.Item label="学费">{student.tuition}</Descriptions.Item>
        <Descriptions.Item label="其它费用">{student.other}</Descriptions.Item>
        <Descriptions.Item label="备注">{student.remark}</Descriptions.Item>
        <Descriptions.Item label="报名时间">
          {moment(student.time).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
      </Descriptions>
      <Table rowKey="id" dataSource={student.exams} pagination={false}>
        <Column title="科目" dataIndex="subject" />
        <Column
          title="通过"
          dataIndex="isPass"
          render={(text: number) => {
            return text === 1 ? (
              <CheckOutlined style={{ color: '#87d068' }} />
            ) : (
              <CloseOutlined style={{ color: '#ff5500' }} />
            );
          }}
        />
        <Column
          title="考试时间"
          dataIndex="time"
          render={(text: string) => moment(text).format('YYYY-MM-DD')}
        />
        <Column title="考试费用" dataIndex="fee" />
        <Column
          title="缴费时间"
          dataIndex="payTime"
          render={(text: string) => text && moment(text).format('YYYY-MM-DD HH:mm:ss')}
        />
      </Table>
      <Table rowKey="id" dataSource={student.pays} pagination={false}>
        <Column title="金额" dataIndex="amount" />
        <Column
          title="缴费时间"
          dataIndex="time"
          render={(text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')}
        />
      </Table>
    </Card>
  );
};

export default Detail;
