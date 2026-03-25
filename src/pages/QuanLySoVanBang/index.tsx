import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import QuanLySo from './components/QuanLySo';
import CauHinhBieuMau from './components/CauHinhBieuMau';
import QuanLyVanBang from './components/QuanLyVanBang';
import TraCuuVanBang from './components/TraCuuVanBang';
import QuanLyQuyetDinh from './components/QuanLyQuyetDinh';

const App = () => {
    const useLocalStorage = (key: string, initialValue: any) => {
        const [state, setState] = useState(() => {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        });
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(state));
        }, [state]);
        return [state, setState];
    };

    const [soVanBangList, setSoVanBangList] = useLocalStorage('soVanBangList', []);
    const [quyetDinhList, setQuyetDinhList] = useLocalStorage('quyetDinhList', []);
    const [truongThongTinList, setTruongThongTinList] = useLocalStorage('truongThongTinList', []);
    const [vanBangList, setVanBangList] = useLocalStorage('vanBangList', []);

    return (
        <Tabs>
            <Tabs.TabPane tab='Quản lý Sổ' key='1'>
                <QuanLySo 
                    soVanBangList={soVanBangList} setSoVanBangList={setSoVanBangList}
                    quyetDinhList={quyetDinhList} setQuyetDinhList={setQuyetDinhList}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý Quyết định' key='2'>
                <QuanLyQuyetDinh 
                    soVanBangList={soVanBangList} setSoVanBangList={setSoVanBangList}
                    quyetDinhList={quyetDinhList} setQuyetDinhList={setQuyetDinhList}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Cấu hình Biểu mẫu' key='3'>
                <CauHinhBieuMau 
                    truongThongTinList={truongThongTinList} 
                    setTruongThongTinList={setTruongThongTinList} 
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý Văn Bằng' key='4'>
                <QuanLyVanBang 
                    soVanBangList={soVanBangList} setSoVanBangList={setSoVanBangList}
                    quyetDinhList={quyetDinhList}
                    truongThongTinList={truongThongTinList}
                    vanBangList={vanBangList} setVanBangList={setVanBangList}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Tra cứu Văn Bằng' key='5'>
                <TraCuuVanBang 
                    vanBangList={vanBangList}
                    quyetDinhList={quyetDinhList} setQuyetDinhList={setQuyetDinhList}
                />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default App;