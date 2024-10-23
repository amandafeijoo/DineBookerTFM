import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, Typography, Button,Box } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';

const theme = createTheme();

const EditButton = styled(Button)({
  backgroundColor: '#add8e6', // Azul celeste
  marginBottom: '20px',
  border: '1px solid #99aaff',
  color: '#333',
  boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
  '&:hover': {
    backgroundColor: '#87ceeb', // Azul celeste oscuro
  },
});

const DeleteButton = styled(Button)({
  border: '1px solid #99aaff',
  backgroundColor: '#ffb6c1', // Rosa pálido
  marginBottom: '20px',
  boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
  color: '#333',
  '&:hover': {
    backgroundColor: '#ff69b4', // Rosa pálido oscuro
  },
});

const SaveButton = styled(Button)({
  backgroundColor: '#90ee90', // Light green
  marginBottom: '20px',
  color: 'white',
  '&:hover': {
    backgroundColor: '#7ccd7c', // Darker green
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


const OpinionBox = styled(Box)({
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
  borderRadius: '5px', // Bordes redondeados
  padding: '20px', // Relleno interno
  marginBottom: '20px', // Margen inferior
  borderLeft: '5px solid #ffb6c1', // Borde izquierdo rosa
  // Otros estilos para la opinión...
});

const OpinionesDialog = ({ open, onClose, userId }) => {
  const [opiniones, setOpiniones] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');

  let decodedUserId;

  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decodedJWT = JSON.parse(jsonPayload);
    decodedUserId = decodedJWT.user_id;
  }

  const handleEdit = (reviewId) => {
    const reviewToEdit = opiniones.flatMap(opinion => opinion.reviews).find(review => review.id === reviewId);
  
    if (reviewToEdit) {
      setEditingReview(reviewToEdit);
      setEditingReviewId(reviewId);
      setComment(reviewToEdit.comment);
    } else {
      console.error(`No se encontró ninguna revisión con el id ${reviewId}`);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
  
    if (editingReview === null) {
      console.error('editingReview es null');
      return;
    }
  
    const url = `http://localhost:8000/reviews/${editingReview.id}/`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: comment
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedReview) => {
      setOpiniones(opiniones.map(opinion => {
        return {
          ...opinion,
          reviews: opinion.reviews.map(review => review.id === updatedReview.id ? updatedReview : review)
        };
      }));
      setEditingReview(null);
      setIsEditing(false);
      setEditingReviewId(null);
      onClose(); // Cierra el diálogo antes de mostrar la alerta
      Swal.fire('Éxito', 'Opinión actualizada correctamente', 'success');
    })
    .catch((error) => {
      console.log('Error:', error);
      Swal.fire('Error', 'Hubo un problema al actualizar la opinión', 'error');
    });
  };

  useEffect(() => {
    if (!open) {
      setComment('');
    }
  }, [open]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    console.log("decodedUserId:", decodedUserId);
    if (!decodedUserId || !token) {
      return;
    }
    fetch(`http://localhost:8000/users/${decodedUserId}/reviews/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOpiniones(data);
        console.log('Opiniones:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [decodedUserId]);

  const handleDelete = async (reviewId) => {
    const url = `http://localhost:8000/reviews/${reviewId}/`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setOpiniones(opiniones.map(opinion => {
        return {
          ...opinion,
          reviews: opinion.reviews.filter(review => review.id !== reviewId)
        };
      }));
      onClose(); // Cierra el diálogo antes de mostrar la alerta
      Swal.fire('Éxito', 'Opinión eliminada correctamente', 'success');
    })
    .catch((error) => {
      console.log('Error:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar la opinión', 'error');
    });
  };


  return (
  <ThemeProvider theme={theme}>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography 
          variant="h3" 
          align="center" 
          style={{ 
            fontFamily: "'Belleza', sans-serif", 
            marginBottom: '20px',
            marginTop: '20px',
            textDecoration: 'underline',
            textDecorationColor: 'transparent',
            backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)',
            backgroundSize: '50% 4px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 100%'
          }}
        >
          Mis Opiniones
        </Typography>        
      </DialogTitle> 
      <DialogContent>
        {opiniones && opiniones.length > 0 ? (
          [...new Set(opiniones.map(JSON.stringify))].map(JSON.parse).map((opinion, index) => (
            opinion.reviews.map((review, reviewIndex) => {
              if (review.user === decodedUserId) {
                return (
                  <OpinionBox key={`${index}-${reviewIndex}`}>
                    {editingReviewId === review.id ? (
                      <form onSubmit={handleSave}>
                        <TextField 
                          value={comment} 
                          onChange={handleCommentChange}
                          multiline
                          rows={5}
                          fullWidth
                        />
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '10px', 
                            marginTop: '20px' 
                          }}
                        >
                          <SaveButton type="submit" style={{backgroundColor: 'lightgreen'}}>
                            Guardar
                          </SaveButton>
                        </Box>
                      </form>
                    ) : (
                      <>
                        <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginLeft: '10px' }}>
                          Restaurante {opinion.name}: {review.comment}
                        </Typography>
                        {review.owner_response && (
                          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Avatar alt="Restaurante" src="/path/to/restaurant-avatar.png" style={{ marginRight: '10px' }} />
                            <Typography variant="body2" align="center" style={{ fontFamily: "'Belleza', sans-serif", color: 'gray' }}>
                              {opinion.name} responde: {review.owner_response}
                            </Typography>
                          </div>
                        )}
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '10px', 
                            marginTop: '20px' 
                          }}
                        >
                          <EditButton onClick={() => handleEdit(review.id)}>
                            Editar
                          </EditButton>
                          <DeleteButton onClick={() => handleDelete(review.id)}>
                            Borrar
                          </DeleteButton>
                        </Box>
                      </>
                    )}
                  </OpinionBox>
                );
              }
              return null;
            })
          ))
        ) : (
          <>
            <img 
              src="/images/opiniones.png" 
              alt="No hay opiniones" 
              style={{ 
                width: '400px', 
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                borderRadius: '5px', 
                marginLeft: '240px',
                marginTop: '20px',
                marginBottom: '30px',
              }} 
            />            
            <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '10px', marginTop: '10px' }}>
              Aún no hay opiniones
            </Typography>
            <Typography variant="h5" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '30px', marginTop: '20px' }}>
              Reserva una mesa y escribe una opinión sobre tu comida.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <StyledButton>BUSCAR RESTAURANTE</StyledButton>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  </ThemeProvider>
);
  
};

export default OpinionesDialog;