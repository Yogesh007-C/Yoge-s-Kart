import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { setProducts } from '../redux/slices/productSlice';
import { CATEGORIES } from '../utils/constants';

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [productsByCategory, setProductsByCategory] = useState({});
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProducts();
  }, [search]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      
      // Fetch products for each category
      const categoryProducts = {};
      let totalCount = 0;
      
      for (const category of CATEGORIES) {
        try {
          const data = await productService.getProducts(1, 100, category, search);
          console.log(`Fetched ${category}:`, data);
          categoryProducts[category] = data.products || [];
          totalCount += data.products?.length || 0;
        } catch (error) {
          console.error(`Error fetching ${category}:`, error);
          categoryProducts[category] = [];
        }
      }
      
      console.log('All products by category:', categoryProducts);
      setProductsByCategory(categoryProducts);
      setTotal(totalCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />
          <p className="text-gray-600 mt-2">Total: {total} products</p>
        </div>

        {/* Products by Category */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {CATEGORIES.map((category) => (
              <div key={category}>
                {productsByCategory[category] && productsByCategory[category].length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-blue-600 pb-2 border-b-2 border-blue-200">
                      {category} ({productsByCategory[category].length})
                    </h2>
                    
                    {productsByCategory[category].length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No products found in {category}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {productsByCategory[category].map((product) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No products message */}
        {!loading && total === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {search ? 'No products match your search.' : 'No products available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
