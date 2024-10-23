import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';



const StyledBox = styled(Box)({
  border: '6px solid #A2D2FF',
  padding: '20px',
  borderRadius: '5px',

  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Esto hará que el fondo del diálogo sea semi-transparente
});



function PasswordResetForm({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    // Añade esta validación
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!regex.test(email)) {
      setErrorMessage('Por favor introduce un correo electrónico válido.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/accounts/password_reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (response.ok) {
        setSuccessMessage('Se ha enviado un correo para restablecer tu contraseña.');
      } else {
        if (response.headers.get('Content-Type').includes('application/json')) {
          const errorData = await response.json();
          console.log(errorData);
        }
        setErrorMessage('Error al intentar restablecer la contraseña.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <StyledBox>
      <DialogTitle>Restablecer contraseña</DialogTitle>
      <DialogContent>
      <TextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
          error={!!errorMessage}
          helperText={errorMessage}
          style={{ width: '100%',marginTop:'20px' }} // Añade esta línea
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Restablecer contraseña</Button>
      </DialogActions>
      </StyledBox>
    </Dialog>
  );
}

export default PasswordResetForm;