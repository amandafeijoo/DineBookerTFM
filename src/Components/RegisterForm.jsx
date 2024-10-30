import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

const StyledButton = styled(Button)`
  background-color: #99aaff;
  color: #333;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid #98e098;
  border-radius: 5px; 
  margin-right: 110px; 
  &:hover {
    background-color: #99aaff;
  }
`;

const StyledDialogTitle = styled(DialogTitle)({
  fontFamily: "'Belleza', sans-serif",
  fontSize: "24px",
  padding: "10px",
  borderRadius: "5px",
  textAlign: "center",
  textWeight: "bold",
  marginButtom: "20px",
});
const StyledBox = styled(Box)({
  border: "6px solid #CCFFCC",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.1)", 
});

const RegisterForm = ({ open, onClose }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    verify_password: "",
    promoCode: "",
    phoneNumber: "",
    countryCode: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [message, setMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(true);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const countryCodes = [
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+34", label: "🇪🇸 +34" },
    { value: "+47", label: "🇳🇴 +47" },
  ];

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const newForm = {
      ...form,
      [event.target.name]: event.target.value,
    };

    setForm(newForm);

    if (
      event.target.name === "password" ||
      event.target.name === "verify_password"
    ) {
      setPasswordsMatch(newForm.password === newForm.verify_password);
    }

    if (event.target.name === "email") {
      setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value));
    }

    if (event.target.name === "password") {
      setPasswordValid(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
          event.target.value
        )
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      verify_password: form.verify_password, 
      countryCode: countryCode,
      phoneNumber: phoneNumber,
      promoCode: promoCode,
    };

    console.log("Request Data:", requestData);

    const response = await fetch("http://localhost:8000/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response Data:", data);

      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Usuario creado con éxito",
        showConfirmButton: false,
        timer: 3000,
      });

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        verify_password: "",
        phoneNumber: "",
        countryCode: "",
        promoCode: "",
      });
      setPhoneNumber("");
      setCountryCode("+34");
      setPromoCode("");

      setTimeout(() => {
        setDialogOpen(false);
      }, 3000);
    } else {
      const errorData = await response.json();
      console.error(
        "Error:",
        response.status,
        response.statusText,
        errorData.error
      );

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorData.error,
      });

      switch (errorData.error) {
        case "EMAIL_IN_USE":
          setMessage("El correo electrónico ya está en uso");
          break;
        case "PASSWORDS_DO_NOT_MATCH":
          setMessage("Las contraseñas no coinciden");
          break;
        case "MISSING_REQUIRED_FIELDS":
          setMessage("Faltan campos requeridos");
          break;
        default:
          setMessage("Hubo un error al crear el usuario");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledBox>
        <StyledDialogTitle>¡Bienvenido a Dinebooker!</StyledDialogTitle>
        <StyledDialogTitle>
          ¡Tu mesa está a un clic de distancia!
        </StyledDialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="Nombre"
            type="text"
            fullWidth
            required
            value={form.first_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Apellido"
            type="text"
            fullWidth
            required
            value={form.last_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            error={!emailValid}
            helperText={!emailValid && "Correo inválido"}
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={!passwordValid}
            helperText={
              !passwordValid &&
              "La contraseña debe contener al menos 6 caracteres, 1 letra mayúscula y 1 número"
            }
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            name="verify_password"
            label="Verificar contraseña"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={!passwordsMatch}
            helperText={!passwordsMatch && "Las contraseñas no coinciden"}
            value={form.verify_password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Código de país"
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
            style={{ width: "20%" }}
          >
            {countryCodes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Número de teléfono"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            style={{ width: "80%" }}
          />
          <TextField
            margin="dense"
            name="promoCode"
            label="Código promocional"
            type="text"
            fullWidth
            value={form.promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Bienvenido500"
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={onClose}>Cancelar</StyledButton>
          <StyledButton onClick={handleFormSubmit}>Registrar</StyledButton>
        </DialogActions>
      </StyledBox>
    </Dialog>
  );
};

export default RegisterForm;
