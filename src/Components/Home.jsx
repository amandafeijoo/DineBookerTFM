import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importa el icono map-marker-alt
import { FaSearch } from 'react-icons/fa'; // Importa el icono de búsqueda
import Usage from './Usage';
import About from './About';
import Owner from './Owner';
import GiftCard from './GiftCard';
import PopularMadrid from './PopularMadrid';
import PopularBarcelona from './PopularBarcelona';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Asegúrate de tener @mui/material instalado
import { FaStar } from 'react-icons/fa';


const Container = styled.div`
  display: flex;
  width: 120%;  // Ajusta este valor para cambiar el ancho del contenedor
  justify-content: center;
  align-items: center;
  margin: auto; 
  position: relative;  // Añade esta línea
  left: -10%;  // Añade esta línea
`;

const BackgroundImage = styled.div`
  background-image: url('/images/Portada1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* Añadir un color de fondo semitransparente */
  background-color: rgba(0, 0, 0, 0.5); /* Ajusta el color y la transparencia según tus necesidades */
  background-blend-mode: overlay; /* Mezcla el color de fondo con la imagen de fondo */
  width: auto;
  max-width: 500%;
  height: 60vh;
  margin-top: 150px;
  margin-bottom: 50px;
  margin-right: 250px;
  margin-left: 250px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4), 0px 6px 20px 0px rgba(0, 0, 0, 0.4);
  border: 5px solid #d0ff94;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px; // Ajusta esto según tus necesidades
  margin-left: 50px; // Ajusta esto según tus necesidades
  align-items: center;
  gap: 10px; // Ajusta esto según tus necesidades
`;
const InputWithIcon = styled.div`
  position: relative;
  flex-grow: 1;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; // Ajusta el tamaño del icono
  color: white;
`;

const SearchInput = styled.input`
  border: none;
  height: 60px; // Ajusta la altura del input
  width: 100%; // Ajusta el ancho del input
  font-size: 18px; // Ajusta el tamaño de fuente del input
  padding-left: 50px; // Aumenta el espacio a la izquierda para el icono
  padding-right: 50px; // Añade espacio a la derecha para el botón
  border-radius: 7px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4), 0px 6px 20px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid #99aaff;
  margin-right: 70px; // Ajusta esto según tus necesidades
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; // Ajusta el tamaño del icono
  color: white;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 90%; // Ajusta esto según tus necesidades

`;

const InputButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;



const SearchButton = styled.button`
  position: absolute;
  right: -70px;
  padding: 12px;
  font-size: 16px; // Ajusta esto según tus necesidades
  border: 2px solid #99aaff;
    background-color: #d0ff94;
    color: #000000;
  &:hover {
    cursor: pointer;
    color: #d0ff94;
    background-color: #000000;
    border: 1px solid #99aaff;
  }
`;

  const StyledH1 = styled.h1`
  color: white; // Cambia el color del texto a blanco
  font-size: 4em; // Ajusta el tamaño del texto
  text-align: center; // Centra el texto
  margin-top: 90px; // Añade margen superior
  margin-bottom: 30px; // Elimina el margen inferior
  margin-left: 60px; // Añade margen izquierdo
  margin-right: 60px; // Añade margen derecho
  font-weight: bold; // Añade negrita
  text-shadow: 2px 2px 5px #000000; // Añade sombra al texto
`;

const StyledH3 = styled.h3`
  color: #99aaff; // Cambia el color del texto a blanco
  font-size: 2em; // Ajusta el tamaño del texto
  text-align: center; // Centra el texto
  margin-top: 30px; // Añade margen superior
  margin-bottom: 30px; // Elimina el margen inferior
  margin-left: 120px; // Añade margen izquierdo
  margin-right: 30px; // Añade margen derecho
  font-weight: bold; // Añade negrita
`;


const Home = () => {
  const [location, setLocation] = useState('Madrid');
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search_restaurants`, {
        params: {
          cuisine_type: search,
          location: location
        }
      });
      console.log('Response data:', response.data); // Log de depuración
      setRestaurants(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurantdetails/${restaurant.id}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => setLocation(data.city));
    });
  }, []);


  return (
    <> 
     <Container>
      <BackgroundImage>
        <StyledH1>Donde cada comida empieza con una reserva</StyledH1>
        <SearchContainer>
          <SearchInputContainer>
            <InputWithIcon>
              <SearchInput type="text" value={location} readOnly />
              <LocationIcon />
            </InputWithIcon>
            <span> | </span>
            <InputButtonContainer>
              <InputWithIcon>
                <SearchInput type="text" value={search} onChange={handleSearchChange} placeholder="Tipo de cocina, nombre" />
                <SearchIcon />
              </InputWithIcon>
              <SearchButton onClick={handleSearchClick}>BUSCAR</SearchButton>
            </InputButtonContainer>
          </SearchInputContainer>
        </SearchContainer>
      </BackgroundImage>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle 
  style={{ 
    textAlign: 'center',
    fontSize: '1.2em', 
    fontFamily: "'Belleza', sans-serif",
    textDecoration: 'underline',
    textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
    backgroundImage: 'linear-gradient(to right, #99aaff, #98e098, #99aaff)', // Gradiente de colores
  }}
>
  Resultados de la búsqueda
</DialogTitle>  
<DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {restaurants.map((restaurant) => {
      const photoUrl = restaurant.photos && restaurant.photos.length > 0
        ? `http://localhost:8000${restaurant.photos[0].image}`
        : 'URL_DE_IMAGEN_POR_DEFECTO'; // Reemplaza con una URL de imagen por defecto si no hay fotos

      return (
        <div 
          key={restaurant.id} 
          onClick={() => handleRestaurantClick(restaurant)} 
          style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)' 
          }}
        >
          <StyledH3 style={{ marginRight: '120px' }}>{restaurant.name}</StyledH3>
          <img 
            src={photoUrl} 
            alt={restaurant.name} 
            style={{ 
              width: '40%', 
              height: 'auto', 
              marginBottom: '10px', 
              border: '4px solid #99aaff',
              borderRadius: '10px'
            }} 
          />
          <div style={{ border: '2px solid #d0ff94', padding: '10px', borderRadius: '5px',boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)' 
 }}>
            <p>Valoración: <FaStar color="gold" /> {restaurant.rating}</p>
            <p>{restaurant.address}</p>
            <p>Precio medio {restaurant.price_level}</p>
            <p>Categoría: {restaurant.cuisine_type}</p>
          </div>
        </div>
      );
    })}
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center' }}>
    <Button onClick={() => setOpen(false)}>Cerrar</Button>
  </DialogActions>
</Dialog>
    </Container>
  <a href="/dinepoints" style={{ cursor: 'pointer' }}>
  <video style={{marginTop: "40px", boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)", borderRadius: "10px", border:'3px solid #99aaff'}} width="45%" height="auto" autoPlay muted loop>
    <source src="/images/dinepoints.mp4" type="video/mp4" />
    Tu navegador no soporta el elemento de video.
  </video>
</a>
    <GiftCard />
    <PopularMadrid />
    <PopularBarcelona />
    <Usage />
    <About />
    <Owner />

    </>
  );
}

export default Home;