import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

const ReviewsDialog = ({ open, onClose }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [responses, setResponses] = useState({});
  const [isEditing, setIsEditing] = useState({});

  const fetchRestaurantData = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8000/owner-restaurants/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      return [];
    }
  };

  const submitOwnerResponse = async (reviewId, responseText, accessToken) => {
    try {
      const response = await fetch(
        `http://localhost:8000/reviews/${reviewId}/response/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ owner_response: responseText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);
      return data;
    } catch (error) {
      console.error("Error submitting response:", error);
      return null;
    }
  };

  useEffect(() => {
    if (open) {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      const fetchRestaurantData = async (token) => {
        try {
          const response = await fetch(
            "http://localhost:8000/`http://localhost:8000/reviews/${reviewId}/response/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching restaurant data");
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
          return [];
        }
      };

      fetchRestaurantData(accessToken)
        .then((data) => {
          console.log("Fetched restaurant data:", data);
          setRestaurants(data);
          const initialResponses = {};
          data.forEach((restaurant) => {
            restaurant.restaurant_reviews?.forEach((review) => {
              if (review.owner_response) {
                initialResponses[review.id] = review.owner_response;
              }
            });
          });
          console.log("Initial responses:", initialResponses);
          setResponses(initialResponses);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    }
  }, [open]);

  const handleResponseChange = (reviewId, event) => {
    setResponses({
      ...responses,
      [reviewId]: event.target.value,
    });
  };

  const handleEditClick = (reviewId) => {
    setIsEditing({
      ...isEditing,
      [reviewId]: true,
    });
  };

  useEffect(() => {
    if (open) {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }

      fetchRestaurantData(accessToken)
        .then((data) => {
          console.log("Fetched restaurant data:", data);
          setRestaurants(data);
          const initialResponses = {};
          data.forEach((restaurant) => {
            restaurant.reviews?.forEach((review) => {
              if (review.owner_response) {
                initialResponses[review.id] = review.owner_response;
              }
            });
          });
          console.log("Initial responses:", initialResponses);
          setResponses(initialResponses);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const initialResponses = {};
      const initialEditing = {};
      restaurants.forEach((restaurant) => {
        restaurant.reviews?.forEach((review) => {
          initialResponses[review.id] = review.owner_response || "";
          initialEditing[review.id] = false;
        });
      });
      setResponses(initialResponses);
      setIsEditing(initialEditing);
    }
  }, [open, restaurants]);

  const handleSaveResponse = async (reviewId) => {
    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const response = await fetch(
        `http://localhost:8000/reviews/${reviewId}/response/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            owner_response: responses[reviewId],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar la respuesta");
      }

      const data = await response.json();

      setResponses({
        ...responses,
        [reviewId]: data.owner_response,
      });
      setIsEditing({
        ...isEditing,
        [reviewId]: false,
      });
      onClose();

      Swal.fire({
        icon: "success",
        title: "¡Respuesta guardada!",
        text: "La respuesta ha sido guardada exitosamente.",
      });
    } catch (error) {
      console.error("Error al guardar la respuesta:", error);
      onClose();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar la respuesta. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleResponseSubmit = (reviewId) => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      console.error("Access token is missing");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Access token is missing. Please log in again.",
      });
      return;
    }

    const responseText = responses[reviewId] || "";
    console.log("Submitting response:", responseText);

    submitOwnerResponse(reviewId, responseText, accessToken)
      .then((data) => {
        if (data) {
          console.log("Response submitted successfully:", data);
          setResponses({
            ...responses,
            [reviewId]: responseText,
          });
          onClose();
          Swal.fire({
            icon: "success",
            title: "Response Submitted",
            text: `Response to review ${reviewId} submitted successfully.`,
          });
        } else {
          console.error("Failed to submit response");
          onClose();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to submit response. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
        onClose();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error submitting response. Please try again.",
        });
      });
  };

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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={titleStyle}>Reseñas</DialogTitle>
      <DialogContent>
        <List>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <ListItem>
                <ListItemText
                  primary={`Restaurante: ${restaurant.name}, Dirección: ${restaurant.address}`}
                  primaryTypographyProps={{
                    ...fontFamilyStyle,
                    fontSize: "1.5rem",
                  }}
                />
              </ListItem>
              {restaurant.restaurant_reviews?.map((review) => (
                <div
                  key={review.id}
                  style={{
                    padding: "20px",
                    marginBottom: "20px",
                    boxShadow:
                      "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                  }}
                >
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemText
                      primary={`Usuario: ${review.user_first_name} ${review.user_last_name}`}
                      secondary={`Fecha: ${review.date} - Calificación: ${review.rating}`}
                      primaryTypographyProps={fontFamilyStyle}
                      secondaryTypographyProps={fontFamilyStyle}
                    />
                    <ListItemText
                      primary={`Comentario: ${review.comment}`}
                      primaryTypographyProps={fontFamilyStyle}
                    />
                    <TextField
                      label="Respuesta"
                      value={responses[review.id] || ""}
                      onChange={(e) => handleResponseChange(review.id, e)}
                      fullWidth
                      style={{ marginTop: "10px" }}
                      disabled={
                        !isEditing[review.id] && !!review.owner_response
                      }
                      InputProps={{
                        readOnly:
                          !isEditing[review.id] && !!review.owner_response,
                      }}
                    />
                    {!!review.owner_response && !isEditing[review.id] && (
                      <Typography variant="body2" color="textSecondary">
                        Comentario ya respondido
                      </Typography>
                    )}
                    {!!review.owner_response && !isEditing[review.id] && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(review.id)}
                        style={{ marginTop: "10px" }}
                      >
                        Editar Respuesta
                      </Button>
                    )}
                    {isEditing[review.id] && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSaveResponse(review.id)}
                        style={{ marginTop: "10px" }}
                      >
                        Guardar Respuesta
                      </Button>
                    )}
                    <Button
                      onClick={() => handleResponseSubmit(review.id)}
                      style={{ marginTop: "10px", ...fontFamilyStyle }}
                      disabled={!!review.owner_response}
                    >
                      Enviar
                    </Button>
                  </ListItem>
                </div>
              ))}
            </div>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={fontFamilyStyle}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewsDialog;
