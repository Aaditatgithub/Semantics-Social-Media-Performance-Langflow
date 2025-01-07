import React from 'react';
import { Line, Scatter, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Activity, Heart, MessageCircle, Bookmark, TrendingUp } from 'lucide-react';

// Register all necessary chart.js components
ChartJS.register(...registerables);

const Dashboard = () => {
  // Metric Cards Data
  const metrics = [
    {
      title: 'Average Engagement Rate',
      value: '0.48%',
      icon: Activity,
      change: '+8%',
      description: 'Across all posts',
    },
    {
      title: 'Average Likes',
      value: '276',
      icon: Heart,
      change: '+15%',
      description: 'Per post',
    },
    {
      title: 'Average Comments',
      value: '54',
      icon: MessageCircle,
      change: '+12%',
      description: 'Per post',
    },
    {
      title: 'Average Saves',
      value: '27',
      icon: Bookmark,
      change: '+5%',
      description: 'Per post',
    },
  ];

  // Chart Data

  // Line Chart Data (Engagement Metrics Over Time)
  const lineData = {
    labels: ['20-03-2023', '09-01-2023', '07-03-2023', '15-01-2023', '25-02-2023'],
    datasets: [
      { label: 'Likes', data: [271, 314, 282, 477, 280], borderColor: 'rgba(75,192,192,1)', fill: false },
      { label: 'Comments', data: [28, 92, 72, 41, 44], borderColor: 'rgba(255,99,132,1)', fill: false },
      { label: 'Shares', data: [23, 34, 23, 27, 33], borderColor: 'rgba(54,162,235,1)', fill: false },
    ],
  };

  // Scatter Plot Data (Followers vs Engagement Rate)
  const scatterData = {
    datasets: [
      {
        label: 'Followers vs Engagement Rate',
        data: [
          { x: 2640, y: 0.49 },
          { x: 4442, y: 0.50 },
          { x: 1520, y: 0.30 },
          { x: 1319, y: 0.50 },
          { x: 3665, y: 0.55 },
        ],
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  // Pie Chart Data (Post Type Distribution)
  const pieData = {
    labels: ['Carousel', 'Story', 'Static Image'],
    datasets: [
      {
        data: [3, 1, 1], // Pre-calculated counts
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Bar Chart Data (Average Engagement by Post Type)
  const barData = {
    labels: ['Carousel', 'Story', 'Static Image'],
    datasets: [
      { label: 'Likes', data: [276.67, 314, 280], backgroundColor: 'rgba(75,192,192,0.6)' },
      { label: 'Comments', data: [47, 92, 44], backgroundColor: 'rgba(255,99,132,0.6)' },
      { label: 'Shares', data: [24.33, 34, 33], backgroundColor: 'rgba(54,162,235,0.6)' },
      { label: 'Saves', data: [34.67, 16, 26], backgroundColor: 'rgba(255,206,86,0.6)' },
    ],
  };

  return (
    <div className="p-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700
                     transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]
                     hover:border-indigo-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                <p className="text-gray-400 text-xs mt-1">{stat.description}</p>
              </div>
              <div className="bg-indigo-500 bg-opacity-20 p-2 rounded-lg">
                <stat.icon className="text-indigo-400" size={24} />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-4 flex items-center">
              <TrendingUp size={16} className="mr-1" />
              {stat.change} this month
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Engagement Metrics Over Time</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-container bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Followers vs Engagement Rate</h3>
          <Scatter data={scatterData} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="chart-container bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Post Type Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-container bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Average Engagement Metrics by Post Type</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
