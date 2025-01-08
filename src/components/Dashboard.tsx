import React, { useState, ReactNode } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js';
import { Activity, MessageCircle, Bookmark, TrendingUp, Sun, Moon } from 'lucide-react';
import { AuroraBackground } from './ui/aurora-background';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

// Props for MetricCard
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: string;
  description?: string;
  isDarkMode: boolean;
}

// MetricCard Component
const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, change, description, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 rounded-xl hover:shadow-lg transition duration-300`}>
    <div className="flex items-center gap-4">
      <Icon className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
      <div>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
        <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-2xl font-bold`}>{value}</p>
        {description && <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{description}</p>}
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

// Props for ChartCard
interface ChartCardProps {
  title: string;
  children: ReactNode;
  onExpand: () => void;
  isDarkMode: boolean;
}

// ChartCard Component
const ChartCard: React.FC<ChartCardProps> = ({ title, children, onExpand, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 rounded-xl relative hover:shadow-lg transition duration-300`}>
    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
      {title}
      <button
        onClick={onExpand}
        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-white bg-purple-500' : 'text-black bg-purple-300'}`}
      >
        ↗
      </button>
    </h2>
    <div className="chart-container h-64 overflow-hidden">{children}</div>
  </div>
);

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openModal = (chart: ReactNode) => setModalContent(chart);
  const closeModal = () => setModalContent(null);

  // Data for charts
  const postTypeComparisonData = {
    labels: ['Reel', 'Carousel', 'Static'],
    datasets: [
      {
        label: 'Likes',
        data: [1500, 1200, 800],
        backgroundColor: 'rgba(128, 90, 213, 0.8)',
      },
      {
        label: 'Comments',
        data: [300, 400, 250],
        backgroundColor: 'rgba(244, 114, 182, 0.8)',
      },
      {
        label: 'Shares',
        data: [200, 300, 150],
        backgroundColor: 'rgba(67, 206, 162, 0.8)',
      },
    ],
  };

  const dailyEngagementData = {
    labels: ['2024-01-01', '2024-01-08', '2024-01-15', '2024-01-22', '2024-01-29', '2024-02-05'],
    datasets: [
      {
        label: 'Likes',
        data: [2000, 3000, 2500, 4000, 4500, 5000],
        borderColor: 'rgba(128, 90, 213, 1)',
        backgroundColor: 'rgba(128, 90, 213, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Shares',
        data: [500, 700, 600, 800, 1000, 1200],
        borderColor: 'rgba(67, 206, 162, 1)',
        backgroundColor: 'rgba(67, 206, 162, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: [300, 400, 350, 450, 500, 600],
        borderColor: 'rgba(244, 114, 182, 1)',
        backgroundColor: 'rgba(244, 114, 182, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ['Organic', 'Viral', 'Paid'],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ['#805AD5', '#FF6361', '#FFA600'],
      },
    ],
  };

  const areaChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Likes',
        data: [2000, 3000, 2500, 4000, 4500, 5000],
        backgroundColor: 'rgba(128, 90, 213, 0.2)',
        borderColor: 'rgba(128, 90, 213, 1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Shares',
        data: [500, 700, 600, 800, 1000, 1200],
        backgroundColor: 'rgba(67, 206, 162, 0.2)',
        borderColor: 'rgba(67, 206, 162, 1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const metrics = [
    { title: 'Average Engagement Rate', value: '0.48%', icon: Activity, change: '+8%', description: 'Across all posts' },
    { title: 'Average Likes', value: '276', icon: Bookmark, change: '+15%', description: 'Per post' },
    { title: 'Average Comments', value: '54', icon: MessageCircle, change: '+12%', description: 'Per post' },
    { title: 'Average Saves', value: '27', icon: Bookmark, change: '+5%', description: 'Per post' },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-8 relative`}>
      <AuroraBackground className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10">
        <button
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((stat, index) => (
            <MetricCard key={index} {...stat} isDarkMode={isDarkMode} />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Post Type Comparison - Average engagement by post type" onExpand={() => openModal(<Bar data={postTypeComparisonData} />)} isDarkMode={isDarkMode}>
            <Bar data={postTypeComparisonData} />
          </ChartCard>
          <ChartCard title="Post Performance Over Time - Daily engagement metrics" onExpand={() => openModal(<Line data={dailyEngagementData} />)} isDarkMode={isDarkMode}>
            <Line data={dailyEngagementData} />
          </ChartCard>
          <ChartCard title="Post Distribution" onExpand={() => openModal(<Pie data={pieChartData} />)} isDarkMode={isDarkMode}>
            <Pie data={pieChartData} />
          </ChartCard>
          <ChartCard title="Engagement Trends Over Time (Area Chart)" onExpand={() => openModal(<Line data={areaChartData} />)} isDarkMode={isDarkMode}>
            <Line data={areaChartData} />
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