import { Table, Button, Modal, Form, Input, InputNumber, message, Select, Space, Popconfirm, Rate, Image, Tabs, Card, Col, Row, Statistic, Progress, Alert, Tooltip } from 'antd';
import type { DiaDiem } from './Data';
import { useState, useEffect } from 'react';

interface Props {
    danhSachDiaDiem: DiaDiem[];
    setDanhSachDiaDiem: any;
}

const TrangQuanTri = (props: Props) => {
    const { danhSachDiaDiem, setDanhSachDiaDiem } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    
    const [form] = Form.useForm();
    let stt = danhSachDiaDiem.length;
    const [danhSachLichTrinh, setDanhSachLichTrinh] = useState<any[]>([]);

    useEffect(() => {
        const savedLT = localStorage.getItem('danhSachLichTrinh');
        if (savedLT) {
            setDanhSachLichTrinh(JSON.parse(savedLT));
        }
    }, []);

    let tongDoanhThu = 0;
    let tongAnUong = 0;
    let tongLuuTru = 0;
    let tongDiChuyen = 0;
    const luotTheoThang = Array(12).fill(0);
    const countDiaDiem: Record<string, number> = {};

    danhSachLichTrinh.forEach(lt => {
        if (lt.ngayKhoiHanh) {
            const parts = lt.ngayKhoiHanh.split('/');
            if (parts.length >= 2) {
                const month = parseInt(parts[1], 10);
                if (month >= 1 && month <= 12) luotTheoThang[month - 1] += 1;
            }
        }

        if (lt.diemDenId) {
            countDiaDiem[lt.diemDenId] = (countDiaDiem[lt.diemDenId] || 0) + 1;
            
            const diaDiem = danhSachDiaDiem.find(d => d.id === lt.diemDenId);
            if (diaDiem) {
                tongAnUong += (diaDiem.chiPhiAnUong || 0);
                tongLuuTru += (diaDiem.chiPhiLuuTru || 0);
                tongDiChuyen += (diaDiem.chiPhiDiChuyen || 0);
            }
        }
    });

    tongDoanhThu = tongAnUong + tongLuuTru + tongDiChuyen;
    const maxLuotTheoThang = Math.max(...luotTheoThang, 1); 

    const diaDiemHotNhatId = Object.keys(countDiaDiem).sort((a, b) => countDiaDiem[b] - countDiaDiem[a])[0];
    const tenDiaDiemHotNhat = danhSachDiaDiem.find(d => d.id === diaDiemHotNhatId)?.ten || 'Chưa có dữ liệu';

    const showAddModal = () => {
        setThaoTac('them');
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (record: DiaDiem) => {
        setThaoTac('sua');
        setEditingId(record.id);
        form.setFieldsValue(record); 
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        const newData = danhSachDiaDiem.filter(item => item.id !== id);
        setDanhSachDiaDiem(newData);
        localStorage.setItem('danhSachDiaDiem', JSON.stringify(newData));
        message.success('Đã xóa điểm đến!');
    };

    const handleFinish = (values: any) => {
        let newData;
        if (thaoTac === 'them') {
            const newDiaDiem = { id: 'DDDL' + ++stt, ...values };
            newData = [...danhSachDiaDiem, newDiaDiem];
            message.success('Thêm điểm đến thành công!');
        } else {
            newData = danhSachDiaDiem.map(item => item.id === editingId ? { ...item, ...values } : item);
            message.success('Cập nhật điểm đến thành công!');
        }
        setDanhSachDiaDiem(newData);
        localStorage.setItem('danhSachDiaDiem', JSON.stringify(newData));
        setIsModalOpen(false);
        form.resetFields(); 
    };

    const columns = [
        { 
            title: 'Hình ảnh', 
            dataIndex: 'hinhAnh', 
            key: 'hinhAnh',
            render: (url: string) => (
                <Image src={url} alt='Hình ảnh' width={80} height={50} style={{ objectFit: 'cover', borderRadius: 4 }} />
            )
        },
        { title: 'Tên điểm đến', dataIndex: 'ten', key: 'ten' },
        { title: 'Loại hình', dataIndex: 'loaiHinh', key: 'loaiHinh', render: (val: string) => <span style={{ textTransform: 'capitalize' }}>{val}</span> },
        { title: 'Thời gian (tiếng)', dataIndex: 'thoiGianThamQuan', key: 'thoiGianThamQuan' },
        { 
            title: 'Đánh giá', 
            dataIndex: 'rating', 
            key: 'rating',
            render: (val: number) => <Rate disabled defaultValue={val || 0} style={{ fontSize: 14 }} />
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size='middle'>
                    <Button style={{ backgroundColor: '#fadb14', borderColor: '#fadb14', color: '#fff' }} onClick={() => showEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm title='Bạn có chắc muốn xóa điểm đến này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy'>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Tabs defaultActiveKey='1' size='large'>
                <Tabs.TabPane tab='Quản lý điểm đến' key='1'>
                    <Button type='primary' style={{marginBottom: 16, marginTop: 10}} onClick={showAddModal}>
                        + Thêm điểm đến
                    </Button>

                    <Table 
                        columns={columns} 
                        dataSource={danhSachDiaDiem} 
                        rowKey='id' 
                        bordered
                    />

                    <Modal 
                        title={thaoTac === 'them' ? 'Thêm điểm đến' : 'Sửa điểm đến'} 
                        visible={isModalOpen}
                        onCancel={() => setIsModalOpen(false)} 
                        onOk={() => form.submit()}
                        okText='Lưu'
                        cancelText='Hủy'
                        width={650}
                    >
                        <Form form={form} layout='vertical' onFinish={handleFinish}>
                            <Form.Item style={{ flex: 2 }} name='ten' label='Tên điểm đến' rules={[{ required: true }]}>
                                <Input placeholder='Nhập tên điểm đến'  />
                            </Form.Item>
                            <Form.Item name='hinhAnh' label='Hình ảnh (URL)' rules={[{ required: true }]}>
                                <Input placeholder='Nhập URL hình ảnh'  />
                            </Form.Item>

                            <Space style={{ display: 'flex', width: '100%' }} align='baseline'>
                                <Form.Item style={{ width: '100%' }} name='thoiGianThamQuan' label='Thời gian tham quan (tiếng)' rules={[{ required: true }]}>
                                    <InputNumber style={{ width: '100%' }} placeholder='VD: 4'  />
                                </Form.Item>
                                <Form.Item style={{ width: '100%', minWidth: 200 }} name='loaiHinh' label='Loại hình du lịch' rules={[{ required: true }]}>
                                    <Select placeholder='Chọn loại hình'>
                                        <Select.Option value='biển'>Biển</Select.Option>
                                        <Select.Option value='núi'>Núi</Select.Option>
                                        <Select.Option value='thành phố'>Thành phố</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space>

                            <Form.Item name='moTa' label='Mô tả' rules={[{ required: true }]}>
                                <Input.TextArea rows={3} placeholder='Nhập mô tả điểm đến'  />
                            </Form.Item>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <Form.Item style={{ flex: 1 }} name='chiPhiAnUong' label='Chi phí ăn uống' rules={[{ required: true }]}>
                                    <InputNumber  style={{ width: '100%' }}  placeholder='VNĐ'  />
                                </Form.Item>
                                <Form.Item style={{ flex: 1 }} name='chiPhiDiChuyen' label='Chi phí đi lại' rules={[{ required: true }]}>
                                    <InputNumber  style={{ width: '100%' }}  placeholder='VNĐ'  />
                                </Form.Item>
                                <Form.Item style={{ flex: 1 }} name='chiPhiLuuTru' label='Chi phí lưu trú' rules={[{ required: true }]}>
                                    <InputNumber  style={{ width: '100%' }}  placeholder='VNĐ'  />
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>
                </Tabs.TabPane>



                <Tabs.TabPane tab='Báo cáo Thống kê' key='2'>
                    <div style={{ marginTop: 10 }}>
                        <Alert
                            message={`Hệ thống đang ghi nhận tổng cộng ${danhSachLichTrinh.length} lượt tạo lịch trình từ người dùng.`}
                            description={`Địa điểm đang được quan tâm nhất hiện tại là: ${tenDiaDiemHotNhat}.`}
                            type='info'
                            showIcon
                            style={{ marginBottom: 24, fontWeight: '500' }}
                        />

                        <Row gutter={16} style={{ marginBottom: 24 }}>
                            <Col span={8}>
                                <Card>
                                    <Statistic title='Tổng doanh thu luân chuyển' value={tongDoanhThu} suffix='VNĐ' valueStyle={{ color: '#cf1322', fontWeight: 'bold' }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <Statistic title='Trung bình/Lịch trình' value={danhSachLichTrinh.length ? Math.round(tongDoanhThu / danhSachLichTrinh.length) : 0} suffix='VNĐ' valueStyle={{ color: '#1890ff' }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <Statistic title='Lượt lịch trình đã chốt' value={danhSachLichTrinh.length} suffix='Chuyến' valueStyle={{ color: '#3f8600' }} />
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={14}>
                                <Card title='Biểu đồ: Số lượt tạo lịch trình theo tháng'>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 250, borderBottom: '2px solid #f0f0f0', borderLeft: '2px solid #f0f0f0', padding: '20px 10px 0' }}>
                                        {luotTheoThang.map((soLuot, index) => (
                                            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '6%' }}>
                                                <Tooltip title={`Tháng ${index + 1}: ${soLuot} lượt`}>
                                                    <div style={{ 
                                                        width: '100%', 
                                                        backgroundColor: '#1890ff', 
                                                        height: `${(soLuot / maxLuotTheoThang) * 100}%`, 
                                                        minHeight: soLuot > 0 ? 5 : 0,
                                                        borderRadius: '4px 4px 0 0',
                                                        transition: 'height 0.3s'
                                                    }} />
                                                </Tooltip>
                                                <span style={{ marginTop: 8, fontSize: 12, color: '#888' }}>T{index + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </Col>

                            <Col span={10}>
                                <Card title='Cơ cấu dòng tiền theo hạng mục'>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 10 }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                <span> Tiền Ăn uống</span>
                                                <strong>{tongAnUong.toLocaleString()} đ</strong>
                                            </div>
                                            <Progress percent={tongDoanhThu ? Math.round((tongAnUong / tongDoanhThu) * 100) : 0} strokeColor='#faad14' />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                <span> Tiền Lưu trú</span>
                                                <strong>{tongLuuTru.toLocaleString()} đ</strong>
                                            </div>
                                            <Progress percent={tongDoanhThu ? Math.round((tongLuuTru / tongDoanhThu) * 100) : 0} strokeColor='#52c41a' />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                <span> Tiền Di chuyển</span>
                                                <strong>{tongDiChuyen.toLocaleString()} đ</strong>
                                            </div>
                                            <Progress percent={tongDoanhThu ? Math.round((tongDiChuyen / tongDoanhThu) * 100) : 0} strokeColor='#1890ff' />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Tabs.TabPane>

            </Tabs>
        </div>
    );
};

export default TrangQuanTri;