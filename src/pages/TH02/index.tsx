import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PlayCircleOutlined, FormOutlined} from '@ant-design/icons';
import Bai1_OanTuTi from './Bai1';
import Bai2_NganHangCauHoi from './Bai2';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [mucDangChon, datMucDangChon] = useState('bai2');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <Menu
          mode="inline"
          selectedKeys={[mucDangChon]}
          onClick={(e) => datMucDangChon(e.key)}
          style={{ borderRight: 0 }}
          items={[
            { type: 'divider' },
            { key: 'bai1', label: 'Oẳn Tù Tì'},
            { key: 'bai2', label: 'Quản lý Đề Thi'},
          ]}
        />
      </Sider>

      <Layout>

        <Content style={{ margin: '24px', background: '#f0f2f5' }}>
          {mucDangChon === 'bai1' && <Bai1_OanTuTi />}
          {mucDangChon === 'bai2' && <Bai2_NganHangCauHoi />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;