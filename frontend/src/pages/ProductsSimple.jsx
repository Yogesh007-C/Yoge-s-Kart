import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';

export default function ProductsSimple() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(1, 20, '', '');
      console.log('Products fetched:', data);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
