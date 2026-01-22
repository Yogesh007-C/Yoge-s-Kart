import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderDetails(id);
      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center"><p>Loading order...</p></div>;
  }

  if (!order) {
    return <div className="py-12 text-center"><p>Order not found</p></div>;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <button onClick={() => navigate('/orders')} className="mb-4 text-blue-600 hover:text-blue-800">
          ← Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Order Details</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Order Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Order Number</p>
                  <p className="font-bold text-lg">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-bold text-green-600">{order.status.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <p className="font-bold text-blue-600">{order.paymentStatus.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <div className="bg-gray-50 p-4 rounded">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="border-b pb-4 flex justify-between">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.price}</p>
                    <p className="text-gray-600">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-8 pt-4 flex justify-end">
            <div className="text-right">
              <p className="text-gray-600 mb-2">Order Total</p>
              <p className="text-3xl font-bold text-green-600">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
