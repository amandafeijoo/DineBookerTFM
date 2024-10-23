import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem,Typography,Box, InputAdornment } from '@mui/material';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


const StyledBox = styled(Box)({
    border: '3px solid #99aaff',
    boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)',
    padding: '20px',
    borderRadius: '5px',
    marginTop: '40px',
    marginBottom: '60px',
  });

const DatosPersonalesDialog = ({ open, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [genero, setGenero] = useState('');
  const [diaNacimiento, setDiaNacimiento] = useState('');
  const [mesNacimiento, setMesNacimiento] = useState('');
  const [anoNacimiento, setAnoNacimiento] = useState('');
  const [fechaUnio, setFechaUnio] = useState('');
  const [isDiaValid, setIsDiaValid] = useState(true);
  const [isAnoValid, setIsAnoValid] = useState(true);
  const currentYear = (new Date()).getFullYear();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');




  const token = localStorage.getItem('token');

  const countryCodes = [
    {
      value: '+1',
      label: '🇺🇸 +1',
    },
    {
      value: '+44',
      label: '🇬🇧 +44',
    },
    {
        value: '+34',
        label: '🇪🇸 +34',
        },
        {
            value: '+47',
            label: '🇳🇴 +47',
        },
    ];

    const handleCountryCodeChange = (event) => {
        setCountryCode(event.target.value);
        };

        useEffect(() => {
          fetch('http://localhost:8000/accounts/user/', {
            headers: {
              'Authorization': `Bearer ${token}`, // Reemplaza 'token' con el token del usuario
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data); // Imprime la respuesta en la consola
              setNombre(data.nombre);
              setApellido(data.apellido);
              setCorreo(data.correo);
              setPhoneNumber(data.phoneNumber);
              setCountryCode(data.countryCode);
              setFechaUnio(data.date_joined); // Usa 'date_joined' en lugar de 'fechaUnio'
              // Añade aquí el resto de los campos que quieras rellenar
            });
        }, []);

        const handleUpdate = () => {
          if (isDiaValid && mesNacimiento && isAnoValid) {
            // Asegúrate de que el día y el mes siempre tengan dos dígitos
            const diaFormateado = String(diaNacimiento).padStart(2, '0');
            const mesFormateado = String(mesNacimiento).padStart(2, '0');
        
            // Combina el día, mes y año de nacimiento en una sola fecha
            const fechaNacimiento = `${anoNacimiento}-${mesFormateado}-${diaFormateado}`;
        
            // Datos a enviar
            const datos = {
              nombre,
              apellido,
              correo,
              phoneNumber,
              countryCode,
              genero,
              fechaNacimiento,
              contrasena: '',
              verificarContrasena: '',
              
            };
        
            // Imprime los datos en la consola
            console.log(datos);
        
            fetch('http://localhost:8000/accounts/user/', {
              method: 'PUT', // Cambia el método a 'PUT'
              headers: {
                'Authorization': `Bearer ${token}`, // Reemplaza 'token' con el token del usuario
                'Content-Type': 'application/json', // Añade este encabezado para indicar que estás enviando datos JSON
              },
              body: JSON.stringify(datos),
            })
            .then ((response) => {
              if (!response.ok) {
                return response.json().then((error) => {
                  console.error(error); // Imprime el error en la consola
                  throw new Error('Error al actualizar los datos del usuario');
                });
              }
              return response.json();
            })
            .then((data) => {
              console.log(data); // Imprime la respuesta en la consola
              setSnackbarMessage('Los datos del usuario se han actualizado correctamente');
              setSnackbarOpen(true);            })
            .catch((error) => {
              console.error(error);
              setSnackbarMessage('Hubo un error al actualizar los datos del usuario'); 
              setSnackbarOpen(true);
            });
          } else {
            setSnackbarMessage('Por favor, introduce una fecha de nacimiento válida');
            setSnackbarOpen(true);
          }
        };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle>
          <Typography 
              variant="h2"  
              style={{ 
                fontFamily: "'Belleza', sans-serif", 
                marginBottom: '30px', 
                marginTop: '20px', 
                color: '#000000', // Color negro para el texto
                fontWeight: 'bold',
                fontSize: '2.7rem', // Tamaño de letra más grande
                textDecoration: 'underline',
                textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
                backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
                backgroundSize: '70% 4px', // Ajusta el tamaño del fondo para que sea más grueso
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center 100%', // Posiciona el fondo en el centro y un poco más arriba
                textAlign: 'center' // Centra el texto

              }}
            >
              Mi Perfil
            </Typography>          
            <Typography
          variant="h6"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: '20px',
            marginTop: '20px',
            textAlign: 'center',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          Se unió: {fechaUnio}
        </Typography>        </DialogTitle>
          <DialogContent>
            <Typography variant="h3" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '20px', marginLeft: '90px' }}>Gestionar mi información personal</Typography>
            <Typography variant="h7" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '20px', marginLeft: '150px' }}>
              Tu información de contacto se enviará al restaurante cuando reserves una mesa.
          </Typography>
          <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={5000}
                  onClose={() => setSnackbarOpen(false)}
                  message={snackbarMessage}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

                />            
              <StyledBox>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RadioGroup row value={genero} onChange={(event) => setGenero(event.target.value)}>
                    <FormControlLabel value="mujer" control={<Radio />} label="Mujer" />
                    <FormControlLabel value="hombre" control={<Radio />} label="Hombre" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth value={nombre} onChange={(event) => setNombre(event.target.value)} label="Nombre" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth value={apellido} onChange={(event) => setApellido(event.target.value)} label="Apellido" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth value={correo} onChange={(event) => setCorreo(event.target.value)} label="Dirección de correo electrónico" required />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    fullWidth
                    value={diaNacimiento}
                    onChange={(event) => {
                      const newDia = event.target.value;
                      setIsDiaValid(newDia >= 1 && newDia <= 31);
                      setDiaNacimiento(newDia);
                    }}
                    label="Día"
                    type="number"
                    inputMode="numeric" // Añade esta línea
                    InputProps={{
                      inputProps: { 
                        max: 31, min: 1 
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    error={!isDiaValid} // Añade esta línea
                    helperText={!isDiaValid ? 'Por favor, introduce un día entre 1 y 31.' : ''} // Añade esta línea
                  />
                </Grid>
                <Grid item xs={2}>
                    <Select
                      fullWidth
                      value={mesNacimiento}
                      onChange={(event) => setMesNacimiento(event.target.value)}
                      label="Mes"
                    >
                      <MenuItem key={1} value={1}>Enero</MenuItem>
                      <MenuItem key={2} value={2}>Febrero</MenuItem>
                      <MenuItem key={3} value={3}>Marzo</MenuItem>
                      <MenuItem key={4} value={4}>Abril</MenuItem>
                      <MenuItem key={5} value={5}>Mayo</MenuItem>
                      <MenuItem key={6} value={6}>Junio</MenuItem>
                      <MenuItem key={7} value={7}>Julio</MenuItem>
                      <MenuItem key={8} value={8}>Agosto</MenuItem>
                      <MenuItem key={9} value={9}>Septiembre</MenuItem>
                      <MenuItem key={10} value={10}>Octubre</MenuItem>
                      <MenuItem key={11} value={11}>Noviembre</MenuItem>
                      <MenuItem key={12} value={12}>Diciembre</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                    fullWidth
                    value={anoNacimiento}
                    onChange={(event) => {
                      const newAno = event.target.value;
                      setIsAnoValid(newAno >= 1900 && newAno <= currentYear);
                      setAnoNacimiento(newAno);
                    }}
                    label="Año"
                    type="number"
                    inputMode="numeric" // Añade esta línea
                    InputProps={{
                      inputProps: { 
                        min: 1900, max: currentYear 
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    error={!isAnoValid} // Añade esta línea
                    helperText={!isAnoValid ? `Por favor, introduce un año entre 1900 y ${currentYear}.` : ''} // Añade esta línea
                  />
              </Grid>
                <Grid item xs={6}>
              <Select fullWidth value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
                {countryCodes.map((code) => <MenuItem value={code.value}>{code.label}</MenuItem>)}
            </Select>
            </Grid>
                 <Grid item xs={6}>
            <TextField fullWidth value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} label="Número de teléfono" required />
              </Grid>
                <Grid item xs={12}>
                <Button 
                    fullWidth 
                    onClick={handleUpdate} 
                    style={{ 
                      backgroundColor: '#646cff', // Color de fondo verde
                      color: '#ffffff' // Color de texto blanco
                    }}
                  >
                    MODIFICAR
                  </Button>                
                  </Grid>
              </Grid>
            </StyledBox>
          </DialogContent>
        </Dialog>
      );
    }

export default DatosPersonalesDialog;