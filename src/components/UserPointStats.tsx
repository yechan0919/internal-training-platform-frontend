import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import Point from '../models/Point';
import {useAuthStore} from "../store/auth";
import request from "../api/axiosAPI";

interface RadarData {
  axis: string;
  value: number;
}

const UserPointStats = () => {
  const { user } = useAuthStore();
  const [userPoint, setUserPoint] = useState<Point | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Fetch user point data when the component mounts
    const fetchUserPoint = async () => {
      try {
        if(user) {
          request.get<Point>(`/point/${user.userId}/user-point`)
              .then((res) => {
                if(res.status === 200){
                  setUserPoint(res.data)
                }
              })
        }
      } catch (error) {
        console.error('Error fetching user point:', error);
      }
    };

    fetchUserPoint();
  }, [user]);

  useEffect(() => {
    // Update the radar chart when userPoint changes
    if (userPoint) {
      drawRadarChart();
    }
  }, [userPoint]);

  const drawRadarChart = () => {
    if (!chartRef.current || !userPoint) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data: RadarData[] = [
      { axis: '언어', value: userPoint.languageP || 0 },
      { axis: '생산기술', value: userPoint.productionP || 0 },
      { axis: '재무', value: userPoint.financeP || 0 },
      { axis: '마케팅', value: userPoint.marketingP || 0 },
      { axis: 'IT', value: userPoint.itP || 0 },
    ];

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.map((d) => d.axis),
        datasets: [
          {
            label: '주제별 퀴즈 포인트 현황',
            data: data.map((d) => d.value),
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            ticks: {
                stepSize: 3,
                display: false,
              },
            suggestedMin:0,
            suggestedMax:20,
          },
        },
        plugins: {
            legend: {
              display: false,
            },
          },
        animation: {
            duration: 0,
          },
      },
    });
  };

  return (
    <div style={{width:'40vw', margin:'auto'}}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default UserPointStats;
