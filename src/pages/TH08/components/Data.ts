export interface BaiTapLog {
    id: string;
    ngay: string;
    tenBaiTap: string;
    loai: string;
    thoiLuong: number;
    calo: number;
    ghiChu: string;
    trangThai: 'Hoàn thành' | 'Bỏ lỡ';
}

export interface ChiSo {
    id: string;
    ngay: string;
    canNang: number;
    chieuCao: number;
    nhipTim: number;
    gioNgu: number;
}

export interface MucTieu {
    id: string;
    ten: string;
    loai: string;
    giaTriMucTieu: number;
    giaTriHienTai: number;
    deadline: string;
    trangThai: 'Đang thực hiện' | 'Đã đạt' | 'Đã hủy';
}

export interface ThuVien {
    id: string;
    ten: string;
    nhomCo: string;
    doKho: 'Dễ' | 'Trung bình' | 'Khó';
    moTa: string;
    caloGiờ: number;
    huongDan: string;
}