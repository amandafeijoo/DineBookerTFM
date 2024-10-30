import React from "react";
import { Dialog, Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect, useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import { FavoriteContext } from "../../Context/FavoriteContext";

const Favoritos = ({ open, onClose }) => {
  const { favorites, setFavorites, handleRemoveFavorite } =
    useContext(FavoriteContext);
  const token = localStorage.getItem("userAccess");

  let userId;

  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decodedJWT = JSON.parse(jsonPayload);
    userId = decodedJWT.user_id;
  }

  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    const url = `http://localhost:8000/accounts/user/${userId}/favorites/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((favoritesData) => {
        console.log("Favorites data: ", favoritesData);
        setFavorites(favoritesData);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation: ", error)
      );
  }, [userId, token, setFavorites]);

  const hasFavorites = favorites && favorites.length > 0;

  return (
    <Dialog
      anchor="right"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <Typography
        variant="h3"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <FavoriteIcon style={{ color: "#FFB6C1", fontSize: 35 }} /> Mis
        Favoritos
      </Typography>
      {!hasFavorites ? (
        <>
          <Typography
            variant="body1"
            align="center"
            style={{
              fontFamily: "'Belleza', sans-serif",
              marginBottom: "20px",
            }}
          >
            Aún no tienes favoritos
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{
              fontFamily: "'Belleza', sans-serif",
              marginBottom: "20px",
            }}
          >
            Agrega tus favoritos
          </Typography>
          <img
            src="/images/favoritos.png"
            alt="Favoritos"
            style={{
              marginBottom: "60px",
              borderRadius: "10px",
              width: "400px",
              boxShadow:
                "0px 4px 20px rgba(153, 170, 255, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
              marginLeft: "260px",
              marginRight: "260px",
            }}
          />
        </>
      ) : (
        favorites.map((favorite) => {
          const imageUrl =
            favorite.photos.length > 0
              ? `http://localhost:8000${favorite.photos[0].image}`
              : "default_image_url";
          return (
            <div
              key={favorite.id}
              style={{
                marginBottom: "20px",
                boxShadow:
                  "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={imageUrl}
                  alt={favorite.name}
                  style={{
                    width: "200px",
                    marginRight: "20px",
                    borderRadius: "10px",
                    border: "4px solid #A2D2FF",
                    boxShadow:
                      "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">{favorite.name}</Typography>
                  <Typography variant="body1">
                    {favorite.cuisine_type}
                  </Typography>
                  <Typography variant="body1">
                    <StarIcon style={{ color: "#FFD700", fontSize: "1rem" }} />
                    {favorite.rating}
                  </Typography>
                  <Typography variant="body1">
                    {favorite.price_level}
                  </Typography>
                  <Typography variant="body1">{favorite.address}</Typography>
                  <a href={favorite.website} target="_blank" rel="noopener">
                    Website
                  </a>
                </div>
                <Button
                  onClick={() => handleRemoveFavorite(favorite.id, token)}
                >
                  <FavoriteIcon style={{ color: "#FFB6C1" }} />
                </Button>
              </div>
            </div>
          );
        })
      )}
    </Dialog>
  );
};

export default Favoritos;
