import React, { useContext,useEffect } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { AppContext } from '../Context/AppContext';
import styled from 'styled-components';
import backgroundImage from '/images/portada4.jpg';

const StyledContainer = styled.div`
  width: 200%; // Ajusta el ancho del contenedor
  height: 200%; // Ajusta la altura del contenedor
  margin: auto; // Centra el contenedor
`;
const StyledH1 = styled.h1`
    color: grey ;
    text-align: center;
    font-weight: bold;
    font-size: 2em;
    margin-top: 40px;
    margin-bottom: 35px;
    text-align: center; 
    border-bottom: 2px solid #A2D2FF; // Agrega una línea debajo del título
    padding-bottom: 10px; // Agrega espacio debajo del texto
    font-weight: bold; // Hace el texto más grueso
    letter-spacing: 2px; // Aumenta el espacio entre las letras
    text-transform: uppercase; // Convierte el texto a mayúsculas
`;

const StyledBackgroundImage = styled.div`
  margin-bottom: 40px;
  padding: 60px; // Aumentar el padding
  border-radius: 30px; // Aumentar el border-radius
  border: 3px solid #99aaff;
  box-shadow: 
  0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
  0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
  0px 4px 20px rgba(153, 170, 255, 0.5);  // Azul 
   background-color: #FFF8DC; // color verde olivo
  &:active {
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1); // Cambiar el box-shadow en el estado active
  }
`;

// Define un nuevo componente con styled-components para los párrafos
const StyledP = styled.p`
  color: #333;
  text-align: left;
`;

// Define un nuevo componente con styled-components para TextField
const StyledTextField = styled(MuiTextField)`
  && {
    width: 100%;
    border-color: #7198E0; // Verde pastel
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    margin-bottom: 20px;
    .MuiInputLabel-root {
      color: #7198E0; // Azul pastel
    }

    label {
      color: #7ccd7c; // Azul pastel
    }
    .MuiFormHelperText-root {
      color: #7198E0; // Azul pastel
    }
  }
  
  .MuiInputBase-input {
    color: 'grey'; // Azul pastel
  }

  .MuiInput-underline:before {
    border-bottom-color: #7ccd7c; // Verde pastel
  }
  .MuiInput-underline:hover:before {
    border-bottom-color: #ffcbdb; // Rosa pastel
  }
  .MuiInput-underline:after {
    border-bottom-color: #ffcbdb; // Rosa pastel
  }

  .MuiInputBase-input::placeholder {
    color: gray;
  }
  
  .MuiInputBase-input:disabled {
    color: gray;
  }
`;


const StepTwo = ({ setSenderName, setRecipientName, setRecipientLastName, setMessage }) => {
  const { senderName, recipientName, recipientLastName, message } = useContext(AppContext);
  
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
        helperText={`${recipientName ? recipientName.length : 0}/50 caracteres`}        
        inputProps={{ maxLength: 50 }}
      />
      <StyledTextField
          required
          label="Apellido"
          onChange={(e) => setRecipientLastName(e.target.value)}
          helperText={`${recipientLastName ? recipientLastName.length : 0}/50 caracteres`}        
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
