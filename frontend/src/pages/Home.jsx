import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to YOGE'S KART</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <a
            href="/products"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600">Only the best products from trusted sellers</p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-2">Great Prices</h3>
              <p className="text-gray-600">Competitive prices with regular discounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Explore Products
          </a>
        </div>
      </div>
    </div>
  );
}
