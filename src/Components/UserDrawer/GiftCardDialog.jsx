import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Swal from "sweetalert2";

const GiftCardDialog = ({ open, onClose }) => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const styles = `
          .swal2-container {
            z-index: 10000;
          }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const token = localStorage.getItem("userAccess");
      console.log("Token:", token);
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decodedToken = JSON.parse(window.atob(base64));
      const decodedUserId = decodedToken.user_id;
      console.log("decodedUserId:", decodedUserId);

      if (!decodedUserId || !token) {
        return;
      }
      fetch(`http://localhost:8000/accounts/usergiftcards/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Fetch response:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data:", data);
          setPurchases(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [open]);

  function deletePurchase(purchaseId) {
    const token = localStorage.getItem("userAccess");

    if (!token) {
      console.error("No token found");
      return;
    }

    fetch(`http://localhost:8000/accounts/deletegiftcard/${purchaseId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Success:", response);
          setPurchases(
            purchases.filter((purchase) => purchase.id !== purchaseId)
          );
          setTimeout(() => {
            Swal.fire({
              title: "Eliminado!",
              text: "La compra ha sido eliminada.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: "swal-wide",
              timer: null,
            });

            handleClose();
          }, 1000);
        } else {
          console.error("Error:", response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Typography
        variant="h3"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "40px",
          marginTop: "50px",
          textDecoration: "underline",
          textDecorationColor: "transparent",
          backgroundImage:
            "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
          backgroundSize: "160% 4px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 100%",
          textAlign: "center",
        }}
      >
        Mis Tarjetas de Regalo
      </Typography>
      <DialogContent>
        {purchases.length === 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="images/giftcarddialog.png"
                style={{
                  width: "50%",
                  borderRadius: "10px",
                  boxShadow:
                    "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                  marginTop: "20px",
                  marginBottom: "30px",
                }}
                alt="Gift Card"
              />
            </div>
            <Typography
              variant="body1"
              style={{
                fontFamily: "'Belleza', sans-serif",
                marginBottom: "10px",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              Compra hoy tu tarjeta de regalo de €50 o más y obtén 500
              DinePoints automáticamente. ¡Gástalos en tu próxima comida y
              disfruta de descuentos exclusivos! Porque en DineBooker, cuanto
              más regalas, más disfrutas.
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/giftcardpurchase");
                  onClose();
                }}
              >
                Comprar tarjeta de regalo
              </Button>{" "}
            </div>
          </>
        ) : (
          <List>
            {purchases.map((purchase) => {
              console.log(purchase);
              return (
                <ListItem
                  key={purchase.id}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      border: "3px solid #a7a7f5",
                      boxShadow:
                        "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                      padding: "10px",
                      borderRadius: "10px",
                      width: "80%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: "'Belleza', sans-serif",
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        Detalles de la Tarjeta de Regalo:
                      </Typography>
                      <img
                        src={purchase.image}
                        alt="Gift Card"
                        style={{
                          width: "200px",
                          borderRadius: "10px",
                          border: "3px solid #a7a7f5",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        border: "3px solid #BFE0F0",
                        padding: "10px",
                        margin: "10px",
                      }}
                    >
                      <p>Precio: {purchase.amount}€</p>
                      <p>De: {purchase.from}</p>
                      <p>
                        Para: {purchase.to} {purchase.to_last_name}
                      </p>
                      <p>Email: {purchase.email}</p>
                      <p>
                        Fecha de Entrega:{" "}
                        {new Date(purchase.selected_date).toLocaleDateString()}
                      </p>
                      <p>
                        Hora de Entrega:{" "}
                        {new Date(
                          `1970-01-01T${purchase.selected_time}Z`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>Mensaje: {purchase.message}</p>
                      {/* <p>Estado de la Tarjeta: {purchase.is_active ? 'Activa' : 'Inactiva'}</p> */}
                      <p>Fecha de Vencimiento: {purchase.expiry_date}</p>
                      <p>Número de Pedido: {purchase.order_number}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#d3d3d3",
                          color: "#333",
                        }}
                        onClick={() => deletePurchase(purchase.id)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#99aaff",
                          color: "#ffffff",
                        }}
                        onClick={() => {
                          navigate("/giftcardpurchase");
                          onClose();
                        }}
                      >
                        Comprar otra tarjeta de regalo
                      </Button>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GiftCardDialog;
