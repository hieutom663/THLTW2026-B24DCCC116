import { useState, useEffect } from 'react';
import QuanLyPhongHoc from './components/QuanLyPhongHoc';
import type { PhongHoc } from './components/Data';

const App = () => {
    const [danhSachPhongHoc, setDanhSachPhongHoc] = useState<PhongHoc[]>(() => {
        const saved = localStorage.getItem('danhSachPhongHoc');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('danhSachPhongHoc', JSON.stringify(danhSachPhongHoc));
    }, [danhSachPhongHoc]);

    return (
        <div style={{ padding: '24px' }}>
            <QuanLyPhongHoc 
                danhSachPhongHoc={danhSachPhongHoc} 
                setDanhSachPhongHoc={setDanhSachPhongHoc} 
            />
        </div>
    );
};

export default App;