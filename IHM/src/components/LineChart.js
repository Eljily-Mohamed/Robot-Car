import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ speed1, speed2 }) => {
  const chartRef = useRef(null);
  const speedChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    speedChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Speed1 (m/s)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3,
            fill: false,
          },
          {
            label: 'Speed2 (m/s)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Speed (m/s)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
        },
      },
    });

    return () => {
      speedChartRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (speedChartRef.current) {
      const chart = speedChartRef.current;
      const labels = Array.from({ length: speed1.length }, (_, i) => i + 1); 
      chart.data.labels = labels;
      chart.data.datasets[0].data = speed1;
      chart.data.datasets[1].data = speed2;
      chart.update();
    }
  }, [speed1, speed2]);

  return (
    <div>
      <canvas ref={chartRef} id="speedChart" width="400" height="200"></canvas>
    </div>
  );
};

export default LineChart;
