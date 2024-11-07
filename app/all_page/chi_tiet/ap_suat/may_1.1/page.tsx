"use client";

import Header from "./header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import DynamicChart_Ap_Suat from "@/components/Echarts/DynamicCharts_Ap_Suat";
import { toast } from "sonner";

type dataType = {
  name: string;
  id_may: number;
  ap_suat?: string; //  kiểu dữ liệu thành string cho dễ hiển thị
  nguong_tren: string;
  nguong_duoi: string;
  thoi_gian_thuc: string;
  thoi_gian_bat_thuong: string;
  tinh_trang: boolean;
  trang_thai: boolean;
};

export default function ChiTietApSuat() {
  const [data, setData] = useState<dataType[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const date = new Date();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/get_data");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }

    fetchData();

    const intervalId = setInterval(fetchData, 1000); // Cập nhật 1s/1l
    return () => clearInterval(intervalId);
  }, []);

  const handleExit = () => {
    router.push("/all_page/trang_chu");
  };
  const handleTimeSelection = () => {
    console.log("Thời gian bắt đầu:", startDate);
    console.log("Thời gian kết thúc:", endDate);
    toast.success("Đang vẽ biểu đồ!", {
      position: "top-right",
      onAutoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: undefined,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col">
      <Header />
      <div className="flex flex-1 bg-green-500 text-white rounded-lg">
        <FaSignOutAlt
          onClick={handleExit}
          className="absolute top-2 right-2 text-3xl text-white cursor-pointer"
        />
        <div className="w-full mt-4">
          <div className="flex items-center justify-center text-2xl font-bold mb-4">
            BIỂU ĐỒ THEO DÕI ÁP SUẤT NGÀY {date.getDate()}/{date.getMonth() + 1}
            /{date.getFullYear()}
          </div>
          {/* lấy mã máy là 1.1 để vẽ biểu đồ cho máy áp 1 */}
          <DynamicChart_Ap_Suat machineId={1.1} />
          <div className="flex flex-col items-center justify-center ">
            <div className="font-bold text-2xl">
              LỰA CHỌN THỜI GIAN VẼ BIỂU ĐỒ
            </div>
            {/*  lựa chọn thời gian vẽ */}
            <div className="flex justify-center mb-4 mt-4">
              <label className="mr-2 mt-2 font-bold">Từ:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1 text-black"
              />
              <label className="mx-2 mt-2 font-bold">Đến:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1 text-black"
              />
              <button
                onClick={handleTimeSelection}
                className="ml-2 bg-blue-600 text-white rounded px-4 py-1"
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
