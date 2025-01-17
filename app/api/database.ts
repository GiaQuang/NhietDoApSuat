export type dataType = {
  name: string; // *tên máy
  id_may: number; // *X.Y: X=0-nhiet do; X=1-ap suat || Y=1,2,3, ... : STT may
  co_cam_bien: boolean; // *
  sai_so?: number; // * sai số của nhiệt độ
  nhiet_do?: number; // *nhiet do hien tai
  data_nhiet_do?: number[]; // *nhiệt độ truoc do
  ap_suat?: number; // *ap xuat hien tai
  data_ap_suat?: number[]; // *áp suất truoc do
  nguong_tren: number; // *ngưỡng trên
  nguong_duoi: number; // *ngưỡng duới
  thoi_gian_thuc: string; // *nhiẹt độ, áp suất theo thời gian thực
  thoi_gian_bat_thuong: string; // *thời gian được lưu lại khi xảy ra bât thương
  tinh_trang: boolean; // *tình trạng máy: sử dụng - không sử dụng
  trang_thai: boolean; // *bật/tắt
};

export const data: dataType[] = [
  {
    name: "MÁY NHIỆT 1",
    id_may: 0.1,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 48,
    // data_nhiet_do: [36, 37, 38, 39, 40, 41, 42, 43, 40],
    // tạo ranđom mảng 100 phần tử từ 35-55 làm dữ liệu nhiệt độ ảo để vẽ biểu đồ
    data_nhiet_do: Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * (55 - 35 + 1)) + 35
    ),
    nguong_tren: 50,
    nguong_duoi: 40,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },
  {
    name: "MÁY NHIỆT 2",
    id_may: 0.2,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 42,
    data_nhiet_do: [
      45, 46, 47, 48, 49, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 51, 42,
      53, 54, 55, 40, 41,
    ],
    nguong_tren: 50,
    nguong_duoi: 40,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },
  {
    name: "MÁY NHIỆT 3",
    id_may: 0.3,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 43,
    data_nhiet_do: [
      33, 35, 37, 39, 41, 43, 45, 47, 49, 50, 51, 40, 38, 55, 42, 36, 44, 38,
      48, 32, 30,
    ],
    nguong_tren: 50,
    nguong_duoi: 40,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },
  {
    name: "MÁY NHIỆT 4",
    id_may: 0.4,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 44,
    data_nhiet_do: [
      33, 35, 37, 39, 41, 43, 45, 47, 49, 50, 51, 40, 38, 55, 42, 36, 44, 38,
      48, 32, 30,
    ],
    nguong_tren: 50,
    nguong_duoi: 40,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY NHIỆT 5",
    id_may: 0.5,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 70,
    data_nhiet_do: [
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
      98, 99, 100,
    ],
    nguong_tren: 80,
    nguong_duoi: 60,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },
  {
    name: "MÁY NHIỆT 6",
    id_may: 0.6,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 190,
    data_nhiet_do: [
      90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
      107, 108, 109,
    ],
    nguong_tren: 200,
    nguong_duoi: 180,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },
  {
    name: "MÁY NHIỆT 7",
    id_may: 0.7,
    co_cam_bien: false,
    sai_so: 0,
    nhiet_do: 199,
    data_nhiet_do: [
      100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119,
    ],
    nguong_tren: 200,
    nguong_duoi: 180,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "19:00",
    tinh_trang: true,
    trang_thai: true,
  },

  {
    name: "MÁY ÁP 1",
    id_may: 1.1,
    co_cam_bien: false,
    ap_suat: 1.0,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 2",
    id_may: 1.2,
    co_cam_bien: false,
    ap_suat: 1.4,
    data_ap_suat: [0.9, 1.0, 1.37, 0.68, 1.1, 0.78, 0.99, 0.89, 1.28, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 3",
    id_may: 1.3,
    co_cam_bien: false,
    ap_suat: 1.1,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 4",
    id_may: 1.4,
    co_cam_bien: false,
    // ap_suat: 1.3,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 5",
    id_may: 1.5,
    co_cam_bien: false,
    ap_suat: 1.4,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 6",
    id_may: 1.6,
    co_cam_bien: false,
    ap_suat: 1.2,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 7",
    id_may: 1.7,
    co_cam_bien: false,
    ap_suat: 1.1,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 8",
    id_may: 1.8,
    co_cam_bien: false,
    ap_suat: 1,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 9",
    id_may: 1.9,
    co_cam_bien: false,
    ap_suat: 0.9,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 10",
    id_may: 1.101,
    co_cam_bien: false,
    ap_suat: 0.8,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 11",
    id_may: 1.11,
    co_cam_bien: false,
    ap_suat: 0.8,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
  {
    name: "MÁY ÁP 12",
    id_may: 1.11,
    co_cam_bien: false,
    ap_suat: 0.8,
    data_ap_suat: [0.93, 1.28, 1.3, 0.86, 1.21, 0.85, 0.99, 0.8, 1.18, 1.11],
    nguong_tren: 1.4,
    nguong_duoi: 0.8,
    thoi_gian_thuc: "14:30",
    thoi_gian_bat_thuong: "18:00",
    tinh_trang: true,
    trang_thai: false,
  },
];
