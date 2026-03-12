import React from 'react';
import { Button, Typography, Space, Tag } from 'antd';
import { LuaChon, VanDau } from '../types';

const { Title, Text } = Typography;

interface ThuocTinhBangDieuKhien {
  xuLyChon: (chon: LuaChon) => void;
  vanMoiNhat: VanDau | null;
}

const BangDieuKhien: React.FC<ThuocTinhBangDieuKhien> = ({ xuLyChon, vanMoiNhat }) => {
  const layMauKetQua = (kq: string) => {
    if (kq === 'Thắng') return 'success';
    if (kq === 'Thua') return 'error';
    return 'warning';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={4}>Lượt đi của bạn</Title>
      <Space size="large" style={{ marginTop: 20 }}>
        <Button size="large" type="primary" onClick={() => xuLyChon('Kéo')}> Kéo</Button>
        <Button size="large" type="primary" onClick={() => xuLyChon('Búa')} > Búa</Button>
        <Button size="large" type="primary" onClick={() => xuLyChon('Bao')} > Bao</Button>
      </Space>

      {vanMoiNhat && (
        <div style={{ marginTop: 40 }}>
          <Title level={5}>Ván gần nhất</Title>
          <Text style={{ fontSize: 18 }}>
            Bạn chọn <Text strong>{vanMoiNhat.nguoi}</Text> 🆚 Máy chọn <Text strong>{vanMoiNhat.may}</Text>
          </Text>
          <br /><br />
          <Tag color={layMauKetQua(vanMoiNhat.ketQua)} style={{ fontSize: 20, padding: '10px 20px' }}>
            {vanMoiNhat.ketQua.toUpperCase()}
          </Tag>
        </div>
      )}
    </div>
  );
};

export default BangDieuKhien;