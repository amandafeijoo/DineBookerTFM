import styled from "styled-components";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import TextField from "@mui/material/TextField";
import { styled as muiStyled } from "@mui/system";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaShoppingCart, FaTrash, FaEdit } from "react-icons/fa";
import { Delete as TrashIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcApplePay,
} from "@fortawesome/free-brands-svg-icons";
import CartComponent from "./CartComponent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import moment from "moment";

const StyledImage = styled.img`
  display: block;
  max-width: 30%;
  height: auto;
  border-radius: 20px;
  border: 3px solid #8585f2;
  margin: 25px auto;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 300px;
  padding: 20px;
  gap: 10px;
`;

const StyledTrashIcon = styled(TrashIcon)`
  color: grey;
  font-size: 80px;
  margin-right: 10px;
  margin-left: 300px;
  cursor: pointer;

  &:hover {
    color: #7575f5;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  color: grey;
  font-size: 80px;
  margin-right: 10px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: #7575f5;
  }
`;
const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const OrderDetails = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  overflow: auto;
  margin-bottom: 50px;
  margin-top: -5px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  border-radius: 20px;
`;

const PaymentDetails = styled.div`
  flex: 1;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  margin-right: 50px;
  margin-top: -200px;
  position: relative;
  border: 3px solid #a7a7f5;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #a6a6ff;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

const CartIcon = styled.div`
  position: absolute;
  top: -50px;
  right: 70px;
  color: #757575;
  &:hover {
    color: #7575f5;
  }
`;

const IconContainer = styled.div`
  margin-left: 200px;
`;

const Title = styled.h1`
  width: 100%;
  margin-top: 150px;
  text-align: center;
  color: #757575;
  font-size: 3.2em;
  text-shadow: 2px 2px 2px #a2d2ff;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 2px solid #a2d2ff;
  padding-bottom: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #7198e0 !important;
  &:hover {
    background-color: #6868d2 !important;
  }
`;

const modalStyle = {
  position: "fixed",
  right: "10%",
  top: "10%",
  width: "30%",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CustomTextField = muiStyled(TextField)({
  "& label.Mui-focused": {
    color: "#00796b",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#00796b",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7575f5",
    },
    "&:hover fieldset": {
      borderColor: "#4a4af5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a7a7f5",
    },
    "& input": {
      fontSize: "1.2rem",
    },
  },
  backgroundColor: "",
});

const clearCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};

const PaymentComponent = () => {
  const {
    order,
    setOrder,
    setActiveStep,
    cart,
    setCart,
    removeFromCart,
    clearCart,
    completePurchase,
  } = useContext(AppContext);
  console.log("Initial order:", order);
  console.log("Initial cart:", cart);
  console.log(order);
  console.log("Cart:", cart);
  console.log(
    "Total amount:",
    (cart || []).reduce((total, order) => total + Number(order.amount || 0), 0)
  );
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const formattedDate = order.selectedDate
    ? formatDate(order.selectedDate)
    : "N/A";
  const formattedTime = order.selectedTime
    ? formatTime(order.selectedTime)
    : "N/A";

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );
  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handlePayment = (event) => {
    event.preventDefault();

    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiryDate)) {
      alert("Por favor, ingresa la fecha de vencimiento en el formato MM/YY");
      return;
    }

    const token = localStorage.getItem("userAccess");
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedToken = JSON.parse(window.atob(base64));
    const decodedUserId = decodedToken.user_id;

    if (!decodedUserId || !token) {
      return;
    }

    const currentOrder = { ...order, userId: decodedUserId };

    if (!currentOrder.toLastName || !currentOrder.userId) {
      console.error("Error: recipientLastName or user is undefined or empty");
      return;
    }

    console.log("Current Order:", currentOrder);

    const paymentData = {
      cardHolderName,
      cardNumber,
      expiryDate,
      cvc,
    };

    fetch("http://localhost:8000/accounts/giftcardpurchase/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...paymentData,
        selectedImage: currentOrder.image,
        amount: currentOrder.amount,
        senderName: currentOrder.from,
        recipientName: currentOrder.to,
        recipientLastName: currentOrder.toLastName,
        email: currentOrder.email,
        deliveryTime: currentOrder.deliveryTime,
        selectedDate: formatDate(currentOrder.selectedDate),
        selectedTime: formatTime(currentOrder.selectedTime),
        message: currentOrder.message,
        user: currentOrder.userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        const orderNumber = data.order_number;
        console.log("Order Number:", orderNumber);

        // Clear the order and cart state
        setOrder({});
        setCart([]);

        // Clear local storage
        localStorage.removeItem("currentOrder");
        localStorage.removeItem("cart");

        clearCart();
        completePurchase();

        Swal.fire({
          title: "Pago exitoso!",
          text: "Puedes revisar tu pedido en el perfil de usuario.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error en el pago",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleDelete = (index) => {
    removeFromCart(index);

    if (cart.length === 1) {
      setStep(0);
    }
    navigate("/giftcardpurchase");
  };

  const handleEdit = () => {
    navigate("/GiftCardPurchase");
  };

  const navigateToStep0 = () => {
    navigate("/giftcardpurchase");
  };

  const handleContinueShopping = () => {
    console.log("Setting active step to 0");
    setActiveStep(0);
    navigate("/GiftCardPurchase");
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7575f5",
      },
    },
  });

  return (
    <>
      <StyledButton
        variant="contained"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "160px",
          marginLeft: "40px",
          marginBottom: "-150px",
        }}
        onClick={handleContinueShopping}
      >
        Atrás
      </StyledButton>
      <Title>Resumen de la Cesta</Title>
      <AppContainer>
        <ThemeProvider theme={theme}>
          <CartIcon>
            <Badge badgeContent={cart.length} color="primary">
              <FaShoppingCart size={30} onClick={() => setOpen(true)} />
            </Badge>
          </CartIcon>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={modalStyle}>
              <CartComponent />{" "}
            </Box>
          </Modal>
          <Container>
            <OrderDetails>
              {cart.map((order, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "40px",
                      marginTop: "20px",
                    }}
                  >
                    Detalles del pedido {index + 1}:
                  </Typography>
                  <IconContainer>
                    <StyledTrashIcon onClick={() => handleDelete(index)} />{" "}
                    <StyledEditIcon onClick={() => handleEdit(index)} />{" "}
                  </IconContainer>
                  <StyledImage src={order.image} alt="Product" />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="Producto"
                    value={order.product}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="Cantidad"
                    value={order.amount}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="De"
                    value={order.from}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="Para"
                    value={`${order.to} ${order.toLastName}`}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="Email"
                    value={order.email}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400, fontFamily: "'Belleza', sans-serif" }}
                    label="Mensaje"
                    value={order.message}
                    InputProps={{ readOnly: true }}
                  />
                  <CustomTextField
                    size="small"
                    style={{ width: 400 }}
                    label="Hora de entrega"
                    value={
                      order.deliveryTime === "now"
                        ? "Ahora"
                        : `Fecha: ${formattedDate}, Hora: ${formattedTime}`
                    }
                    InputProps={{ readOnly: true }}
                  />
                </div>
              ))}
            </OrderDetails>

            <PaymentDetails>
              <Typography
                variant="h4"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "20px",
                  marginTop: "10px",
                }}
              >
                Facturación
              </Typography>
              <form onSubmit={handlePayment}>
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: "'Belleza', sans-serif",
                    marginBottom: "10px",
                    marginTop: "20px",
                  }}
                >
                  Al continuar acepto las{" "}
                  <a href="/terms">Términos y Condiciones de Venta</a> y{" "}
                  <a href="/privacy">Política de privacidad</a>.
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "'Belleza', sans-serif",
                    marginBottom: "15px",
                    marginTop: "10px",
                  }}
                >
                  Total a pagar: {totalAmount}€
                </Typography>
                <CustomTextField
                  label="Nombre del titular"
                  type="text"
                  required
                  value={cardHolderName}
                  onChange={(event) => setCardHolderName(event.target.value)}
                />
                <CustomTextField
                  label="Número de tarjeta"
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                />
                <CustomTextField
                  label="Fecha de vencimiento (MM/YY)"
                  type="text"
                  required
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                />
                <CustomTextField
                  label="CVC"
                  type="text"
                  required
                  value={cvc}
                  onChange={(event) => setCvc(event.target.value)}
                />
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", marginLeft: "80px" }}
                  >
                    Pagar
                  </Button>
                  <Button
                    onClick={() => {
                      if (cart && cart.length > 0) {
                        handleContinueShopping();
                      } else {
                        alert("No hay nada en el carrito");
                      }
                    }}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", marginLeft: "20px" }}
                  >
                    Seguir comprando
                  </Button>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCcPaypal}
                    size="3x"
                    style={{ marginTop: "10px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcApplePay}
                    size="3x"
                    style={{ marginTop: "10px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcVisa}
                    size="3x"
                    style={{ marginTop: "20px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCcMastercard}
                    size="3x"
                    style={{ marginTop: "20px" }}
                  />
                </div>
              </form>
            </PaymentDetails>
          </Container>
        </ThemeProvider>
      </AppContainer>
    </>
  );
};

export default PaymentComponent;
