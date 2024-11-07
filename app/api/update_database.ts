import { data, dataType } from "./database";

// cập nhật dữ liệu máy theo id
export const updateData = (
  id_may: number,
  newName: string,
  newNguongTren: number,
  newNguongDuoi: number
): boolean => {
  const machineIndex = data.findIndex((machine) => machine.id_may === id_may);

  // nếu tìm thấy máy
  if (machineIndex !== -1) {
    data[machineIndex] = {
      ...data[machineIndex],
      name: newName,
      nguong_tren: newNguongTren,
      nguong_duoi: newNguongDuoi,
    };
    return true; // Cập nhật thành công
  }
  return false; // không tìm thấy máy với id_may
};

// Ví dụ sử dụng hàm
const result = updateData(0.1, "Máy nhiệt mới 1", 60, 30);
console.log(result ? "Cập nhật thành công" : "Không tìm thấy máy");
