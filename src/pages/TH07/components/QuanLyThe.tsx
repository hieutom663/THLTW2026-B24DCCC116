import { useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Popconfirm, message } from 'antd';
import type { Tag, BaiViet } from './Data';

interface Props {
    danhSachThe: Tag[];
    setDanhSachThe: any;
    danhSachBaiViet: BaiViet[];
}

const QuanLyThe = ({ danhSachThe, setDanhSachThe, danhSachBaiViet }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();

    const showAddModal = () => {
        setThaoTac('them');
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (record: Tag) => {
        setThaoTac('sua');
        setEditingId(record.id);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleFinish = (values: any) => {
        if (thaoTac === 'them') {
            const newTag = { id: 'T' + Date.now(), ...values };
            const newData = [...danhSachThe, newTag];
            setDanhSachThe(newData);
            localStorage.setItem('danhSachThe', JSON.stringify(newData));
            message.success('Thêm thẻ thành công!');
        } else {
            const newData = danhSachThe.map(item => item.id === editingId ? { ...item, ...values } : item);
            setDanhSachThe(newData);
            localStorage.setItem('danhSachThe', JSON.stringify(newData));
            message.success('Cập nhật thẻ thành công!');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        const isInUse = danhSachBaiViet.some(bv => bv.theTags.includes(id));
        if (isInUse) {
            message.error('Không thể xóa! Thẻ này đang được sử dụng trong bài viết.');
            return;
        }
        const newData = danhSachThe.filter(item => item.id !== id);
        setDanhSachThe(newData);
        localStorage.setItem('danhSachThe', JSON.stringify(newData));
        message.success('Đã xóa thẻ!');
    };

    const columns = [
        { title: 'Tên thẻ', dataIndex: 'ten', key: 'ten' },
        {
            title: 'Số bài viết đang dùng',
            key: 'usage',
            render: (_: any, record: Tag) => {
                const count = danhSachBaiViet.filter(bv => bv.theTags.includes(record.id)).length;
                return count;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: Tag) => (
                <Space>
                    <Button type='link' onClick={() => showEditModal(record)}>Sửa</Button>
                    <Popconfirm title='Xóa thẻ này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy'>
                        <Button type='link' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <Button type='primary' onClick={showAddModal} style={{ marginBottom: 16 }}>+ Thêm thẻ mới</Button>
            <Table columns={columns} dataSource={danhSachThe} rowKey='id' bordered />

            <Modal 
                title={thaoTac === 'them' ? 'Thêm thẻ' : 'Sửa thẻ'} 
                visible={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                onOk={() => form.submit()}
                okText='Lưu'
                cancelText='Hủy'
            >
                <Form form={form} layout='vertical' onFinish={handleFinish}>
                    <Form.Item name='ten' label='Tên thẻ' rules={[{ required: true }]}>
                        <Input placeholder='Nhập tên thẻ' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyThe;