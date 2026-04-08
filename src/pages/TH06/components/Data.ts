export interface DiaDiem {
    id: string;
    ten: string;
    hinhAnh: string;
    rating: number;
    loaiHinh: 'biển' | 'núi' | 'thành phố';
    chiPhiAnUong: number;
    chiPhiDiChuyen: number;
    chiPhiLuuTru: number;
    moTa: string;
    thoiGianThamQuan: string;
};

export interface LichTrinh {
    id: string;
    ten: string;
    noiKhoiHanh: string;
    ngayKhoiHanh: string;
    diemDenId: string;
    tongNganSach: number;
    tongThoiGian: number;
}