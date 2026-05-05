import { Card, Col, Row, Statistic, Timeline, Typography } from 'antd';
import type { BaiTapLog, ChiSo, MucTieu } from './Data';

const { Text } = Typography;

interface Props {
    danhSachTap: BaiTapLog[];
    danhSachChiSo: ChiSo[];
    danhSachMucTieu: MucTieu[];
}

const Dashboard = ({ danhSachTap, danhSachChiSo, danhSachMucTieu }: Props) => {
    const tongBuoi = danhSachTap.filter(x => x.trangThai === 'Hoàn thành').length;
    const tongCalo = danhSachTap.filter(x => x.trangThai === 'Hoàn thành').reduce((sum, item) => sum + item.calo, 0);
    
    const mucTieuHoanThanh = danhSachMucTieu.length 
        ? Math.round((danhSachMucTieu.filter(x => x.trangThai === 'Đã đạt').length / danhSachMucTieu.length) * 100) 
        : 0;

    const bieuDoCanNang = danhSachChiSo.slice(-10).map(cs => cs.canNang);
    const maxCanNang = Math.max(...bieuDoCanNang, 1);

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}><Card><Statistic title="Tổng buổi tập" value={tongBuoi} /></Card></Col>
                <Col span={6}><Card><Statistic title="Tổng Calo đã đốt" value={tongCalo} suffix="kcal" valueStyle={{ color: '#cf1322' }}/></Card></Col>
                <Col span={6}><Card><Statistic title="Chuỗi ngày (Streak)" value={tongBuoi > 0 ? 3 : 0} suffix="ngày" valueStyle={{ color: '#d48806' }}/></Card></Col>
                <Col span={6}><Card><Statistic title="Mục tiêu hoàn thành" value={mucTieuHoanThanh} suffix="%" valueStyle={{ color: '#3f8600' }}/></Card></Col>
            </Row>

            <Row gutter={24}>
                <Col span={16}>
                    <Card title="Biểu đồ cân nặng (10 lần ghi gần nhất)" style={{ marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: 200, gap: 10 }}>
                            {danhSachChiSo.slice(-10).map((cs, idx) => (
                                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10 }}>{cs.canNang}kg</Text>
                                    <div style={{ 
                                        width: '100%', 
                                        backgroundColor: '#1890ff', 
                                        height: `${(cs.canNang / maxCanNang) * 150}px`,
                                        borderRadius: '4px 4px 0 0' 
                                    }} />
                                    <Text style={{ fontSize: 10, marginTop: 4 }}>{cs.ngay.slice(0, 5)}</Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="5 Buổi tập gần nhất">
                        <Timeline>
                            {danhSachTap.slice(-5).reverse().map(tap => (
                                <Timeline.Item key={tap.id} color={tap.trangThai === 'Hoàn thành' ? 'green' : 'red'}>
                                    <p><strong>{tap.ngay}</strong>: {tap.tenBaiTap} ({tap.thoiLuong} phút)</p>
                                    <p style={{ fontSize: 12, color: 'gray' }}>{tap.calo} kcal - {tap.trangThai}</p>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;