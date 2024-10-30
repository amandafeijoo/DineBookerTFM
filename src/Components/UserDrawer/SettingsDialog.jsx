import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

function SettingsDialog({ open, onClose }) {
  const handleDeleteAccount = () => {
    if (onClose) {
      onClose();
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar cuenta",
    }).then((result) => {
      if (result.isConfirmed) {
        const accessToken = localStorage.getItem("access_token");
        fetch("http://localhost:8000/accounts/delete-account/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": getCookie("csrftoken"), // Ensure CSRF token is included
          },
        }).then((response) => {
          if (response.status === 204) {
            Swal.fire(
              "¡Eliminada!",
              "Tu cuenta ha sido eliminada.",
              "success"
            ).then(() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              window.location.href = "/"; // Redirect to home or login page
            });
          } else {
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar tu cuenta.",
              "error"
            );
          }
        });
      }
    });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
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
          Gestionar mis notificaciones
        </Typography>
      </DialogTitle>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <img
          src="/images/cerrarcuenta.png"
          alt="Cerrar cuenta"
          style={{
            borderRadius: "10%",
            boxShadow:
              "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
            width: "300px",
            height: "300px",
            border: "4px solid #99aaff",
          }}
        />
      </Box>
      <DialogContent>
        <DialogContentText>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "'Belleza', sans-serif",
              marginBottom: "20px",
            }}
          >
            Boletín de noticias
          </Typography>
        </DialogContentText>
        <Stack direction="column" spacing={2}>
          <FormControlLabel
            control={<Switch />}
            label={
              <Typography
                sx={{ fontFamily: "'Belleza', sans-serif", fontSize: "20px" }}
              >
                Gestionar mis notificaciones
              </Typography>
            }
          />
          <FormControlLabel
            control={<Switch />}
            label={
              <Typography
                sx={{ fontFamily: "'Belleza', sans-serif", fontSize: "20px" }}
              >
                Acepto recibir ofertas y comunicaciones de DineBooker por correo
                electrónico
              </Typography>
            }
          />
        </Stack>
        <DialogTitle>
          <Typography
            sx={{
              color: "blue",
              fontFamily: "'Belleza', sans-serif",
              fontSize: "25px",
            }}
          >
            Si de verdad quieres marcharte...😢
          </Typography>
        </DialogTitle>
        <DialogContentText>
          <Typography
            sx={{ fontSize: "14px", fontFamily: "'Belleza', sans-serif" }}
          >
            Dejarás de tener acceso a todos los servicios de DineBooker. ¿Estás
            seguro de que quieres cerrar tu cuenta?
          </Typography>
          <List>
            <ListItem>
              <Typography
                sx={{ fontSize: "14px", fontFamily: "'Belleza', sans-serif" }}
              >
                - Cancelaremos todas tus reservas
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                sx={{ fontSize: "14px", fontFamily: "'Belleza', sans-serif" }}
              >
                - Perderás todos tus DinePoints
              </Typography>
            </ListItem>
          </List>
        </DialogContentText>
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            color: "#333",
            margin: "auto",
            marginTop: 2,
            marginBottom: 4,
            border: "3px solid #99aaff",
            padding: "10px 20px",
            backgroundColor: "#b0c4de",
            "&:hover": {
              backgroundColor: "#a2b9c6",
            },
            boxShadow:
              "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
          }}
          onClick={handleDeleteAccount}
        >
          CERRAR MI CUENTA
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
