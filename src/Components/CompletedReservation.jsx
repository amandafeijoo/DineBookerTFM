import { Dialog, DialogContent, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import Swal from 'sweetalert2';


const StyledTypography = styled(Typography)({
    fontFamily: "'Belleza', sans-serif",
    marginBottom: '20px',
    marginTop: '50px',
    color: '#A2D2FF',
    fontWeight: 'bold',
    textAlign: 'center',
});

const StyledRestaurantName = styled(Typography)`
  font-family: 'Belleza', sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledParagraph = styled(Typography)`
  font-family: 'Belleza', sans-serif;
  margin-bottom: 60px;
    text-align: center;
`;



function CompletedReservation({ people, time, date, restaurantName, step, restaurantId }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [seatPreference, setSeatPreference] = useState('inside');
  const [specialRequest, setSpecialRequest] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [receiveOffers, setReceiveOffers] = useState(false);
  const token = localStorage.getItem('token');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setSnackbarOpen(false);
  };

  useEffect(() => {
      console.log(token); // Imprime el token en la consola

      fetch('http://localhost:8000/accounts/user/', {
          headers: {
              'Authorization': `Bearer ${token}`, // Reemplaza 'token' con el token del usuario
          },
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data); // Imprime la respuesta en la consola
              setUser(data); // Establece el estado de 'user' con los datos obtenidos
          });
  }, []);

  useEffect(() => {
      if (step === 4) {
          handleOpen();
      }
  }, [step]);

  const handleReservation = () => {
    fetch('http://localhost:8000/reservations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Reemplaza 'token' con el token del usuario
        },
        body: JSON.stringify({
            user: user.id, // Asegúrate de que 'user' no es nulo y tiene una propiedad 'id'
            restaurant_id: restaurantId, // Asegúrate de que 'restaurantId' no es nulo
            date: moment(date).format('YYYY-MM-DD'), // Usa moment.js para formatear la fecha
            time: time,
            party_size: people,
            seat_preference: seatPreference,
            special_request: specialRequest,
            offer_code: offerCode,
            receive_offers: receiveOffers,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Imprime la respuesta en la consola
        if (data.id) {
            console.log('Reservación completada');
            Swal.fire({
                icon: 'success',
                title: 'Reserva confirmada!',
                text: 'Tu reserva ha sido confirmada exitosamente.',
                customClass: {
                    popup: 'swal2-front'
                  },
                  didOpen: () => {
                      const popup = document.querySelector('.swal2-popup');
                      if (popup) {
                          popup.style.zIndex = '9999';
                      }
                  }
              });
            handleClose(); // Cierra el diálogo
        } else {
            console.log('Error al completar la reservación');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al completar tu reserva. Por favor, inténtalo de nuevo.',
                customClass: {
                    popup: 'swal2-front'
                  },
                  didOpen: () => {
                      const popup = document.querySelector('.swal2-popup');
                      if (popup) {
                          popup.style.zIndex = '9999';
                      }
                  }
              });
        }
    });
};

  const handleSeatPreferenceChange = (event) => {
      setSeatPreference(event.target.value);
  };

  const handleSpecialRequestChange = (event) => {
      setSpecialRequest(event.target.value);
  };

  const handleOfferCodeChange = (event) => {
      setOfferCode(event.target.value);
  };

  const handleReceiveOffersChange = (event) => {
      setReceiveOffers(event.target.checked);
  };

  return (
      <div>
          <Dialog open={open} onClose={handleClose}>
              <StyledTypography variant="h2">Reserva</StyledTypography>
              <DialogContent>
                  <StyledRestaurantName variant="h4">Restaurante {restaurantName}</StyledRestaurantName>
                  {step === 4 && <StyledParagraph>Reserva para {people} personas a las {time} en {date.toLocaleDateString('es-ES')}</StyledParagraph>}
                  {user && (
                      <>
                          <form>
                              <Grid container justifyContent="center">
                                  <Grid item xs={12} sm={6}>
                                      <TextField fullWidth label="Nombre" defaultValue={user.nombre} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                      <TextField fullWidth label="Correo electrónico" defaultValue={user.correo} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                      <TextField fullWidth label="Código del país" defaultValue={user.countryCode} />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                      <TextField fullWidth label="Teléfono" defaultValue={user.phoneNumber} />
                                  </Grid>
                              </Grid>
                          </form>
                          <FormControl component="fieldset">
                              <Box mt={3}>
                                  <FormLabel component="legend">Preferencia de asiento</FormLabel>
                              </Box>
                              <RadioGroup value={seatPreference} onChange={handleSeatPreferenceChange}>
                                  <FormControlLabel value="inside" control={<Radio />} label="Dentro" />
                                  <FormControlLabel value="bar" control={<Radio />} label="Barra" />
                                  <FormControlLabel value="terrace" control={<Radio />} label="Terraza" />
                              </RadioGroup>
                          </FormControl>
                          <form>
                              <Grid container direction="column">
                                  <Grid item>
                                      <TextField
                                          fullWidth
                                          InputProps={{ style: { fontSize: 20 } }} // Cambia esto según tus necesidades
                                          label="Petición especial para el restaurante"
                                          placeholder="Por ejemplo, Tengo una alergia"
                                          value={specialRequest}
                                          onChange={handleSpecialRequestChange}
                                      />
                                  </Grid>
                                  <Grid item>
                                      <TextField
                                          fullWidth
                                          InputProps={{ style: { fontSize: 20 } }} // Cambia esto según tus necesidades
                                          label="Código de la oferta"
                                          placeholder="Por ejemplo: Bienvenido16"
                                          value={offerCode}
                                          onChange={handleOfferCodeChange}
                                      />
                                  </Grid>
                              </Grid>
                              <Box display="flex" flexDirection="column" alignItems="center" mt={3} mb={3}>
                                  <Button variant="contained" color="primary" sx={{ mb: 2 }}>Aplicar</Button>
                                  <FormControlLabel
                                      control={<Switch checked={receiveOffers} onChange={handleReceiveOffersChange} />}
                                      label="Deseo recibir ofertas y comunicados del restaurante (lo que incluye a las empresas afiliadas del grupo) por correo electrónico y mensajes de texto."
                                  />
                              </Box>
                              <Box display="flex" justifyContent="center" mt={2} mb={2}>
                                  <Button variant="contained" color="primary" onClick={handleReservation}>CONFIRMAR RESERVA</Button>
                              </Box>
                          </form>
                      </>
                  )}
              </DialogContent>
          </Dialog>
      </div>
  );
}

export default CompletedReservation;