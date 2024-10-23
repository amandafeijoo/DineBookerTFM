import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { AppContext } from "../Context/AppContext";
import { useNavigate } from 'react-router-dom';
import { TextField as MuiTextField } from '@mui/material';
import styled from 'styled-components';
import { Typography } from '@mui/material';

import backgroundImage from '/images/portada4.jpg';


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
  width: 150%; // Ajustar el ancho
  padding: 30px; // Reducir el padding
  border-radius: 30px; // Aumentar el border-radius
  border: 3px solid #99aaff;
  box-shadow: 
  0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
  0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
  0px 4px 20px rgba(153, 170, 255, 0.5);  // Azul  
  background-color: #FFF8DC; // color verde olivo
  position: relative; // Añadir posición relativa
  left: 50%; // Centrar horizontalmente
  transform: translateX(-50%); // Ajustar la posición para centrar
  &:active {
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1); // Cambiar el box-shadow en el estado active
  }
`;

const StyledTextField = styled(MuiTextField)`
  && {
    width: 100%;
    border-color: #7575f5;
    border-width: 1px;
    border-style: solid;

    label {
      color: #333; 
;
    }
    .MuiFormHelperText-root {
      color: #333;
    }
  }
  
  .MuiInputBase-input {
    color: #333;
  }

  .MuiInput-underline:before {
    border-bottom-color: #7575f5;
  }
  .MuiInput-underline:hover:before {
    border-bottom-color: #d0ff94;
  }
  .MuiInput-underline:after {
    border-bottom-color: #d0ff94;
  }

  .MuiInputBase-input::placeholder {
    color: gray;
  }
  
  .MuiInputBase-input:disabled {
    color: gray;
  }
`;

const StepThree = ({ email, setEmail, deliveryTime, setDeliveryTime, selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  const { order, setOrder } = useContext(AppContext);
  const navigate = useNavigate();
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (emailRegex.test(email)) {
      setEmail(email);
      setEmailError(''); // Clear the error message when the email is valid
    } else {
      setEmailError('Correo electrónico no válido'); // Set the error message when the email is invalid
    }
  };

  useEffect(() => {
    if (email && deliveryTime && selectedDate && selectedTime) {
      navigate('/PaymentComponent');
    }
  }, [email, deliveryTime, selectedDate, selectedTime, navigate, order]);
  
  useEffect(() => {
    setOrder({
      ...order,
      email,
      deliveryTime,
      selectedDate,
      selectedTime,
    });
  }, [email, deliveryTime, selectedDate, selectedTime]);

  return (
    <> 
    <StyledH1>Entrega</StyledH1>
<StyledBackgroundImage>
  <div style={{ display: 'block', justifyContent: 'center' }}>
    <p style={{ textAlign: 'left' }}>Correo electrónico</p>
    <StyledTextField
  required
  label="Envía un correo electrónico a"
  placeholder="Correo electrónico"
  onChange={handleEmailChange}
  inputProps={{ maxLength: 50, style: { fontSize: '1.5em' } }} // Cambia el tamaño de la fuente aquí
  style={{ width: '100%', height: '3em', margin: 0, padding: 0 }} // Ajusta el ancho, el alto, el margen y el padding aquí
  error={!!emailError} // Show an error state on the text field when there is an email error
  helperText={emailError} // Show the email error message as helper text
/>
<p style={{ textAlign: 'left',marginBottom:'20px',marginTop:'60px' }}>Hora de entrega</p>
<RadioGroup row value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}>
  <FormControlLabel value="now" control={<Radio />} label={<Typography style={{ fontFamily: "'Belleza', sans-serif" }}>Ahora</Typography>}  />
  <FormControlLabel value="later" control={<Radio />} label={<Typography style={{ fontFamily: "'Belleza', sans-serif" }}>Más tarde</Typography>} />
</RadioGroup>
    {deliveryTime === 'later' && (
      <div>
        <Box mb={2}>
          <StyledTextField
            id="date"
            label="Fecha de entrega"
            type="date"
            defaultValue={selectedDate.toISOString().substr(0, 10)}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            style={{ width: '100%' }}
          />
        </Box>
        <StyledTextField
          id="time"
          label="Hora de entrega"
          type="time"
          defaultValue={selectedTime.toTimeString().substr(0, 5)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          onChange={(e) => setSelectedTime(new Date(`1970-01-01T${e.target.value}:00`))}
          style={{ width: '100%' }}
        />
      </div>
    )}
  </div>
</StyledBackgroundImage>
    </>
  );
}
  
  export default StepThree;