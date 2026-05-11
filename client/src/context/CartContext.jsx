// //client/src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const getFromLocalStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const getInitialCart = () => {
  return getFromLocalStorage("cartItems", []);
};

const getInitialSaved = () => {
  return getFromLocalStorage("savedForLater", []);
};

const getProductId = (product) => {
  return product?._id || product?.id || product?.productId;
};

const getProductImage = (product) => {
  const image =
    product?.image ||
    product?.imageUrl ||
    product?.thumbnail ||
    product?.images?.[0]?.url ||
    product?.images?.[0];

  if (typeof image === "string") return image;
  if (image?.url) return image.url;

  return "";
};

const normalizeCartItem = (product, quantity = 1) => {
  return {
    productId: getProductId(product),
    title: product.title || product.name || "Product",
    price: Number(product.price || 0),
    image: getProductImage(product),
    brand: product.brand || "N/A",
    supplier:
      product.supplier?.name ||
      product.supplierName ||
      product.supplier ||
      "Unknown Supplier",
    stock: product.stock || 0,
    quantity: Number(quantity || 1),
  };
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);
  const [savedForLater, setSavedForLater] = useState(getInitialSaved);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = (product, quantity = 1) => {
    const productId = getProductId(product);
    if (!productId) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Number(item.quantity) + Number(quantity) }
            : item
        );
      }

      return [...prevItems, normalizeCartItem(product, quantity)];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    const newQty = Number(quantity);

    if (newQty < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isSavedForLater = (productId) => {
    return savedForLater.some((item) => item.productId === productId);
  };

  const toggleSavedForLater = (product) => {
    const productId = getProductId(product);
    if (!productId) return;

    const savedItem = normalizeCartItem(product, 1);

    setSavedForLater((prev) => {
      const exists = prev.some((item) => item.productId === productId);

      if (exists) {
        return prev.filter((item) => item.productId !== productId);
      }

      return [...prev, savedItem];
    });
  };

  const saveForLater = (item) => {
    if (!item?.productId) return;

    setSavedForLater((prev) => {
      const exists = prev.some(
        (savedItem) => savedItem.productId === item.productId
      );

      if (exists) return prev;

      return [...prev, item];
    });

    removeFromCart(item.productId);
  };

  const moveToCart = (item) => {
    if (!item?.productId) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.productId === item.productId
            ? {
                ...cartItem,
                quantity:
                  Number(cartItem.quantity || 1) + Number(item.quantity || 1),
              }
            : cartItem
        );
      }

      return [...prevItems, item];
    });

    setSavedForLater((prev) =>
      prev.filter((savedItem) => savedItem.productId !== item.productId)
    );
  };

  const removeFromSaved = (productId) => {
    setSavedForLater((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,

        savedForLater,
        isSavedForLater,
        toggleSavedForLater,
        saveForLater,
        moveToCart,
        removeFromSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}