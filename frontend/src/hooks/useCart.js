import { useSelector } from 'react-redux';

export const useCart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    totalItems,
    totalPrice,
  };
};
