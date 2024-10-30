import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const initialOrderState = {
    image: "images/gift1.jpg",
    product: "",
    amount: 50,
    price: 50,
    from: "",
    to: "",
    toLastName: "",
    email: "",
    deliveryTime: "now",
    message: "",
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(initialOrderState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const setCardHolderName = (name) =>
    setOrder((prev) => ({ ...prev, cardHolderName: name }));
  const setCardNumber = (number) =>
    setOrder((prev) => ({ ...prev, cardNumber: number }));
  const setExpiryDate = (date) =>
    setOrder((prev) => ({ ...prev, expiryDate: date }));
  const setCvc = (cvc) => setOrder((prev) => ({ ...prev, cvc }));
  const setSelectedImage = (image) => setOrder((prev) => ({ ...prev, image }));
  const setSenderName = (name) => setOrder((prev) => ({ ...prev, from: name }));
  const setRecipientName = (name) =>
    setOrder((prev) => ({ ...prev, to: name }));
  const setRecipientLastName = (lastName) =>
    setOrder((prev) => ({ ...prev, toLastName: lastName }));
  const setMessage = (message) => setOrder((prev) => ({ ...prev, message }));
  const setAmount = (amount) => setOrder((prev) => ({ ...prev, amount }));
  const setPrice = (price) => setOrder((prev) => ({ ...prev, price }));
  const setEmail = (email) => setOrder((prev) => ({ ...prev, email }));
  const setDeliveryTime = (deliveryTime) =>
    setOrder((prev) => ({ ...prev, deliveryTime }));

  const addToCart = () => {
    const newOrder = { ...order };

    setCart((prevCart) => {
      const updatedCart = [...prevCart, newOrder];
      Cookies.set("cart", JSON.stringify(updatedCart));
      console.log("updatedCart", updatedCart);
      return updatedCart;
    });

    setOrder(initialOrderState);
  };

  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    console.log("cart has been updated", cart);
  }, [cart]);

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    Cookies.remove("cart");
  };

  const completePurchase = () => {
    Cookies.remove("cart");
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        activeStep,
        setActiveStep,
        isOpen,
        setIsOpen,
        cart,
        setCart,
        order,
        setOrder,
        setSelectedImage,
        setSenderName,
        setRecipientName,
        setRecipientLastName,
        setMessage,
        setAmount,
        setPrice,
        setEmail,
        setDeliveryTime,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        addToCart,
        removeFromCart,
        clearCart,
        completePurchase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};