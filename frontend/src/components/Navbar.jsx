import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { authService } from '../services/authService';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export default function Navbar() {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🛒 YOGE'S KART
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-blue-200">
              Products
            </Link>

            <Link to="/cart" className="relative hover:text-blue-200 flex items-center gap-1">
              🛒 Cart
              {totalItems > 0 && (
                <span className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link to="/admin/dashboard" className="hover:text-blue-200">
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/orders" className="hover:text-blue-200">
                  Orders
                </Link>
                <div className="flex items-center gap-2">
                  <span>Hi, {user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
