import React from 'react';
import { List, Typography, Tag } from 'antd';
import { VanDau } from '../types';

const { Title, Text } = Typography;

interface ThuocTinhDanhSach {
  lichSu: VanDau[];
}

const DanhSachLichSu: React.FC<ThuocTinhDanhSach> = ({ lichSu }) => {
  const layMauKetQua = (kq: string) => {
    if (kq === 'Thắng') return 'success';
    if (kq === 'Thua') return 'error';
    return 'warning';
  };

  return (
    <>
      <Title level={4}>Lịch sử thi đấu</Title>
      <List
        size="small"
        bordered
        dataSource={lichSu}
        style={{ maxHeight: 300, overflowY: 'auto' }}
        renderItem={(item) => (
          <List.Item>
            <Text>
              Ván {item.lanDau}: Bạn (<Text strong>{item.nguoi}</Text>) - Máy (<Text strong>{item.may}</Text>) ➡️ <Tag color={layMauKetQua(item.ketQua)}>{item.ketQua}</Tag>
            </Text>
          </List.Item>
        )}
      />
    </>
  );
};

export default DanhSachLichSu;