import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, productToSubstract) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToSubstract.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToSubstract.id)
    }
    return cartItems.map((cartItem) =>
        cartItem.id === productToSubstract.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } :
            cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    totalCount: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItems) => total + cartItems.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItems) =>  total + cartItems.quantity * cartItems.price, 0);
        setTotalCount(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (productToSubstract) => {
        setCartItems(removeCartItem(cartItems, productToSubstract));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
      };


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart,
        clearItemFromCart,
        totalCount 
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}