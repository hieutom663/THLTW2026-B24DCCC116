import { useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Popconfirm, message, Select, Tag as AntTag } from 'antd';
import type { BaiViet, Tag } from './Data';

interface Props {
    danhSachBaiViet: BaiViet[];
    setDanhSachBaiViet: any;
    danhSachThe: Tag[];
}

const QuanLyBaiViet = ({ danhSachBaiViet, setDanhSachBaiViet, danhSachThe }: Props) => {
    const [timKiem, setTimKiem] = useState('');
    const [locTrangThai, setLocTrangThai] = useState<string | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();

    const dsHienThi = danhSachBaiViet.filter(bv => {
        const matchTitle = bv.tieuDe.toLowerCase().includes(timKiem.toLowerCase());
        const matchStatus = locTrangThai ? bv.trangThai === locTrangThai : true;
        return matchTitle && matchStatus;
    });

    const showAddModal = () => {
        setThaoTac('them');
        form.resetFields();
        form.setFieldsValue({ trangThai: 'Draft' });
        setIsModalOpen(true);
    };

    const showEditModal = (record: BaiViet) => {
        setThaoTac('sua');
        setEditingId(record.id);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleFinish = (values: any) => {
        const payload = { ...values, ngayDang: new Date().toLocaleDateString('vi-VN') };
        let newData;
        if (thaoTac === 'them') {
            const newPost = { id: 'BV' + Date.now(), luotXem: 0, tacGia: 'Admin', ...payload };
            newData = [...danhSachBaiViet, newPost];
            message.success('Thêm bài viết thành công!');
        } else {
            newData = danhSachBaiViet.map(item => item.id === editingId ? { ...item, ...payload } : item);
            message.success('Cập nhật bài viết thành công!');
        }
        setDanhSachBaiViet(newData);
        localStorage.setItem('danhSachBaiViet', JSON.stringify(newData));
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        const newData = danhSachBaiViet.filter(item => item.id !== id);
        setDanhSachBaiViet(newData);
        localStorage.setItem('danhSachBaiViet', JSON.stringify(newData));
        message.success('Đã xóa bài viết!');
    };

    const columns = [
        { title: 'Tiêu đề', dataIndex: 'tieuDe', key: 'tieuDe' },
        { 
            title: 'Trạng thái', 
            dataIndex: 'trangThai', 
            key: 'trangThai',
            render: (val: string) => <AntTag color={val === 'Published' ? 'green' : 'default'}>{val}</AntTag>
        },
        { 
            title: 'Thẻ', 
            dataIndex: 'theTags', 
            key: 'theTags',
            render: (tags: string[]) => (
                <>
                    {tags.map(tId => {
                        const tagObj = danhSachThe.find(t => t.id === tId);
                        return tagObj ? <AntTag key={tId}>{tagObj.ten}</AntTag> : null;
                    })}
                </>
            )
        },
        { title: 'Lượt xem', dataIndex: 'luotXem', key: 'luotXem' },
        { title: 'Ngày tạo', dataIndex: 'ngayDang', key: 'ngayDang' },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: BaiViet) => (
                <Space>
                    <Button type='link' onClick={() => showEditModal(record)}>Sửa</Button>
                    <Popconfirm title='Xóa bài viết này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy'>
                        <Button type='link' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <Space style={{ marginBottom: 16 }}>
                <Input placeholder='Tìm kiếm tiêu đề' style={{ width: 250 }} value={timKiem} onChange={e => setTimKiem(e.target.value)} allowClear />
                <Select placeholder='Lọc trạng thái' style={{ width: 150 }} value={locTrangThai} onChange={setLocTrangThai} allowClear>
                    <Select.Option value='Published'>Đã đăng</Select.Option>
                    <Select.Option value='Draft'>Nháp</Select.Option>
                </Select>
                <Button type='primary' onClick={showAddModal}>+ Thêm bài viết</Button>
            </Space>

            <Table columns={columns} dataSource={dsHienThi} rowKey='id' bordered />

            <Modal 
                title={thaoTac === 'them' ? 'Thêm bài viết' : 'Sửa bài viết'} 
                visible={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                onOk={() => form.submit()}
                width={800}
                okText='Lưu'
                cancelText='Hủy'
            >
                <Form form={form} layout='vertical' onFinish={handleFinish}>
                    <Space style={{ display: 'flex' }} align='baseline'>
                        <Form.Item style={{ flex: 2 }} name='tieuDe' label='Tiêu đề' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item style={{ flex: 1 }} name='slug' label='Slug' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Space>
                    <Form.Item name='tomTat' label='Tóm tắt' rules={[{ required: true }]}>
                        <Input.TextArea rows={2} />
                    </Form.Item>
                    <Form.Item name='noiDung' label='Nội dung (Markdown)' rules={[{ required: true }]}>
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item name='anhDaiDien' label='Ảnh đại diện (URL)' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Space style={{ display: 'flex' }} align='baseline'>
                        <Form.Item style={{ minWidth: 300 }} name='theTags' label='Thẻ (Tags)' rules={[{ required: true }]}>
                            <Select mode='multiple' placeholder='Chọn thẻ'>
                                {danhSachThe.map(t => <Select.Option key={t.id} value={t.id}>{t.ten}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true }]}>
                            <Select style={{ width: 150 }}>
                                <Select.Option value='Published'>Đã đăng</Select.Option>
                                <Select.Option value='Draft'>Nháp</Select.Option>
                            </Select>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyBaiViet;