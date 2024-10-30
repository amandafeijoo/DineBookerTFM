import { useState, useEffect } from "react";
import React from "react";
import { Dialog, Typography, Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import Reviews from "./Reviews";
import Swal from "sweetalert2";

const preprocessPhoto = (photo) => {
  if (typeof photo === "string") {
    return `http://localhost:8000${photo}`;
  } else if (photo && typeof photo.image === "string") {
    return `http://localhost:8000${photo.image}`;
  } else {
    console.error(
      "La propiedad image está indefinida para una de las fotos:",
      photo
    );
    return "url_de_imagen_predeterminada"; 
  }
};

const Reservas = ({ open, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("userAccess");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [restaurantToReview, setRestaurantToReview] = useState(null);
  const [reservationDialogOpen, setReservationDialogOpen] = useState(false);

  const openReviewDialog = (restaurantId) => {
    setRestaurantToReview(restaurantId);
    setReviewDialogOpen(true);
    closeReservationDialog(); 
  };

  const closeReservationDialog = () => {
    setReservationDialogOpen(false);
  };

  const closeReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  function translateStatus(status) {
    switch (status) {
      case "active":
        return "activa";
      case "cancelled":
        return "cancelada";
      default:
        return status;
    }
  }

  useEffect(() => {
    if (open) {
      console.log(token);

      fetch("http://localhost:8000/accounts/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });

      fetch("http://localhost:8000/accounts/reservations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            Promise.all(
              data.map((reservation) => {
                if (reservation && reservation.restaurant) {
                  return fetch(
                    `http://localhost:8000/restaurant_details/${reservation.restaurant}/`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((restaurantData) => {
                      return { ...reservation, restaurant: restaurantData };
                    });
                }
              })
            )
              .then((reservationsWithDetails) => {
                setReservations(reservationsWithDetails.filter(Boolean));
              })
              .catch((error) => console.error(error));
          } else {
            console.error("Error: la respuesta no es un array", data);
          }
        })
        .catch((error) => {
          console.error("Error al obtener las reservas:", error);
        });
    }
  }, [open, token]);

  const cancelReservation = (id) => {
    fetch(`http://localhost:8000/accounts/reservations/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        setReservations(
          reservations.filter((reservation) => reservation.id !== id)
        );
        onClose();
        Swal.fire({
          title: "Reserva cancelada",
          text: "Tu reserva ha sido cancelada exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error al cancelar la reserva:", error);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
            }}
          >
            Mis Reservas
          </Typography>
          {snackbarOpen && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message="Su reserva fue cancelada con éxito"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
          )}
          {reservations.length === 0 ? (
            <Typography
              variant="body1"
              style={{
                fontFamily: "'Belleza', sans-serif",
                marginBottom: "40px",
              }}
            >
              Aún no hay reservas
            </Typography>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "50px",
              }}
            >
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow:
                      "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    border: "2px solid #99aaff",
                  }}
                >
                  <img
                    src={
                      reservation.restaurant.photos &&
                      reservation.restaurant.photos.length > 0
                        ? preprocessPhoto(reservation.restaurant.photos[0])
                        : "url_de_imagen_predeterminada"
                    }
                    alt={reservation.restaurant.name}
                    style={{
                      width: "300px",
                      height: "300px",
                      borderRadius: "10px",
                      border: "4px solid #98e098",
                    }}
                  />
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    {reservation.restaurant.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    {reservation.date} a las {reservation.time}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    Personas: {reservation.party_size}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    Estado: {translateStatus(reservation.status)}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      marginBottom: "20px",
                      backgroundColor: "#d3d3d3",
                      color: "#000",
                      boxShadow:
                        "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                    }}
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Cancelar Reserva
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      fontFamily: "'Belleza', sans-serif",
                      backgroundColor: "#99aaff",
                      color: "#ffffff",
                      boxShadow:
                        "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                    }}
                    onClick={() => openReviewDialog(reservation.restaurant.id)}
                  >
                    Dejar una reseña
                  </Button>
                </div>
              ))}
            </div>
          )}
          {reservations.length === 0 && (
            <>
              <img
                src="/images/search.png"
                alt="Search"
                style={{
                  marginBottom: "60px",
                  borderRadius: "10px",
                  width: "350px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Typography
                variant="h5"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "20px",
                }}
              >
                Este es el punto de partida de experiencias gastronómicas
                inolvidables
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "20px",
                }}
              >
                ¿Tienes hambre? Estás en el lugar adecuado. Elige lo que más te
                apetezca y disfruta de confirmación instantánea.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "20px",
                }}
              >
                RESERVAR POR PRIMERA VEZ
              </Button>
            </>
          )}
        </div>
      </Dialog>
      <Reviews
        open={reviewDialogOpen}
        onClose={closeReviewDialog}
        restaurantId={restaurantToReview}
      />
    </>
  );
};

export default Reservas;
