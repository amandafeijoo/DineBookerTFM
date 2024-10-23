import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar, faMoneyBillAlt, faUtensils, faFilePdf, faGlobe, faLeaf, faTruck, faCopy } from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantMap from './RestaurantMap';
import OpeningHours from './OpeningHours';
import RatingComponent from './RatingComponent';
import ReservationCalendar from './ReservationCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { FavoriteContext } from '../Context/FavoriteContext';
import { fontFamily } from '@mui/system';


const theme = createTheme({
  palette: {
    primary: {
      main: '#A2D2FF',
    },
  },
  typography: { fontFamily: "'Belleza', sans-serif", }, });




function RestaurantDetails() {
  const [numReviewsToShow, setNumReviewsToShow] = useState(3);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { favorites, handleFavoriteClick, handleRemoveFavorite } = useContext(FavoriteContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
      console.log('Updated favorites:', favorites);
    }, [favorites]);
  
    const addressRef = useRef(null);
  
    // Cuando el usuario haga clic en el botón de favoritos
    const onFavoriteClick = () => {
      // Obtén el token del local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token is null');
        return;
      }
  
      // Llama a la función del contexto con el restaurante y el token
      handleFavoriteClick(restaurant, token);
    };
  
    // Cuando el usuario haga clic en el botón para eliminar de favoritos
    const onRemoveFavoriteClick = () => {
      // Obtén el token del local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token is null');
        return;
      }
  
      // Llama a la función del contexto con el id del restaurante y el token
      handleRemoveFavorite(restaurant.id, token);
    };

  const copyToClipboard = (e) => {
    const el = document.createElement('textarea');
    el.value = addressRef.current.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Dirección copiada!');
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Copiar dirección
    </Tooltip>
  );
  // Move the fetchUserNames function call inside a useEffect hook

  
  useEffect(() => {
    fetch(`http://localhost:8000/restaurant_details/${id}/`)
        .then(response => response.json())
        .then(data => {
            const restaurantData = data;
            if (restaurantData.photos && restaurantData.photos.length > 0) {
                restaurantData.photos = restaurantData.photos.map(photo => `http://localhost:8000${photo.image}`);
            }
            if (restaurantData.reviews && restaurantData.reviews.length > 0) {
                restaurantData.reviews = restaurantData.reviews;
            }
            if (restaurantData.latitude && restaurantData.longitude) {
                restaurantData.location = { lat: restaurantData.latitude, lng: restaurantData.longitude };
            }
            // Construir la URL del PDF del menú
            restaurantData.menu_pdf_path = `http://localhost:8000/menu_pdf/${id}/`;
            setRestaurant(restaurantData);
            console.log(restaurantData.reviews.length); // Aquí
            console.log(restaurantData.reviews); // Aquí
            console.log('Reseñas:', restaurantData.reviews);
        });
}, [id]);

        if (!restaurant) {
          return <div>Loading...</div>;
        }
              return (
                <ThemeProvider theme={theme}>
                 <Box sx={{ display: 'flex', ml: 3, mr: 3, mb:4, maxWidth: '100%',height: '100vh', overflowY: 'scroll' }}>
                <Box sx={{ flex: 2 }}>
                <Box sx={{ display: 'flex', width: '100%', marginTop: '140px', marginRight: '40px' }}>
                    {restaurant.photos.map((photo, index) => (
                      <div key={index} style={{ marginRight: '20px' }}>
                        <img 
                          src={photo} 
                          alt="" 
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '10px', 
                    boxShadow: `
                      0px 5px 20px rgba(255, 105, 180, 0.5),  // Rosa
                      0px 7px 20px rgba(152, 224, 152, 0.5),  // Verde
                      0px 8px 20px rgba(153, 170, 255, 0.5)   // Azul
                    `,
                    border: '2px solid #FFB6C1' 
                  }} 
                />
              </div>
            ))}
          </Box>
    <Box 
  sx={{ 
    mt: 5, 
    ml: 5, // Empuja el contenedor hacia la derecha
    mr: 20, 
    p: 1, // Reduce el padding
    width: '80%', // Ajusta el ancho
    height: 'auto', // Ajusta la altura si es necesario
    boxShadow: `
      0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
      0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
      0px 4px 20px rgba(153, 170, 255, 0.5)   // Azul
    `,
    border: '3px solid #99aaff', 
    textAlign: 'justify', 
    borderRadius: 2,
  }}
>
  <Typography 
    variant="h1" 
    sx={{ 
      mt: 2,
      ml: 7, // Empuja el contenedor hacia la derecha 
      color: '#333', 
      fontSize: '2em',
      marginBottom: '20px',
      fontFamily: "'Belleza', sans-serif",
    }}
  >
    {restaurant.name}
    <FavoriteIcon 
      onClick={onFavoriteClick} 
      style={{ 
        fontSize: '25px', 
        marginLeft: '300px', 
        color: favorites.some(favorite => favorite.id === restaurant.id) ? '#FFB6C1' : '#A9A9A9' 
      }}
    />
  </Typography>           
        <Typography sx={{ marginBottom: 1.2, marginLeft:'25px' }}>
  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '25px',marginLeft:'25px'}} color="#99aaff" /> {restaurant.address}
</Typography>
<Typography sx={{ marginBottom: 1.2,marginLeft:'45px' }}>
  <FontAwesomeIcon icon={faStar} style={{ fontSize: '25px'}} color="#99aaff" /> {restaurant.rating}
</Typography>
<Typography sx={{ marginBottom: 1.2,marginLeft:'45px' }}>
  <FontAwesomeIcon icon={faMoneyBillAlt} style={{ fontSize: '25px'}} color="#99aaff" /> {restaurant.price_level}
</Typography>
<Typography sx={{ marginBottom: 1.2,marginLeft:'45px' }}>
  <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '25px' }} color="#99aaff" /> {restaurant.cuisine_type}
</Typography>
<Typography sx={{ marginBottom: 1.2, marginLeft: '45px' }}>
  <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: '25px' }} color="#99aaff" /> 
  <a href={restaurant.menu_pdf_path} target="_blank" rel="noreferrer">Ver menú</a>
</Typography>
<Typography sx={{ marginBottom: 1.2,marginLeft:'45px' }}>
  <FontAwesomeIcon icon={faGlobe} style={{ fontSize: '25px' }} color="#99aaff" /> <a href={restaurant.website} target="_blank" rel="noreferrer">Sitio web</a>
</Typography>
{restaurant.dietary_restrictions && restaurant.dietary_restrictions.vegetarian && 
  <Typography sx={{ marginBottom: 1.2 }}>
    <FontAwesomeIcon icon={faLeaf} style={{ fontSize: '20px' }} color="#99aaff" /> Sirve comida vegetariana
  </Typography>
}
{restaurant.business_status === 'DELIVERY' && 
  
  <Typography sx={{ marginBottom: 2 }}>
    <FontAwesomeIcon icon={faTruck} style={{ fontSize: '10px' }} color="#99aaff" /> Ofrece servicio de entrega
  </Typography>
}
<RatingComponent restaurant={restaurant} />
            </Box>
            
            <Typography 
  variant="h2" 
  sx={{ 
    mt: 10, 
    mb: 5, 
    mr: 12, // Empuja el contenedor hacia la derecha 
    color: '#333', 
    fontSize: '2.2em', 
    textDecoration: 'underline',
    textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
    backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
    backgroundSize: '50% 4px', // Ajusta el tamaño del fondo para que sea más grueso
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%' // Posiciona el fondo en el centro y en la parte inferior
  }}
>
  OPINIONES
</Typography>            
{restaurant.reviews && restaurant.reviews.slice(0, numReviewsToShow).map((review, index) => (
  <Box key={index} sx={{ 
    textAlign: 'left', 
    border: '2px solid #99aaff',
    borderRadius: '10px',
    padding: 1, // Reduce el padding
    width: '80%', // Reduce el ancho del contenedor
    margin: '0 auto', // Centra el contenedor
    boxShadow: `
      0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
      0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
      0px 4px 20px rgba(153, 170, 255, 0.5)   // Azul
    `, 
    mb: 2,
    ml: 5, // Añade margen izquierdo
    opacity: index === 2 && numReviewsToShow === 3 ? 0.5 : 1
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <AccountCircleIcon sx={{ fontSize: 40, color: '#99aaff', mr: 2 }} /> {/* Aumenta el tamaño, cambia el color y añade margen derecho */}
      <h3>{review.user_name || 'Usuario desconocido'}</h3>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <StarIcon sx={{ color: 'gold' }} />
      <p>{review.rating}</p>
    </Box>
    <p>{review.comment}</p>
    <p>{review.review_date}</p> {/* Aquí se muestra la fecha y hora de la reseña */}
  </Box>
))}
<Button 
  variant="contained" 
  color="primary" 
  onClick={() => setNumReviewsToShow(numReviewsToShow + 3)}
  sx={{ 
    mr: 11, // Añade margen izquierdo
    mt: 5, // Añade margen derecho
    fontSize: '1.2em', // Letra más grande
    border: '2px solid #99aaff', // Border
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Box shadow
    padding: '10px 20px' // Padding para un mejor aspecto
  }}
>
  VER MAS OPINIONES
</Button>  

<Typography 
  variant="h4" 
  sx={{ 
    mt: '70px',
    mr: 10, // Empuja el contenedor hacia la derecha 
    textDecoration: 'underline',
    textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
    backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
    backgroundSize: '50% 4px', // Ajusta el tamaño del fondo para que sea más corto y grueso
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%' // Posiciona el fondo en el centro y en la parte inferior
  }}
>
  COMO LLEGAR
</Typography>            
{restaurant.latitude && restaurant.longitude && (
              <>
                {console.log({ lat: restaurant.latitude, lng: restaurant.longitude })} 
                <RestaurantMap location={{ lat: restaurant.latitude, lng: restaurant.longitude }} />
                
                <Typography ref={addressRef}>
      <FontAwesomeIcon 
        icon={faMapMarkerAlt} 
        style={{ fontSize: '25px', marginTop: '20px', marginBottom: '5px', marginRight: '10px',marginLeft: '-80px' }} 
        color="#99aaff" 
      /> 
      {restaurant.address}
      <Tooltip title="Copiar dirección" placement="right">
        <Button onClick={copyToClipboard} sx={{ color: 'black', marginLeft: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon 
              icon={faCopy} 
              style={{ fontSize: '25px', marginRight: '5px' }} 
              color="#99aaff" 
            />
            Copiar dirección
          </Box>
        </Button>
      </Tooltip>
    </Typography>
              </>
            )}
            <Typography 
  variant="h4" 
  sx={{ 
    mt: '70px', 
    mb: '10px',
    mr: 10, // Empuja el contenedor hacia la derecha  
    textDecoration: 'underline',
    textDecorationColor: 'transparent', // Hace que el subrayado original sea transparente
    backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', // Gradiente de colores
    backgroundSize: '50% 4px', // Ajusta el tamaño del fondo para que sea más corto y grueso
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 100%' // Posiciona el fondo en el centro y en la parte inferior
  }}
>
  Horario de apertura
</Typography>                
{restaurant.opening_hours && (
                  <>
                    <OpeningHours openingHours={restaurant.opening_hours} />                
                  </>
                )}
                </Box>
                <Box sx={{ mt: 5, p: 1, width: '80%', height: 'auto', position: 'sticky', top: '0px',bottom: '100px', zIndex: 1 }}> {/* Cambiado a posición sticky */}
              <Box>
                <ReservationCalendar 
                  openingHours={restaurant.opening_hours} 
                  restaurantName={restaurant.name} 
                  restaurantId={id} 
                />
              </Box>
            </Box>
        </Box>
      </ThemeProvider>
    );
    }
    
    export default RestaurantDetails;