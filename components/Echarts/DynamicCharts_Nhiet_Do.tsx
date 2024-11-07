"use client";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import cloneDeep from "lodash.clonedeep";

interface DynamicChartProps {
  machineId: number;
}

const DynamicChart: React.FC<DynamicChartProps> = ({ machineId }) => {
  const [option, setOption] = useState<any>({
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const date = new Date(params[0].axisValue); // Lấy giá trị trục X từ params
        const formattedDate = `${date.getDate()}/${
          // month + 1 vì month bắt đầu bằng 0
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        // Xây dựng nội dung tooltip
        let tooltipContent = `<div>${formattedDate}</div>`;
        params.forEach((item: any) => {
          tooltipContent += `<div>${item.seriesName}: ${item.data} °C</div>`;
        });
        return tooltipContent;
      },
    },
    legend: { data: ["Nhiệt độ", "Ngưỡng trên", "Ngưỡng dưới"] },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLabel: {
        formatter: (value: string) => {
          // hiển thị định dạng giờ, phút, giây, ngày, tháng, năm
          const date = new Date(value);
          return ` ${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}\n${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      name: "Nhiệt độ (°C)", // nhãn cho trục Y
    },
    series: [
      {
        name: "Nhiệt độ",
        type: "line",
        data: [],
      },
      {
        name: "Ngưỡng trên",
        type: "line",
        data: [],
        lineStyle: { type: "solid", color: "red" },
        showSymbol: false,
      },
      {
        name: "Ngưỡng dưới",
        type: "line",
        data: [],
        lineStyle: { type: "solid", color: "red" },
        showSymbol: false,
      },
    ],
  });

  const fetchMachineData = async () => {
    try {
      const response = await fetch("/api/get_data");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu máy:", error);
      return null;
    }
  };

  const getMachineData = async () => {
    const machineData = await fetchMachineData();
    const machine = machineData?.find((item) => item.id_may === machineId);
    return machine
      ? {
          temperatureData: machine.data_nhiet_do || [],
          upperThreshold: machine.nguong_tren,
          lowerThreshold: machine.nguong_duoi,
        }
      : null;
  };

  const updateChart = async () => {
    const machineData = await getMachineData();
    if (!machineData) return;

    setOption((prevOption: any) => {
      const newOption = cloneDeep(prevOption);
      const currentTime = new Date().toISOString(); // Sử dụng ISO string để lưu trữ thời gian

      const { temperatureData, upperThreshold, lowerThreshold } = machineData;
      const lastIndex = newOption.series[0].data.length;

      if (lastIndex < temperatureData.length) {
        newOption.xAxis.data.push(
          ...Array.from(
            { length: temperatureData.length - lastIndex },
            (_, i) => currentTime
          )
        );
        newOption.series[0].data.push(...temperatureData.slice(lastIndex));
        newOption.series[1].data.push(
          ...Array(temperatureData.length - lastIndex).fill(upperThreshold)
        );
        newOption.series[2].data.push(
          ...Array(temperatureData.length - lastIndex).fill(lowerThreshold)
        );
      }

      if (newOption.xAxis.data.length > 1000) {
        const excess = newOption.xAxis.data.length - 1000;
        newOption.xAxis.data = newOption.xAxis.data.slice(excess);
        newOption.series[0].data = newOption.series[0].data.slice(excess);
        newOption.series[1].data = newOption.series[1].data.slice(excess);
        newOption.series[2].data = newOption.series[2].data.slice(excess);
      }

      return newOption;
    });
  };

  useEffect(() => {
    const timer = setInterval(updateChart, 1000);
    return () => clearInterval(timer);
  }, [machineId]);

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default DynamicChart;
