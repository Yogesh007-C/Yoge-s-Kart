import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelling(orderId);
      console.log('Cancelling order:', orderId);
      
      const result = await orderService.cancelOrder(orderId);
      console.log('Cancel response:', result);
      
      if (result.success) {
        alert('Order cancelled successfully!');
        
        // Refresh orders from server to get the updated status
        const updatedData = await orderService.getUserOrders();
        setOrders(updatedData.orders);
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to cancel order';
      alert(`Error: ${errorMsg}`);
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Order History</h1>
          <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
          <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Order Number</p>
                  <p className="font-bold">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-bold text-green-600">${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className={`font-bold ${
                    order.status === 'delivered' ? 'text-green-600' :
                    order.status === 'shipped' ? 'text-blue-600' :
                    order.status === 'cancelled' ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Items ({order.items.length})</h3>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-600">
                      {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/order/${order._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  View Details
                </Link>
                {order.status === 'pending' && (
                  <button 
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={cancelling === order._id}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm disabled:bg-gray-400"
                  >
                    {cancelling === order._id ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
