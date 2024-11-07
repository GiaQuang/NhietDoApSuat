"use client";

import { useState } from "react";
import Header from "./Header";

export default function ApSuatPage() {
  const [isAutoExportEnabled, setIsAutoExportEnabled] = useState(false); // Trạng thái của switch bật/tắt xuất tự động
  const [isScheduledExport, setIsScheduledExport] = useState(false); // Trạng thái checkbox Xuất theo giờ
  const [isErrorExport, setIsErrorExport] = useState(false); // Trạng thái checkbox Xuất khi có lỗi
  const [exportTime, setExportTime] = useState(""); // Thời gian cài đặt xuất báo cáo theo giờ

  const handleSwitchChange = () => {
    setIsAutoExportEnabled(!isAutoExportEnabled);
    if (!isAutoExportEnabled) {
      setIsScheduledExport(false);
      setIsErrorExport(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="mt-2">
        <h2 className="text-2xl font-bold">Cài đặt phần mềm</h2>
        <div className="flex items-center mt-2">
          <label className="switch mr-2 ">
            <input
              type="checkbox"
              checked={isAutoExportEnabled}
              onChange={handleSwitchChange}
              className="ml-2"
            />
            <span className="slider"></span>
          </label>
          <label className="font-bold text-xl mr-2">
            Xuất dữ liệu tự động:
          </label>
        </div>

        {/*theo giờ cài đặt */}
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={isScheduledExport}
            onChange={() => setIsScheduledExport(!isScheduledExport)}
            disabled={!isAutoExportEnabled}
            className={`mr-2 ml-4 ${!isAutoExportEnabled ? "opacity-50" : ""}`}
          />
          <label className={`${!isAutoExportEnabled ? "text-gray-500" : ""}`}>
            Xuất báo cáo theo giờ
          </label>
        </div>
        {isScheduledExport && isAutoExportEnabled && (
          <div className="mt-2">
            <label className="block text-lg ml-8">Chọn giờ xuất báo cáo:</label>
            <input
              type="time"
              value={exportTime}
              onChange={(e) => setExportTime(e.target.value)}
              className="border rounded px-2 py-1 ml-8"
              disabled={!isAutoExportEnabled}
            />
          </div>
        )}

        {/*khi có lỗi xảy ra */}
        <div className="flex-1 flex items-center jumt-4">
          <input
            type="checkbox"
            checked={isErrorExport}
            onChange={() => setIsErrorExport(!isErrorExport)}
            disabled={!isAutoExportEnabled}
            className={`test-5xl mr-2 ml-4 ${
              !isAutoExportEnabled ? "opacity-50" : ""
            }`}
          />
          <label className={`${!isAutoExportEnabled ? "text-gray-500" : ""}`}>
            Xuất khi có lỗi xảy ra bất thường
          </label>
        </div>
      </div>

      {/* Cài đặt phần cứng */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Cài đặt phần cứng</h2>
        <div className="mt-2 ml-2">Lựa chọn cổng kết nối - COM-X</div>
      </div>

      <h1 className="flex-1 flex items-center justify-center"></h1>
      {/* Footer */}
      <footer className="h-2 flex justify-between items-center gap-4 p-2 border-b bg-blue-100 text-[12px]">
        <div>Version: x.x.x</div>
        <div>Trạng thái kết nối:</div>
        <div>Cổng kết nối: COM X</div>
        <div>Tốc độ: FPS</div>
      </footer>
    </div>
  );
}
