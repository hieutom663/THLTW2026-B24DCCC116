import { useState } from 'react';
import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Tag, Popconfirm } from 'antd';
import type { ThuVien } from './Data';

interface Props {
    danhSach: ThuVien[];
    setDanhSach: any;
}

const ThuVienBaiTap = ({ danhSach, setDanhSach }: Props) => {
    const [timKiem, setTimKiem] = useState('');
    const [locNhom, setLocNhom] = useState<string | undefined>();
    const [locDoKho, setLocDoKho] = useState<string | undefined>();
    const [chiTiet, setChiTiet] = useState<ThuVien | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [form] = Form.useForm();

    const dsHienThi = danhSach.filter(item => {
        const matchName = item.ten.toLowerCase().includes(timKiem.toLowerCase());
        const matchGroup = locNhom ? item.nhomCo === locNhom : true;
        const matchDiff = locDoKho ? item.doKho === locDoKho : true;
        return matchName && matchGroup && matchDiff;
    });

    const handleFormSubmit = (values: any) => {
        if (thaoTac === 'them') {
            setDanhSach([...danhSach, { id: 'TV' + Date.now(), ...values }]);
        } else if (chiTiet) {
            setDanhSach(danhSach.map(item => item.id === chiTiet.id ? { ...item, ...values } : item));
        }
        setIsFormOpen(false);
        setChiTiet(null);
    };

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ marginBottom: 24, flexWrap: 'wrap' }}>
                <Input placeholder="Tìm bài tập" value={timKiem} onChange={e => setTimKiem(e.target.value)} allowClear />
                <Select placeholder="Nhóm cơ" style={{ width: 150 }} value={locNhom} onChange={setLocNhom} allowClear>
                    {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
                </Select>
                <Select placeholder="Độ khó" style={{ width: 150 }} value={locDoKho} onChange={setLocDoKho} allowClear>
                    {['Dễ', 'Trung bình', 'Khó'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
                </Select>
                <Button type="primary" onClick={() => { setThaoTac('them'); form.resetFields(); setIsFormOpen(true); }}>Thêm bài tập</Button>
            </Space>

            <Row gutter={[16, 16]}>
                {dsHienThi.map(bt => (
                    <Col span={8} key={bt.id}>
                        <Card hoverable onClick={() => setChiTiet(bt)}>
                            <h3>{bt.ten}</h3>
                            <Space style={{ marginBottom: 10 }}>
                                <Tag color="blue">{bt.nhomCo}</Tag>
                                <Tag color={bt.doKho === 'Dễ' ? 'green' : bt.doKho === 'Khó' ? 'red' : 'gold'}>{bt.doKho}</Tag>
                            </Space>
                            <p>{bt.moTa}</p>
                            <p style={{ color: 'gray' }}>~ {bt.caloGiờ} kcal/h</p>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal title={chiTiet?.ten} visible={!!chiTiet && !isFormOpen} onCancel={() => setChiTiet(null)} footer={[
                <Popconfirm key="del" title="Xóa?" onConfirm={() => { setDanhSach(danhSach.filter(x => x.id !== chiTiet?.id)); setChiTiet(null); }}><Button danger>Xóa</Button></Popconfirm>,
                <Button key="edit" type="primary" onClick={() => { setThaoTac('sua'); form.setFieldsValue(chiTiet); setIsFormOpen(true); }}>Sửa</Button>
            ]}>
                <p><strong>Nhóm cơ:</strong> {chiTiet?.nhomCo}</p>
                <p><strong>Độ khó:</strong> {chiTiet?.doKho}</p>
                <p><strong>Calo đốt trung bình:</strong> {chiTiet?.caloGiờ} kcal/h</p>
                <p><strong>Hướng dẫn chi tiết:</strong></p>
                <div style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 10, borderRadius: 6 }}>{chiTiet?.huongDan}</div>
            </Modal>

            <Modal title={thaoTac === 'them' ? 'Thêm bài tập' : 'Sửa bài tập'} visible={isFormOpen} onCancel={() => setIsFormOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item name="ten" label="Tên bài tập" rules={[{ required: true }]}><Input /></Form.Item>
                    <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item name="nhomCo" label="Nhóm cơ" rules={[{ required: true }]} style={{ flex: 1 }}>
                            <Select>{['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}</Select>
                        </Form.Item>
                        <Form.Item name="doKho" label="Độ khó" rules={[{ required: true }]} style={{ flex: 1 }}>
                            <Select>{['Dễ', 'Trung bình', 'Khó'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}</Select>
                        </Form.Item>
                    </Space>
                    <Form.Item name="moTa" label="Mô tả ngắn" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="caloGiờ" label="Calo đốt (kcal/h)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="huongDan" label="Hướng dẫn chi tiết" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ThuVienBaiTap;