import { useState } from 'react';
import type { PhongHoc } from './Data';
import { danhSachGiaoVien } from './Data';
import { Button, Form, Input, Modal, Select, Table, Space, Popconfirm, message, InputNumber } from 'antd';

interface Props {
    danhSachPhongHoc: PhongHoc[];
    setDanhSachPhongHoc: any;
}

const QuanLyPhongHoc = ({ danhSachPhongHoc, setDanhSachPhongHoc }: Props) => {
    const [timKiem, setTimKiem] = useState<string>('');
    const [locLoaiPhong, setLocLoaiPhong] = useState<string | undefined>();
    const [locNguoiPhuTrach, setLocNguoiPhuTrach] = useState<string | undefined>();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();

    const danhSachNguoiPhuTrach = Array.from(new Set([
        ...danhSachGiaoVien,
        ...danhSachPhongHoc.map(p => p.nguoiPhuTrach)
    ]));

    const dsHienThi = danhSachPhongHoc.filter(phong => {
    const matchSearch = phong.id.toLowerCase().includes(timKiem.toLowerCase()) || 
                        phong.tenPhong.toLowerCase().includes(timKiem.toLowerCase());
    const matchLoai = locLoaiPhong ? phong.loaiPhong === locLoaiPhong : true;
    const matchNguoi = locNguoiPhuTrach ? phong.nguoiPhuTrach === locNguoiPhuTrach : true;
    
    return matchSearch && matchLoai && matchNguoi;
});

    const showAddModal = () => {
        setThaoTac('them');
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (record: PhongHoc) => {
        setThaoTac('sua');
        setEditingId(record.id);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleFinish = (values: any) => {
        if (thaoTac === 'them') {
            setDanhSachPhongHoc([...danhSachPhongHoc, values]);
            message.success('Thêm phòng học thành công!');
        } else {
            const newData = danhSachPhongHoc.map(item => item.id === editingId ? { ...values, id: editingId } : item);
            setDanhSachPhongHoc(newData);
            message.success('Cập nhật phòng học thành công!');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (record: PhongHoc) => {
        if (record.soChoNgoi >= 30) {
            message.error('Không thể xóa! Chỉ được phép xóa phòng có dưới 30 chỗ ngồi.');
            return;
        }
        setDanhSachPhongHoc(danhSachPhongHoc.filter(p => p.id !== record.id));
        message.success('Đã xóa phòng học!');
    };
    const xoaLoc = () => {
        setTimKiem('');
        setLocLoaiPhong(undefined);
        setLocNguoiPhuTrach(undefined);
    };

    const columns = [
        { title: 'Mã phòng', dataIndex: 'id', key: 'id' },
        { title: 'Tên phòng', dataIndex: 'tenPhong', key: 'tenPhong' },
        { title: 'Số chỗ ngồi', dataIndex: 'soChoNgoi', key: 'soChoNgoi', sorter: (a: PhongHoc, b: PhongHoc) => a.soChoNgoi - b.soChoNgoi },
        { 
            title: 'Loại phòng', 
            dataIndex: 'loaiPhong', 
            key: 'loaiPhong',
            render: (val: string) => {
                if (val === 'LyThuyet') return 'Lý thuyết';
                if (val === 'ThucHanh') return 'Thực hành';
                return 'Hội trường';
            }
        },
        { title: 'Người phụ trách', dataIndex: 'nguoiPhuTrach', key: 'nguoiPhuTrach' },
        { 
            title: 'Thao tác', 
            render: (_: any, record: PhongHoc) => (
                <Space>
                    <Button onClick={() => showEditModal(record)} style={{backgroundColor: 'yellow'}} >Sửa</Button>
                    <Popconfirm 
                        title='Bạn có chắc chắn muốn xóa phòng học này?' 
                        onConfirm={() => handleDelete(record)}
                        okText='Xóa'
                        cancelText='Hủy'
                    >
                        <Button type='primary' danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <h1>Hệ thống Quản lý Phòng học</h1>
            
            <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
                <Input 
                    placeholder='Tìm theo mã hoặc tên phòng' 
                    style={{ width: 240 }} 
                    value={timKiem}
                    onChange={(e) => setTimKiem(e.target.value)}
                    allowClear
                />
                <Select 
                    placeholder='Lọc loại phòng' 
                    style={{ width: 160 }} 
                    value={locLoaiPhong}
                    onChange={setLocLoaiPhong}
                    allowClear
                >
                    <Select.Option value='LyThuyet'>Lý thuyết</Select.Option>
                    <Select.Option value='ThucHanh'>Thực hành</Select.Option>
                    <Select.Option value='HoiTruong'>Hội trường</Select.Option>
                </Select>
                <Select 
                    placeholder='Lọc người phụ trách' 
                    style={{ width: 200 }} 
                    value={locNguoiPhuTrach}
                    onChange={setLocNguoiPhuTrach}
                    allowClear
                >
                    {danhSachNguoiPhuTrach.map(nguoi => (
                        <Select.Option key={nguoi} value={nguoi}>{nguoi}</Select.Option>
                    ))}
                </Select>
                <Button onClick={xoaLoc}>Xóa bộ lọc</Button>
                <Button type='primary' onClick={showAddModal}>Thêm phòng học</Button>
            </Space>

            <Table columns={columns} dataSource={dsHienThi} rowKey='id' bordered />

            <Modal 
                title={thaoTac === 'them' ? 'Thêm phòng học mới' : 'Chỉnh sửa phòng học'} 
                visible={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                onOk={() => form.submit()}
                okText='Lưu'
                cancelText='Hủy'
            >
                <Form form={form} layout='vertical' onFinish={handleFinish}>
                    <Form.Item 
                        label='Mã phòng học' 
                        name='id' 
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã phòng!' },
                            { max: 10, message: 'Mã phòng tối đa 10 ký tự!' },
                            () => ({
                                validator(_, value) {
                                    if (thaoTac === 'them' && value && danhSachPhongHoc.some(p => p.id === value)) {
                                        return Promise.reject(new Error('Mã phòng này đã tồn tại!'));
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}
                    >
                        <Input placeholder='Nhập mã phòng' maxLength={10} disabled={thaoTac === 'sua'} />
                    </Form.Item>

                    <Form.Item 
                        label='Tên phòng học' 
                        name='tenPhong' 
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên phòng!' },
                            { max: 50, message: 'Tên phòng tối đa 50 ký tự!' },
                            () => ({
                                validator(_, value) {
                                    if (value && danhSachPhongHoc.some(p => p.tenPhong === value && p.id !== editingId)) {
                                        return Promise.reject(new Error('Tên phòng này đã tồn tại!'));
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}
                    >
                        <Input placeholder='Nhập tên phòng' maxLength={50} />
                    </Form.Item>

                    <Space style={{ display: 'flex', width: '100%' }}>
                        <Form.Item 
                            label='Số chỗ ngồi' 
                            name='soChoNgoi' 
                            style={{ flex: 1 }}
                            rules={[{ required: true, message: 'Vui lòng nhập số chỗ!' }]}
                        >
                            <InputNumber 
                                placeholder='Nhập số chỗ ngồi (10 - 200)' 
                                min={10} 
                                max={200} 
                                style={{ width: '100%' }} 
                            />
                        </Form.Item>

                        <Form.Item 
                            label='Loại phòng' 
                            name='loaiPhong' 
                            style={{ flex: 1, marginLeft: 16 }}
                            rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
                        >
                            <Select placeholder='Chọn loại phòng'>
                                <Select.Option value='LyThuyet'>Lý thuyết</Select.Option>
                                <Select.Option value='ThucHanh'>Thực hành</Select.Option>
                                <Select.Option value='HoiTruong'>Hội trường</Select.Option>
                            </Select>
                        </Form.Item>
                    </Space>

                    <Form.Item 
                        label='Người phụ trách' 
                        name='nguoiPhuTrach' 
                        rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
                    >
                        <Select placeholder='Chọn người phụ trách'>
                            {danhSachNguoiPhuTrach.map(nguoi => (
                                <Select.Option key={nguoi} value={nguoi}>{nguoi}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyPhongHoc;