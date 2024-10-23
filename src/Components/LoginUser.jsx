import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, TextField, Button, Grid, Typography,InputAdornment,IconButton,Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RegisterForm from './RegisterForm';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Alert from '@mui/material/Alert';
import PasswordResetForm from './PasswordResetForm';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';


const StyledDrawer = styled(Drawer)({
  width: 300,
  padding: 20,
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginTop: 300,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CCFFCC',
      },
      '&:hover fieldset': {
        borderColor: '#CCFFCC',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#CCFFCC',
      },
    },
    '& .MuiInputBase-input': {
      color: '#FFFFFF',
    },
    '& .MuiFormLabel-root': {
      color: '#D3D3D3',
    },
    '& .Mui-focused .MuiFormLabel-root': {
      color: '#D3D3D3',
    },
  }));
  

const StyledButton = styled(Button)({
  marginTop: 100,
});

const StyledGrid = styled(Grid)({
  marginTop: 20,
});

const LoginUser = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  const handleOpenRegister = () => {
    setRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    onClose();
  };

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOpenPasswordReset = () => {
    setPasswordResetOpen(true);
  };

  const handleClosePasswordReset = () => {
    setPasswordResetOpen(false);
  };

  const handleContinue = async () => {
    const response = await fetch('http://localhost:8000/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password }) // Corrección aquí
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      onLogin(data.token);
      handleClose();
    } else {
      if (response.status === 400) {
        setErrorMessage('Correo incorrecto o Contraseña incorrecta.');
      } else if (response.status === 405) {
        setErrorMessage('Método no permitido.');
      } else {
        setErrorMessage('Error desconocido.');
      }
    }
  };

  const handleRegisterRestaurant = () => {
    navigate('/OwnerInfo');
  };

    return (
      <StyledDrawer 
        anchor="right" 
        open={open} 
        onClose={onClose}
        sx={{ 
          '& .MuiDrawer-paper': { 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            overflow: 'auto',
            height: '100vh',
            width: '25vw',
          },
        }}
      >
        <img 
          src="/images/login.png" 
          alt="Inicio de sesión" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            maxWidth: '260px', 
            maxHeight: '260px', 
            marginTop: '20px',
            marginLeft: '55px',
            borderRadius: '10px',
            border: '3px solid #000',
          }} 
        />
        <Typography variant="h6" sx={{ color: '#FFFDD0', marginTop:'20px', marginRight:'30px', marginLeft:'30px', fontSize: '16px'}}>
          Introduce tu dirección de correo electrónico
        </Typography>      
        <StyledTextField
          label="Tu dirección de correo electrónico"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          error={!!errorMessage}
          helperText={errorMessage}
          fullWidth
          sx={{ 
            '& .MuiFormLabel-root': { color: '#D3D3D3' },
            marginTop: 4,
          }}
          required
        />
        <StyledTextField
          label="Contraseña"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={!!errorMessage}
          helperText={errorMessage}
          fullWidth
          sx={{ 
            '& .MuiFormLabel-root': { color: '#D3D3D3' },
            marginTop: 4,
          }}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleContinue}
          fullWidth
          sx={{
            marginTop: '40px',
            marginBottom: '0px',
          }}
        >
          CONTINUAR
        </StyledButton>
        <Typography 
          onClick={handleOpenPasswordReset} 
          style={{ color: '#D3D3D3', textDecoration: 'underline', cursor: 'pointer', textAlign: 'center', marginTop: '20px', marginBottom: '10px', marginLeft:'20px' }}
        >
          ¿Has olvidado la contraseña?
        </Typography>
        <PasswordResetForm open={passwordResetOpen} onClose={handleClosePasswordReset} />
        <StyledGrid container alignItems="center">
          <AccountCircleIcon sx={{ color: '#CCFFCC', marginLeft: '40px' }} />
          <Button color="primary" onClick={handleOpenRegister}>
            Registrarme
          </Button>
          <RegisterForm open={registerOpen} onClose={handleCloseRegister} />
        </StyledGrid>
        <StyledGrid container alignItems="center">
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
            }}
          >
            <Button 
              color="primary" 
              startIcon={<RestaurantMenuIcon sx={{ color: '#CCFFCC', marginLeft: '40px' }} />} 
              onClick={() => { 
                onClose(); 
                navigate('/registrationstepper'); 
              }}
            >
              Registrar mi restaurante
            </Button>
            <p 
              onClick={() => {
                onClose(); 
                navigate('/contact');
              }} 
              style={{ cursor: 'pointer', color: '#D3D3D3', marginTop: '20px', marginLeft: '55px', marginBottom:'50px' }}
            >
              <HelpOutlineIcon style={{ color: '#D3D3D3' }} /> Ayuda
            </p>
          </Box>
        </StyledGrid>
      </StyledDrawer>
    );
        };

export default LoginUser;