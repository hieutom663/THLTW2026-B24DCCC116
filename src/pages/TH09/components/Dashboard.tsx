import { Row, Col, Card, Statistic } from 'antd';
import dayjs from 'dayjs';
import type { Task } from './Data';

interface Props {
    tasks: Task[];
}

const Dashboard = ({ tasks }: Props) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.trangThai === 'Hoàn thành').length;
    const overdueTasks = tasks.filter(t => t.trangThai !== 'Hoàn thành' && dayjs(t.deadline).isBefore(dayjs(), 'day')).length;

    return (
        <div>
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Tổng số Task" value={totalTasks} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Đã hoàn thành" value={completedTasks} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Quá hạn" value={overdueTasks} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;