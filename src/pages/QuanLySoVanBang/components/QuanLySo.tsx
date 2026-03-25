import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Card } from 'antd';
import type { SoVanBang, QuyetDinh } from './Data';

interface Props {
    soVanBangList: SoVanBang[];
    setSoVanBangList: (data: SoVanBang[]) => void;
    quyetDinhList: QuyetDinh[];
    setQuyetDinhList: (data: QuyetDinh[]) => void;
}

const QuanLySoVaQuyetDinh = ({ soVanBangList, setSoVanBangList, quyetDinhList, setQuyetDinhList }: Props) => {
    const [isSoModalOpen, setIsSoModalOpen] = useState(false);
    const [formSo] = Form.useForm();

    const handleAddSo = (values: any) => {
        const newSo: SoVanBang = {
            id: Date.now().toString(),
            nam: values.nam,
            soVaoSoHienTai: 1, 
        };
        setSoVanBangList([...soVanBangList, newSo]);
        setIsSoModalOpen(false);
        formSo.resetFields();
    };

    const colSo = [
        { title: 'Năm', dataIndex: 'nam', key: 'nam' },
        { title: 'Số vào sổ hiện tại', dataIndex: 'soVaoSoHienTai', key: 'soVaoSoHienTai' },
    ];

    return (
        <>
            <Card title='Quản lý Sổ Văn Bằng'>
                <Button type='primary' onClick={() => setIsSoModalOpen(true)} style={{marginBottom:20}}> Mở Sổ Mới</Button>
                <Table columns={colSo} dataSource={soVanBangList} rowKey='id' bordered />
            </Card>

            <Modal title='Mở Sổ Văn Bằng Mới' visible={isSoModalOpen} onCancel={() => setIsSoModalOpen(false)} onOk={() => formSo.submit()}>
                <Form form={formSo} layout='vertical' onFinish={handleAddSo}>
                    <Form.Item name='nam' label='Năm cấp bằng' rules={[{ required: true, message: 'Vui lòng nhập năm cấp bằng!' }]}>
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default QuanLySoVaQuyetDinh;