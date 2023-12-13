import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export interface CheckUpdate {
  Code: number;
  Msg: string;
  UpdateStatus: number;
  VersionCode: number;
  VersionName: string;
  ModifyContent: string;
  DownloadUrl: string;
  ApkSize: number;
  ApkMd5: string;
}

interface MainProps {
  data: CheckUpdate;
}

const Main: FC<MainProps> = () => {
  const [data, setData] = useState({} as CheckUpdate);

  useEffect(() => {
    axios.get('https://api.privacy.hengzwl.com/api/checkUpdate').then((res) => {
      setData(res as any);
    });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center -mt-8 gap-4">
      <Image src="/logo.png" width={64} height={64} alt="logo" className="rounded-lg" />
      <div className="text-xl">恒记{data.VersionName}</div>
      <a
        className="bg-black text-white w-60 py-2 text-center rounded-md"
        href="https://itunes.apple.com/cn/app/id1523682629"
      >
        苹果下载
      </a>
      <a className="bg-black text-white w-60 py-2 text-center rounded-md" href={data.DownloadUrl}>
        安卓下载已在小米平台上架
      </a>
      <pre>{data.ModifyContent}</pre>
    </div>
  );
};

export default Main;
