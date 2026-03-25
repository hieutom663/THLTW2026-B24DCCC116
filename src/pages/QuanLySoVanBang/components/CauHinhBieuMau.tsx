import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import type { TruongThongTin } from './Data';

interface Props {
    truongThongTinList: TruongThongTin[];
    setTruongThongTinList: (data: TruongThongTin[]) => void;
}

const CauHinhBieuMau = ({ truongThongTinList, setTruongThongTinList }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState<string>('');
    const [form] = Form.useForm();

    const openModalThem = () => {
        setThaoTac('them');
        form.resetFields();
        setIsOpen(true);
    };

    const openModalSua = (record: TruongThongTin) => {
        setThaoTac('sua');
        setEditingId(record.id);
        form.setFieldsValue({
            tenTruong: record.tenTruong,
            kieuDuLieu: record.kieuDuLieu
        });
        setIsOpen(true);
    };

    const handleSave = (values: any) => {
        if (thaoTac === 'them') {
            const newField: TruongThongTin = {
                id: Date.now().toString(),
                tenTruong: values.tenTruong,
                kieuDuLieu: values.kieuDuLieu,
            };
            setTruongThongTinList([...truongThongTinList, newField]);
        } else {
            setTruongThongTinList(truongThongTinList.map(t => 
                t.id === editingId ? { ...t, tenTruong: values.tenTruong, kieuDuLieu: values.kieuDuLieu } : t
            ));
        }
        setIsOpen(false);
        form.resetFields();
    };

    const handleDelete = (id: string) => {
        setTruongThongTinList(truongThongTinList.filter(t => t.id !== id));
    };

    const columns = [
        { title: 'Tên trường thông tin', dataIndex: 'tenTruong', key: 'tenTruong' },
        { title: 'Kiểu dữ liệu', dataIndex: 'kieuDuLieu', key: 'kieuDuLieu' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: TruongThongTin) => (
                <Space>
                    <Button style={{ backgroundColor: '#f6e230' }} onClick={() => openModalSua(record)}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Button type='primary' onClick={openModalThem} style={{ marginBottom: 20 }}>
                + Thêm Trường Dữ Liệu
            </Button>
            <Table columns={columns} dataSource={truongThongTinList} rowKey='id' />

            <Modal 
                title={thaoTac === 'them' ? 'Thêm trường thông tin' : 'Sửa trường thông tin'} 
                visible={isOpen} 
                onCancel={() => setIsOpen(false)} 
                onOk={() => form.submit()}
                okText='Lưu'
                cancelText='Hủy'
            >
                <Form form={form} layout='vertical' onFinish={handleSave}>
                    <Form.Item name='tenTruong' label='Tên trường (VD: Dân tộc, Điểm TB)' rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='kieuDuLieu' label='Kiểu dữ liệu' rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu!' }]}>
                        <Select options={[
                            { value: 'String', label: 'Văn bản (String)' }, 
                            { value: 'Number', label: 'Số (Number)' }, 
                            { value: 'Date', label: 'Ngày tháng (Date)' }
                        ]} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CauHinhBieuMau;