import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import TrangChu from './components/TrangChu';
import TrangGioiThieu from './components/TrangGioiThieu';
import QuanLyBaiViet from './components/QuanLyBaiViet';
import QuanLyThe from './components/QuanLyThe';
import { initialBaiViet, initialTags } from './components/Data';
import type { BaiViet, Tag } from './components/Data';

const { Header, Content } = Layout;

const App = () => {
    const [currentTab, setCurrentTab] = useState('home');

    const [danhSachThe, setDanhSachThe] = useState<Tag[]>(() => {
        const saved = localStorage.getItem('danhSachThe');
        return saved ? JSON.parse(saved) : initialTags;
    });

    const [danhSachBaiViet, setDanhSachBaiViet] = useState<BaiViet[]>(() => {
        const saved = localStorage.getItem('danhSachBaiViet');
        return saved ? JSON.parse(saved) : initialBaiViet;
    });

    useEffect(() => {
        localStorage.setItem('danhSachThe', JSON.stringify(danhSachThe));
    }, [danhSachThe]);

    useEffect(() => {
        localStorage.setItem('danhSachBaiViet', JSON.stringify(danhSachBaiViet));
    }, [danhSachBaiViet]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: 0, boxShadow: '0 2px 8px #f0f1f2' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', padding: '0 20px' }}>DevBlog</div>
                    <Menu mode='horizontal' selectedKeys={[currentTab]} onClick={(e) => setCurrentTab(e.key)} style={{ borderBottom: 'none', flex: 1, justifyContent: 'flex-end' }}>
                        <Menu.Item key='home'>Trang chủ</Menu.Item>
                        <Menu.Item key='about'>Giới thiệu</Menu.Item>
                        <Menu.Item key='admin-posts'>Quản lý Bài viết</Menu.Item>
                        <Menu.Item key='admin-tags'>Quản lý Thẻ</Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 0' }}>
                <div style={{ background: '#fff', minHeight: 400, borderRadius: 8 }}>
                    {currentTab === 'home' && <TrangChu danhSachBaiViet={danhSachBaiViet} setDanhSachBaiViet={setDanhSachBaiViet} danhSachThe={danhSachThe} />}
                    {currentTab === 'about' && <TrangGioiThieu />}
                    {currentTab === 'admin-posts' && <QuanLyBaiViet danhSachBaiViet={danhSachBaiViet} setDanhSachBaiViet={setDanhSachBaiViet} danhSachThe={danhSachThe} />}
                    {currentTab === 'admin-tags' && <QuanLyThe danhSachThe={danhSachThe} setDanhSachThe={setDanhSachThe} danhSachBaiViet={danhSachBaiViet} />}
                </div>
            </Content>
        </Layout>
    );
};

export default App;