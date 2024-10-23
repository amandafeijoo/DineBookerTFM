import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';



function SettingsDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
        <Typography 
          variant="h3" 
          style={{ 
            fontFamily: "'Belleza', sans-serif", 
            marginBottom: '40px', 
            marginTop: '50px', 
            textDecoration: 'underline',
            textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
            backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
            backgroundSize: '160% 4px', // Ajusta el tamaño del fondo para que sea más grueso
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 100%', // Posiciona el fondo en el centro y en la parte inferior
            textAlign: 'center' // Centra el texto

          }}
        >
          Gestionar mis notificaciones
        </Typography>        
        </DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img 
            src="/images/cerrarcuenta.png" 
            alt="Cerrar cuenta" 
            style={{ 
              borderRadius: '10%', 
              boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
              width: '300px',
              height: '300px',
              border: '4px solid #99aaff',
            }} 
          />
        </Box>
        <DialogContent>
          <DialogContentText>
            <Typography sx={{ fontSize: '25px', fontWeight: 'bold',fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>Boletín de noticias</Typography>
          </DialogContentText>
          <Stack direction="column" spacing={2}>
            <FormControlLabel
              control={<Switch />}
              label={
                <Typography sx={{ fontFamily: "'Belleza', sans-serif",fontSize: '20px', }}>
                  Gestionar mis notificaciones
                </Typography>
              }
            />
            <FormControlLabel
              control={<Switch />}
              label={
                <Typography sx={{ fontFamily: "'Belleza', sans-serif",fontSize: '20px', }}>
                  Acepto recibir ofertas y comunicaciones de DineBooker por correo electrónico
                </Typography>
              }
            />
          </Stack>
          <DialogTitle>
            <Typography sx={{ color: 'blue', fontFamily: "'Belleza', sans-serif",fontSize: '25px' }}>Si de verdad quieres marcharte...😢</Typography>
          </DialogTitle>
          <DialogContentText>
            <Typography sx={{ fontSize: '14px',fontFamily: "'Belleza', sans-serif" }}>
              Dejarás de tener acceso a todos los servicios de DineBooker. ¿Estás seguro de que quieres cerrar tu cuenta?
            </Typography>
            <List>
              <ListItem>
                <Typography sx={{ fontSize: '14px', fontFamily: "'Belleza', sans-serif" }}>- Cancelaremos todas tus reservas</Typography>
              </ListItem>
              <ListItem>
                <Typography sx={{ fontSize: '14px', fontFamily: "'Belleza', sans-serif" }}>- Perderás todos tus DinePoints</Typography>
              </ListItem>
            </List>
          </DialogContentText>
          <Button 
  variant="contained" 
  color="primary" 
  sx={{ 
    display: 'block',
    color: '#333', 
    margin: 'auto',
    marginTop: 2,
    marginBottom: 4,
    border: '3px solid #99aaff',
    padding: '10px 20px',
    backgroundColor: '#b0c4de', // Color gris con azul claro
    '&:hover': {
      backgroundColor: '#a2b9c6', // Color al pasar el ratón
    },
    boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
  }}
>
  CERRAR MI CUENTA
</Button>
        </DialogContent>
      </Dialog>
    );
  }

export default SettingsDialog;