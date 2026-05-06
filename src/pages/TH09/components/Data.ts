export interface Task {
    id: string;
    tenTask: string;
    moTa: string;
    deadline: string;
    uuTien: 'Cao' | 'Trung bình' | 'Thấp';
    tag: string;
    trangThai: 'Cần làm' | 'Đang làm' | 'Hoàn thành';
}