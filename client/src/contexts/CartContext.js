import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AUSTRALIA_CONFIG } from '../config/australia';
import { calculateDiscount } from '../utils/numerologyCalculator';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0,
  itemCount: 0,
  numerologyDiscount: 0,
  numerologyDiscountAmount: 0
};

const cartReducer = (state, action) => {
  let newItems;
  let newTotal;
  let newItemCount;
  let numerologyDiscount = 0;
  let numerologyDiscountAmount = 0;

  // Helper function to calculate totals with numerology discount
  const calculateTotalsWithDiscount = (items, userNumerology) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (userNumerology?.lifePathNumber) {
      const discount = calculateDiscount(userNumerology.lifePathNumber, subtotal);
      return {
        total: subtotal - discount.amount,
        itemCount,
        numerologyDiscount: discount.percentage,
        numerologyDiscountAmount: discount.amount
      };
    }
    
    return {
      total: subtotal,
      itemCount,
      numerologyDiscount: 0,
      numerologyDiscountAmount: 0
    };
  };

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        item => item.product._id === action.payload.product._id &&
                item.size === action.payload.size &&
                item.color === action.payload.color
      );

      if (existingItem) {
        newItems = state.items.map(item =>
          item.product._id === action.payload.product._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };

    case 'UPDATE_QUANTITY':
      newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const updateTotals = calculateTotalsWithDiscount(newItems, action.userNumerology);

      return {
        ...state,
        items: newItems,
        total: updateTotals.total,
        itemCount: updateTotals.itemCount,
        numerologyDiscount: updateTotals.numerologyDiscount,
        numerologyDiscountAmount: updateTotals.numerologyDiscountAmount
      };

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload);
      const removeTotals = calculateTotalsWithDiscount(newItems, action.userNumerology);

      return {
        ...state,
        items: newItems,
        total: removeTotals.total,
        itemCount: removeTotals.itemCount,
        numerologyDiscount: removeTotals.numerologyDiscount,
        numerologyDiscountAmount: removeTotals.numerologyDiscountAmount
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        numerologyDiscount: 0,
        numerologyDiscountAmount: 0
      };

    case 'LOAD_CART':
      const loadedItems = action.payload;
      const loadTotals = calculateTotalsWithDiscount(loadedItems, action.userNumerology);

      return {
        ...state,
        items: loadedItems,
        total: loadTotals.total,
        itemCount: loadTotals.itemCount,
        numerologyDiscount: loadTotals.numerologyDiscount,
        numerologyDiscountAmount: loadTotals.numerologyDiscountAmount
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [userNumerology, setUserNumerology] = useState(null);

  // Get user numerology from localStorage or context
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.numerology) {
      setUserNumerology(user.numerology);
    }
  }, []);

  // Custom dispatch that includes user numerology
  const dispatchWithNumerology = (action) => {
    dispatch({
      ...action,
      userNumerology
    });
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (product, quantity = 1, size = null, color = null) => {
    const cartItem = {
      id: `${product._id}-${size}-${color}`,
      product: {
        _id: product._id,
        name: product.name,
        images: product.images,
        price: product.finalPrice || product.price.retail,
        brand: product.brand,
        category: product.category
      },
      quantity,
      size,
      color,
      price: product.finalPrice || product.price.retail
    };

    dispatchWithNumerology({ type: 'ADD_ITEM', payload: cartItem });
    toast.success(`${product.name} added to cart!`);
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    dispatchWithNumerology({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const item = state.items.find(item => item.id === itemId);
    dispatchWithNumerology({ type: 'REMOVE_ITEM', payload: itemId });
    if (item) {
      toast.success(`${item.product.name} removed from cart`);
    }
  };

  // Clear cart
  const clearCart = () => {
    dispatchWithNumerology({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  // Load cart from server (for authenticated users)
  const loadCartFromServer = async () => {
    try {
      // This would typically fetch the user's cart from the server
      // For now, we'll just use the local cart
      return state.items;
    } catch (error) {
      console.error('Error loading cart from server:', error);
      return [];
    }
  };

  // Save cart to server (for authenticated users)
  const saveCartToServer = async () => {
    try {
      // This would typically save the cart to the server
      // For now, we'll just return success
      return { success: true };
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error saving cart to server:', error);
      return { success: false, error: error.message };
    }
  };

  // Check if item is in cart
  const isInCart = (productId, size = null, color = null) => {
    return state.items.some(
      item => item.product._id === productId &&
              item.size === size &&
              item.color === color
    );
  };

  // Get item quantity in cart
  const getItemQuantity = (productId, size = null, color = null) => {
    const item = state.items.find(
      item => item.product._id === productId &&
              item.size === size &&
              item.color === color
    );
    return item ? item.quantity : 0;
  };

  // Calculate shipping cost
  const getShippingCost = () => {
    // Free shipping for orders above $150 AUD
    return state.total >= AUSTRALIA_CONFIG.shipping.freeThreshold ? 0 : AUSTRALIA_CONFIG.shipping.standardCost;
  };

  // Calculate total with shipping
  const getTotalWithShipping = () => {
    return state.total + getShippingCost();
  };

  // Calculate tax (10% GST for Australia)
  const getTax = () => {
    return state.total * AUSTRALIA_CONFIG.tax.rate;
  };

  // Calculate final total
  const getFinalTotal = () => {
    return getTotalWithShipping() + getTax();
  };

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    numerologyDiscount: state.numerologyDiscount,
    numerologyDiscountAmount: state.numerologyDiscountAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCartFromServer,
    saveCartToServer,
    isInCart,
    getItemQuantity,
    getShippingCost,
    getTotalWithShipping,
    getTax,
    getFinalTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
