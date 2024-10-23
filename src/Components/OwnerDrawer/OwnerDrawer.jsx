import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle } from '@mui/material';
import { Book, Favorite, MonetizationOn, Star, PersonAdd, Person, Build, Home, Help, ExitToApp, Restaurant } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Drawer as MuiDrawer } from '@mui/material';
import styled from 'styled-components';
import ReservationsDialog from './ReservationsDialog';
import RestaurantsDialog from './RestaurantsDialog';
import ReviewsDialog from './ReviewsDialog'; // Importa el ReviewsDialog
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado

const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    width: 20%; // Ajusta esto para cambiar el tamaño del Drawer
    height: 50%; // Ajusta esto para cambiar la altura del Drawer
    background-color: rgba(0, 0, 0, 0.5); // Ajusta esto para cambiar el color de fondo
    overflow: auto; 
    border-left: 1px solid #99aaff; // Añade un borde a la izquierda del Drawer
    border-top: 1px solid #99aaff; // Añade un borde en la parte superior del Drawer
    border-bottom: 1px solid #99aaff; // Añade un borde en la parte inferior del Drawer
    border-top-left-radius: 20px; // Ajusta esto para cambiar la curvatura de la esquina superior derecha
    border-bottom-left-radius: 20px; // Ajusta esto para cambiar la curvatura de la esquina inferior
  }
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    color: #D3D3D3;
    margin-top: 16px; // Ajusta este valor según tus necesidades

  }
`;
const IconWrapper = styled.span`
  color: #CCFFCC;
  margin-top: 16px; // Ajusta este valor según tus necesidades
`;

const OwnerDrawer = ({ open, onClose }) => {
  console.log('Rendering OwnerDrawer', open); // Cambia 'isOpen' a 'open'

  const navigate = useNavigate();
  const [reservationsDialogOpen, setReservationsDialogOpen] = useState(false);
  const [restaurantsDialogOpen, setRestaurantsDialogOpen] = useState(false);
  const [isReviewsDialogOpen, setReviewsDialogOpen] = useState(false);

  const handleLogout = async () => {
    console.log('handleLogout called'); // Verifica que la función se está llamando
  
    // Verifica todas las claves en localStorage
    for (let i = 0; i < localStorage.length; i++) {
      console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
  
    const refreshToken = localStorage.getItem('refresh'); // Asegúrate de que 'refresh' es la clave donde se almacena el token de refresco
  
    console.log('Refresh Token:', refreshToken); // Agrega este mensaje de consola para verificar el token de refresco
  
    if (!refreshToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el token de refresco. Por favor, inicia sesión de nuevo.',
      });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/logout/', { // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
  
      console.log('Logout Response Status:', response.status); // Agrega este mensaje de consola para verificar el estado de la respuesta
  
      if (response.status === 205) {
        // Elimina los tokens y otros datos del almacenamiento local
        localStorage.removeItem('refresh');
        localStorage.removeItem('access'); // Si tienes un token de acceso, también elimínalo
        localStorage.removeItem('currentOwner'); // Elimina los datos del propietario
        localStorage.removeItem('isOwnerLoggedIn'); // Elimina el estado de sesión del propietario
  
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente.',
        }).then(() => {
          // Redirige al usuario a la página de inicio de sesión o a otra página
          window.location.href = '/loginowner'; // Cambia '/loginowner' a la ruta deseada
        });
      } else {
        const errorData = await response.json();
        console.error('Logout Error Data:', errorData); // Agrega este mensaje de consola para verificar los datos de error
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout Error:', error); // Agrega este mensaje de consola para verificar cualquier error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.',
      });
    }
  };


  // Cambia 'isOpen' a 'open'
  useEffect(() => {
    console.log('La propiedad open de OwnerDrawer cambió:', open);
  }, [open]);

  const openReservationsDialog = () => {
    setReservationsDialogOpen(true);
  };
  const closeReservationsDialog = () => {
    setReservationsDialogOpen(false);
  };

  const openRestaurantsDialog = () => {
    setRestaurantsDialogOpen(true);
  };

  const closeRestaurantsDialog = () => {
    setRestaurantsDialogOpen(false);
  };

  const openReviewsDialog = () => {
    setReviewsDialogOpen(true);
  };

  const closeReviewsDialog = () => {
    setReviewsDialogOpen(false);
  };


  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={openReservationsDialog}>
          <ListItemIcon><IconWrapper><Book /></IconWrapper></ListItemIcon>
          <StyledListItemText primary="Reservas" />
        </ListItem>
        <ListItem button onClick={openRestaurantsDialog}>
          <ListItemIcon><IconWrapper><Restaurant /></IconWrapper></ListItemIcon>
          <StyledListItemText primary="Tus Restaurantes" />
        </ListItem>
        <ListItem button onClick={openReviewsDialog}>
          <ListItemIcon><IconWrapper><Star /></IconWrapper></ListItemIcon>
          <StyledListItemText primary="Opiniones" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><IconWrapper><ExitToApp /></IconWrapper></ListItemIcon> {/* Agrega el ícono de cierre de sesión */}
          <StyledListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>

      <ReservationsDialog open={reservationsDialogOpen} onClose={closeReservationsDialog} />
      <RestaurantsDialog open={restaurantsDialogOpen} onClose={closeRestaurantsDialog} />
      <ReviewsDialog open={isReviewsDialogOpen} onClose={closeReviewsDialog} /> {/* Agrega el ReviewsDialog */}
      
    </Drawer>
  );
};

export default OwnerDrawer;