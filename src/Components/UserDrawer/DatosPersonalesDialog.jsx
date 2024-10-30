import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import styled from "styled-components";
import { Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";

const StyledBox = styled(Box)({
  border: "3px solid #99aaff",
  boxShadow:
    "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
  padding: "20px",
  borderRadius: "5px",
  marginTop: "40px",
  marginBottom: "60px",
});

const DatosPersonalesDialog = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [gender, setGender] = useState("");
  const [diaNacimiento, setDiaNacimiento] = useState("");
  const [mesNacimiento, setMesNacimiento] = useState("");
  const [anoNacimiento, setAnoNacimiento] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [isDiaValid, setIsDiaValid] = useState(true);
  const [isAnoValid, setIsAnoValid] = useState(true);
  const currentYear = new Date().getFullYear();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const token = localStorage.getItem("userAccess");

  const countryCodes = [
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+34", label: "🇪🇸 +34" },
    { value: "+47", label: "🇳🇴 +47" },
  ];

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8000/accounts/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          setCountryCode(data.countryCode);
          setDateJoined(data.date_joined);
        });
    }
  }, [token]);

  const handleUpdate = () => {
    if (isDiaValid && mesNacimiento && isAnoValid) {
      //  día y el mes siempre tengan dos dígitos
      const diaFormateado = String(diaNacimiento).padStart(2, "0");
      const mesFormateado = String(mesNacimiento).padStart(2, "0");

      // Combina el día, mes y año de nacimiento en una sola fecha
      const birthDate = `${anoNacimiento}-${mesFormateado}-${diaFormateado}`;

      // Datos a enviar
      const datos = {
        first_name: firstName,
        last_name: lastName,
        email,
        phoneNumber,
        countryCode,
        gender,
        birth_date: birthDate,
        contrasena: "",
        verificarContrasena: "",
      };
      console.log(datos);

      fetch("http://localhost:8000/accounts/user/update/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              console.error(error);
              throw new Error("Error al actualizar los datos del usuario");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          onClose();
          Swal.fire({
            title: "Actualización exitosa",
            text: "Los datos del usuario se han actualizado correctamente",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error(error);
          onClose();
          Swal.fire({
            title: "Error",
            text: "Hubo un error al actualizar los datos del usuario",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      setSnackbarMessage("Por favor, introduce una fecha de nacimiento válida");
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography
          variant="h2"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "30px",
            marginTop: "20px",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "2.7rem",
            textDecoration: "underline",
            textDecorationColor: "transparent",
            backgroundImage:
              "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
            backgroundSize: "70% 4px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 100%",
            textAlign: "center",
          }}
        >
          Mi Perfil
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "20px",
            marginTop: "20px",
            textAlign: "center",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Se unió: {dateJoined}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h3"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "90px",
          }}
        >
          Gestionar mi información personal
        </Typography>
        <Typography
          variant="h7"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "150px",
          }}
        >
          Tu información de contacto se enviará al restaurante cuando reserves
          una mesa.
        </Typography>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <StyledBox>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroup
                row
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <FormControlLabel
                  value="mujer"
                  control={<Radio />}
                  label="Mujer"
                />
                <FormControlLabel
                  value="hombre"
                  control={<Radio />}
                  label="Hombre"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                label="Nombre"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                label="Apellido"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label="Dirección de correo electrónico"
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                value={diaNacimiento}
                onChange={(event) => {
                  const newDia = event.target.value;
                  setIsDiaValid(newDia >= 1 && newDia <= 31);
                  setDiaNacimiento(newDia);
                }}
                label="Día"
                type="number"
                inputMode="numeric"
                InputProps={{
                  inputProps: {
                    max: 31,
                    min: 1,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                error={!isDiaValid}
                helperText={
                  !isDiaValid ? "Por favor, introduce un día entre 1 y 31." : ""
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                fullWidth
                value={mesNacimiento}
                onChange={(event) => setMesNacimiento(event.target.value)}
                label="Mes"
              >
                <MenuItem key={1} value={1}>
                  Enero
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Febrero
                </MenuItem>
                <MenuItem key={3} value={3}>
                  Marzo
                </MenuItem>
                <MenuItem key={4} value={4}>
                  Abril
                </MenuItem>
                <MenuItem key={5} value={5}>
                  Mayo
                </MenuItem>
                <MenuItem key={6} value={6}>
                  Junio
                </MenuItem>
                <MenuItem key={7} value={7}>
                  Julio
                </MenuItem>
                <MenuItem key={8} value={8}>
                  Agosto
                </MenuItem>
                <MenuItem key={9} value={9}>
                  Septiembre
                </MenuItem>
                <MenuItem key={10} value={10}>
                  Octubre
                </MenuItem>
                <MenuItem key={11} value={11}>
                  Noviembre
                </MenuItem>
                <MenuItem key={12} value={12}>
                  Diciembre
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                value={anoNacimiento}
                onChange={(event) => {
                  const newAno = event.target.value;
                  setIsAnoValid(newAno >= 1900 && newAno <= currentYear);
                  setAnoNacimiento(newAno);
                }}
                label="Año"
                type="number"
                inputMode="numeric"
                InputProps={{
                  inputProps: {
                    min: 1900,
                    max: currentYear,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                error={!isAnoValid}
                helperText={
                  !isAnoValid
                    ? `Por favor, introduce un año entre 1900 y ${currentYear}.`
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
              >
                {countryCodes.map((code) => (
                  <MenuItem value={code.value}>{code.label}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                label="Número de teléfono"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={handleUpdate}
                style={{
                  backgroundColor: "#646cff",
                  color: "#ffffff",
                }}
              >
                MODIFICAR
              </Button>
            </Grid>
          </Grid>
        </StyledBox>
      </DialogContent>
    </Dialog>
  );
};

export default DatosPersonalesDialog;
