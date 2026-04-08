import { Button, DatePicker, Form, Input, Modal, Select, Table, Space, message, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import type { DiaDiem, LichTrinh } from './Data';

interface Props {
    danhSachLichTrinh: LichTrinh[];
    setDanhSachLichTrinh: any;
    danhSachDiaDiem: DiaDiem[];
}

const TaoLichTrinh = (props: Props) => {
    const { danhSachLichTrinh, setDanhSachLichTrinh, danhSachDiaDiem } = props;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const savedData = localStorage.getItem('danhSachLichTrinh');
        if (savedData) {
            setDanhSachLichTrinh(JSON.parse(savedData));
        }
    }, [setDanhSachLichTrinh]);

    const handleFinish = (values: any) => {
        const diaDiem = danhSachDiaDiem.find(d => d.id === values.diemDenId);
        
        let tongNganSach = 0;
        let tongThoiGian = 0;

        if (diaDiem) {
            tongNganSach = (diaDiem.chiPhiAnUong || 0) + (diaDiem.chiPhiDiChuyen || 0) + (diaDiem.chiPhiLuuTru || 0);
            tongThoiGian = Number(diaDiem.thoiGianThamQuan || 0);
        }

        const newLichTrinh: LichTrinh = {
            id: 'LT' + Date.now(),
            ten: values.ten,
            noiKhoiHanh: values.noiKhoiHanh,
            ngayKhoiHanh: values.ngayKhoiHanh.format('DD/MM/YYYY'),
            diemDenId: values.diemDenId, 
            tongNganSach,
            tongThoiGian
        };

        const newData = [...danhSachLichTrinh, newLichTrinh];
        setDanhSachLichTrinh(newData);
        localStorage.setItem('danhSachLichTrinh', JSON.stringify(newData));

        message.success('Tạo lịch trình thành công!');
        setIsModelOpen(false);
        form.resetFields();
    };

    const handleDelete = (id: string) => {
        const newData = danhSachLichTrinh.filter(item => item.id !== id);
        setDanhSachLichTrinh(newData);
        localStorage.setItem('danhSachLichTrinh', JSON.stringify(newData));
        message.success('Đã xóa lịch trình!');
    };

    const columns = [
        { title: 'Tên lịch trình', dataIndex: 'ten', key: 'ten' },
        { title: 'Nơi khởi hành', dataIndex: 'noiKhoiHanh', key: 'noiKhoiHanh' },
        { title: 'Ngày đi', dataIndex: 'ngayKhoiHanh', key: 'ngayKhoiHanh' },
        { 
            title: 'Điểm đến', 
            key: 'diemDenId',
            render: (_: any, record: LichTrinh) => {

                const tenDD = danhSachDiaDiem.find(d => d.id === record.diemDenId)?.ten || 'Đã xóa';
                return <strong style={{ color: '#1890ff' }}>{tenDD}</strong>;
            }
        },
        { 
            title: 'Tổng thời gian', 
            dataIndex: 'tongThoiGian', 
            key: 'tongThoiGian',
            render: (val: number) => <span>{val} tiếng</span>
        },
        { 
            title: 'Tổng ngân sách dự kiến', 
            dataIndex: 'tongNganSach', 
            key: 'tongNganSach',
            render: (val: number) => <strong style={{ color: '#cf1322' }}>{val.toLocaleString()} đ</strong>
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: LichTrinh) => (
                <Popconfirm title='Xóa lịch trình này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy'>
                    <Button danger size='small'>Xóa</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Quản lý Lịch trình của tôi</h1>
            <Button type='primary' style={{marginBottom: 16}} onClick={() => {
                form.resetFields();
                setIsModelOpen(true);
            }}>
                + Tạo lịch trình mới
            </Button>
            
            <Table columns={columns} dataSource={danhSachLichTrinh} bordered rowKey='id' /> 

            <Modal 
                title='Tạo lịch trình du lịch' 
                visible={isModelOpen} 
                onCancel={() => setIsModelOpen(false)} 
                onOk={() => form.submit()}
                okText='Lưu lịch trình'
                cancelText='Hủy'
            >
                <Form form={form} layout='vertical' onFinish={handleFinish}>
                    <Form.Item name='ten' label='Tên lịch trình' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder='Nhập tên lịch trình'  />
                    </Form.Item>
                    
                    <Space style={{ display: 'flex', width: '100%' }} align='baseline'>
                        <Form.Item style={{ flex: 1 }} name='noiKhoiHanh' label='Nơi khởi hành' rules={[{ required: true, message: 'Vui lòng chọn nơi đi!' }]}>
                            <Select placeholder='Chọn nơi'>
                                <Select.Option value='Hà Nội'>Hà Nội</Select.Option>
                                <Select.Option value='Đà Nẵng'>Đà Nẵng</Select.Option>
                                <Select.Option value='TP. Hồ Chí Minh'>TP. Hồ Chí Minh</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} name='ngayKhoiHanh' label='Ngày đi' rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                            <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' placeholder='Chọn ngày' />
                        </Form.Item>
                    </Space>

                    <Form.Item name='diemDenId' label='Điểm đến' rules={[{ required: true, message: 'Vui lòng chọn 1 điểm đến!' }]}>
                        <Select placeholder='Chọn điểm đến'>
                            {danhSachDiaDiem.map(dd => (
                                <Select.Option key={dd.id} value={dd.id}>{dd.ten}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TaoLichTrinh;