export interface Tag {
    id: string;
    ten: string;
}

export interface BaiViet {
    id: string;
    tieuDe: string;
    slug: string;
    tomTat: string;
    noiDung: string;
    anhDaiDien: string;
    tacGia: string;
    theTags: string[];
    ngayDang: string;
    luotXem: number;
    trangThai: 'Draft' | 'Published';
}

export const initialTags: Tag[] = [
    { id: 'T1', ten: 'React' },
    { id: 'T2', ten: 'JavaScript' },
    { id: 'T3', ten: 'CSS' }
];

export const initialBaiViet: BaiViet[] = [
    {
        id: 'BV1',
        tieuDe: 'Học React cơ bản',
        slug: 'hoc-react-co-ban',
        tomTat: 'Hướng dẫn cơ bản về ReactJS.',
        noiDung: '# Học React \n\n Trong bài hướng dẫn này, chúng ta sẽ xây dựng một trò chơi đơn giản. Bạn có thể không muốn đọc tiếp vì bạn không làm game — Đừng làm vậy nhé! Hãy kiên nhẫn một chút. Kiến thức trong bài này chính là lý thuyết cơ bản để xây dựng một ứng dụng React, master nó sẽ giúp bạn hiểu sâu hơn về React.',
        anhDaiDien: 'https://techvccloud.mediacdn.vn/2020/7/13/137-1594616701190893786687-crop-15946167118531494150206.png',
        tacGia: 'Admin',
        theTags: ['T1', 'T2'],
        ngayDang: '22/04/2026',
        luotXem: 150,
        trangThai: 'Published'
    }
];