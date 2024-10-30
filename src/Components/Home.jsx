import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Usage from "./Usage";
import About from "./About";
import Owner from "./Owner";
import GiftCard from "./GiftCard";
import PopularMadrid from "./PopularMadrid";
import PopularBarcelona from "./PopularBarcelona";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material"; 
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  width: 120%;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  left: -10%;
`;

const BackgroundImage = styled.div`
  background-image: url("/images/Portada1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: overlay;
  width: auto;
  max-width: 500%;
  height: 60vh;
  margin-top: 150px;
  margin-bottom: 50px;
  margin-right: 250px;
  margin-left: 250px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4),
    0px 6px 20px 0px rgba(0, 0, 0, 0.4);
  border: 5px solid #d0ff94;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-left: 50px;
  align-items: center;
  gap: 10px;
`;
const InputWithIcon = styled.div`
  position: relative;
  flex-grow: 1;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: white;
`;

const SearchInput = styled.input`
  border: none;
  height: 60px;
  width: 108%;
  font-size: 18px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 7px;
  box-shadow: "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)";
  border: 1px solid #99aaff;
  margin-right: 70px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: white;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 90%;
`;

const InputButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchButton = styled.button`
  position: absolute;
  right: -90px;
  padding: 20px;
  font-size: 16px;
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
  color: white;
  font-size: 4em;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 30px;
  margin-left: 60px;
  margin-right: 60px;
  font-weight: bold;
  text-shadow: 2px 2px 5px #000000;
`;

const StyledH3 = styled.h3`
  color: #99aaff;
  font-size: 2em;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 120px;
  margin-right: 30px;
  font-weight: bold;
`;

const Home = () => {
  const [city, setCity] = useState("Madrid");
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/search_restaurants/",
        {
          params: { cuisine_type: search, city: city },
        }
      );
      console.log("Response data:", response.data);
      setRestaurants(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurantdetails/${restaurant.id}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Geolocation data:", data); // Log de depuración
          setCity(data.city); 
        });
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
                <SearchInput type="text" value={city} readOnly />
                <LocationIcon />
              </InputWithIcon>
              <span> | </span>
              <InputButtonContainer>
                <InputWithIcon>
                  <SearchInput
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Tipo de cocina, nombre"
                  />
                  <SearchIcon />
                </InputWithIcon>
                <SearchButton onClick={handleSearchClick}>BUSCAR</SearchButton>
              </InputButtonContainer>
            </SearchInputContainer>
          </SearchContainer>
        </BackgroundImage>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontSize: "1.2em",
              fontFamily: "'Belleza', sans-serif",
              textDecoration: "underline",
              textDecorationColor: "transparent",
              backgroundImage:
                "linear-gradient(to right, #99aaff, #98e098, #99aaff)",
            }}
          >
            Resultados de la búsqueda
          </DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {restaurants.map((restaurant, index) => {
              console.log("Restaurant:", restaurant); // Log de depuración
              const photoUrl =
                restaurant.photos && restaurant.photos.length > 0
                  ? `http://localhost:8000${restaurant.photos[0].image}`
                  : "url_de_imagen_predeterminada";
              console.log("Photo URL:", photoUrl); // Log de depuración

              return (
                <div
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant)}
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow:
                      "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                  }}
                >
                  <StyledH3 style={{ marginRight: "120px" }}>
                    {restaurant.name}
                  </StyledH3>
                  <img
                    src={photoUrl}
                    alt={restaurant.name}
                    style={{
                      width: "40%",
                      height: "auto",
                      marginBottom: "10px",
                      border: "4px solid #99aaff",
                      borderRadius: "10px",
                    }}
                  />
                  <div
                    style={{
                      border: "2px solid #d0ff94",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow:
                        "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                    }}
                  >
                    <p>
                      Valoración: <FaStar color="gold" /> {restaurant.rating}
                    </p>
                    <p>{restaurant.address}</p>
                    <p>Precio medio {restaurant.price_level}</p>
                    <p>Categoría: {restaurant.cuisine_type}</p>
                  </div>
                </div>
              );
            })}
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <a href="/dinepoints" style={{ cursor: "pointer" }}>
        <video
          style={{
            marginTop: "40px",
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            border: "3px solid #99aaff",
          }}
          width="45%"
          height="auto"
          autoPlay
          muted
          loop
        >
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
};

export default Home;
