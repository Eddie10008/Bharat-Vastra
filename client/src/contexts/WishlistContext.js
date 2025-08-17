import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || [],
  itemCount: 0
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        item => item._id === action.payload._id
      );

      if (existingItem) {
        toast.error('Item already in wishlist');
        return state;
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length
      };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item._id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.length
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        itemCount: 0
      };

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length
      };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to wishlist
  const addToWishlist = (product) => {
    const wishlistItem = {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.finalPrice || product.price.retail,
      brand: product.brand,
      category: product.category,
      addedAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_ITEM', payload: wishlistItem });
    toast.success(`${product.name} added to wishlist!`);
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const item = state.items.find(item => item._id === productId);
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    if (item) {
      toast.success(`${item.name} removed from wishlist`);
    }
  };

  // Clear wishlist
  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.success('Wishlist cleared');
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item._id === productId);
  };

  // Load wishlist from server (for authenticated users)
  const loadWishlistFromServer = async () => {
    try {
      // This would typically fetch the user's wishlist from the server
      // For now, we'll just use the local wishlist
      return state.items;
    } catch (error) {
      console.error('Error loading wishlist from server:', error);
      return [];
    }
  };

  // Save wishlist to server (for authenticated users)
  const saveWishlistToServer = async () => {
    try {
      // This would typically save the wishlist to the server
      // For now, we'll just return success
      return { success: true };
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error('Error saving wishlist to server:', error);
      return { success: false, error: error.message };
    }
  };

  // Move item from wishlist to cart
  const moveToCart = (productId, cartContext) => {
    const item = state.items.find(item => item._id === productId);
    if (item) {
      // Add to cart
      cartContext.addToCart(item);
      // Remove from wishlist
      removeFromWishlist(productId);
      toast.success(`${item.name} moved to cart`);
    }
  };

  // Get wishlist items sorted by date added
  const getSortedItems = () => {
    return [...state.items].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  };

  const value = {
    items: state.items,
    itemCount: state.itemCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    loadWishlistFromServer,
    saveWishlistToServer,
    moveToCart,
    getSortedItems
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
