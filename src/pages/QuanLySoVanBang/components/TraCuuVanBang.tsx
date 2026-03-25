import { useState } from 'react';
import { Table, Button, Form, Input, Card, message, Row, Col } from 'antd';
import type { VanBang, QuyetDinh } from './Data';

interface Props {
    vanBangList: VanBang[];
    quyetDinhList: QuyetDinh[];
    setQuyetDinhList: (data: QuyetDinh[]) => void;
}

const TraCuuVanBang = ({ vanBangList, quyetDinhList, setQuyetDinhList }: Props) => {
    const [form] = Form.useForm();
    const [ketQua, setKetQua] = useState<VanBang[]>([]);

    const handleSearch = (values: any) => {
        const params = Object.values(values).filter(v => v !== undefined && v !== '');
        
        if (params.length < 2) {
            return message.warning('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
        }

        const filtered = vanBangList.filter(vb => {
            let match = true;
            if (values.soHieuVanBang && !vb.soHieuVanBang.includes(values.soHieuVanBang)) match = false;
            if (values.soVaoSo && vb.soVaoSo.toString() !== values.soVaoSo) match = false;
            if (values.maSV && !vb.maSV.includes(values.maSV)) match = false;
            if (values.hoTen && !vb.hoTen.toLowerCase().includes(values.hoTen.toLowerCase())) match = false;
            if (values.ngaySinh && vb.ngaySinh !== values.ngaySinh) match = false;
            return match;
        });

        setKetQua(filtered);

        if (filtered.length > 0) {
            const qdIds = Array.from(new Set(filtered.map(vb => vb.quyetDinhId)));
            const newQdList = quyetDinhList.map(qd => 
                qdIds.includes(qd.id) ? { ...qd, soLuotTraCuu: (qd.soLuotTraCuu || 0) + 1 } : qd
            );
            setQuyetDinhList(newQdList);
            message.success(`Tìm thấy ${filtered.length} kết quả!`);
        } else {
            message.error('Không tìm thấy văn bằng nào!');
        }
        return;
    };

    const columns = [
        { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', key: 'soHieuVanBang' },
        { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
        { title: 'Mã SV', dataIndex: 'maSV', key: 'maSV' },
        { title: 'Họ Tên', dataIndex: 'hoTen', key: 'hoTen' },
        { title: 'Ngày Sinh', dataIndex: 'ngaySinh', key: 'ngaySinh' },
        
    ];

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card title='Bộ lọc tra cứu'>
                    <Form form={form} layout='vertical' onFinish={handleSearch}>
                        <Form.Item name='soHieuVanBang' label='Số hiệu văn bằng'><Input /></Form.Item>
                        <Form.Item name='soVaoSo' label='Số vào sổ'><Input /></Form.Item>
                        <Form.Item name='maSV' label='Mã Sinh Viên'><Input /></Form.Item>
                        <Form.Item name='hoTen' label='Họ Tên'><Input /></Form.Item>
                        <Form.Item name='ngaySinh' label='Ngày sinh (DD-MM-YYYY)'><Input /></Form.Item>
                        <Button type='primary' htmlType='submit' block>Tra cứu</Button>
                    </Form>
                </Card>
            </Col>
            <Col span={16}>
                <Card title='Kết quả tra cứu'>
                    <Table columns={columns} dataSource={ketQua} rowKey='id' />
                </Card>
            </Col>
        </Row>
    );
};
export default TraCuuVanBang;