import { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Table, Popconfirm, Tag } from 'antd';
import type { BaiTapLog } from './Data';

interface Props {
    danhSach: BaiTapLog[];
    setDanhSach: any;
}

const NhatKyTapLuyen = ({ danhSach, setDanhSach }: Props) => {
    const [timKiem, setTimKiem] = useState('');
    const [locLoai, setLocLoai] = useState<string | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();

    const dsHienThi = danhSach.filter(item => {
        const matchName = item.tenBaiTap.toLowerCase().includes(timKiem.toLowerCase());
        const matchType = locLoai ? item.loai === locLoai : true;
        return matchName && matchType;
    });

    const showModal = (record?: BaiTapLog) => {
        if (record) {
            setThaoTac('sua');
            setEditingId(record.id);
            form.setFieldsValue(record);
        } else {
            setThaoTac('them');
            form.resetFields();
            form.setFieldsValue({ trangThai: 'Hoàn thành' });
        }
        setIsModalOpen(true);
    };

    const handleFinish = (values: any) => {
        const data = { ...values, ngay: values.ngay.format('DD/MM/YYYY') };
        let newData;
        if (thaoTac === 'them') {
            newData = [...danhSach, { id: 'NK' + Date.now(), ...data }];
        } else {
            newData = danhSach.map(item => item.id === editingId ? { ...item, ...data } : item);
        }
        setDanhSach(newData);
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setDanhSach(danhSach.filter(item => item.id !== id));
    };

    const columns = [
        { title: 'Ngày', dataIndex: 'ngay', key: 'ngay' },
        { title: 'Bài tập', dataIndex: 'tenBaiTap', key: 'tenBaiTap' },
        { title: 'Loại', dataIndex: 'loai', key: 'loai' },
        { title: 'Thời lượng (p)', dataIndex: 'thoiLuong', key: 'thoiLuong' },
        { title: 'Calo', dataIndex: 'calo', key: 'calo' },
        { title: 'Ghi chú', dataIndex: 'ghiChu', key: 'ghiChu' },
        { 
            title: 'Trạng thái', 
            dataIndex: 'trangThai', 
            render: (val: string) => <Tag color={val === 'Hoàn thành' ? 'green' : 'red'}>{val}</Tag> 
        },
        {
            title: 'Thao tác',
            render: (_: any, record: BaiTapLog) => (
                <Space>
                    <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
                    <Popconfirm title="Xóa buổi tập?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ marginBottom: 16 }}>
                <Input placeholder="Tìm tên bài tập" style={{ width: 200 }} value={timKiem} onChange={e => setTimKiem(e.target.value)} allowClear />
                <Select placeholder="Lọc loại bài" style={{ width: 150 }} value={locLoai} onChange={setLocLoai} allowClear>
                    {['Cardio', 'Strength', 'Yoga', 'HIIT', 'Other'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
                </Select>
                <Button type="primary" onClick={() => showModal()}>Thêm buổi tập</Button>
            </Space>

            <Table columns={columns} dataSource={dsHienThi} rowKey="id" bordered />

            <Modal title={thaoTac === 'them' ? 'Thêm buổi tập' : 'Sửa buổi tập'} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="ngay" label="Ngày tập" rules={[{ required: true }]}><DatePicker format="DD/MM/YYYY" style={{ width: '100%' }}/></Form.Item>
                    <Form.Item name="tenBaiTap" label="Tên bài tập" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="loai" label="Loại bài tập" rules={[{ required: true }]}>
                        <Select>{['Cardio', 'Strength', 'Yoga', 'HIIT', 'Other'].map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}</Select>
                    </Form.Item>
                    <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item name="thoiLuong" label="Thời lượng (phút)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }}/></Form.Item>
                        <Form.Item name="calo" label="Calo đốt" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }}/></Form.Item>
                    </Space>
                    <Form.Item name="ghiChu" label="Ghi chú"><Input.TextArea /></Form.Item>
                    <Form.Item name="trangThai" label="Trạng thái">
                        <Select><Select.Option value="Hoàn thành">Hoàn thành</Select.Option><Select.Option value="Bỏ lỡ">Bỏ lỡ</Select.Option></Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NhatKyTapLuyen;