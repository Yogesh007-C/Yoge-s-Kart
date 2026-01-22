import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { addItem, setCart } from '../redux/slices/cartSlice';
import { useAuth } from '../hooks/useAuth';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProduct(id);
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await cartService.addToCart(product._id, quantity);
      
      // Fetch updated cart from server
      const cartData = await cartService.getCart();
      dispatch(setCart(cartData.cart?.items || []));
      
      alert('Product added to cart!');
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/products')}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-gray-600">SKU: {product.sku}</p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600 mb-2">${product.price}</p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through">${product.originalPrice}</p>
              )}
            </div>

            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-bold text-lg">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-600 font-bold text-lg">Out of Stock</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-l border-r"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 font-bold"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            )}

            {/* Rating */}
            <div className="mt-8">
              <p className="text-gray-600">Rating: {product.rating || 'No ratings yet'} ⭐</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
