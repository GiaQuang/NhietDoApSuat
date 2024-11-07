"use client";

import { useState } from "react";
import Header from "./Header";
import { useInterval } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MathJax, MathJaxContext } from "better-react-mathjax";

type dataType = {
  name: string;
  id_may: number;
  co_cam_bien: boolean;
  ap_suat?: number;
  nguong_tren: number;
  nguong_duoi: number;
};

export default function ApSuatPage() {
  // const [counter, setCounter] = useState<number>(0);
  const [list_ap_suat, setListApSuat] = useState<dataType[]>([]);
  const router = useRouter();
  const [modalData, setModalData] = useState<dataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useInterval(async () => {
    try {
      const response = await fetch("/api/get_data");
      if (!response.ok) throw new Error("Lỗi");
      const result = await response.json();

      const updatedApXuat = result
        .filter((item: dataType) => item.id_may >= 1.0 && item.id_may <= 2.0) // mã máy 1.x là của máy áp suất
        .map((item: dataType) => ({
          ...item,
          ap_suat: item.ap_suat,
        }));
      // nếu số máy < 12, hiển thị các máy trống là "không có dữ liệu"
      let cnt = updatedApXuat.length + 1000;
      while (updatedApXuat.length < 12) {
        updatedApXuat.push({
          name: "ko co gi",
          id_may: cnt++,
          ap_suat: 0,
          nguong_tren: 0,
          nguong_duoi: 0,
          thoi_gian_thuc: "",
          thoi_gian_bat_thuong: "",
          tinh_trang: false,
          trang_thai: false,
        });
      }

      setListApSuat(updatedApXuat);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  }, 2000);
  // mở form cài đặt
  const openModal = (item: dataType) => {
    setModalData(item);
    setIsModalOpen(true);
  };
  // đóng form cài ĐẶT
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // hàm cập nhật dữ liệu: chưa xong
  const updateData = (
    id_may: unknown,
    newName,
    newNguongTren,
    newNguongDuoi
  ) => {
    setListApSuat((prevList) =>
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
  // lưu dữ liệu sau khi cập nhật
  const handleModalSave = () => {
    if (modalData) {
      // Kiểm tra ngưỡng trước khi lưu
      if (
        modalData.nguong_tren <= modalData.nguong_duoi ||
        modalData.nguong_duoi < 0
      ) {
        let errorMessage = "";

        if (modalData.nguong_tren <= modalData.nguong_duoi) {
          errorMessage = "Ngưỡng trên phải lớn hơn ngưỡng dưới!";
        }

        if (modalData.nguong_duoi < 0) {
          errorMessage = "Ngưỡng dưới phải lớn hơn hoặc bằng 0!";
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
      // !bị lỗi khi cập nhật
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
          position: "top-right",
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
          className={`flex flex-col p-2 border-2 border-white w-full h-full font-bold cursor-pointer bg-gray-600 opacity-35`}
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
      router.push(`/all_page/chi_tiet/ap_suat/may_${item.id_may}`);
    };

    const value = item.ap_suat ?? null;
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
        className={`flex p-4 border-2 border-white w-full h-full ${bgColor} cursor-pointer`}
      >
        <div className="flex-[2] text-left">
          <div className="text-4xl font-bold mt-2 flex items-center justify-start ml-16">
            {item.name}
          </div>
          <div className="text-3xl font-bold flex items-center justify-start ml-16">
            {/* Hiển thị số thập phân */}
            {value !== null ? item.ap_suat?.toFixed(1) : "N/A"}

            {/* Hiển thị phân số kg/cm2 sử dụng MathJaxContext*/}
            <MathJaxContext>
              <MathJax inline>
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateY(5px)",
                  }}
                  className="font-bold ml-1"
                >
                  {`\\( \\frac{kg}{cm²} \\)`}
                </span>
              </MathJax>
            </MathJaxContext>
          </div>

          <div className="flex items-center justify-start text-[15px] mt-4 ml-16">
            MAX: {item.nguong_tren}
            <MathJaxContext>
              <MathJax inline>
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateY(3px)",
                  }}
                  className="ml-1"
                >
                  {`\\( \\frac{kg}{cm²} \\)`}
                </span>
              </MathJax>
            </MathJaxContext>
          </div>

          <div className="flex items-center justify-start text-[15px] ml-16">
            MIN: {item.nguong_duoi}
            <MathJaxContext>
              <MathJax inline>
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateY(5px)",
                  }}
                  className="ml-1"
                >
                  {`\\( \\frac{kg}{cm²} \\)`}
                </span>
              </MathJax>
            </MathJaxContext>
          </div>
        </div>

        <div className="flex-[1] flex flex-col items-center justify-center mt-12">
          <button
            className="bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 text-[15px] w-32 h-8 font-bold mr-12"
            onClick={() => handleClick()}
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
          {list_ap_suat.map(renderItem)}
        </div>
      </div>

      <footer className="h-2 flex justify-between items-center gap-4 p-2 border-b bg-blue-100 text-[12px]">
        <div>Version: x.x.x</div>
        <div>Trạng thái kết nối:</div>
        <div>Cổng kết nối: COM X</div>
        <div>Tốc độ: FPS</div>
      </footer>

      {/* Modal cài đặt*/}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">CÀI ĐẶT</h2>
            <label className="block text-lg">Tên Máy:</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <label className="block text-lg">Ngưỡng Trên:</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              type="number"
              value={modalData.nguong_tren}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  nguong_tren: parseFloat(e.target.value),
                })
              }
            />
            <label className="block text-lg">Ngưỡng Dưới:</label>
            <input
              className="border rounded w-full px-2 py-1 mb-4"
              type="number"
              value={modalData.nguong_duoi}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  nguong_duoi: parseFloat(e.target.value),
                })
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
