import { data, dataType } from "@/app/api/database";

export const getData = async (): Promise<dataType[]> => {
  // Trả về dữ liệu từ database
  return data;
};
