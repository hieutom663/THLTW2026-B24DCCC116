import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Card } from 'antd';
import type { SoVanBang, QuyetDinh } from './Data';

interface Props {
    soVanBangList: SoVanBang[];
    setSoVanBangList: any;
    quyetDinhList: QuyetDinh[];
    setQuyetDinhList: any;
}

const QuanLyQuyetDinh = ({ soVanBangList, setSoVanBangList, quyetDinhList, setQuyetDinhList }: Props) => {
    const [isQDModalOpen, setIsQDModalOpen] = useState(false);
    const [formQD] = Form.useForm();

    const handleAddQD = (values: any) => {
        const newQD: QuyetDinh = {
            id: Date.now().toString(),
            soQD: values.soQD,
            ngayBanHanh: values.ngayBanHanh.format('DD-MM-YYYY'),
            trichYeu: values.trichYeu,
            soVanBangId: values.soVanBangId,
            soLuotTraCuu: 0,
        };
        setQuyetDinhList([...quyetDinhList, newQD]);
        setIsQDModalOpen(false);
        formQD.resetFields();
    };

    const colQD = [
        { title: 'Số QĐ', dataIndex: 'soQD', key: 'soQD' },
        { title: 'Ngày ban hành', dataIndex: 'ngayBanHanh', key: 'ngayBanHanh' },
        { title: 'Trích yếu', dataIndex: 'trichYeu', key: 'trichYeu' },
        { 
            title: 'Thuộc Sổ (Năm)', 
            key: 'so', 
            render: (_: any, r: QuyetDinh) => soVanBangList.find(s => s.id === r.soVanBangId)?.nam || 'N/A' 
        },
        { 
        title: 'Lượt tra cứu', 
        dataIndex: 'soLuotTraCuu', 
        key: 'soLuotTraCuu',
        render: (val: number) => val || 0 // Nếu chưa ai tra cứu thì hiện 0
    },
    ];

    return (
        <>
            <Card title='Quản lý Quyết Định'>
                <Button type='primary' onClick={() => setIsQDModalOpen(true)} style={{marginBottom:20}}>Thêm Quyết Định</Button>
                <Table columns={colQD} dataSource={quyetDinhList} rowKey='id' />
            </Card>

            <Modal title='Thêm Quyết Định Tốt Nghiệp' visible={isQDModalOpen} onCancel={() => setIsQDModalOpen(false)} onOk={() => formQD.submit()}>
                <Form form={formQD} layout='vertical' onFinish={handleAddQD}>
                    <Form.Item name='soQD' label='Số Quyết Định' rules={[{ required: true, message: 'Vui lòng nhập số quyết định!' }]}><Input /></Form.Item>
                    <Form.Item name='ngayBanHanh' label='Ngày ban hành' rules={[{ required: true, message: 'Vui lòng chọn ngày ban hành!' }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name='trichYeu' label='Trích yếu' rules={[{ required: true, message: 'Vui lòng nhập trích yếu!' }]}><Input.TextArea /></Form.Item>
                    <Form.Item name='soVanBangId' label='Lưu vào Sổ văn bằng' rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng!' }]}>
                        <Select>
                            {soVanBangList.map(s => <Select.Option key={s.id} value={s.id}>Sổ năm {s.nam}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default QuanLyQuyetDinh;