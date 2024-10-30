import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle } from '@mui/material';
import { Book, Favorite, MonetizationOn, Star, PersonAdd, Person, Build, Home, Help, ExitToApp, Restaurant } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Drawer as MuiDrawer } from '@mui/material';
import styled from 'styled-components';
import ReservationsDialog from './ReservationsDialog';
import RestaurantsDialog from './RestaurantsDialog';
import ReviewsDialog from './ReviewsDialog'; 
import Swal from 'sweetalert2'; 
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    width: 30%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);    
    overflow: auto;
    border-left: 1px solid #99aaff;
    border-right: 1px solid #99aaff;
    border-top: 1px solid #99aaff;
    border-bottom: 1px solid #99aaff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    @media (max-width: 768px) {
      width: 90%;
      padding: 15px;
    }

    @media (max-width: 480px) {
      width: 100%;
      padding: 10px;
    }
  }
`;


const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    color: #ffff;
    font-size: 22px;
    font-family: 'Belleza', sans-serif;
    margin: 0;
    margin-top: 20px;
    margin-left: 40px;
    margin-bottom: 20px;

  }
`;
const SmallText = styled.div`
  color: #D3D3D3;
  font-size: 16px;
  margin-top: 10px;
  margin:0;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  color: #D3D3D3;
  font-size: 16px;
  margin-top: 10px;
    margin:0
`;


const HorizontalLine = styled.div`
  border-top: 1px solid #D3D3D3;
  width: 80%;
  margin: 10px 0;
  margin-bottom: 20px;
  
`;
const IconWrapper = styled.span`
  color: #CCFFCC;
  font-size: 24px;
  margin-top: 10px; 
  margin-left: 20px; 
`;


const OwnerDrawer = ({ open, onClose }) => {
  console.log('Rendering OwnerDrawer', open); 

  const navigate = useNavigate();
  const [reservationsDialogOpen, setReservationsDialogOpen] = useState(false);
  const [restaurantsDialogOpen, setRestaurantsDialogOpen] = useState(false);
  const [isReviewsDialogOpen, setReviewsDialogOpen] = useState(false);

  const handleOwnerLogout = async () => {
    console.log('handleLogout called');
  
    const refreshToken = localStorage.getItem('refresh');
    const accessToken = localStorage.getItem('access');
  
    console.log('Refresh Token:', refreshToken);
    console.log('Access Token:', accessToken);
  
    if (!refreshToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el token de refresco. Por favor, inicia sesión de nuevo.',
      });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/owners/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
  
      console.log('Logout Response Status:', response.status);
  
      if (response.status === 200) {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        localStorage.removeItem('currentOwner');
        localStorage.removeItem('isOwnerLoggedIn');
  
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión exitosamente.',
        }).then(() => {
          window.location.href = '/loginowner';
        });
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Logout Error Data:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El token de refresco es inválido o ya está en la lista negra. Por favor, inicia sesión de nuevo.',
        });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout Error:', error);
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
          <StyledListItemText primary="RESERVAS" />
        </ListItem>
        <ListItem button onClick={openRestaurantsDialog}>
          <ListItemIcon><IconWrapper><Restaurant /></IconWrapper></ListItemIcon>
          <StyledListItemText primary="TUS RESTAURANTES" />
        </ListItem>
        <ListItem button onClick={openReviewsDialog}>
          <ListItemIcon><IconWrapper><Star /></IconWrapper></ListItemIcon>
          <StyledListItemText primary="OPINIONES" />
        </ListItem>
        <ListItem button onClick={handleOwnerLogout}>
          <ListItemIcon><IconWrapper><ExitToApp /></IconWrapper></ListItemIcon> {/* Agrega el ícono de cierre de sesión */}
          <StyledListItemText primary="CERRAR SESION" />
        </ListItem>
        <HorizontalLine />
        <ListItem>
          <SmallText>ES EN FR IT</SmallText>
        </ListItem>
        <ListItem>
        <IconWrapper>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </IconWrapper>
        </ListItem>
        <ListItem>
          <ContactInfo>infodinebooker@gmail.com</ContactInfo>
        </ListItem>
        <ListItem>
          <ContactInfo>BCN (+34) 12345678</ContactInfo>
        </ListItem>
        <ListItem>
          <ContactInfo>MAD (+34) 12345678</ContactInfo>
        </ListItem>
        <ListItem>
          <ContactInfo>© 2024 AFGROUP</ContactInfo>
        </ListItem>
      </List>

      <ReservationsDialog open={reservationsDialogOpen} onClose={closeReservationsDialog} />
      <RestaurantsDialog open={restaurantsDialogOpen} onClose={closeRestaurantsDialog} />
      <ReviewsDialog open={isReviewsDialogOpen} onClose={closeReviewsDialog} /> {/* Agrega el ReviewsDialog */}
      
    </Drawer>
  );
};

export default OwnerDrawer;