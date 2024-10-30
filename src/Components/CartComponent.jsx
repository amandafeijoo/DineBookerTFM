import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { cart, setCart, setActiveStep, removeFromCart } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    console.log("Setting active step to 0");
    setActiveStep(0);
    navigate("/GiftCardPurchase");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
  };

  useEffect(() => {
    return () => {
      clearCart();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "auto",
        maxHeight: "500px",
      }}
    >
      {console.log("Cart:", cart)}
      {cart && cart.length > 0 && (
        <Box>
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            Cesta
          </Typography>
          {cart.map((order, index) => {
            console.log("Order:", order);
            return (
              <Box key={index} sx={{ m: 2, textAlign: "center" }}>
                <img
                  src={order.image}
                  alt="Product"
                  style={{ width: "100%", maxWidth: "300px" }}
                />
                <Typography variant="body1">
                  Producto: {order.product ? order.product.toString() : ""}
                </Typography>
                <Typography variant="body1">
                  Cantidad: {order.amount ? order.amount.toString() + "€" : ""}
                </Typography>
                <Button onClick={() => removeFromCart(index)}>Eliminar</Button>
                {index < cart.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            );
          })}
          <Typography variant="h6" align="center" sx={{ my: 2 }}>
            Total de todos los productos:{" "}
            {cart
              ? cart
                  .reduce(
                    (total, order) => total + (order.amount ? order.amount : 0),
                    0
                  )
                  .toString() + "€"
              : "0€"}
          </Typography>
        </Box>
      )}
      <Button
        onClick={handleContinueShopping}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Seguir comprando
      </Button>
    </Box>
  );
};

export default CartComponent;
