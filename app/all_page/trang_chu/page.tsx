"use client";

import Header from "./Header";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { BsSpeedometer } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { MathJax, MathJaxContext } from "better-react-mathjax";

type dataType = {
  name: string;
  id_may: number;
  co_cam_bien: boolean;
  nhiet_do?: number;
  ap_suat?: number;
  nguong_tren: number;
  nguong_duoi: number;
  thoi_gian_thuc: string;
  thoi_gian_bat_thuong: string;
  tinh_trang: boolean;
  trang_thai: boolean;
};

export default function TrangChuPage() {
  const [list_nhiet_do, setListNhietDo] = useState<dataType[]>([]);
  const [list_ap_suat, setListApSuat] = useState<dataType[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const router = useRouter();

  useInterval(() => setCounter((prev) => prev + 1), 500);

  useInterval(async () => {
    try {
      const response = await fetch("/api/get_data");
      if (!response.ok) throw new Error("Lỗi");
      const result = await response.json();

      const updatedNhietDo = result
        .filter(
          (item: dataType) => item["id_may"] >= 0.1 && item["id_may"] <= 1.0
        )
        .map((item: dataType) => ({
          ...item,
          nhiet_do: item.nhiet_do,
        }));

      const updatedApSuat = result
        .filter(
          (item: dataType) => item["id_may"] >= 1.1 && item["id_may"] <= 2.0
        )
        .map((item: dataType) => ({
          ...item,
          ap_suat: item.ap_suat,
        }));

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
      while (updatedApSuat.length < 12) {
        updatedApSuat.push({
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
      setListApSuat(updatedApSuat);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  }, 2000);

  const renderItem = (item: dataType, type: "nhiet_do" | "ap_suat") => {
    if (item.name === "ko co gi") {
      return (
        <div
          key={`${type}${item.id_may}`}
          className="relative flex flex-col p-2 border-2 border-white w-full h-full font-bold cursor-pointer bg-gray-600 opacity-35"
          style={{
            boxShadow: "0 4px 20px rgba(0, 128, 0, 0.5)",
          }}
        >
          Không có dữ liệu
        </div>
      );
    }

    const handleClick = () => {
      const pageType = type === "nhiet_do" ? "nhiet_do" : "ap_suat";
      router.push(`/all_page/chi_tiet/${pageType}/may_${item.id_may}`);
    };

    // const value = type === "nhiet_do" ? item.nhiet_do : item.ap_suat;
    // const outOfRange =
    //   value !== undefined &&
    //   (value >= item.nguong_tren || value <= item.nguong_duoi);
    // const isNoData = value === undefined;

    // const bgColor = isNoData
    //   ? "bg-black opacity-30"
    //   : outOfRange
    //   ? counter % 2 === 0
    //     ? "bg-red-500 animate-pulse"
    //     : ""
    //   : "bg-green-600";

    const value = type === "nhiet_do" ? item.nhiet_do : item.ap_suat;
    const outOfRange =
      value !== undefined &&
      (value >= item.nguong_tren || value <= item.nguong_duoi);
    const isNoData = value === undefined;
    const noSensor = !item.co_cam_bien;

    const bgColor = noSensor
      ? "bg-orange-500"
      : isNoData
      ? "bg-black opacity-30"
      : outOfRange
      ? counter % 2 === 0
        ? "bg-red-500 animate-pulse"
        : ""
      : "bg-green-600";

    return (
      <div
        key={item.id_may}
        className={`relative flex flex-col p-2 border-2 border-white w-full h-full  ${bgColor} cursor-pointer`}
        style={{
          boxShadow: isNoData
            ? "0 4px 20px rgba(255, 0, 0, 0)"
            : outOfRange
            ? "0 4px 20px rgba(255, 0, 0, 0)"
            : "0 4px 20px rgba(0, 128, 0, 0)",
        }}
        onClick={handleClick}
      >
        <div className="text-2xl flex justify-center items-center font-bold mb-1 text-yellow-300">
          {item.name}
        </div>
        <div className="border-b-2 border-yellow-300 w-[calc(100%+1rem)] relative left-[-0.5rem] mb-6 mt-1"></div>

        <div className="flex flex-row items-center justify-center mt-3 my-auto">
          <div className="flex flex-col items-end text-white text-xl">
            <div className=" text-[13px] font-bold w-[60px] mr-1">
              MAX: {item.nguong_tren}
            </div>
            <div className=" text-[13px] font-bold w-[60px] mr-1">
              MIN: {item.nguong_duoi}
            </div>
          </div>
          {type === "ap_suat" && (
            <BsSpeedometer className="text-4xl text-white flex items-center justify-center mr-4 my-auto" />
          )}
          {type === "nhiet_do" && (
            <CiTempHigh className="text-6xl text-white flex flex-col items-center mr-0 transform translate-y-0.1" />
          )}
          <div className="flex flex-row items-center text-white font-bold">
            <div className="text-5xl text-white">
              {type === "ap_suat"
                ? value !== undefined
                  ? value.toFixed(1)
                  : "NA"
                : value !== undefined
                ? value
                : "N/A"}
            </div>
            <span className="text-xl font-bold ml-0 transform translate-y-3 opacity-50">
              {type === "nhiet_do" ? (
                "°C"
              ) : (
                <MathJaxContext>
                  <MathJax inline>
                    <span
                      style={{
                        display: "inline-block",
                        transform: "translateY(-6px)",
                      }}
                      className="font-bold ml-0"
                    >
                      {`\\( \\frac{kg}{cm^2} \\)`}
                    </span>
                  </MathJax>
                </MathJaxContext>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col select-none">
      <Header />
      <div className="flex-1 grid grid-cols-2 gap-2 px-2 my-2">
        <div className="flex-1 grid grid-cols-3 grid-rows-4 bg-gray-600 text-white gap-2 rounded-lg p-2">
          {list_nhiet_do.map((item) => renderItem(item, "nhiet_do"))}
        </div>
        <div className="flex-1 grid grid-cols-3 grid-rows-4 bg-green-900 text-white gap-2 rounded-lg p-2">
          {list_ap_suat.map((item) => renderItem(item, "ap_suat"))}
        </div>
      </div>
      <div className="text-center m-2 grid grid-cols-4 gap-2 *:h-12 *:font-bold *:text-white">
        <div className="border rounded flex items-center justify-center bg-green-500">
          BÌNH THƯỜNG
        </div>
        <div className="border rounded flex items-center justify-center bg-red-500">
          VƯỢT NGƯỠNG
        </div>
        <div className="border rounded flex items-center justify-center bg-orange-400">
          KHÔNG CÓ CẢM BIẾN
        </div>
        <div className="border rounded flex items-center justify-center bg-black">
          MẤT KẾT NỐI
        </div>
      </div>
      <footer className="h-2 flex justify-between items-center gap-4 p-2 border-b bg-blue-100 text-[12px]">
        <div>Version: x.x.x</div>
        <div>Trạng thái kết nối:</div>
        <div>Cổng kết nối: COM X</div>
        <div>Tốc độ: FPS</div>
      </footer>
    </div>
  );
}
