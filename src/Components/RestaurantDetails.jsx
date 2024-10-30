import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faMoneyBillAlt,
  faUtensils,
  faFilePdf,
  faGlobe,
  faLeaf,
  faTruck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestaurantMap from "./RestaurantMap";
import OpeningHours from "./OpeningHours";
import RatingComponent from "./RatingComponent";
import ReservationCalendar from "./ReservationCalendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";
import { fontFamily } from "@mui/system";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A2D2FF",
    },
  },
  typography: { fontFamily: "'Belleza', sans-serif" },
});

const getAccessToken = () => {
  const userAccess = localStorage.getItem("userAccess");
  if (!userAccess) {
    return null;
  }
  return userAccess;
};

function RestaurantDetails() {
  const [numReviewsToShow, setNumReviewsToShow] = useState(3);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { favorites, handleFavoriteClick, handleRemoveFavorite } =
    useContext(FavoriteContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const geocodeAddress = async (address) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: address,
          format: "json",
        },
      }
    );

    if (response.data.length > 0) {
      const location = response.data[0];
      return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
    } else {
      throw new Error("Geocoding failed");
    }
  };

  useEffect(() => {
    console.log("Updated favorites:", favorites);
  }, [favorites]);

  const addressRef = useRef(null);

  const onFavoriteClick = () => {
    const token = getAccessToken();
    if (!token) {
      console.error("Token is null");
      return;
    }
    handleFavoriteClick(restaurant, token);
  };

  const onRemoveFavoriteClick = () => {
    const token = getAccessToken();
    if (!token) {
      console.error("Token is null");
      return;
    }
    handleRemoveFavorite(restaurant.id, token);
  };

  const copyToClipboard = (e) => {
    const el = document.createElement("textarea");
    el.value = addressRef.current.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Dirección copiada!");
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Copiar dirección
    </Tooltip>
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurant_details/${id}/`
        );
        const data = await response.json();
        const restaurantData = data;

        if (restaurantData.photos && restaurantData.photos.length > 0) {
          restaurantData.photos = restaurantData.photos.map((photo) => {
            if (typeof photo === "string") {
              return `http://localhost:8000${photo}`;
            } else {
              console.error(
                "La propiedad image está indefinida para una de las fotos:",
                photo
              );
              return "url_de_imagen_predeterminada";
            }
          });
        }

        if (restaurantData.reviews && restaurantData.reviews.length > 0) {
          restaurantData.reviews = restaurantData.reviews;
        }

        if (restaurantData.latitude && restaurantData.longitude) {
          restaurantData.location = {
            lat: restaurantData.latitude,
            lng: restaurantData.longitude,
          };
        } else if (restaurantData.address) {
          try {
            const coords = await geocodeAddress(restaurantData.address);
            restaurantData.location = coords;
          } catch (error) {
            console.error("Error fetching coordinates:", error);
          }
        }
        restaurantData.menu_pdf_url = restaurantData.menu_pdf_url;

        setRestaurant(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!restaurant) {
    return <div>Error loading restaurant details.</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          ml: 3,
          mr: 3,
          mb: 3,
          mt: -5,
          maxWidth: "100%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "140px",
              marginRight: "40px",
            }}
          >
            {restaurant.photos.map((photo, index) => (
              <div key={index} style={{ marginRight: "40px" }}>
                <img
                  src={photo}
                  alt=""
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: `
                                0px 5px 20px rgba(255, 105, 180, 0.5),  // Rosa
                                0px 7px 20px rgba(152, 224, 152, 0.5),  // Verde
                                0px 8px 20px rgba(153, 170, 255, 0.5)   // Azul
                              `,
                    border: "2px solid #FFB6C1",
                  }}
                />
              </div>
            ))}
          </Box>
          <Box
            sx={{
              mt: 5,
              ml: 5,
              mr: 20,
              p: 1,
              width: "80%",
              height: "auto",
              boxShadow: `
                                0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
                                0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
                                0px 4px 20px rgba(153, 170, 255, 0.5)   // Azul
                              `,
              border: "3px solid #99aaff",
              textAlign: "justify",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mt: 2,
                ml: 7,
                color: "#333",
                fontSize: "2em",
                marginBottom: "20px",
                fontFamily: "'Belleza', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {restaurant.name}
              <Button
                onClick={() => handleFavoriteClick(restaurant)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                  border: "1px solid transparent",
                  padding: "5px 20px",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  color: favorites.some(
                    (favorite) => favorite.id === restaurant.id
                  )
                    ? "#FFB6C1"
                    : "#A9A9A9",
                  "&:hover": {
                    backgroundColor: "transparent",
                    border: "1px solid #FFB6C1",
                  },
                }}
              >
                GUARDAR
                <FavoriteIcon
                  sx={{
                    fontSize: "25px",
                    marginLeft: "10px",
                    color: favorites.some(
                      (favorite) => favorite.id === restaurant.id
                    )
                      ? "#FFB6C1"
                      : "#A9A9A9",
                  }}
                />
              </Button>
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "25px" }}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ fontSize: "25px", marginLeft: "25px" }}
                color="#99aaff"
              />{" "}
              {restaurant.address}
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "45px" }}>
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: "25px" }}
                color="#99aaff"
              />{" "}
              {restaurant.rating}
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "45px" }}>
              <FontAwesomeIcon
                icon={faMoneyBillAlt}
                style={{ fontSize: "25px" }}
                color="#99aaff"
              />{" "}
              {restaurant.price_level}
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "45px" }}>
              <FontAwesomeIcon
                icon={faUtensils}
                style={{ fontSize: "25px" }}
                color="#99aaff"
              />{" "}
              {restaurant.cuisine_type}
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "45px" }}>
              <FontAwesomeIcon
                icon={faFilePdf}
                style={{ fontSize: "25px" }}
                color="#99aaff"
              />
              <a
                href={restaurant.menu_pdf_url}
                target="_blank"
                rel="noreferrer"
              >
                Ver menú
              </a>
            </Typography>
            <Typography sx={{ marginBottom: 1.2, marginLeft: "45px" }}>
              <FontAwesomeIcon
                icon={faGlobe}
                style={{ fontSize: "25px" }}
                color="#99aaff"
              />{" "}
              <a href={restaurant.website} target="_blank" rel="noreferrer">
                Sitio web
              </a>
            </Typography>
            {restaurant.dietary_restrictions &&
              restaurant.dietary_restrictions.vegetarian && (
                <Typography sx={{ marginBottom: 1.2 }}>
                  <FontAwesomeIcon
                    icon={faLeaf}
                    style={{ fontSize: "20px" }}
                    color="#99aaff"
                  />{" "}
                  Sirve comida vegetariana
                </Typography>
              )}
            {restaurant.business_status === "DELIVERY" && (
              <Typography sx={{ marginBottom: 2 }}>
                <FontAwesomeIcon
                  icon={faTruck}
                  style={{ fontSize: "10px" }}
                  color="#99aaff"
                />{" "}
                Ofrece servicio de entrega
              </Typography>
            )}
            <RatingComponent restaurant={restaurant} />
          </Box>

          <Typography
            variant="h2"
            sx={{
              mt: 10,
              mb: 5,
              mr: 12,
              color: "#333",
              fontSize: "2.2em",
              textDecoration: "underline",
              textDecorationColor: "transparent",
              backgroundImage:
                "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
              backgroundSize: "50% 4px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 100%",
            }}
          >
            OPINIONES
          </Typography>
          {restaurant.reviews &&
            restaurant.reviews
              .slice(0, numReviewsToShow)
              .map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: "left",
                    border: "2px solid #99aaff",
                    borderRadius: "10px",
                    padding: 1,
                    width: "80%",
                    margin: "0 auto",
                    boxShadow: `
              0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
              0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
              0px 4px 20px rgba(153, 170, 255, 0.5)   // Azul
            `,
                    mb: 2,
                    ml: 5,
                    opacity: index === 2 && numReviewsToShow === 3 ? 0.5 : 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccountCircleIcon
                      sx={{ fontSize: 40, color: "#99aaff", mr: 2 }}
                    />
                    <h3>
                      {`${review.user.first_name} ${review.user.last_name}` ||
                        "Usuario desconocido"}
                    </h3>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <StarIcon sx={{ color: "gold" }} />
                    <p>{review.rating}</p>
                  </Box>
                  <p>{review.comment}</p>
                  <p>{review.review_date}</p>{" "}
                </Box>
              ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setNumReviewsToShow(numReviewsToShow + 3)}
            sx={{
              mr: 11,
              mt: 5,
              fontSize: "1.2em",
              border: "2px solid #99aaff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              padding: "10px 20px",
            }}
          >
            VER MAS OPINIONES
          </Button>

          <Typography
            variant="h4"
            sx={{
              mt: "70px",
              mr: 10,
              textDecoration: "underline",
              textDecorationColor: "transparent",
              backgroundImage:
                "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
              backgroundSize: "50% 4px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 100%",
            }}
          >
            COMO LLEGAR
          </Typography>
          {restaurant.location && (
            <>
              {console.log(restaurant.location)}
              <RestaurantMap location={restaurant.location} />
              <Typography ref={addressRef}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{
                    fontSize: "25px",
                    marginTop: "20px",
                    marginBottom: "5px",
                    marginRight: "10px",
                    marginLeft: "-80px",
                  }}
                  color="#99aaff"
                />
                {restaurant.address}
                <Tooltip title="Copiar dirección" placement="right">
                  <Button
                    onClick={copyToClipboard}
                    sx={{ color: "black", marginLeft: 2 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FontAwesomeIcon
                        icon={faCopy}
                        style={{ fontSize: "25px", marginRight: "5px" }}
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
              mt: "70px",
              mb: "10px",
              mr: 10,
              backgroundImage:
                "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
              backgroundSize: "50% 4px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 100%",
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
        <Box
          sx={{
            mt: 4,
            p: 1,
            width: "80%",
            height: "auto",
            position: "sticky",
            top: "0px",
            bottom: "100px",
            zIndex: 1,
          }}
        >
          {" "}
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
