import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, message, InputNumber } from 'antd';
import type { VanBang, QuyetDinh, SoVanBang, TruongThongTin } from './Data';

interface Props {
    soVanBangList: SoVanBang[];
    setSoVanBangList: any;
    quyetDinhList: QuyetDinh[];
    truongThongTinList: TruongThongTin[];
    vanBangList: VanBang[];
    setVanBangList: any;
}

const QuanLyVanBang = ({ soVanBangList, setSoVanBangList, quyetDinhList, truongThongTinList, vanBangList, setVanBangList }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAddVanBang = (values: any) => {
        const { quyetDinhId, soHieuVanBang, maSV, hoTen, ngaySinh, thongTinDong } = values;

        const qd = quyetDinhList.find(q => q.id === quyetDinhId);
        if (!qd) return message.error('Không tìm thấy Quyết định!');

        const so = soVanBangList.find(s => s.id === qd.soVanBangId);
        if (!so) return message.error('Quyết định này chưa được gắn với Sổ văn bằng nào!');

        const currentSoVaoSo = so.soVaoSoHienTai;

        const newVanBang: VanBang = {
            id: Date.now().toString(),
            quyetDinhId,
            soVaoSo: currentSoVaoSo,
            soHieuVanBang,
            maSV,
            hoTen,
            ngaySinh: ngaySinh.format('DD-MM-YYYY'),
            thongTinDong: thongTinDong || {} 
        };

        setVanBangList([...vanBangList, newVanBang]);
        setSoVanBangList(soVanBangList.map(s => 
            s.id === so.id ? { ...s, soVaoSoHienTai: s.soVaoSoHienTai + 1 } : s
        ));

        message.success(`Đã thêm văn bằng! Số vào sổ: ${currentSoVaoSo}`);
        setIsModalOpen(false);
        form.resetFields();

        return;
    };

    const columns = [
        { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
        { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
        { title: 'Mã SV', dataIndex: 'maSV', key: 'maSV' },
        { title: 'Họ Tên', dataIndex: 'hoTen', key: 'hoTen' },
        {
            title: 'Quyết định',
            key: 'quyetDinh',
            render: (_: any, record: VanBang) => quyetDinhList.find(q => q.id === record.quyetDinhId)?.soQD || 'N/A'
        }
    ];

    return (
        <div>
            <Button type='primary' onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
                Cấp Văn Bằng Mới
            </Button>
            <Table columns={columns} dataSource={vanBangList} rowKey='id' />

            <Modal title='Thêm Thông Tin Văn Bằng' visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout='vertical' onFinish={handleAddVanBang}>
                    <Form.Item name='quyetDinhId' label='Quyết định tốt nghiệp' rules={[{ required: true }]}>
                        <Select>
                            {quyetDinhList.map(qd => <Select.Option key={qd.id} value={qd.id}>{qd.soQD}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Space style={{ display: 'flex' }} align='baseline'>
                        <Form.Item name='soHieuVanBang' label='Số hiệu VB' rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}>
                            <Input />
                        </Form.Item>
                    </Space>

                    <Space style={{ display: 'flex' }} align='baseline'>
                        <Form.Item name='maSV' label='Mã Sinh Viên' rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='hoTen' label='Họ Tên' rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                            <Input />
                        </Form.Item>
                    </Space>
                    
                    <Form.Item name='ngaySinh' label='Ngày sinh' rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                        <DatePicker style={{ width: '100%' }} format='DD-MM-YYYY' />
                    </Form.Item>

                    {truongThongTinList.map(truong => (
                        <Form.Item 
                            key={truong.id} 
                            label={truong.tenTruong} 
                            name={['thongTinDong', truong.id]}
                        >
                            {truong.kieuDuLieu === 'String' && <Input />}
                            {truong.kieuDuLieu === 'Number' && <InputNumber style={{ width: '100%' }} />}
                            {truong.kieuDuLieu === 'Date' && <DatePicker style={{ width: '100%' }} format='DD-MM-YYYY' />}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyVanBang;