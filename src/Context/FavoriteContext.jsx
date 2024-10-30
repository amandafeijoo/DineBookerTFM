import React, { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const accesstoken = localStorage.getItem("userAccess");

  const getAccessToken = () => {
    const userAccess = localStorage.getItem("userAccess");
    if (!userAccess) {
      return null;
    }
    return userAccess;
  };

  useEffect(() => {
    console.log("Updated favorites:", favorites);
  }, [favorites]);

  function getUserIdFromToken() {
    const token = getAccessToken();

    if (!token) {
      return null;
    }
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
    return JSON.parse(jsonPayload).user_id;
  }

  const userId = getUserIdFromToken();

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrfToken = getCookie("csrftoken");

  const handleFavoriteClick = (restaurant) => {
    const token = getAccessToken();
    if (!token) {
      console.error("Token is null");
      return;
    }

    if (!restaurant) {
      console.error("Restaurant is null");
      return;
    }

    if (favorites.some((fav) => fav.id === restaurant.id)) {
      handleRemoveFavorite(restaurant.id, token);
    } else {
      fetch(`http://localhost:8000/accounts/user/${userId}/favorites/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ restaurant: restaurant.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setFavorites((prevFavorites) => [...prevFavorites, data]);
        })
        .catch((error) =>
          console.error("There was a problem with the fetch operation: ", error)
        );
    }
  };

  const handleRemoveFavorite = (restaurantId, token) => {
    fetch(
      `http://localhost:8000/accounts/user/${userId}/favorites/${restaurantId}/remove/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRFToken": csrfToken,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== restaurantId)
        );
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation: ", error)
      );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
        handleFavoriteClick,
        handleRemoveFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
