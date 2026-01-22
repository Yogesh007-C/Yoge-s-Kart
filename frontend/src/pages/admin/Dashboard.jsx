import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchStats();
  }, [isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center"><p>Loading dashboard...</p></div>;
  }

  if (!stats) {
    return <div className="py-12 text-center"><p>Failed to load dashboard</p></div>;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Products</h3>
            <p className="text-4xl font-bold text-green-600">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Orders</h3>
            <p className="text-4xl font-bold text-purple-600">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</h3>
            <p className="text-4xl font-bold text-red-600">${stats.totalRevenue?.toFixed(2)}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href="/admin/products"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-2">📦 Manage Products</h3>
            <p className="text-gray-600">Add, edit, or delete products</p>
          </a>

          <a
            href="/admin/orders"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-2xl font-bold mb-2">📋 Manage Orders</h3>
            <p className="text-gray-600">View and update order status</p>
          </a>
        </div>

        {/* Recent Orders */}
        {stats.recentOrders && stats.recentOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2">Order #</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-semibold">{order.orderNumber}</td>
                      <td className="py-3">${order.totalAmount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded text-sm ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
