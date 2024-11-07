"use client";

import React from "react";
import { useState } from "react";
import Header from "./Header";
import { useInterval } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type dataType = {
  name: string;
  id_may: number;
  co_cam_bien: boolean;
  nhiet_do?: number;
  nguong_tren: number;
  nguong_duoi: number;
  sai_so: number;
};

export default function NhietDoPage() {
  const [list_nhiet_do, setListNhietDo] = useState<dataType[]>([]);
  const router = useRouter();
  const [modalData, setModalData] = useState<dataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useInterval(async () => {
    try {
      const response = await fetch("/api/get_data");
      if (!response.ok) throw new Error("Lỗi");
      const result = await response.json();

      const updatedNhietDo = result
        .filter((item: dataType) => item.id_may >= 0.1 && item.id_may <= 1.0) // mã 0.x là của máy nhiệt độ
        .map((item: dataType) => ({
          ...item,
          nhiet_do: item.nhiet_do,
        }));
      // nếu số máy < 12, hiển thị các máy trống là "không có dữ liệu"
      let cnt = updatedNhietDo.length + 1000;
      while (updatedNhietDo.length < 12) {
        updatedNhietDo.push({
          name: "ko co gi",
          id_may: cnt++,
          nhiet_do: 0,
          ap_suat: 0,
          nguong_tren: 0,
          nguong_duoi: 0,
          thoi_gian_thuc: "",
          thoi_gian_bat_thuong: "",
          tinh_trang: false,
          trang_thai: false,
        });
      }

      setListNhietDo(updatedNhietDo);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  }, 2000);
  // mở form cài đặt
  const openModal = (item: dataType) => {
    setModalData(item);
    setIsModalOpen(true);
  };
  // đóng form cài đặt
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  // cập nhật dữ liệu mới khi cài đặt: bị lỗi
  const updateData = (
    id_may: unknown,
    newName,
    newNguongTren,
    newNguongDuoi
  ) => {
    setListNhietDo((prevList) =>
      prevList.map((item) =>
        item.id_may === id_may
          ? {
              ...item,
              name: newName,
              nguong_tren: newNguongTren,
              nguong_duoi: newNguongDuoi,
            }
          : item
      )
    );
    return true;
  };

  const handleModalSave = () => {
    if (modalData) {
      // Kiểm tra ngưỡng trước khi lưu
      if (
        modalData.nguong_tren <= modalData.nguong_duoi ||
        modalData.nguong_duoi < 0 ||
        modalData.sai_so < 0 // sai số của nhiệt độ
      ) {
        let errorMessage = "";

        if (modalData.nguong_tren <= modalData.nguong_duoi) {
          errorMessage = "Ngưỡng trên phải lớn hơn ngưỡng dưới!";
        }

        if (modalData.nguong_duoi < 0) {
          errorMessage = "Ngưỡng dưới phải lớn hơn hoặc bằng 0!";
        }
        if (modalData.sai_so < 0) {
          errorMessage = "Sai số phải lớn hơn hoặc bằng 0!";
        }

        toast.error(errorMessage, {
          position: "top-right",
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });

        return;
      }
      // cập nhật lỗi
      const updateResult = updateData(
        modalData.id_may,
        modalData.name,
        modalData.nguong_tren,
        modalData.nguong_duoi
      );
      if (!updateResult) {
        console.error(
          `Error: Cập nhật thất bại - không tìm thấy máy với id_may: ${modalData.id_may}`
        );
        toast.error("Cập nhật thất bại!", {
          position: "top-center",
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        toast.error("Cập nhật thành công!", {
          position: "top-right",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      }
      closeModal();
    }
  };

  const renderItem = (item: dataType) => {
    if (item.name == "ko co gi") {
      return (
        <div
          key={`{item.id_may}`}
          className={`relative flex flex-col p-2 border-2 border-white w-full h-full font-bold cursor-pointer bg-gray-600 opacity-35`}
          style={{
            boxShadow: "0 4px 20px rgba(0, 128, 0, 0.5)",
          }}
        >
          {/* các máy trống hiển thị là " không có dữ liệu" */}
          Không có dữ liệu
        </div>
      );
    }

    // button xuất dữ liệu
    const handleclickXuatDuLieu = () => {
      toast.success("Xuất dữ liệu", {
        position: "top-right",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    };
    const handleClick = () => {
      router.push(`/all_page/chi_tiet/nhiet_do/may_${item.id_may}`);
    };

    const value = item.nhiet_do ?? null;
    const outOfRange =
      value !== null &&
      (value >= item.nguong_tren || value <= item.nguong_duoi);
    const isNoData = value === null;
    const noSensor = !item.co_cam_bien;

    const bgColor = noSensor
      ? "bg-orange-500"
      : isNoData
      ? "bg-black text-opacity-50"
      : outOfRange
      ? "bg-red-500 animate-pulse"
      : "bg-green-600";

    return (
      <div
        key={item.id_may}
        className={`flex p-2 border-2 border-white w-full h-full  ${bgColor} cursor-pointer`}
      >
        <div className="flex-[2] text-left">
          <div className="text-4xl font-bold mt-2 flex items-center justify-start ml-16">
            {item.name}
          </div>
          <div className="text-4xl font-bold mt-4 flex items-center justify-start ml-16">
            {value !== null ? item.nhiet_do : "N/A"}°C
          </div>

          <div className="flex items-center justify-start text-[18px] mt-6 ml-16">
            MAX: {item.nguong_tren}°C
          </div>
          <div className="flex items-center justify-start text-[18px] ml-16">
            MIN: {item.nguong_duoi}°C
          </div>
        </div>

        <div className="flex-[1] flex flex-col items-center justify-center mt-8">
          <button
            className="bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 text-[15px] w-32 h-8 font-bold mr-12"
            onClick={handleClick}
          >
            BIỂU ĐỒ
          </button>
          <button
            className="bg-green-500 text-white rounded-lg hover:bg-green-800 text-[15px] w-32 h-8 mt-3 font-bold mr-12"
            onClick={handleclickXuatDuLieu}
          >
            XUẤT DỮ LIỆU
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-[15px] w-32 h-8 mt-3 font-bold mr-12"
            onClick={() => openModal(item)}
          >
            CÀI ĐẶT
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col select-none">
      <Header />
      <div className="flex-1 grid grid-cols-1 gap-2 px-2 my-2">
        <div className="flex-1 grid grid-cols-3 grid-rows-4 bg-gray-600 text-white gap-2 rounded-lg p-2">
          {list_nhiet_do.map(renderItem)}
        </div>
      </div>
      <footer className="h-2 flex justify-between items-center gap-4 p-2 border-b bg-blue-100 text-[12px]">
        <div>Version: x.x.x</div>
        <div>Trạng thái kết nối:</div>
        <div>Cổng kết nối: COM X</div>
        <div>Tốc độ: FPS</div>
      </footer>

      {/* Modal Cài đặt*/}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">CÀI ĐẶT</h2>
            <label className="block text-lg">Tên:</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <label className="block text-lg">Ngưỡng Trên (°C):</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              type="number"
              value={modalData.nguong_tren}
              onChange={(e) =>
                setModalData({ ...modalData, nguong_tren: +e.target.value })
              }
            />
            <label className="block text-lg">Ngưỡng Dưới (°C):</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              type="number"
              value={modalData.nguong_duoi}
              onChange={(e) =>
                setModalData({ ...modalData, nguong_duoi: +e.target.value })
              }
            />
            <label className="block text-lg">Sai Số (±°C):</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              type="number"
              value={modalData.sai_so}
              onChange={(e) =>
                setModalData({ ...modalData, sai_so: +e.target.value })
              }
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleModalSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
