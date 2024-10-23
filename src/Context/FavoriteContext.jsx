// // FavoriteContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const FavoriteContext = createContext();

// export function FavoriteProvider({ children }) {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     console.log('Updated favorites:', favorites);
//   }, [favorites]);

//   function getUserIdFromToken() {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       return null;
//     }
    
//     // Decodifica el cuerpo del token
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
  
//     // Extrae el userId del cuerpo del token
//     return JSON.parse(jsonPayload).user_id;
//   }

//   const userId = getUserIdFromToken();

//   const handleFavoriteClick = (restaurant, token) => {
//     if (!restaurant) {
//       console.error('Restaurant is null');
//       return;
//     }

//     // Verificar si el restaurante ya está en los favoritos
//     if (favorites.some(fav => fav.id === restaurant.id)) {
//       // Si es así, eliminar de los favoritos
//       handleRemoveFavorite(restaurant.id, token);
//     } else {
//       // Si no, agregar a los favoritos
//       console.log(`User ID: ${userId}`);
//       console.log(`Restaurant ID: ${restaurant.id}`);
  
//       fetch(`http://localhost:8000/accounts/user/${userId}/favorites/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ restaurant: restaurant.id }),
//       })
//       .then(response => {
//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           return response.text();
//         }
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Received restaurant data:', data);
//         setFavorites(prevFavorites => [...prevFavorites, data]);
//       })
//       .catch(error => console.error('There was a problem with the fetch operation: ', error));
//     }
//   };

//   const handleRemoveFavorite = (restaurantId, token) => {
//     fetch(`http://localhost:8000/accounts/user/${userId}/favorites/${restaurantId}/`, {
//         method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Removed restaurant data:', data);
//       setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== data.id));
//     })
//     .catch(error => console.error('There was a problem with the fetch operation: ', error));
//   };

//   return (
//     <FavoriteContext.Provider value={{ favorites,setFavorites, handleFavoriteClick, handleRemoveFavorite }}>
//       {children}
//     </FavoriteContext.Provider>
//   );
// }

// export default FavoriteContext;





// FavoriteContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('Updated favorites:', favorites);
  }, [favorites]);

  function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    // Decodifica el cuerpo del token
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error('Invalid token format');
      return null;
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    // Extrae el userId del cuerpo del token
    try {
      return JSON.parse(jsonPayload).user_id;
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return null;
    }
  }

  const userId = getUserIdFromToken();

  const handleFavoriteClick = (restaurant, token) => {
    if (!restaurant) {
      console.error('Restaurant is null');
      return;
    }

    // Verificar si el restaurante ya está en los favoritos
    if (favorites.some(fav => fav.id === restaurant.id)) {
      // Si es así, eliminar de los favoritos
      handleRemoveFavorite(restaurant.id, token);
    } else {
      // Si no, agregar a los favoritos
      console.log(`User ID: ${userId}`);
      console.log(`Restaurant ID: ${restaurant.id}`);
  
      fetch(`http://localhost:8000/accounts/user/${userId}/favorites/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ restaurant: restaurant.id }),
      })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          return response.text();
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received restaurant data:', data);
        setFavorites(prevFavorites => [...prevFavorites, data]);
      })
      .catch(error => console.error('There was a problem with the fetch operation: ', error));
    }
  };

  const handleRemoveFavorite = (restaurantId, token) => {
    fetch(`http://localhost:8000/accounts/user/${userId}/favorites/${restaurantId}/`, {
        method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Removed restaurant data:', data);
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== data.id));
    })
    .catch(error => console.error('There was a problem with the fetch operation: ', error));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites, handleFavoriteClick, handleRemoveFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;