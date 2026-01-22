import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartService } from '../services/cartService';
import { removeItem, updateItem, setCart } from '../redux/slices/cartSlice';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await cartService.getCart();
      dispatch(setCart(data.cart.items));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      await cartService.updateCartItem(productId, quantity);
      dispatch(updateItem({ productId, quantity }));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      dispatch(removeItem(productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item) => (
                <div key={item.productId} className="border-b p-4 flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 mb-2">${item.price}</p>

                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded w-fit">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center border-l border-r"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right">
                    <p className="font-bold text-lg mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b pb-4">
                <div className="flex justify-between">
                  <span>Items ({totalItems})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-bold text-lg"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full mt-3 border border-gray-300 py-3 rounded hover:bg-gray-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
