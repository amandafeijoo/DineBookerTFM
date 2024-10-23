import React, { useState,useEffect } from 'react';
import { Button, Typography,Dialog } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';
import { Tooltip as ChartTooltip } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dinepointsImage from '/images/dinepoints01.png'; // Importa la imagen
import QRCodeDialog from './QRCodeDialog';



Chart.register(ArcElement, Legend, ChartTooltip);



const GradientUnderlineTypography = styled(Typography)`
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px; // Ajusta la posición vertical del subrayado
    width: 100%;
    height: 5px; // Ajusta el grosor del subrayado
    background-image: linear-gradient(to right, #99aaff, #98e098, #99aaff);
    text-decoration: none;
  }
`;
const DialogContainer = styled.div`
  width: 60vw; // Cambia esto para ajustar el tamaño del diálogo
  margin-bottom: 30px; // Añade margen inferior
  padding: 20px; // Añade relleno
  margin-top: 20px; // Añade margen superior
`;

const ChartContainer = styled.div`
  width: 50%; // Ajusta esto para cambiar el tamaño del gráfico
  height: 30%; // Ajusta esto para cambiar el tamaño del gráfico
    margin-left: 210px;
    margin-right: 70px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333;
    border: 3px solid #535bf2;
`;

const DinePointsDialog = ({ open, onClose }) => {
  const [totalPoints, setTotalPoints] = useState(0); // Nuevo estado para almacenar los total_points
  const navigate = useNavigate();
  const [dinePoints, setDinePoints] = useState(0); // Aquí puedes obtener los dinepoints del usuario logeado
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reservationId, setReservationId] = useState(null); 

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const data = {
    labels: ['Dinepoints', 'Restante'], // Cambia estos valores según tus necesidades
    datasets: [
      {
        data: [dinePoints, 100 - dinePoints],
        backgroundColor: ['#99aaff', '#CCFFCC'], // Cambia estos valores para ajustar los colores del gráfico
      },
    ],
  };
  
  useEffect(() => {
    if (open) {
      // Obtiene el token y el ID del usuario del Local Storage
      const token = localStorage.getItem('token');
      console.log(token);
  
      let decodedUserId;
  
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        const decodedJWT = JSON.parse(jsonPayload);
        decodedUserId = decodedJWT.user_id;
        console.log(decodedUserId);
      }
  
      fetch(`http://localhost:8000/accounts/users/${decodedUserId}/points/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Asegúrate de enviar tu token de autenticación aquí
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Aquí puedes ver la data del usuario

        // Calcula la suma de todos los puntos
        // Calcula la suma de los puntos de las reservas y las compras de tarjetas de regalo
        const pointsTotal = data.points
          .filter(point => point.source === 'reserva' || point.source === 'GiftCardPurchase')
          .reduce((total, point) => total + point.points, 0);
        setDinePoints(pointsTotal); // Aquí puedes ver los puntos del usuario
        setTotalPoints(data.points_total); // Aquí guardas los total_points en el estado
      });
    }
  }, [open]);

  const euros = dinePoints / 100;


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <GradientUnderlineTypography
        variant="h3"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: '10px',
          marginTop: '20px',
        }}
      >
        Espacio Tus DinePoints
      </GradientUnderlineTypography>
      <Typography variant="h6" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '10px' }}>
        Gana dinepoints al reservar en DineBooker
      </Typography>
      <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '10px' }}>
        1 reserva = 100 DinePoints
      </Typography>
      <img 
        src={dinepointsImage} 
        style={{ 
          width: '40%',
          borderRadius: '10px', 
          border: '4px solid #99aaff',
          boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)', 
          marginLeft: '265px', 
          marginTop: '20px',
          marginBottom: '30px',
        }} 
      />
      <Button
        variant="contained"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: '40px',
          marginTop: '0px',
          marginLeft: '300px',
          marginRight: '300px',
          backgroundColor: '#535bf2', // Cambia el color de fondo del botón
          color: '#ffffff', // Cambia el color del texto del botón
          borderRadius: '10px', // Ajusta la curvatura de las esquinas
          border: '2px solid #99aaff', // Añade un borde al botón
        }}
        onClick={() => navigate('/dinepoints')}
      >
        MÁS INFORMACIÓN +
      </Button>
      <Typography variant="h4" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '10px', marginLeft: '10px' }}>
        Tus dinepoints
      </Typography>
      <ChartContainer>
        <Doughnut data={data} />
      </ChartContainer>
      <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '10px' }}>
        {dinePoints} dinepoints acumulados
      </Typography>
      <Typography variant="body1" align="center" style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px', marginTop: '10px' }}>
        {euros} € euros acumulados
      </Typography>
      
      <Button
        variant="contained"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: '40px',
          marginTop: '0px',
          marginLeft: '300px',
          marginRight: '300px',
          backgroundColor: '#535bf2',
          color: '#ffffff',
          borderRadius: '10px',
          border: '2px solid #99aaff',
        }}
        onClick={handleOpenDialog}
      >
        Quiero gastar mis dinepoints
      </Button>
      <QRCodeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        userId={userId}
        reservationId={reservationId}
      />
    </Dialog>
  );
};

export default DinePointsDialog;