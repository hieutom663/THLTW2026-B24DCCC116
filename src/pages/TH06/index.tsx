import { Tabs } from 'antd';
import TrangChu from './components/TrangChu';
import type { DiaDiem, LichTrinh } from './components/Data';
import { useState } from 'react';
import TaoLichTrinh from './components/TaoLichTrinh';
import TrangQuanTri from './components/TrangQuanTri';
import QuanLyNganSach from './components/QuanLyNganSach';

const App = () => {
    const [danhSachDiaDiem, setDanhSachDiaDiem] = useState<DiaDiem[]>([]);
    const [danhSachLichTrinh, setDanhSachLichTrinh] = useState<LichTrinh[]>([]);
    return (
        <div>
            <Tabs>
                <Tabs.TabPane tab='Khám phá điểm đến' key='1'>
                    <TrangChu danhSachDiaDiem={danhSachDiaDiem} setDanhSachDiaDiem={setDanhSachDiaDiem} />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Tạo lịch trình' key='2'>
                    <TaoLichTrinh danhSachLichTrinh={danhSachLichTrinh} setDanhSachLichTrinh={setDanhSachLichTrinh} danhSachDiaDiem={danhSachDiaDiem} />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Quản lý ngân sách' key='3'>
                    <QuanLyNganSach danhSachLichTrinh={danhSachLichTrinh} danhSachDiaDiem={danhSachDiaDiem} />
                </Tabs.TabPane>
                <Tabs.TabPane tab='Quản trị' key='4'>
                    <TrangQuanTri danhSachDiaDiem={danhSachDiaDiem} setDanhSachDiaDiem={setDanhSachDiaDiem} />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default App;