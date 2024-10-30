import React, { useContext, useEffect } from "react";
import { TextField as MuiTextField } from "@mui/material";
import { AppContext } from "../Context/AppContext";
import styled from "styled-components";
import backgroundImage from "/images/portada4.jpg";

const StyledContainer = styled.div`
  width: 200%;
  height: 200%;
  margin: auto;
`;
const StyledH1 = styled.h1`
  color: grey;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  margin-top: 40px;
  margin-bottom: 35px;
  text-align: center;
  border-bottom: 2px solid #a2d2ff;
  padding-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const StyledBackgroundImage = styled.div`
  margin-bottom: 40px;
  padding: 60px;
  border-radius: 30px;
  border: 3px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  background-color: #fff8dc;
  &:active {
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StyledP = styled.p`
  color: #333;
  text-align: left;
`;

const StyledTextField = styled(MuiTextField)`
  && {
    width: 100%;
    border-color: #7198e0;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    margin-bottom: 20px;
    .MuiInputLabel-root {
      color: #7198e0;
    }

    label {
      color: #7ccd7c;
    }
    .MuiFormHelperText-root {
      color: #7198e0;
    }
  }

  .MuiInputBase-input {
    color: "grey";
  }

  .MuiInput-underline:before {
    border-bottom-color: #7ccd7c;
  }
  .MuiInput-underline:hover:before {
    border-bottom-color: #ffcbdb;
  }
  .MuiInput-underline:after {
    border-bottom-color: #ffcbdb;
  }

  .MuiInputBase-input::placeholder {
    color: gray;
  }

  .MuiInputBase-input:disabled {
    color: gray;
  }
`;

const StepTwo = ({
  setSenderName,
  setRecipientName,
  setRecipientLastName,
  setMessage,
}) => {
  const { senderName, recipientName, recipientLastName, message } =
    useContext(AppContext);

  return (
    <>
      <StyledH1>Personaliza tu tarjeta</StyledH1>
      <StyledBackgroundImage>
        <StyledP>De:</StyledP>
        <StyledTextField
          required
          label="Nombre del Remitente"
          placeholder="Nombre del Remitente"
          onChange={(e) => setSenderName(e.target.value)}
          helperText={`${senderName ? senderName.length : 0}/50 caracteres`}
          inputProps={{ maxLength: 50 }}
        />
        <StyledP>Para:</StyledP>
        <StyledTextField
          required
          label="Nombre"
          placeholder="Nombre"
          onChange={(e) => setRecipientName(e.target.value)}
          helperText={`${
            recipientName ? recipientName.length : 0
          }/50 caracteres`}
          inputProps={{ maxLength: 50 }}
        />
        <StyledTextField
          required
          label="Apellido"
          onChange={(e) => setRecipientLastName(e.target.value)}
          helperText={`${
            recipientLastName ? recipientLastName.length : 0
          }/50 caracteres`}
          inputProps={{ maxLength: 50 }}
        />
        <StyledP>Mensaje</StyledP>
        <StyledTextField
          label="Mensaje"
          placeholder="Escribe un mensaje..."
          multiline
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
          helperText={`${message ? message.length : 0}/200 caracteres`}
          inputProps={{ maxLength: 200 }}
        />
      </StyledBackgroundImage>
    </>
  );
};

export default StepTwo;
