import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";

const theme = createTheme();

const EditButton = styled(Button)({
  backgroundColor: "#add8e6", 
  marginBottom: "20px",
  border: "1px solid #99aaff",
  color: "#333",
  boxShadow:
    "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
  "&:hover": {
    backgroundColor: "#87ceeb", 
  },
});

const DeleteButton = styled(Button)({
  border: "1px solid #99aaff",
  backgroundColor: "#ffb6c1", 
  marginBottom: "20px",
  boxShadow:
    "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
  color: "#333",
  "&:hover": {
    backgroundColor: "#ff69b4", 
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#90ee90", 
  marginBottom: "20px",
  color: "white",
  "&:hover": {
    backgroundColor: "#7ccd7c", 
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const OpinionBox = styled(Box)({
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "5px", 
  padding: "20px", 
  marginBottom: "20px", 
  borderLeft: "5px solid #ffb6c1", 
});

const OpinionesDialog = ({ open, onClose, userId }) => {
  const [opiniones, setOpiniones] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [comment, setComment] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  const token = localStorage.getItem("userAccess");
  console.log("Token:", token);

  useEffect(() => {
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      setDecodedToken(decoded);
      console.log("Decoded Token:", decoded);
    }
  }, [token]);

  useEffect(() => {
    if (!decodedToken || !token) {
      return;
    }
    fetch(
      `http://localhost:8000/accounts/users/${decodedToken.user_id}/reviews/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Opiniones:", data);
        setOpiniones(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [decodedToken, token]);

  const handleEdit = (reviewId) => {
    console.log("handleEdit called with reviewId:", reviewId);
    const reviewToEdit = opiniones.find((review) => review.id === reviewId);
    console.log("Review to edit:", reviewToEdit);
    setEditingReview(reviewToEdit);
    setIsEditing(true);
    setEditingReviewId(reviewId);
    setComment(reviewToEdit.comment);
  };

  const handleCommentChange = (event) => {
    console.log("handleCommentChange called with value:", event.target.value);
    setComment(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log("handleSave called");

    if (!decodedToken) {
      console.error("Decoded token is null");
      return;
    }

    const userId = decodedToken.user_id; 
    const url = `http://localhost:8000/accounts/reviews/${editingReviewId}/`;
    const data = {
      comment,
      user: userId, 
    };

    console.log("Sending data:", data);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("Server error response:", err);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((updatedReview) => {
        console.log("Updated review:", updatedReview);
        setOpiniones(
          opiniones.map((opinion) =>
            opinion.id === editingReviewId ? updatedReview : opinion
          )
        );
        setIsEditing(false);
        setEditingReviewId(null);
        setComment("");
        onClose(); 
        Swal.fire("Éxito", "Opinión actualizada correctamente", "success");
      })
      .catch((error) => {
        console.log("Error:", error);
        onClose(); 
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar la opinión",
          "error"
        );
      });
  };

  const handleDelete = async (reviewId) => {
    console.log("handleDelete called with reviewId:", reviewId);
    const url = `http://localhost:8000/accounts/reviews/${reviewId}/delete/`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Review deleted successfully");
        setOpiniones(opiniones.filter((review) => review.id !== reviewId));
        onClose(); 
        Swal.fire("Éxito", "Opinión eliminada correctamente", "success");
      })
      .catch((error) => {
        console.log("Error:", error);
        onClose(); 
        Swal.fire("Error", "Hubo un problema al eliminar la opinión", "error");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography
            variant="h3"
            align="center"
            style={{
              fontFamily: "'Belleza', sans-serif",
              marginBottom: "20px",
              marginTop: "20px",
              textDecoration: "underline",
              textDecorationColor: "transparent",
              backgroundImage:
                "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
              backgroundSize: "50% 4px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 100%",
            }}
          >
            Mis Opiniones
          </Typography>
        </DialogTitle>
        <DialogContent>
          {opiniones && opiniones.length > 0 ? (
            opiniones.map((opinion, index) => (
              <Box
                key={opinion.id}
                sx={{
                  marginBottom: "20px",
                  boxShadow:
                    "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                  border: "4px solid #A2D2FF",
                }}
              >
                <Typography
                  variant="body1"
                  align="center"
                  style={{ fontFamily: "'Belleza', sans-serif" }}
                >
                  <strong>Restaurante:</strong> {opinion.restaurant_name} <br />
                  <strong>Usuario:</strong> {opinion.user_full_name} <br />
                  <strong>Rating:</strong> {opinion.rating} <br />
                  <strong>Comentario:</strong> {opinion.comment} <br />
                  <strong>Fecha de creación:</strong>{" "}
                  {new Date(opinion.created_at).toLocaleDateString()} <br />
                </Typography>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}> */}
                <OpinionBox key={index}>
                  {editingReviewId === opinion.id ? (
                    <form onSubmit={handleSave}>
                      <TextField
                        value={comment}
                        onChange={handleCommentChange}
                        multiline
                        rows={5}
                        fullWidth
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <SaveButton
                          type="submit"
                          style={{ backgroundColor: "lightgreen" }}
                        >
                          Guardar
                        </SaveButton>
                      </Box>
                    </form>
                  ) : (
                    <>
                      {/* <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginLeft: '10px' }}>
              Restaurante {opinion.restaurant_name}: {opinion.comment}
            </Typography> */}
                      {opinion.owner_response && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <Avatar
                            alt="Restaurante"
                            src="/path/to/restaurant-avatar.png"
                            style={{ marginRight: "10px" }}
                          />
                          <Typography
                            variant="body2"
                            align="center"
                            style={{
                              fontFamily: "'Belleza', sans-serif",
                              color: "gray",
                            }}
                          >
                            {opinion.restaurant_name} responde:{" "}
                            {opinion.owner_response}
                          </Typography>
                        </div>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          marginTop: "20px",
                        }}
                      >
                        <EditButton onClick={() => handleEdit(opinion.id)}>
                          Editar
                        </EditButton>
                        <DeleteButton onClick={() => handleDelete(opinion.id)}>
                          Borrar
                        </DeleteButton>
                      </Box>
                    </>
                  )}
                </OpinionBox>
              </Box>
            ))
          ) : (
            <>
              <img
                src="/images/opiniones.png"
                alt="No hay opiniones"
                style={{
                  width: "400px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "5px",
                  marginLeft: "240px",
                  marginTop: "20px",
                  marginBottom: "30px",
                }}
              />
              <Typography
                variant="body1"
                align="center"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Aún no hay opiniones
              </Typography>
              <Typography
                variant="h5"
                align="center"
                style={{
                  fontFamily: "'Belleza', sans-serif",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                Reserva una mesa y escribe una opinión sobre tu comida.
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <StyledButton>BUSCAR RESTAURANTE</StyledButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default OpinionesDialog;
