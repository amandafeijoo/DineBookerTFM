import React from "react";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/system";
import ImageComponent from "./ImageComponent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import zxcvbn from "zxcvbn";

const Title = styled.h1`
  font-family: "Belleza", sans-serif;
  text-align: center;
  margin-left: 30px;
  margin-top: 250px;
  margin-bottom: 40px;
  text-decoration: underline;
  text-decoration-color: transparent;
  background-image: linear-gradient(to right, #ff69b4, #98e098, #99aaff);
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
`;

const Subtitle = styled.h2`
  font-family: "Belleza", sans-serif;
  text-align: justify;
  margin-left: 50px;
  margin-right: 50px;
  font-size: 1.2em;
  margin-bottom: 50px;
`;

const FormContainer = styled.div`
  flex: 1;
  margin-right: 60px;
  margin-left: 100px;
`;

const Form = styled.form`
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  margin-left: 30px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  border: 3px solid #99aaff;
`;
const CountryCodeSelect = styled(Select)`
  width: 80px;
  margin-right: 10px;
`;

const FieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const TextFieldLarge = styled(TextField)`
  flex: 1;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledButton = muiStyled(Button)({
  border: "none",
  backgroundColor: "#646cff",
  color: "#ffffff",
  padding: "10px 20px",
  "&:hover": {
    cursor: "pointer",
    color: "#d0ff94",
    backgroundColor: "#000000",
  },
});

const Image = styled.img`
  height: 110vh;
  width: auto;
  border-radius: 10px;
  margin-left: 150px;
  margin-top: 100px;
  margin-bottom: 5px;
  border: 3px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
`;

const OwnerInfoForm = ({ handleNext, handleData }) => {
  const [countryCode, setCountryCode] = useState("+34");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optOut, setOptOut] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
    console.log(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const result = zxcvbn(e.target.value);
    console.log("Password strength:", result.score);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNextClick = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    handleData({
      countryCode,
      firstName,
      lastName,
      email,
      phone,
      optOut,
      password,
    });
    console.log({
      countryCode,
      firstName,
      lastName,
      email,
      phone,
      optOut,
      password,
    });
    handleNext();
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start">
      <FormContainer>
        <Title>¡Vamos a hablar!</Title>
        <Subtitle>
          ¿Eres el propietario de un restaurante y quieres saber más información
          sobre DineBooker? Rellena tus datos personales y una persona de
          nuestro equipo se pondrá en contacto contigo en breve
        </Subtitle>
        <Form>
          <FieldContainer>
            <TextFieldLarge
              label="Nombre"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextFieldLarge
              label="Apellido"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <TextFieldLarge
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <CountryCodeSelect
              value={countryCode}
              onChange={handleCountryCodeChange}
              variant="outlined"
            >
              <MenuItem value="+34">+34</MenuItem>
              <MenuItem value="+47">+47</MenuItem>
              <MenuItem value="+1">+1</MenuItem>
              <MenuItem value="+44">+44</MenuItem>
              <MenuItem value="+33">+33</MenuItem>
              <MenuItem value="+39">+39</MenuItem>
              <MenuItem value="+49">+49</MenuItem>
              <MenuItem value="+52">+52</MenuItem>
              <MenuItem value="+54">+54</MenuItem>
            </CountryCodeSelect>
            <TextFieldLarge
              label="Teléfono"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <TextFieldLarge
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldLarge
              label="Verificar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FieldContainer>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={optOut}
                onChange={(e) => setOptOut(e.target.checked)}
              />
            }
            label="No quiero recibir comunicaciones por email/SMS de DineBooker"
          />
          <ButtonContainer>
            <StyledButton onClick={handleNextClick}>Siguiente</StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
      <Box style={{ overflow: "hidden", flex: 1, margin: 0, padding: 0 }}>
        <Image src="/images/ownerpubli1.png" alt="Owner" />
      </Box>
    </Box>
  );
};

export default OwnerInfoForm;
