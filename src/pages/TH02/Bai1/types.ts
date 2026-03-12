export type LuaChon = 'Kéo' | 'Búa' | 'Bao';

export interface VanDau {
  lanDau: number;
  nguoi: LuaChon;
  may: LuaChon;
  ketQua: 'Thắng' | 'Thua' | 'Hòa';
}