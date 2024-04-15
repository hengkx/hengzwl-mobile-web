import { useEffect, useMemo } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { v1 } from 'uuid';
import { useRouter } from 'next/router';

const { Text } = Typography;

function Login() {
  const key = useMemo(() => v1(), []);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await axios.get(`/api/auth/scan/result?key=${key}`);
      if (res.data) {
        localStorage.setItem('token', res.data);
        clearInterval(timer);
        router.push('/article');
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [router, key]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <QRCodeCanvas value={`https://m.hengzwl.com?action=login&platform=web&key=${key}`} />
      <Text>请使用APP扫码登录</Text>
    </div>
  );
}

export default Login;
