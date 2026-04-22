import { Card, Col, Row, Typography, Space, Avatar } from 'antd';
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const TrangGioiThieu = () => {
    return (
        <Row justify='center' style={{ padding: '40px 20px' }}>
            <Col xs={24} sm={20} md={16} lg={12}>
                <Card style={{ textAlign: 'center', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Avatar size={120} src='https://via.placeholder.com/150' style={{ marginBottom: 20 }} />
                    <Title level={2}>Giáp Văn Hiếu</Title>
                    <Text type='secondary' style={{ fontSize: 16 }}>Fullstack Developer / Tech Blogger</Text>
                    
                    <Paragraph style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6 }}>
                        Xin chào! Tôi là một lập trình viên đam mê công nghệ và thích chia sẻ kiến thức. 
                        Blog này được tạo ra để lưu trữ những bài học, kinh nghiệm và các dự án cá nhân trong quá trình làm việc với React, Node.js và hệ sinh thái JavaScript.
                    </Paragraph>

                    <div style={{ margin: '24px 0' }}>
                        <Title level={4}>Kỹ năng</Title>
                        <Space wrap style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Card size='small'>ReactJS</Card>
                            <Card size='small'>TypeScript</Card>
                            <Card size='small'>Ant Design</Card>
                            <Card size='small'>Node.js</Card>
                        </Space>
                    </div>

                    <Space size='large' style={{ marginTop: 20, fontSize: 24 }}>
                        <a href='https://github.com/hieutom663'><GithubOutlined style={{ color: '#333' }} /></a>
                        <a href='https://www.linkedin.com/in/hi%E1%BA%BFu-gi%C3%A1p-b6a361405/'><LinkedinOutlined style={{ color: '#0077b5' }} /></a>
                        <a href='https://x.com/HiuGip1'><TwitterOutlined style={{ color: '#1da1f2' }} /></a>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default TrangGioiThieu;