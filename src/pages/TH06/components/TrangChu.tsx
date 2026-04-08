import { Button, Card, Col, Row, Select, Space, Rate, Modal, Descriptions, Tag, Typography, message } from 'antd';
import type { DiaDiem } from './Data';
import { useState, useEffect } from 'react';

const { Title } = Typography;

interface Props {
    danhSachDiaDiem: DiaDiem[];
    setDanhSachDiaDiem: any;
}

const TrangChu = (props: Props) => {
    const { danhSachDiaDiem, setDanhSachDiaDiem } = props;
    
    const [loaiHinh, setLoaiHinh] = useState<string>('');
    const [giaCa, setGiaCa] = useState<string>('');
    const [danhGia, setDanhGia] = useState<string>('');
    const [danhSachDiaDiemLoc, setDanhSachDiaDiemLoc] = useState<DiaDiem[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDiaDiem, setSelectedDiaDiem] = useState<DiaDiem | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem('danhSachDiaDiem');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setDanhSachDiaDiem(parsedData);
            setDanhSachDiaDiemLoc(parsedData);
        }
    }, [setDanhSachDiaDiem]);

    const locDiaDiem = () => {
        let ds = [...danhSachDiaDiem];
        
        if (loaiHinh) {
            ds = ds.filter((item) => item.loaiHinh === loaiHinh);
        }
        if (giaCa) {
            ds = ds.filter((item) => {
                const tongChiPhi = (item.chiPhiAnUong || 0) + (item.chiPhiDiChuyen || 0) + (item.chiPhiLuuTru || 0);
                return tongChiPhi < Number(giaCa);
            });
        }
        if (danhGia) {
            ds = ds.filter((item) => (item.rating || 0) >= Number(danhGia));
        }
        
        setDanhSachDiaDiemLoc(ds);
    };

    const xoaLoc = () => {
        setLoaiHinh('');
        setGiaCa('');
        setDanhGia('');
        setDanhSachDiaDiemLoc(danhSachDiaDiem);
    };

    const showDetail = (item: DiaDiem) => {
        setSelectedDiaDiem(item);
        setIsModalOpen(true);
    };

    const handleRating = (value: number, id: string) => {
        const newData = danhSachDiaDiem.map(item => 
            item.id === id ? { ...item, rating: value } : item
        );
        setDanhSachDiaDiem(newData);
        
        const newLocData = danhSachDiaDiemLoc.map(item => 
            item.id === id ? { ...item, rating: value } : item
        );
        setDanhSachDiaDiemLoc(newLocData);
        
        localStorage.setItem('danhSachDiaDiem', JSON.stringify(newData));

        if (selectedDiaDiem) {
            setSelectedDiaDiem({ ...selectedDiaDiem, rating: value });
        }

        message.success(`Bạn đã đánh giá ${value} sao cho điểm đến này!`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Khám phá điểm đến</h1>
            
            <Space style={{ marginBottom: 20, flexWrap: 'wrap' }}>
                <Select value={loaiHinh || undefined} placeholder='Chọn loại hình du lịch' style={{width: '100%', minWidth: 180}} onChange={(e) => setLoaiHinh(e)}>
                    <Select.Option value='biển'>Biển</Select.Option>
                    <Select.Option value='núi'>Núi</Select.Option>
                    <Select.Option value='thành phố'>Thành phố</Select.Option>
                </Select>
                
                <Select value={giaCa || undefined} placeholder='Chọn mức giá (Tổng chi phí)' style={{width: '100%', minWidth: 180}} onChange={(e) => setGiaCa(e)}>
                    <Select.Option value='1000000'>Dưới 1.000.000 đ</Select.Option>
                    <Select.Option value='5000000'>Dưới 5.000.000 đ</Select.Option>
                    <Select.Option value='10000000'>Dưới 10.000.000 đ</Select.Option>
                </Select>
                
                <Select value={danhGia || undefined} placeholder='Chọn mức đánh giá' style={{width: '100%', minWidth: 160}} onChange={(e) => setDanhGia(e)}>
                    <Select.Option value='1'>Từ 1 sao</Select.Option>
                    <Select.Option value='2'>Từ 2 sao</Select.Option>
                    <Select.Option value='3'>Từ 3 sao</Select.Option>
                    <Select.Option value='4'>Từ 4 sao</Select.Option>
                    <Select.Option value='5'>5 sao</Select.Option>
                </Select>
                
                <Button type='primary' onClick={locDiaDiem}>Lọc</Button>
                <Button onClick={xoaLoc}>Bỏ lọc</Button>
            </Space>

            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {danhSachDiaDiemLoc.length === 0 ? (
                    <Col span={24}>
                        <p style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>Không tìm thấy điểm đến nào phù hợp!</p>
                    </Col>
                ) : (
                    danhSachDiaDiemLoc.map((item) => (
                        <Col className='gutter-row' xs={24} sm={12} md={8} lg={6} key={item.id}>
                            <Card
                                hoverable
                                onClick={() => showDetail(item)}
                                style={{ width: '100%' }}
                                cover={
                                    <img
                                        draggable={false}
                                        alt={item.ten}
                                        src={item.hinhAnh}
                                        style={{ height: 180, objectFit: 'cover' }} 
                                    />
                                }
                            >
                                <Card.Meta 
                                    title={item.ten} 
                                    description={
                                        <div>
                                            <div style={{ color: '#faad14', marginBottom: 5 }}>
                                                <Rate disabled value={item.rating || 0} style={{ fontSize: 12 }} />
                                            </div>
                                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.moTa}
                                            </div>
                                            <strong style={{ color: '#cf1322', display: 'block', marginTop: 10 }}>
                                                {((item.chiPhiAnUong || 0) + (item.chiPhiDiChuyen || 0) + (item.chiPhiLuuTru || 0)).toLocaleString()} VNĐ
                                            </strong>
                                        </div>
                                    } 
                                />
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <Modal
                title='Thông tin chi tiết'
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key='close' type='primary' onClick={() => setIsModalOpen(false)}>
                        Đóng
                    </Button>
                ]}
                width={700}
            >
                {selectedDiaDiem && (
                    <div>
                        <img 
                            src={selectedDiaDiem.hinhAnh} 
                            alt={selectedDiaDiem.ten} 
                            style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} 
                        />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Title level={3} style={{ margin: 0 }}>{selectedDiaDiem.ten}</Title>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Chạm vào sao để đánh giá</div>
                                <Rate 
                                    value={selectedDiaDiem.rating || 0} 
                                    onChange={(val) => handleRating(val, selectedDiaDiem.id)}
                                    style={{ fontSize: 24 }}
                                />
                            </div>
                        </div>
                        
                        <div style={{ margin: '16px 0' }}>
                            <Tag color='blue' style={{ textTransform: 'capitalize' }}>Loại hình: {selectedDiaDiem.loaiHinh}</Tag>
                            <Tag color='green'>Thời gian: {selectedDiaDiem.thoiGianThamQuan} tiếng</Tag>
                        </div>

                        <Descriptions bordered column={1} size='small'>
                            <Descriptions.Item label='Mô tả chi tiết'>
                                {selectedDiaDiem.moTa}
                            </Descriptions.Item>
                            <Descriptions.Item label='Chi phí ăn uống'>
                                {selectedDiaDiem.chiPhiAnUong?.toLocaleString()} VNĐ
                            </Descriptions.Item>
                            <Descriptions.Item label='Chi phí di chuyển'>
                                {selectedDiaDiem.chiPhiDiChuyen?.toLocaleString()} VNĐ
                            </Descriptions.Item>
                            <Descriptions.Item label='Chi phí lưu trú'>
                                {selectedDiaDiem.chiPhiLuuTru?.toLocaleString()} VNĐ
                            </Descriptions.Item>
                            <Descriptions.Item label='Tổng chi phí dự kiến'>
                                <strong style={{ color: '#cf1322', fontSize: 16 }}>
                                    {((selectedDiaDiem.chiPhiAnUong || 0) + (selectedDiaDiem.chiPhiDiChuyen || 0) + (selectedDiaDiem.chiPhiLuuTru || 0)).toLocaleString()} VNĐ
                                </strong>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TrangChu;