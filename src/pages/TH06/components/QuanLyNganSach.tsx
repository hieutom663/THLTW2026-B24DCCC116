import { Card, Col, Row, Select, Alert, Statistic, InputNumber, Space, Typography } from 'antd';
import { useState, useEffect } from 'react';
import type { DiaDiem } from './Data';
import type { LichTrinh } from './Data';

const { Text } = Typography;

interface Props {
    danhSachLichTrinh: LichTrinh[];
    danhSachDiaDiem: DiaDiem[];
}

const QuanLyNganSach = (props: Props) => {
    const { danhSachLichTrinh, danhSachDiaDiem } = props;
    
    const [selectedLichTrinhId, setSelectedLichTrinhId] = useState<string | null>(null);
    const [nganSachGioiHan, setNganSachGioiHan] = useState<Record<string, number>>(() => {
        const saved = localStorage.getItem('nganSachGioiHan');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('nganSachGioiHan', JSON.stringify(nganSachGioiHan));
    }, [nganSachGioiHan]);

    const lichTrinhHienTai = danhSachLichTrinh.find(lt => lt.id === selectedLichTrinhId);
    const diaDiemHienTai = lichTrinhHienTai ? danhSachDiaDiem.find(d => d.id === lichTrinhHienTai.diemDenId) : null;

    const chiPhiAnUong = diaDiemHienTai?.chiPhiAnUong || 0;
    const chiPhiDiChuyen = diaDiemHienTai?.chiPhiDiChuyen || 0;
    const chiPhiLuuTru = diaDiemHienTai?.chiPhiLuuTru || 0;
    const tongChiPhiThucTe = chiPhiAnUong + chiPhiDiChuyen + chiPhiLuuTru;

    const nganSachMax = selectedLichTrinhId && nganSachGioiHan[selectedLichTrinhId] !== undefined 
        ? nganSachGioiHan[selectedLichTrinhId] 
        : 5000000;

    const isOverBudget = tongChiPhiThucTe > nganSachMax;
    const soTienChenhLech = Math.abs(nganSachMax - tongChiPhiThucTe);

    const phanTramAnUong = tongChiPhiThucTe ? (chiPhiAnUong / tongChiPhiThucTe) * 100 : 0;
    const phanTramLuuTru = tongChiPhiThucTe ? (chiPhiLuuTru / tongChiPhiThucTe) * 100 : 0;
    const phanTramDiChuyen = tongChiPhiThucTe ? (chiPhiDiChuyen / tongChiPhiThucTe) * 100 : 0;

    const handleUpdateNganSach = (value: number | null) => {
        if (selectedLichTrinhId && value !== null) {
            setNganSachGioiHan({ ...nganSachGioiHan, [selectedLichTrinhId]: value });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Kiểm soát Ngân sách</h1>
            
            <Space style={{ marginBottom: 24 }} align='baseline'>
                <Text strong>Chọn lịch trình:</Text>
                <Select 
                    style={{ width: 300 }} 
                    placeholder='-- Chọn lịch trình để kiểm tra --' 
                    onChange={setSelectedLichTrinhId}
                    value={selectedLichTrinhId}
                >
                    {danhSachLichTrinh.map(lt => (
                        <Select.Option key={lt.id} value={lt.id}>{lt.ten}</Select.Option>
                    ))}
                </Select>
            </Space>

            {!selectedLichTrinhId ? (
                <div style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>
                    Vui lòng chọn một lịch trình để bắt đầu kiểm soát ngân sách.
                </div>
            ) : (
                <>
                    {isOverBudget ? (
                        <Alert
                            message='Vượt quá ngân sách!'
                            description={`Lịch trình này đang tiêu quá ${soTienChenhLech.toLocaleString()} VNĐ so với giới hạn cho phép. Vui lòng điều chỉnh lại.`}
                            type='error'
                            showIcon
                            style={{ marginBottom: 24, border: '1px solid #ffa39e' }}
                        />
                    ) : (
                        <Alert
                            message='Ngân sách đang được kiểm soát tốt'
                            description={`Bạn vẫn còn dư ${soTienChenhLech.toLocaleString()} VNĐ để sử dụng.`}
                            type='success'
                            showIcon
                            style={{ marginBottom: 24 }}
                        />
                    )}

                    <Row gutter={16} style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <Card>
                                <Statistic 
                                    title='Ngân sách tối đa (VNĐ)' 
                                    value={nganSachMax} 
                                    valueStyle={{ color: '#1890ff' }} 
                                />
                                <InputNumber 
                                    style={{ width: '100%', marginTop: 10 }} 
                                    value={nganSachMax} 
                                    onChange={handleUpdateNganSach}
                                    step={100000}
                                    placeholder='Chỉnh sửa ngân sách...'
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic 
                                    title='Thực tế cần chi (VNĐ)' 
                                    value={tongChiPhiThucTe} 
                                    valueStyle={{ color: isOverBudget ? '#cf1322' : '#3f8600' }} 
                                />
                                <div style={{ marginTop: 15, fontSize: 13, color: '#888' }}>
                                    Dựa trên các dịch vụ của điểm đến
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic 
                                    title={isOverBudget ? 'Số tiền vượt mức (VNĐ)' : 'Số tiền còn dư (VNĐ)'} 
                                    value={soTienChenhLech} 
                                    valueStyle={{ color: isOverBudget ? '#cf1322' : '#3f8600', fontWeight: 'bold' }} 
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Card title='Biểu đồ phân bổ dòng tiền'>
                        
                        <div style={{ display: 'flex', height: 40, borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
                            <div style={{ width: `${phanTramAnUong}%`, backgroundColor: '#faad14', transition: 'width 0.5s' }} title={`Ăn uống: ${chiPhiAnUong.toLocaleString()}đ`} />
                            <div style={{ width: `${phanTramLuuTru}%`, backgroundColor: '#52c41a', transition: 'width 0.5s' }} title={`Lưu trú: ${chiPhiLuuTru.toLocaleString()}đ`} />
                            <div style={{ width: `${phanTramDiChuyen}%`, backgroundColor: '#1890ff', transition: 'width 0.5s' }} title={`Di chuyển: ${chiPhiDiChuyen.toLocaleString()}đ`} />
                        </div>

                        <Row gutter={16} align='middle'>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: 16, height: 16, backgroundColor: '#faad14', borderRadius: 4, marginRight: 8 }} />
                                    <div>
                                        <div style={{ color: '#888', fontSize: 13 }}>Ăn uống ({phanTramAnUong.toFixed(1)}%)</div>
                                        <strong style={{ fontSize: 16 }}>{chiPhiAnUong.toLocaleString()} đ</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: 16, height: 16, backgroundColor: '#52c41a', borderRadius: 4, marginRight: 8 }} />
                                    <div>
                                        <div style={{ color: '#888', fontSize: 13 }}>Lưu trú ({phanTramLuuTru.toFixed(1)}%)</div>
                                        <strong style={{ fontSize: 16 }}>{chiPhiLuuTru.toLocaleString()} đ</strong>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: 16, height: 16, backgroundColor: '#1890ff', borderRadius: 4, marginRight: 8 }} />
                                    <div>
                                        <div style={{ color: '#888', fontSize: 13 }}>Di chuyển ({phanTramDiChuyen.toFixed(1)}%)</div>
                                        <strong style={{ fontSize: 16 }}>{chiPhiDiChuyen.toLocaleString()} đ</strong>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </>
            )}
        </div>
    );
};

export default QuanLyNganSach;