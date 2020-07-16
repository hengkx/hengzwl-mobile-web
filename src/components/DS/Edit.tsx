import React, { useEffect } from 'react';
import { Button, message, Form, Input, Card, Select, DatePicker, InputNumber, Space } from 'antd';
import axios from 'axios';
import api from '../../config/api';
import { Class, School } from './interface';

declare global {
  interface Window {
    Idr: any;
  }
}

const { Option } = Select;

interface CompanyInterface {
  id: string;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface IShop {
  id: number;
  name: string;
}

const Edit: React.FC = () => {
  const [classes, setClasses] = React.useState<Class[]>([]);
  const [schools, setSchools] = React.useState<School[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const res = await axios.get(api.class);
      setClasses(res.data);
      const schoolRes = await axios.get(api.school);
      setSchools(schoolRes.data);
    })();
  }, []);

  const handleReadIdCardClick = () => {
    try {
      // 注意：第一个参数为对应的设备端口，USB型为1001，串口型为1至16
      window.Idr.RepeatRead(1);
      const result = window.Idr.ReadCard('1001', '');

      if (result === 1) {
        const content = {
          name: window.Idr.GetName(),
          idCard: window.Idr.GetCode(),
          address: window.Idr.GetAddress(),
        };
        form.setFieldsValue(content);
      } else {
        let error = '';
        if (result === -1) {
          error = '端口初始化失败！';
        } else if (result === -2) {
          error = '请重新将卡片放到读卡器上！';
        } else if (result === -3) {
          error = '读取数据失败！';
        } else if (result === -4) {
          error = '生成照片文件失败，请检查设定路径和磁盘空间！';
        }
        message.error(error);
      }
    } catch (error) {
      message.error('该浏览器不支持读取');
    }
  };

  const handleFinish = async (values: unknown) => {
    // if (selected) {
    //   const res = await axios.put(`${api.shop}/${selected.id}`, values);
    //   if (res.code === 0) {
    //     message.success('修改成功');
    //     setSelected(undefined);
    //     loadData();
    //   }
    // } else {
    //   const res = await axios.post(api.shop, values);
    //   if (res.code === 0) {
    //     message.success('添加成功');
    //     setVisible(false);
    //     loadData();
    //   }
    // }
  };
  const style = { width: '100%' };

  return (
    <Card className="company">
      <Form {...layout} form={form} onFinish={handleFinish} style={{ width: 500 }}>
        <Form.Item label="学员姓名" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="身份证号" name="idCard" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="家庭住址" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            { required: true },
            { pattern: /^1[3578]\d{9,9}$/, message: '请输入正确联系电话' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="准驾车型" name="classId" rules={[{ required: true }]}>
          <Select>
            {classes.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="学车校区" name="schoolId" rules={[{ required: true }]}>
          <Select>
            {schools.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.district}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="报名学费" name="tuition" rules={[{ required: true }]}>
          <InputNumber style={style} />
        </Form.Item>
        <Form.Item label="其它费用" name="other" rules={[{ required: true }]}>
          <InputNumber style={style} />
        </Form.Item>
        <Form.Item label="备注信息" name="remark">
          <Input />
        </Form.Item>
        <Form.Item label="报名时间" name="time">
          <DatePicker style={style} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={handleReadIdCardClick}>读取身份证</Button>
            <Button type="primary">保存</Button>
          </Space>
        </Form.Item>
      </Form>
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<object aria-label="idr" classid="clsid:5eb842ae-5c49-4fd8-8ce9-77d4af9fd4ff" id="Idr" width="0" height="0" codebase="/idr/idr.cab"></object>',
        }}
      />
    </Card>
  );
};

export default Edit;
