import React, { useState, useEffect } from 'react';
import { Dialog, Typography, TextField, Button } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import { Snackbar, Alert } from '@mui/material';

const Reviews = ({ open, onClose, restaurantId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  const userId = localStorage.getItem('userId');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const [reviewDate, setReviewDate] = useState(null);
  const [user, setUser] = useState(null); // Nuevo estado para almacenar los datos del usuario


  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  useEffect(() => {
    if (open) {
      fetch('http://localhost:8000/accounts/user/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Datos del usuario:', data); // Agrega esta línea
          setUser(data);
        })
        .catch((error) => {
          console.error('Error al obtener el usuario:', error);
        });
    }
  }, [open, token]);

  useEffect(() => {
    if (restaurantId !== null) {
      console.log('restaurantId:', restaurantId); // Imprime restaurantId en la consola
      fetch(`http://localhost:8000/restaurant_details/${restaurantId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then(data => {
            console.log(data); // Imprime los datos devueltos
            setRestaurantName(data.name);
            if (data.photos && data.photos.length > 0) {
              setRestaurantImage(`http://localhost:8000${data.photos[0].image}`);
            }
          })
        .catch(error => {
          console.error('Error al obtener los detalles del restaurante:', error);
        });
    }
  }, [restaurantId]);

  const submitReview = () => {
  setReviewDate(new Date());
  fetch(`http://localhost:8000/restaurants/${restaurantId}/reviews/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment: review, rating, user_id: Number(userId), nombre: user ? user.nombre : '' }),  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    setOpenSnackbar(true);
    setReview('');
    onClose();
  })
  .catch((error) => {
    console.error('Error al enviar la revisión:', error);
  });
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            ¡Reseña enviada con éxito!
          </Alert>
        </Snackbar>
        <Typography variant="h4" style={{ fontFamily: "'Belleza', sans-serif",padding: '20px' }}>
          ¡Tu opinión cuenta! Cuéntanos tu experiencia
        </Typography>
        <Typography variant="h6" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px',marginTop:'10px',padding: '20px' }}>
          Reseña para {restaurantName} por {user ? user.nombre : ''}
        </Typography>
        <img 
          src={restaurantImage} 
          alt={restaurantName} 
          style={{ 
            width: '100px', 
            borderRadius: '10px', 
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' 
          }} 
        />
      </div>     
      <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif",marginLeft: '20px'}}>Escribe tu reseña:</Typography>
      <TextField
        variant="outlined"
        multiline
        rows={4}
        value={review}
        onChange={handleReviewChange}
        style={{ padding: '10px' }}
      />
      <ReactStars
        count={5}
        onChange={setRating}
        size={24}
        activeColor="#ffd700"
        style={{ marginLeft: '80px' }}
      />
      <Button variant="contained" color="primary" onClick={submitReview}>
        Enviar reseña
      </Button>
    </Dialog>
  );
};

export default Reviews;