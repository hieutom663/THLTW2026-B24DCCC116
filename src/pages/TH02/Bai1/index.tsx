import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { LuaChon, VanDau } from './types';
import BangDieuKhien from './components/BangDieuKhien';
import DanhSachLichSu from './components/DanhSachLichSu';

const danhSachLuaChon: LuaChon[] = ['Kéo', 'Búa', 'Bao'];

const Bai1_OanTuTi: React.FC = () => {
  const [lichSu, datLichSu] = useState<VanDau[]>([]);

  const xuLyChon = (chonCuaNguoi: LuaChon) => {
    // 1. Máy tính chọn ngẫu nhiên
    const chonCuaMay = danhSachLuaChon[Math.floor(Math.random() * danhSachLuaChon.length)];
    let ketQua: 'Thắng' | 'Thua' | 'Hòa' = 'Hòa';

    // 2. Tính toán kết quả
    if (chonCuaNguoi === chonCuaMay) {
      ketQua = 'Hòa';
    } else if (
      (chonCuaNguoi === 'Kéo' && chonCuaMay === 'Bao') ||
      (chonCuaNguoi === 'Búa' && chonCuaMay === 'Kéo') ||
      (chonCuaNguoi === 'Bao' && chonCuaMay === 'Búa')
    ) {
      ketQua = 'Thắng';
    } else {
      ketQua = 'Thua';
    }

    // 3. Tạo ván mới và đẩy lên đầu mảng lịch sử
    const vanMoi: VanDau = {
      lanDau: lichSu.length + 1,
      nguoi: chonCuaNguoi,
      may: chonCuaMay,
      ketQua: ketQua,
    };

    datLichSu([vanMoi, ...lichSu]);
  };

  return (
    <Card title="Bài 1: Trò Chơi Oẳn Tù Tì" style={{ margin: 24, borderRadius: 8 }}>
      <Row gutter={24}>
        <Col span={12}>
          <BangDieuKhien 
            xuLyChon={xuLyChon} 
            vanMoiNhat={lichSu.length > 0 ? lichSu[0] : null} 
          />
        </Col>

        <Col span={12}>
          <DanhSachLichSu lichSu={lichSu} />
        </Col>
      </Row>
    </Card>
  );
};

export default Bai1_OanTuTi;