import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  // Get image URL - handle both string and array formats
  const getImageUrl = () => {
    if (!product.images) return null;
    if (Array.isArray(product.images)) {
      return product.images[0];
    }
    return product.images; // if it's a string
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      <div className="h-48 bg-gray-200 overflow-hidden flex items-center justify-center relative">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
            )}
          </div>
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 font-semibold text-xs bg-red-50 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        <Link
          to={`/product/${product._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
