export interface SoVanBang {
    id: string;
    nam: number;
    soVaoSoHienTai: number; 
}

export interface QuyetDinh {
    id: string;
    soQD: string;
    ngayBanHanh: string;
    trichYeu: string;
    soVanBangId: string;
    soLuotTraCuu: number;
}

export interface TruongThongTin {
    id: string;
    tenTruong: string;
    kieuDuLieu: 'String' | 'Number' | 'Date';
}

export interface VanBang {
    id: string;
    quyetDinhId: string;
    soVaoSo: number;
    soHieuVanBang: string;
    maSV: string;
    hoTen: string;
    ngaySinh: string;
    thongTinDong: Record<string, any>;
}