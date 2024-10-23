import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const QRCodeDialog = ({ open, onClose, token }) => {
  const [qrCode, setQrCode] = useState(null);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);



  const fontFamilyStyle = { fontFamily: "'Belleza', sans-serif" };

  const titleStyle = {
    ...fontFamilyStyle,
    fontWeight: 'bold',
    fontSize: '2.7rem',
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)',
    backgroundSize: '70% 4px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%',
    textAlign: 'center'
  };
  const decodeToken = (token) => {
    if (!token) {
      setError('Token is undefined');
      return null;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      setError('Error decoding token');
      return null;
    }
  };

  useEffect(() => {
    if (open) {
      const tokenToUse = token || localStorage.getItem('token');
      if (!tokenToUse) {
        setError('Token is undefined');
        return;
      }

      const decodedToken = decodeToken(tokenToUse);
      if (!decodedToken) return;

      const userId = decodedToken.user_id;

      fetch(`http://localhost:8000/accounts/qr-code/${userId}/`, {
        headers: {
          'Authorization': `Bearer ${tokenToUse}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(`Error generating QR code: ${err.message}`);
            });
          }
          return response.json();
        })
        .then(data => {
          setQrCode(data.qr_code);
          setPoints(data.points);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [open, token]);

  const calculateEuros = (points) => {
    return (points / 1000) * 10;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={titleStyle}>Tu Código QR</DialogTitle>      

      <DialogContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {qrCode ? (
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
            ) : (
              <Typography>Cargando...</Typography>
            )}
            <Typography>Valor: {points} puntos</Typography>
            <Typography>Valor en Euros: {calculateEuros(points).toFixed(2)} €</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: '#99aaff',
            color: 'white', 
            boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
            '&:hover': {
              backgroundColor: '#87CEFA',
            },
          }}
          color="primary"
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRCodeDialog;