import { useState } from 'react';
import { Button, DatePicker, Form, InputNumber, Modal, Space, Table, Popconfirm, Tag } from 'antd';
import type { ChiSo } from './Data';

interface Props {
    danhSach: ChiSo[];
    setDanhSach: any;
}

const NhatKyChiSo = ({ danhSach, setDanhSach }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();

    const showModal = (record?: ChiSo) => {
        if (record) {
            setThaoTac('sua');
            setEditingId(record.id);
            form.setFieldsValue(record);
        } else {
            setThaoTac('them');
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleFinish = (values: any) => {
        const data = { ...values, ngay: values.ngay.format('DD/MM/YYYY') };
        let newData;
        if (thaoTac === 'them') {
            newData = [...danhSach, { id: 'CS' + Date.now(), ...data }];
        } else {
            newData = danhSach.map(item => item.id === editingId ? { ...item, ...data } : item);
        }
        setDanhSach(newData);
        setIsModalOpen(false);
    };

    const columns = [
        { title: 'Ngày', dataIndex: 'ngay', key: 'ngay' },
        { title: 'Cân nặng (kg)', dataIndex: 'canNang', key: 'canNang' },
        { title: 'Chiều cao (cm)', dataIndex: 'chieuCao', key: 'chieuCao' },
        { 
            title: 'BMI', 
            render: (_: any, record: ChiSo) => {
                const bmi = record.canNang / Math.pow(record.chieuCao / 100, 2);
                let color = 'red';
                let text = 'Béo phì';
                if (bmi < 18.5) { color = 'blue'; text = 'Thiếu cân'; }
                else if (bmi < 25) { color = 'green'; text = 'Bình thường'; }
                else if (bmi < 30) { color = 'gold'; text = 'Thừa cân'; }
                return <Tag color={color}>{bmi.toFixed(1)} - {text}</Tag>;
            }
        },
        { title: 'Nhịp tim (bpm)', dataIndex: 'nhipTim', key: 'nhipTim' },
        { title: 'Giờ ngủ', dataIndex: 'gioNgu', key: 'gioNgu' },
        {
            title: 'Thao tác',
            render: (_: any, record: ChiSo) => (
                <Space>
                    <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
                    <Popconfirm title="Xóa chỉ số này?" onConfirm={() => setDanhSach(danhSach.filter(x => x.id !== record.id))}>
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={() => showModal()}>Ghi chỉ số</Button>
            <Table columns={columns} dataSource={danhSach} rowKey="id" bordered />

            <Modal title={thaoTac === 'them' ? 'Ghi chỉ số' : 'Sửa chỉ số'} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="ngay" label="Ngày" rules={[{ required: true }]}><DatePicker format="DD/MM/YYYY" style={{ width: '100%' }}/></Form.Item>
                    <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item name="canNang" label="Cân nặng (kg)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }}/></Form.Item>
                        <Form.Item name="chieuCao" label="Chiều cao (cm)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }}/></Form.Item>
                    </Space>
                    <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item name="nhipTim" label="Nhịp tim nghỉ (bpm)"><InputNumber style={{ width: '100%' }}/></Form.Item>
                        <Form.Item name="gioNgu" label="Giờ ngủ"><InputNumber style={{ width: '100%' }}/></Form.Item>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};

export default NhatKyChiSo;