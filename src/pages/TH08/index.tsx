import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Dashboard from './components/Dashboard';
import NhatKyTapLuyen from './components/NhatKyTapLuyen';
import NhatKyChiSo from './components/NhatKyChiSo';
import QuanLyMucTieu from './components/QuanLyMucTieu';
import ThuVienBaiTap from './components/ThuVienBaiTap';
import type { BaiTapLog, ChiSo, MucTieu, ThuVien } from './components/Data';

const App = () => {
    const [danhSachTap, setDanhSachTap] = useState<BaiTapLog[]>(() => {
        const saved = localStorage.getItem('danhSachTap');
        return saved ? JSON.parse(saved) : [];
    });

    const [danhSachChiSo, setDanhSachChiSo] = useState<ChiSo[]>(() => {
        const saved = localStorage.getItem('danhSachChiSo');
        return saved ? JSON.parse(saved) : [];
    });

    const [danhSachMucTieu, setDanhSachMucTieu] = useState<MucTieu[]>(() => {
        const saved = localStorage.getItem('danhSachMucTieu');
        return saved ? JSON.parse(saved) : [];
    });

    const [danhSachThuVien, setDanhSachThuVien] = useState<ThuVien[]>(() => {
        const saved = localStorage.getItem('danhSachThuVien');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => { localStorage.setItem('danhSachTap', JSON.stringify(danhSachTap)); }, [danhSachTap]);
    useEffect(() => { localStorage.setItem('danhSachChiSo', JSON.stringify(danhSachChiSo)); }, [danhSachChiSo]);
    useEffect(() => { localStorage.setItem('danhSachMucTieu', JSON.stringify(danhSachMucTieu)); }, [danhSachMucTieu]);
    useEffect(() => { localStorage.setItem('danhSachThuVien', JSON.stringify(danhSachThuVien)); }, [danhSachThuVien]);

    return (
        <div style={{ padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>
            <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <Tabs defaultActiveKey="1" tabPosition="left" size="large" style={{ minHeight: 600 }}>
                    <Tabs.TabPane tab="Dashboard" key="1">
                        <Dashboard danhSachTap={danhSachTap} danhSachChiSo={danhSachChiSo} danhSachMucTieu={danhSachMucTieu} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Nhật ký tập luyện" key="2">
                        <NhatKyTapLuyen danhSach={danhSachTap} setDanhSach={setDanhSachTap} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Nhật ký chỉ số" key="3">
                        <NhatKyChiSo danhSach={danhSachChiSo} setDanhSach={setDanhSachChiSo} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Quản lý mục tiêu" key="4">
                        <QuanLyMucTieu danhSach={danhSachMucTieu} setDanhSach={setDanhSachMucTieu} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Thư viện bài tập" key="5">
                        <ThuVienBaiTap danhSach={danhSachThuVien} setDanhSach={setDanhSachThuVien} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default App;