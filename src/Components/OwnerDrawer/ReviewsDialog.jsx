import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText,Typography } from '@mui/material';
import Swal from 'sweetalert2';

const fetchRestaurantData = async (accessToken) => {
  try {
    const response = await fetch('http://localhost:8000/owner-restaurants/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
};


const submitOwnerResponse = async (reviewId, responseText, accessToken) => {
  try {
    const response = await fetch(`http://localhost:8000/reviews/${reviewId}/response/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ response: responseText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response from backend:', data); // Log para verificar la respuesta del backend
    return data;
  } catch (error) {
    console.error('Error submitting response:', error);
    return null;
  }
};

const ReviewsDialog = ({ open, onClose }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [responses, setResponses] = useState({});
  const [isEditing, setIsEditing] = useState({});


  useEffect(() => {
    if (open) {
      const accessToken = localStorage.getItem('access');
  
      if (!accessToken) {
        console.error('Access token is missing');
        return;
      }
  
      fetchRestaurantData(accessToken).then(data => {
        console.log('Fetched restaurant data:', data); // Log para verificar los datos del restaurante
        setRestaurants(data);
        // Inicializar respuestas con las respuestas existentes
        const initialResponses = {};
        data.forEach(restaurant => {
          restaurant.reviews?.forEach(review => {
            if (review.owner_response) {
              initialResponses[review.id] = review.owner_response;
            }
          });
        });
        console.log('Initial responses:', initialResponses); // Log para verificar las respuestas iniciales
        setResponses(initialResponses);
      }).catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const initialResponses = {};
      const initialEditing = {};
      restaurants.forEach(restaurant => {
        restaurant.reviews?.forEach(review => {
          initialResponses[review.id] = review.owner_response || '';
          initialEditing[review.id] = false;
        });
      });
      setResponses(initialResponses);
      setIsEditing(initialEditing);
    }
  }, [open, restaurants]);


  const handleResponseChange = (reviewId, event) => {
    const newResponses = {
      ...responses,
      [reviewId]: event.target.value,
    };
    console.log('Updated responses:', newResponses); // Log para verificar las respuestas actualizadas
    setResponses(newResponses);
  };

  const handleEditClick = (reviewId) => {
    setIsEditing({
      ...isEditing,
      [reviewId]: true,
    });
  };

  const handleSaveResponse = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:8000/reviews/${reviewId}/response/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: responses[reviewId],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar la respuesta');
      }
  
      const data = await response.json();
  
      // Actualiza el estado con la respuesta actualizada del backend
      setResponses({
        ...responses,
        [reviewId]: data.owner_response,
      });
      setIsEditing({
        ...isEditing,
        [reviewId]: false,
      });
  
      // Cierra el diálogo antes de mostrar la alerta
      onClose();
  
      // Muestra la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Respuesta guardada!',
        text: 'La respuesta ha sido guardada exitosamente.',
      });
    } catch (error) {
      console.error('Error al guardar la respuesta:', error);
  
      // Cierra el diálogo antes de mostrar la alerta de error
      onClose();
  
      // Muestra la alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la respuesta. Por favor, inténtalo de nuevo.',
      });
    }
  };


  const handleResponseSubmit = (reviewId) => {
    const accessToken = localStorage.getItem('access');
  
    if (!accessToken) {
      console.error('Access token is missing');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Access token is missing. Please log in again.',
      });
      return;
    }
  
    const responseText = responses[reviewId] || '';
    console.log('Submitting response:', responseText); // Log para verificar la respuesta que se está enviando
  
    submitOwnerResponse(reviewId, responseText, accessToken).then(data => {
      if (data) {
        console.log('Response submitted successfully:', data); // Log para verificar la respuesta del servidor
        setResponses({
          ...responses,
          [reviewId]: responseText,
        });
        onClose(); // Cierra el diálogo
        Swal.fire({
          icon: 'success',
          title: 'Response Submitted',
          text: `Response to review ${reviewId} submitted successfully.`,
        });
      } else {
        console.error('Failed to submit response');
        onClose(); // Cierra el diálogo
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit response. Please try again.',
        });
      }
    }).catch(error => {
      console.error('Error submitting response:', error);
      onClose(); // Cierra el diálogo
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting response. Please try again.',
      });
    });
  };

const fontFamilyStyle = { fontFamily: "'Belleza', sans-serif" };

  const titleStyle = {
    ...fontFamilyStyle,
    fontWeight: 'bold',
    fontSize: '2.7rem', // Tamaño de letra más grande
    textDecoration: 'underline',
    textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
    backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
    backgroundSize: '70% 4px', // Ajusta el tamaño del fondo para que sea más grueso
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%', // Posiciona el fondo en el centro y un poco más arriba
    textAlign: 'center' // Centra el texto
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={titleStyle}>Reseñas</DialogTitle>
      <DialogContent>
        <List>
          {restaurants.map(restaurant => (
            <div key={restaurant.id}>
              <ListItem>
                <ListItemText
                  primary={`Restaurante: ${restaurant.name}, Dirección: ${restaurant.address}`}
                  primaryTypographyProps={{
                    ...fontFamilyStyle,
                    fontSize: '1.5rem',
                  }}
                />
              </ListItem>
              {restaurant.reviews?.map(review => (
                <div key={review.id} style={{ padding: '20px', marginBottom: '20px', boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)' }}>
                  <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={`Usuario: ${review.user_name}`}
                      secondary={`Fecha: ${review.date} - Calificación: ${review.rating}`}
                      primaryTypographyProps={fontFamilyStyle}
                      secondaryTypographyProps={fontFamilyStyle}
                    />
                    <ListItemText
                      primary={`Comentario: ${review.comment}`}
                      primaryTypographyProps={fontFamilyStyle}
                    />
                    <TextField
                      label="Respuesta"
                      value={responses[review.id] || ''}
                      onChange={(e) => handleResponseChange(review.id, e)}
                      fullWidth
                      style={{ marginTop: '10px' }}
                      disabled={!isEditing[review.id] && !!review.owner_response}
                      InputProps={{
                        readOnly: !isEditing[review.id] && !!review.owner_response,
                      }}
                    />
                    {!!review.owner_response && !isEditing[review.id] && (
                      <Typography variant="body2" color="textSecondary">
                        Comentario ya respondido
                      </Typography>
                    )}
                    {!!review.owner_response && !isEditing[review.id] && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(review.id)}
                        style={{ marginTop: '10px' }}
                      >
                        Editar Respuesta
                      </Button>
                    )}
                    {isEditing[review.id] && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSaveResponse(review.id)}
                        style={{ marginTop: '10px' }}
                      >
                        Guardar Respuesta
                      </Button>
                    )}
                    <Button
                      onClick={() => handleResponseSubmit(review.id)}
                      style={{ marginTop: '10px', ...fontFamilyStyle }}
                      disabled={!!review.owner_response}
                    >
                      Enviar
                    </Button>
                  </ListItem>
                </div>
              ))}
            </div>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={fontFamilyStyle}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewsDialog;