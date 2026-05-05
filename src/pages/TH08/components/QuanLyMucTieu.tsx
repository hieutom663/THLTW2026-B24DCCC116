import { useState } from 'react';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, InputNumber, Progress, Row, Select, Space, Popconfirm, Tag, Segmented } from 'antd';
import type { MucTieu } from './Data';

interface Props {
    danhSach: MucTieu[];
    setDanhSach: any;
}

const QuanLyMucTieu = ({ danhSach, setDanhSach }: Props) => {
    const [locTrangThai, setLocTrangThai] = useState<string>('Tất cả');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form] = Form.useForm();

    const dsHienThi = danhSach.filter(item => locTrangThai === 'Tất cả' || item.trangThai === locTrangThai);

    const handleFinish = (values: any) => {
        const data = { ...values, deadline: values.deadline.format('DD/MM/YYYY'), giaTriHienTai: 0, trangThai: 'Đang thực hiện' };
        setDanhSach([...danhSach, { id: 'MT' + Date.now(), ...data }]);
        setIsDrawerOpen(false);
        form.resetFields();
    };

    const updateGiaTri = (id: string, value: number | null) => {
        if (value === null) return;
        setDanhSach(danhSach.map(item => item.id === id ? { ...item, giaTriHienTai: value } : item));
    };

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
                <Segmented 
                    options={['Tất cả', 'Đang thực hiện', 'Đã đạt', 'Đã hủy']} 
                    value={locTrangThai} 
                    onChange={(val) => setLocTrangThai(val as string)} 
                />
                <Button type="primary" onClick={() => setIsDrawerOpen(true)}>Thêm mục tiêu</Button>
            </Space>

            <Row gutter={[16, 16]}>
                {dsHienThi.map(mt => {
                    const percent = Math.min(100, Math.round((mt.giaTriHienTai / mt.giaTriMucTieu) * 100));
                    return (
                        <Col span={8} key={mt.id}>
                            <Card 
                                title={mt.ten} 
                                extra={<Popconfirm title="Xóa?" onConfirm={() => setDanhSach(danhSach.filter(x => x.id !== mt.id))}><Button type="text" danger>Xóa</Button></Popconfirm>}
                            >
                                <p><Tag color="blue">{mt.loai}</Tag> <strong>Deadline:</strong> {mt.deadline}</p>
                                <p><strong>Trạng thái:</strong> {mt.trangThai}</p>
                                <Progress percent={percent} status={percent >= 100 ? 'success' : 'active'} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, alignItems: 'center' }}>
                                    <span>Mục tiêu: {mt.giaTriMucTieu}</span>
                                    <Space>
                                        Hiện tại: 
                                        <InputNumber value={mt.giaTriHienTai} onChange={(val) => updateGiaTri(mt.id, val)} size="small" />
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Drawer title="Thêm mục tiêu mới" width={400} visible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="ten" label="Tên mục tiêu" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="loai" label="Loại mục tiêu" rules={[{ required: true }]}>
                        <Select>{['Giảm cân', 'Tăng cơ', 'Cải thiện sức bền', 'Khác'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}</Select>
                    </Form.Item>
                    <Form.Item name="giaTriMucTieu" label="Giá trị cần đạt" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}><DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} /></Form.Item>
                    <Button type="primary" htmlType="submit" block>Tạo mục tiêu</Button>
                </Form>
            </Drawer>
        </div>
    );
};

export default QuanLyMucTieu;