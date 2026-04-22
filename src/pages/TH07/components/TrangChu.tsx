import { useState, useEffect } from 'react';
import { Card, Col, Row, Input, Pagination, Tag as AntTag, Typography, Button, Space, Divider } from 'antd';
import { EyeOutlined, CalendarOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { BaiViet, Tag } from './Data';

const { Title, Paragraph, Text } = Typography;

interface Props {
    danhSachBaiViet: BaiViet[];
    setDanhSachBaiViet: any;
    danhSachThe: Tag[];
}

const TrangChu = ({ danhSachBaiViet, setDanhSachBaiViet, danhSachThe }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [viewingPostId, setViewingPostId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleViewPost = (id: string) => {
        const newData = danhSachBaiViet.map(bv => bv.id === id ? { ...bv, luotXem: bv.luotXem + 1 } : bv);
        setDanhSachBaiViet(newData);
        localStorage.setItem('danhSachBaiViet', JSON.stringify(newData));
        setViewingPostId(id);
        window.scrollTo(0, 0);
    };

    if (viewingPostId) {
        const post = danhSachBaiViet.find(bv => bv.id === viewingPostId);
        if (!post) return <div />;

        const relatedPosts = danhSachBaiViet.filter(bv => 
            bv.id !== post.id && 
            bv.trangThai === 'Published' &&
            bv.theTags.some(t => post.theTags.includes(t))
        ).slice(0, 3);

        return (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
                <Button type='link' icon={<ArrowLeftOutlined />} onClick={() => setViewingPostId(null)} style={{ marginBottom: 20 }}>
                    Quay lại danh sách
                </Button>
                
                <Title level={1}>{post.tieuDe}</Title>
                
                <Space style={{ marginBottom: 24, color: '#888' }} split={<Divider type='vertical' />}>
                    <Text type='secondary'><UserOutlined /> {post.tacGia}</Text>
                    <Text type='secondary'><CalendarOutlined /> {post.ngayDang}</Text>
                    <Text type='secondary'><EyeOutlined /> {post.luotXem} lượt xem</Text>
                </Space>

                <div style={{ marginBottom: 24 }}>
                    {post.theTags.map(tId => {
                        const tObj = danhSachThe.find(t => t.id === tId);
                        return tObj ? <AntTag color='blue' key={tId}>{tObj.ten}</AntTag> : null;
                    })}
                </div>

                <div style={{ whiteSpace: 'pre-wrap', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
                    {post.noiDung}
                </div>

                {relatedPosts.length > 0 && (
                    <>
                        <Divider />
                        <Title level={3}>Bài viết liên quan</Title>
                        <Row gutter={[16, 16]}>
                            {relatedPosts.map(rp => (
                                <Col xs={24} sm={8} key={rp.id}>
                                    <Card hoverable onClick={() => handleViewPost(rp.id)} cover={<img alt='cover' src={rp.anhDaiDien} style={{ height: 120, objectFit: 'cover' }}/>}>
                                        <Card.Meta title={rp.tieuDe} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </div>
        );
    }

    let filteredData = danhSachBaiViet.filter(bv => bv.trangThai === 'Published');
    
    if (debouncedTerm) {
        filteredData = filteredData.filter(bv => bv.tieuDe.toLowerCase().includes(debouncedTerm.toLowerCase()));
    }
    
    if (selectedTag) {
        filteredData = filteredData.filter(bv => bv.theTags.includes(selectedTag));
    }

    const paginatedData = filteredData.slice((currentPage - 1) * 9, currentPage * 9);

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
                <Input.Search 
                    placeholder='Tìm kiếm bài viết...' 
                    style={{ width: 300 }} 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    allowClear
                />
                <Space>
                    {selectedTag && <AntTag closable onClose={() => setSelectedTag(null)} color='magenta'>Đang lọc thẻ</AntTag>}
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                {paginatedData.map(post => (
                    <Col xs={24} sm={12} md={8} key={post.id}>
                        <Card 
                            hoverable 
                            onClick={() => handleViewPost(post.id)}
                            cover={<img alt='cover' src={post.anhDaiDien} style={{ height: 200, objectFit: 'cover' }} />}
                            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        >
                            <Card.Meta title={post.tieuDe} description={<Paragraph ellipsis={{ rows: 2 }}>{post.tomTat}</Paragraph>} />
                            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                                <div style={{ marginBottom: 12 }}>
                                    {post.theTags.map(tId => {
                                        const tObj = danhSachThe.find(t => t.id === tId);
                                        return tObj ? (
                                            <AntTag color='blue' key={tId} onClick={(e) => { e.stopPropagation(); setSelectedTag(tId); }}>
                                                {tObj.ten}
                                            </AntTag>
                                        ) : null;
                                    })}
                                </div>
                                <Space style={{ width: '100%', justifyContent: 'space-between', color: '#888', fontSize: 12 }}>
                                    <span><CalendarOutlined /> {post.ngayDang}</span>
                                    <span>{post.tacGia}</span>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {filteredData.length > 0 ? (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Pagination current={currentPage} total={filteredData.length} pageSize={9} onChange={setCurrentPage} />
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 50, color: '#999' }}>Không tìm thấy bài viết nào.</div>
            )}
        </div>
    );
};

export default TrangChu;