import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FileText,  BookOpen, Eye, ThumbsUp, MessageCircle, Share2, Clock } from 'lucide-react';

// Sample data
const monthlyVisits = [
  { name: 'Jan', visits: 2400 },
  { name: 'Feb', visits: 1398 },
  { name: 'Mar', visits: 9800 },
  { name: 'Apr', visits: 3908 },
  { name: 'May', visits: 4800 },
  { name: 'Jun', visits: 3800 },
  { name: 'Jul', visits: 4300 },
  { name: 'Aug', visits: 5300 },
  { name: 'Sep', visits: 4800 },
  { name: 'Oct', visits: 6000 },
  { name: 'Nov', visits: 8900 },
  { name: 'Dec', visits: 9800 },
];

const articlePerformance = [
  { name: 'Article 1', views: 4000, citations: 2400, comments: 2400 },
  { name: 'Article 2', views: 3000, citations: 1398, comments: 2210 },
  { name: 'Article 3', views: 2000, citations: 9800, comments: 2290 },
  { name: 'Article 4', views: 2780, citations: 3908, comments: 2000 },
  { name: 'Article 5', views: 1890, citations: 4800, comments: 2181 },
];

const categoriesData = [
  { name: 'Science', value: 400 },
  { name: 'Technology', value: 300 },
  { name: 'Medicine', value: 300 },
  { name: 'Humanities', value: 200 },
  { name: 'Social Sciences', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function JournalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Journal Analytics Dashboard</h1>
              <p className="text-gray-600">Performance metrics for your academic journal</p>
            </div>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">
              Last Updated: April 30, 2025
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="bg-white shadow-sm border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6">
            <button 
              className={`py-3 px-1 font-medium ${activeTab === 'overview' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`py-3 px-1 font-medium ${activeTab === 'articles' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('articles')}
            >
              Articles
            </button>
            <button 
              className={`py-3 px-1 font-medium ${activeTab === 'authors' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('authors')}
            >
              Authors
            </button>
            <button 
              className={`py-3 px-1 font-medium ${activeTab === 'audience' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('audience')}
            >
              Audience
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="text-blue-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Views</p>
                <h3 className="text-xl font-bold text-gray-800">2.4M</h3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-green-500 text-sm ml-1">+8.2%</span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="text-green-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Published Articles</p>
                <h3 className="text-xl font-bold text-gray-800">426</h3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-green-500 text-sm ml-1">+4.1%</span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Users className="text-yellow-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Active Subscribers</p>
                <h3 className="text-xl font-bold text-gray-800">12.5K</h3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-green-500 text-sm ml-1">+12.3%</span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BookOpen className="text-purple-500" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Citation Index</p>
                <h3 className="text-xl font-bold text-gray-800">4.8</h3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-green-500 text-sm ml-1">+0.3</span>
              <span className="text-gray-500 text-sm ml-2">vs last year</span>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Articles Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Top Performing Articles</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Machine Learning in Healthcare: A Systematic Review</div>
                    <div className="text-sm text-gray-500">J. Thompson, et al.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">24,892</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">342</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">128</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Climate Change Impacts on Biodiversity</div>
                    <div className="text-sm text-gray-500">A. Garcia, et al.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">18,762</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">287</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">96</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Quantum Computing: Current State and Future Directions</div>
                    <div className="text-sm text-gray-500">R. Wilson, et al.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">15,421</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">231</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">84</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Neuroscience of Decision-Making</div>
                    <div className="text-sm text-gray-500">S. Patel, et al.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">12,876</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">198</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">72</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Sustainable Urban Development</div>
                    <div className="text-sm text-gray-500">L. Chen, et al.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">11,543</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">176</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">61</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Article Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={articlePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" />
                <Bar dataKey="citations" fill="#10b981" />
                <Bar dataKey="comments" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <ThumbsUp className="text-blue-500" size={20} />
                  <span className="ml-2 text-gray-500 text-sm">Average Likes</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">48.3</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500" size={14} />
                  <span className="text-green-500 text-xs ml-1">+6.8%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <MessageCircle className="text-green-500" size={20} />
                  <span className="ml-2 text-gray-500 text-sm">Average Comments</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">12.7</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500" size={14} />
                  <span className="text-green-500 text-xs ml-1">+3.2%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Share2 className="text-purple-500" size={20} />
                  <span className="ml-2 text-gray-500 text-sm">Average Shares</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">8.4</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500" size={14} />
                  <span className="text-green-500 text-xs ml-1">+12.1%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="text-yellow-500" size={20} />
                  <span className="ml-2 text-gray-500 text-sm">Avg. Read Time</span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">6:42</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500" size={14} />
                  <span className="text-green-500 text-xs ml-1">+0:38</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}