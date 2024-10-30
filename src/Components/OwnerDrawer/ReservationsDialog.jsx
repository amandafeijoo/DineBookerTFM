import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const fontFamilyStyle = { fontFamily: "'Belleza', sans-serif" };
const titleStyle = {
  ...fontFamilyStyle,
  fontWeight: "bold",
  fontSize: "2.7rem",
  textDecoration: "underline",
  textDecorationColor: "transparent",
  backgroundImage: "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
  backgroundSize: "70% 4px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 100%",
  textAlign: "center",
};

const smallTitleStyle = {
  ...fontFamilyStyle,
  fontWeight: "bold",
  fontSize: "1.5rem",
  textDecoration: "underline",
  textDecorationColor: "transparent",
  backgroundImage: "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
  backgroundSize: "100% 4px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 100%",
  textAlign: "center",
};

const ReservationsDialog = ({ open, onClose }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (open) {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      fetch("http://localhost:8000/owner-reservations/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((reservationData) => {
          console.log("Reservation Data:", reservationData);
          setReservations(reservationData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [open]);

  const handleCancelReservation = (reservationId) => {
    const accessToken = localStorage.getItem("access");

    fetch(`http://localhost:8000/reservations/${reservationId}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data !== null) {
          // Maneja la respuesta JSON si existe
          console.log(data);
        }
        setReservations(
          reservations.filter((reservation) => reservation.id !== reservationId)
        );
        onClose(); // Cierra el diálogo antes de mostrar la notificación
        Swal.fire({
          icon: "success",
          title: "Reserva cancelada",
          text: "La reserva ha sido cancelada con éxito.",
        });
      })
      .catch((error) => {
        console.error("Error cancelling reservation:", error);
        onClose(); // Cierra el diálogo antes de mostrar la notificación
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al cancelar la reserva.",
        });
      });
  };

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const groupedReservations = reservations.reduce((acc, reservation) => {
    const restaurantId = reservation.restaurant;
    if (!acc[restaurantId]) {
      acc[restaurantId] = {
        restaurant_name: reservation.restaurant_name,
        reservations: [],
      };
    }
    acc[restaurantId].reservations.push(reservation);
    return acc;
  }, {});

  const containerStyle = {
    boxShadow:
      "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
    border: "1px solid #99aaff",
    padding: "16px",
    marginBottom: "16px",
    width: "600px",
    height: "auto",
    borderRadius: "10px",
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={titleStyle}>Reservas</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <List>
            {Object.keys(groupedReservations).map((restaurantId) => (
              <div key={restaurantId}>
                <ListItem>
                  <ListItemText
                    primary={
                      <span
                        style={smallTitleStyle}
                      >{`Restaurante: ${groupedReservations[restaurantId].restaurant_name}`}</span>
                    }
                  />
                </ListItem>
                {groupedReservations[restaurantId].reservations.map(
                  (reservation) => (
                    <div key={reservation.id} style={containerStyle}>
                      <div>
                        Usuario:{" "}
                        {`${reservation.user_first_name} ${reservation.user_last_name}`}
                      </div>
                      <div>Personas: {reservation.party_size}</div>
                      <div>Hora: {reservation.time}</div>
                      <div>Fecha: {reservation.reservation_date}</div>
                      <div>Correo: {reservation.user_email}</div>
                      <div>Teléfono: {reservation.user_phone_number}</div>
                      <div>
                        Preferencia de asiento:{" "}
                        {reservation.seat_preference || "ninguna"}
                      </div>
                      <div>
                        Solicitud especial:{" "}
                        {reservation.special_request || "ninguna"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleSendEmail(reservation.user_email)
                          }
                          style={{
                            backgroundColor: "#99aaff",
                            color: "#ffffff",
                            fontFamily: "'Belleza', sans-serif",
                            boxShadow:
                              "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                          }}
                        >
                          Enviar Correo
                        </Button>
                        {!reservation.cancelled && (
                          <Button
                            onClick={() =>
                              handleCancelReservation(reservation.id)
                            }
                            style={{
                              backgroundColor: "#99aaff",
                              color: "#ffffff",
                              fontFamily: "'Belleza', sans-serif",
                              boxShadow:
                                "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                            }}
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationsDialog;
