import React, { useState } from 'react';
import { Bar, Pie, Line, Scatter } from 'react-chartjs-2';
import { BarChart3, Users, Heart, Share2 } from 'lucide-react';
import { Activity, MessageCircle, Bookmark, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { AuroraBackground } from './ui/aurora-background';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MetricCard = ({ title, value, icon: Icon, change, description }) => (
  <div className="bg-gray-800 p-6 rounded-xl hover:shadow-purple-500 hover:shadow-lg transition duration-300">
    <div className="flex items-center gap-4">
      <Icon className="w-8 h-8 text-purple-400" />
      <div>
        <p className="text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {description && <p className="text-gray-400 text-xs">{description}</p>}
      </div>
    </div>
    {change && (
      <p className="text-green-400 text-sm mt-4 flex items-center">
        <TrendingUp size={16} className="mr-1" />
        {change} this month
      </p>
    )}
  </div>
);
const ChartCard = ({ title, children, onExpand }) => (
  <div className="bg-gray-800 p-6 rounded-xl relative hover:shadow-purple-500 hover:shadow-lg transition duration-300">
    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
      {title}
      <button
        onClick={onExpand}
        className="text-white bg-purple-500 p-2 rounded-full hover:bg-purple-600 transition-colors"
      >
        <span style={{color:"white"}}>↗</span>
      </button>
    </h2>
    <div className="chart-container h-64 overflow-hidden">{children}</div>
  </div>
);


const Dashboard = () => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (chart) => setModalContent(chart);
  const closeModal = () => setModalContent(null);

  const barData = {
    labels: ['Post 1', 'Post 2', 'Post 3'],
    datasets: [
      {
        label: 'Average Likes',
        data: [200, 300, 250],
        backgroundColor: 'rgba(128, 90, 213, 0.8)',
      },
    ],
  };

  const pieData = {
    labels: ['Organic', 'Viral', 'Paid'],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ['#805AD5', '#FF6361', '#FFA600'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Followers',
        data: [1000, 2000, 3000, 4000],
        borderColor: '#805AD5',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Reach',
        data: [1500, 1200, 1800, 2200],
        borderColor: '#FFA600',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Engagement Scatter',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
        ],
        backgroundColor: '#805AD5',
      },
    ],
  };

  // Metric Cards Data for Average Engagement Rate, Likes, Comments, Saves
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <AuroraBackground className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((stat, index) => (
            <MetricCard key={index} {...stat} />
          ))}
        </div>

        {/* Chart Cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Engagement by Post Type" onExpand={() => openModal(<Bar data={barData} options={{ maintainAspectRatio: false }} />)}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </ChartCard>

          <ChartCard title="Followers vs Reach Over Time" onExpand={() => openModal(<Line data={lineData} options={{ maintainAspectRatio: false }} />)}>
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </ChartCard>

          <ChartCard title="Engagement Source Breakdown" onExpand={() => openModal(<Pie data={pieData} options={{ maintainAspectRatio: false }} />)}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </ChartCard>

          <ChartCard title="Engagement Scatter Plot" onExpand={() => openModal(<Scatter data={scatterData} options={{ maintainAspectRatio: false }} />)}>
            <Scatter data={scatterData} options={{ maintainAspectRatio: false }} />
          </ChartCard>
        </div>

        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl max-w-4xl w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-xl bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                &times;
              </button>
              <div className="h-96">{modalContent}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;