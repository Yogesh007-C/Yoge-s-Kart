import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { orderService } from '../services/orderService';
import { clearCart } from '../redux/slices/cartSlice';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const shippingAddress = {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      };

      await orderService.createOrder(shippingAddress, data.paymentMethod);
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Street</label>
                    <input
                      {...register('street', { required: 'Street is required' })}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {errors.street && <p className="text-red-600 text-sm">{errors.street.message}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">State</label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Zip Code</label>
                    <input
                      {...register('zipCode', { required: 'Zip code is required' })}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {errors.zipCode && <p className="text-red-600 text-sm">{errors.zipCode.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Country</label>
                  <input
                    {...register('country', { required: 'Country is required' })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold mb-2">Payment Method</label>
                  <select
                    {...register('paymentMethod', { required: 'Payment method is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select payment method</option>
                    <option value="cash_on_delivery">💵 Cash on Delivery</option>
                    <option value="credit_card">💳 Credit Card</option>
                    <option value="debit_card">💳 Debit Card</option>
                    <option value="paypal">🅿️ PayPal</option>
                    <option value="bank_transfer">🏦 Bank Transfer</option>
                  </select>
                  {errors.paymentMethod && (
                    <p className="text-red-600 text-sm">{errors.paymentMethod.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold text-lg disabled:bg-gray-400"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 border-b pb-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
