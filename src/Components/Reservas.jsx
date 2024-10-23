import { useState, useEffect } from 'react';
import React from 'react';
import { Dialog, Typography, Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import Reviews from './Reviews';

const Reservas = ({ open, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [restaurantToReview, setRestaurantToReview] = useState(null);

  const openReviewDialog = (restaurantId) => {
    setRestaurantToReview(restaurantId);
    setReviewDialogOpen(true);
  };

  const closeReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  function translateStatus(status) {
    switch (status) {
      case 'active':
        return 'activa';
      case 'cancelled':
        return 'cancelada';
      default:
        return status;
    }
  }

  useEffect(() => {
    if (open) {
      console.log(token);

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
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.error('Error al obtener el usuario:', error);
        });

      fetch('http://localhost:8000/reservations/', {
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
          if (Array.isArray(data)) {
            Promise.all(data.map((reservation) => {
              if (reservation && reservation.restaurant) {
                return fetch(`http://localhost:8000/restaurant_details/${reservation.restaurant}/`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                })
                .then(response => response.json())
                .then(restaurantData => {
                  // Combina los datos de la reserva y los datos del restaurante en un solo objeto
                  return { ...reservation, restaurant: restaurantData };
                });
              }
            }))
            .then(reservationsWithDetails => {
              // Filtra los valores undefined y establece el estado de las reservas
              setReservations(reservationsWithDetails.filter(Boolean));
            })
            .catch(error => console.error(error));
          } else {
            console.error('Error: la respuesta no es un array', data);
          }
        })
        .catch((error) => {
          console.error('Error al obtener las reservas:', error);
        });
    }
  }, [open, token]);

  const cancelReservation = (id) => {
    fetch(`http://localhost:8000/reservations/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        setReservations(reservations.filter(reservation => reservation.id !== id));
  
        // Abre el Snackbar después de cancelar la reserva
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Error al cancelar la reserva:', error);
      });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
    backgroundPosition: 'center 100%' // Posiciona el fondo en el centro y en la parte inferior
  }}
>
  Mis Reservas
</Typography>  
{snackbarOpen && (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      message="Su reserva fue cancelada con éxito"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
  )}
      {reservations.length === 0 ? (
        <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '40px' }}>Aún no hay reservas</Typography>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '50px',  }}>
          {reservations.map((reservation) => (
            <div key={reservation.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '2px solid #99aaff' }}>
              <img src={`http://localhost:8000${reservation.restaurant.photos[0].image}`} alt={reservation.restaurant.name} style={{ width: '300px', height: '300px', borderRadius:'10px', border: '4px solid #98e098' }} />                
              <Typography variant="h6" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', }}>{reservation.restaurant.name}</Typography>
              <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>{reservation.date} a las {reservation.time}</Typography>
              <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>Personas: {reservation.party_size}</Typography>      
              <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>Estado: {translateStatus(reservation.status)}</Typography>                
              <Button 
                  variant="contained" 
                  style={{ 
                    fontFamily: "'Belleza', sans-serif", 
                    marginBottom: '20px', 
                    backgroundColor: '#d3d3d3', // Gris claro
                    color: '#000', // Color de texto
                    boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
                  }} 
                  onClick={() => cancelReservation(reservation.id)}
                >
                  Cancelar Reserva
                </Button>
                <Button 
                  variant="contained" 
                  style={{ 
                    fontFamily: "'Belleza', sans-serif", 
                    backgroundColor: '#99aaff', // Color de fondo
                    color: '#ffffff', // Color de texto
                    boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
                    
                  }} 
                  onClick={() => openReviewDialog(reservation.restaurant.id)}
                >
                  Dejar una reseña
                </Button>
            </div>
          ))}
        </div>
      )}
      <Reviews open={reviewDialogOpen} onClose={closeReviewDialog} restaurantId={restaurantToReview} />

        
        {reservations.length === 0 ? (
  <>
    <img 
      src="/images/search.png" 
      alt="Search" 
      style={{ 
        marginBottom: '60px',
        borderRadius: '10px', 
        width: '350px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' 
      }} 
    />      
    <Typography variant="h5" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>Este es el punto de partida de experiencias gastronómicas inolvidables</Typography>
    <Typography variant="body1" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>¿Tienes hambre? Estás en el lugar adecuado. Elige lo que más te apetezca y disfruta de confirmación instantánea.</Typography>
    <Button variant="contained" color="primary" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px' }}>
      RESERVAR POR PRIMERA VEZ
    </Button>
  </>
) : null}
      </div>
</Dialog>
  );
};

export default Reservas;